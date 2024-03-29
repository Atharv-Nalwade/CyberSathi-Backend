const logger = require("../utils/logger.js");
const {
  getGoogleImagesSearch,
  getGoogleReverseImageSearch,
  getYandexImagesSearch,
} = require("../services/ImageSearchService.js");

const GoogleImagesSearch = async (req, res) => {
  const { searchQuery, location } = req.body;
  logger.info("GoogleImageSearch controller has being hit with", searchQuery);

  let googleImagesSearchResults = await getGoogleImagesSearch(searchQuery);

  res.status(200).json({ googleImagesSearchResults });
};

const GoogleReverseImageSearch = async (req, res) => {
  const { imageUrl, searchQuery } = req.body;
  logger.info(
    "GoogleReverseImageSearch controller has being hit with",
    searchQuery
  );

  let googleReverseImageSearchResults = [];
  if (searchQuery === "undefined") {
    googleReverseImageSearchResults = await getGoogleReverseImageSearch(
      imageUrl
    );
  } else {
    googleReverseImageSearchResults = await getGoogleReverseImageSearch(
      imageUrl,
      searchQuery
    );
  }

  res.status(200).json({ googleReverseImageSearchResults });
};

const YandexImageSearch = async (req, res) => {
  const { searchQuery, imageUrl } = req.body;
  logger.info("YandexImageSearch controller has being hit with", searchQuery);

  let yandexImageSearchResults = [];
  if (typeof searchQuery === "undefined") {
    yandexImageSearchResults = await getYandexImagesSearch(imageUrl);
  } else {
    yandexImageSearchResults = await getYandexImagesSearch(
      searchQuery,
      imageUrl
    );
  }

  res.status(200).json({ yandexImageSearchResults });
};

module.exports = {
  GoogleImagesSearch,
  GoogleReverseImageSearch,
  YandexImageSearch,
};
