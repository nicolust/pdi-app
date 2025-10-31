const url = 'https://api.themoviedb.org/3/authentication';

const TMDBConfig = {
  apiKey2: import.meta.env.VITE_API_KEY_2,
};

export async function getAuthentication() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TMDBConfig.apiKey2,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('TMDB fetch error:', err);
    throw err;
  }
}
