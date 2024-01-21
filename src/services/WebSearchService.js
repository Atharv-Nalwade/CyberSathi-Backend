const { getJson } = require("serpapi");
const {
  API_KEY,
  YANDEX_ENGINE,
  LANG,
  LR,
  YANDEX_DOMAIN,
  GOOGLE_ENGINE,
  GOOGLE_DOMAIN
} = require("../configs/serpConfig.js");

const redisClient = require("../configs/redisConfig.js");

const { promisify } = require("util");

// Promisify the redisClient.set() method
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

async function getYandexWebSearch(searchQuery) {
  const sanitizedSearchQuery = searchQuery.replace(/\s/g, '');
  const redisKey = `yandex:${sanitizedSearchQuery}`;
  let yandexWebSearchResults = [];
  let redisData;

  if (!redisClient.status || redisClient.status !== "ready") {
    console.log("Redis client not connected, attempting to connect...");
    await redisClient.connect();
    console.log("Redis client connected");
  }

  console.log("Checking if data is in Redis");
  console.log("Redis key:", redisKey);
  try {
    const keyExists = await redisClient.exists(redisKey);
    console.log("Key exists:", keyExists);

    if (keyExists) {
      redisData = await redisGetAsync(redisKey);
      console.log('Cache hit, sending from cache:', JSON.parse(redisData));
      return JSON.parse(redisData);
    }
  } catch (error) {
    console.error('Error checking or fetching data from Redis:', error);
  }

  for (let page = 0; page < 4; page++) {
    const yandexWebSearch = await getJson({
      api_key: API_KEY,
      engine: YANDEX_ENGINE,
      text: searchQuery,
      yandex_domain: YANDEX_DOMAIN,
      lr: LR,
      p: `${page}`,
      lang: LANG,
    });

    yandexWebSearchResults = yandexWebSearchResults.concat(
      yandexWebSearch.organic_results
    );
  }

  await redisSetAsync(redisKey, JSON.stringify(yandexWebSearchResults));
  console.log("Cache miss, added to Redis:", yandexWebSearchResults);

  return yandexWebSearchResults;
}


async function getGoogleWebSearch(searchQuery) {
  const sanitizedSearchQuery = searchQuery.replace(/\s/g, '');
  const redisKey = `google:${sanitizedSearchQuery}`;
  let googleWebSearchResults = [];
  let redisData;

  if (!redisClient.status || redisClient.status !== "ready") {
    console.log("Redis client not connected, attempting to connect...");
    await redisClient.connect();
    console.log("Redis client connected");
  }

  console.log("Checking if data is in Redis");
  console.log("Redis key:", redisKey);
  try {
    const keyExists = await redisClient.exists(redisKey);
    console.log("Key exists:", keyExists);

    if (keyExists) {
      redisData = await redisGetAsync(redisKey);
      console.log('Cache hit, sending from cache:', JSON.parse(redisData));
      return JSON.parse(redisData);
    }
  } catch (error) {
    console.error('Error checking or fetching data from Redis:', error);
  }

  const googleWebSearch = await getJson({
    api_key: API_KEY,
    engine: GOOGLE_ENGINE,
    q: searchQuery,
    location: "in",
    google_domain: GOOGLE_DOMAIN,
    gl: "in",
    hl: "en",
    safe: "off",
    start: "0",
    num: "50",
  });

  googleWebSearchResults = googleWebSearch.organic_results;

  await redisSetAsync(redisKey, JSON.stringify(googleWebSearchResults));
  console.log("Cache miss, added to Redis:", googleWebSearchResults);

  return googleWebSearchResults;
}

async function getDuckDuckGoWebSearch(searchQuery) {
  try {
    const sanitizedSearchQuery = searchQuery.replace(/\s/g, '');
    const redisKey = `duckduckgo:${sanitizedSearchQuery}`;
    let duckDuckGoWebSearchResults = [];
    let redisData;

    if (!redisClient.status || redisClient.status !== "ready") {
      console.log("Redis client not connected, attempting to connect...");
      await redisClient.connect();
      console.log("Redis client connected");
    }

    console.log("Checking if data is in Redis");
    console.log("Redis key:", redisKey);
    try {
      const keyExists = await redisClient.exists(redisKey);
      console.log("Key exists:", keyExists);

      if (keyExists) {
        redisData = await redisGetAsync(redisKey);
        console.log('Cache hit, sending from cache:', JSON.parse(redisData));
        return JSON.parse(redisData);
      }
    } catch (error) {
      console.error('Error checking or fetching data from Redis:', error);
    }

    for (let page = 0; page < 4; page++) {
      const duckDuckGoWebSearch = await getJson({
        api_key: API_KEY,
        engine: "duckduckgo",
        q: searchQuery,
        kl: "in-en",
        safe: "-2", // -2 is off and -1 is moderate and 1 is strict
        start: `${page}`,
      }, (json) => {
        duckDuckGoWebSearchResults = duckDuckGoWebSearchResults.concat(
          json.organic_results
        );
      });
    }

    await redisSetAsync(redisKey, JSON.stringify(duckDuckGoWebSearchResults));
    console.log("Cache miss, added to Redis:", duckDuckGoWebSearchResults);

    return duckDuckGoWebSearchResults;
  } catch (err) {
    console.error(err);
  }
}


module.exports = {
  getYandexWebSearch,
  getGoogleWebSearch,
  getDuckDuckGoWebSearch,
};
