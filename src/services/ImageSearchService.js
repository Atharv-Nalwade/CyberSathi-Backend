const { getJson } = require("serpapi");
const logger = require("../utils/logger.js");
const {
  API_KEY,
  GOOGLE_DOMAIN,
  YANDEX_DOMAIN,
} = require("../configs/serpConfig.js");

async function getGoogleImagesSearch(searchQuery) {
  try {
    const googleImagesSearchResults = await getJson({
      api_key: API_KEY,
      engine: "google_images",
      google_domain: GOOGLE_DOMAIN,
      hl: "en",
      gl: "us",
      location: "United States",
      safe: "active",
      nfpr: "1",
      q: searchQuery,
    });

    return googleImagesSearchResults.images_results;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getGoogleReverseImageSearch(imageUrl, searchQuery) {
  try {
    let reverseImageSearchResults = [];

    if (searchQuery === "undefined") {
      reverseImageSearchResults = await getJson({
        engine: "google_reverse_image",
        google_domain: GOOGLE_DOMAIN,
        image_url: imageUrl,
        safe: "off",
        api_key: API_KEY,
      });
    } else {
      reverseImageSearchResults = await getJson({
        engine: "google_reverse_image",
        google_domain: GOOGLE_DOMAIN,
        image_url: imageUrl,
        safe: "off",
        api_key: API_KEY,
        q: searchQuery,
      });
    }

    logger.info("GoogleReverseImageSearch has successfully completed");
    return reverseImageSearchResults.image_results;
  } catch (err) {
    logger.error("GoogleReverseImageSearch has failed with", err);
    throw err;
  }
}

async function getYandexImagesSearch(searchQuery, imageUrl) {
  try {
    let yandexImagesSearchResults = [];
    if (searchQuery === "undefined") {
      yandexImagesSearchResults = await getJson({
        engine: "yandex_images",
        yandex_domain: YANDEX_DOMAIN,
        url: imageUrl,
        api_key: API_KEY,
      });
    } else {
      yandexImagesSearchResults = await getJson({
        engine: "yandex_images",
        text: searchQuery,
        yandex_domain: YANDEX_DOMAIN,
        url: imageUrl,
        api_key: API_KEY,
        q: searchQuery,
      });
    }

    logger.info("YandexImagesSearch has successfully completed");
    return yandexImagesSearchResults.images_results;
  } catch (err) {
    logger.error("YandexImagesSearch has failed with", err);
    throw err;
  }
}

module.exports = {
  getGoogleImagesSearch,
  getGoogleReverseImageSearch,
  getYandexImagesSearch,
};
