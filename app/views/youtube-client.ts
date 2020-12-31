import { API_KEY } from '../../secrets';

export function searchVideos(query: string) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`
  ).then((response) => response.json());
}
