import { API_KEY } from '../../secrets';
import { VideoSearchResult } from './models';

export function searchVideos(query: string, abort?: AbortController): Promise<VideoSearchResult> {
  return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`, {
    signal: abort?.signal,
  }).then((response) => response.json());
}
