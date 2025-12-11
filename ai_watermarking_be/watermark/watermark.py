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