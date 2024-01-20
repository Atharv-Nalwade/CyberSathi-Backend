const { getJson } = require("serpapi");
const {
  API_KEY,
  YANDEX_ENGINE,
  LANG,
  LR,
  YANDEX_DOMAIN,
  LANGUAGE,
  GOOGLE_ENGINE,
  GOOGLE_DOMAIN,
  DUCKDUCKGO_ENGINE,
} = require("../configs/serpConfig.js");

async function getYandexWebSearch(searchQuery) {
  let yandexWebSearchResults = [];

  for (let page = 0; page < 4; page++) {
    const yandexWebSearch = await getJson(
      {
        api_key: API_KEY,
        engine: YANDEX_ENGINE,
        text: searchQuery,
        yandex_domain: YANDEX_DOMAIN,
        lr: LR,
        p: `${page}`,
        lang: LANG,
      },
      (json) => {
        // Concatenate the results from each page
        yandexWebSearchResults = yandexWebSearchResults.concat(
          json.organic_results
        );
      }
    );
  }

  return yandexWebSearchResults;
}

async function getGoogleWebSearch(searchQuery, location, safetyToogle) {
  let googleWebSearchResults = [];

  const googleWebSearch = await getJson(
    {
      api_key: API_KEY,
      engine: GOOGLE_ENGINE,
      q: searchQuery,
      location: location,
      google_domain: GOOGLE_DOMAIN,
      gl: location,
      hl: "en",
      safe: safetyToogle,
      start: "0",
      num: "50",
    },
    (json) => {
      googleWebSearchResults = json.organic_results;
    }
  );

  return googleWebSearchResults;
}

async function getDuckDuckGoWebSearch(searchQuery) {
  try {
    let duckDuckGoWebSearchResults = [];

    console.log(DUCKDUCKGO_ENGINE);

    for (let page = 0; page < 4; page++) {
      let duckDuckGoWebSearch = await getJson(
        {
          api_key:API_KEY,
          engine: "duckduckgo",
          q: searchQuery,
          kl: "in-en",
          safe: "-2", // -2 is off and -1 is moderate and 1 is strict
          start: `${page}`,
        },
        (json) => {
          duckDuckGoWebSearchResults = duckDuckGoWebSearchResults.concat(
            json.organic_results
          );
        }
      );
    }

    return duckDuckGoWebSearchResults;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getYandexWebSearch,
  getGoogleWebSearch,
  getDuckDuckGoWebSearch,
};
