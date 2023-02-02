import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee store',
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results

  return unsplashResults.map(r => r.urls["small"]);
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
    'coffee', 20), options
  )
  
  const photos = await getListOfCoffeeStorePhotos();

  const data = await response.json();
  return data.results.map((result, index) => {
    return {
      ...result,
      imgUrl: photos[index]
    }
  });
}

export default fetchCoffeeStores;