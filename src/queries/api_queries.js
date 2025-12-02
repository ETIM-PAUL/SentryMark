export async function fetchAPIdata(ipId) {  

const url = 'https://staging-api.storyprotocol.net/api/v4/assets';
const options = {
  method: 'POST',
  headers: {
    'X-Api-Key': `${import.meta.env.VITE_STORY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: `{"includeLicenses":true,"moderated":false,"orderBy":"blockNumber","orderDirection":"desc","pagination":{"limit":20,"offset":0},"where":{"ipIds":["${ipId}"]}}`
};


try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log('API Response:', data);
  
  if (data.data && data.data.length > 0) {
    const assetData = data.data[0];
    console.log('Asset Data:', assetData);
    console.log('License Details:', assetData.licenses?.[0]);
    return assetData;
  }
  
  return null;
} catch (error) {
  console.error('Error fetching API data:', error);
  throw error;
}

}



