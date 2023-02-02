const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
}

const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOURSQUARE_API_KEY
        }
      };
      
    const response = await fetch(getUrlForCoffeeStores(
        '-23.5314299%2C-46.4489278',
        'coffee', 6), options)
    const data = await response.json();
    return data.results;
}

export default fetchCoffeeStores;