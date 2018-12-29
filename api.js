const api_key = "87a95af58348ccd1fc85f39184d9cb60";
export const base = "https://api.themoviedb.org/3/movie";
export const img_backDrop = "https://image.tmdb.org/t/p/w780";
export const img_poster = "https://image.tmdb.org/t/p/w185";
export const latest =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=87a95af58348ccd1fc85f39184d9cb60&language=en-US";
export const popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=87a95af58348ccd1fc85f39184d9cb60&language=en-US";
export const upcoming =
  " https://api.themoviedb.org/3/movie/upcoming?api_key=87a95af58348ccd1fc85f39184d9cb60&language=en-US";
export const search =
  "https://api.themoviedb.org/3/search/movie?api_key=87a95af58348ccd1fc85f39184d9cb60&language=en-US&query=";

const baseURL = {
  base,
  img_backDrop,
  img_poster,
  latest,
  popular,
  upcoming
};
export const getApi = (mode = "latest") => {
  let page = 1;
  let url = baseURL[mode];
  return {
    getPage() {
      return page;
    },
    getNext() {
      return fetch(`${url}&page=${page++}`).then(res => {
        if (res.ok) return res.json();
      });
    },
    search(query) {
      let queryString = query.split(" ").join("%20");
      page = 1;
      url = `${search}${queryString}`;
      return this.getNext();
    },
    setMode(mode) {
      page = 1;
      url = baseURL[mode];
      return this.getNext();
    }
  };
};
