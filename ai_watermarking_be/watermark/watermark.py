# import lmstudio as lms
# from lmstudio import ToolFunctionDef
import base64
import io
import random
import hashlib
import logging
from PIL import Image
from trustmark import TrustMark

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s %(message)s')

TM_SCHEMA_CODE=TrustMark.Encoding.BCH_4
tm = TrustMark(verbose=True, model_type='Q', encoding_type=TM_SCHEMA_CODE)
bitlen = tm.schemaCapacity()


class AlreadyWatermarkedError(Exception):
    """Raised when attempting to embed a watermark into an image that already has one."""
    pass

def string_to_binary(watermark_id: str, bitlen: int) -> str:
    """
    Convert an alphanumeric string to a binary string of the specified length.
    
    Args:
        watermark_id: The alphanumeric string to convert
        bitlen: The required length of the binary string
    
    Returns:
        A binary string (e.g., "01010101") of length bitlen
    """
    # Convert string to bytes using UTF-8 encoding
    string_bytes = watermark_id.encode('utf-8')
    
    # Use hash to get consistent binary representation
    # Hash the string to get a fixed-size output, then convert to binary
    hash_obj = hashlib.sha256(string_bytes)
    hash_bytes = hash_obj.digest()
    
    # Convert hash bytes to binary string
    binary_str = ''.join(format(byte, '08b') for byte in hash_bytes)
    
    # If we need more bits, repeat the hash or extend
    if len(binary_str) < bitlen:
        # Extend by hashing again with a counter
        extended = binary_str
        counter = 0
        while len(extended) < bitlen:
            counter_bytes = counter.to_bytes(4, 'big')
            additional_hash = hashlib.sha256(string_bytes + counter_bytes).digest()
            extended += ''.join(format(byte, '08b') for byte in additional_hash)
            counter += 1
        binary_str = extended
    
    # Truncate to the required length
    return binary_str[:bitlen]

def embed_watermark(base64_image: str, wm_hash: str):
    """
    Embed a TrustMark watermark into a base64-encoded image.

    Args:
        base64_image: Base64-encoded image string.
        wm_hash: Arbitrary identifier/hash (text) that will be deterministically
                 converted into a binary watermark payload.

    Returns:
        Base64-encoded image string with embedded watermark, or None on failure.
    """
    decoded_image_bytes = base64.b64decode(base64_image)
    print(f"Decoded image bytes: {len(decoded_image_bytes)}")
    image_stream = io.BytesIO(decoded_image_bytes)
    try:
        cover = Image.open(image_stream)
        print(f"Image information: {cover.format}, {cover.size}, {cover.mode}")

        # Check if there is *any* existing watermark in the image, regardless of ID.
        stego = cover.convert("RGB")
        try:
            wm_id, wm_present, wm_schema = tm.decode(stego, "binary")
        except Exception as decode_err:
            logging.warning("Error while checking for existing watermark: %s", decode_err)
            wm_present = False

        if wm_present:
            logging.info("Existing watermark detected; refusing to embed again.")
            raise AlreadyWatermarkedError("Image has already been watermarked")

        rgb = cover.convert("RGB")

        # Convert the provided hash/text into the binary payload TrustMark expects
        watermark_id = string_to_binary(wm_hash, bitlen)

        encoded = tm.encode(rgb, watermark_id, MODE="binary")
        params = {
            "exif": cover.info.get("exif"),
            "icc_profile": cover.info.get("icc_profile"),
            "dpi": cover.info.get("dpi"),
        }
        not_none_params = {k: v for k, v in params.items() if v is not None}
        output_stream = io.BytesIO()
        # Determine format from original image or default to JPG
        image_format = cover.format or "JPG"
        encoded.save(output_stream, format=image_format, **not_none_params)
        base64_encoded_image = base64.b64encode(output_stream.getvalue()).decode(
            "utf-8"
        )
        print(f"Base64 encoded image: {len(base64_encoded_image)}")
        return base64_encoded_image
    except AlreadyWatermarkedError:
        # Re-raise explicitly so API layer can return a specific error.
        raise
    except Exception as e:
        print(f"Error opening image: {e}")
        return None
    finally:
        image_stream.close()

def verify_watermark(wm_base64_img_str: str, wm_hash: str):
  if wm_base64_img_str is None:
      logging.error('Error: Cannot verify watermark - image is None')
      return False
  try:
    id = string_to_binary(wm_hash, bitlen)
    decoded_image_bytes = base64.b64decode(wm_base64_img_str)
    image_stream = io.BytesIO(decoded_image_bytes)
    img = Image.open(image_stream)
    stego = img.convert('RGB')
    wm_id, wm_present, wm_schema = tm.decode(stego, 'binary')
    if wm_present:
      logging.info('Watermark detected in image')
      if wm_id==id:
          logging.info('Watermark is correct')
          logging.info('Watermark ID: %s', id)
      else:
          logging.info('Watermark does not match!')
          logging.debug('Expected ID: %s', id)
          logging.debug('Found ID: %s', wm_id)
          return False
    else:
        logging.info('No watermark detected!')
        return False
    return (wm_present and wm_id==id)
  except Exception as e:
    logging.exception('Error verifying watermark: %s', e)
    return False