const logger = require("../utils/logger.js");
const {
  getYandexWebSearch,
  getGoogleWebSearch,
  getDuckDuckGoWebSearch,
} = require("../services/WebSearchService.js");

const YandexWebSearch = async (req, res) => {
  const { searchQuery } = req.body;
  logger.info("YandexWebSearch controller has being hit with", searchQuery);

  const yandexWebSearchResults = await getYandexWebSearch(searchQuery);

  res.status(200).json({ yandexWebSearchResults });
};

const GoogleSearch = async (req, res) => {
  const { searchQuery } = req.body;
  logger.info("GoogleSearch controller has being hit with", searchQuery);

  const googleWebSearchResults = await getGoogleWebSearch(searchQuery);

  res.status(200).json({ googleWebSearchResults });
};

const DuckDuckGoSearch = async (req, res) => {
  const { searchQuery } = req.body;
  logger.info("DuckDuckGoSearch controller has being hit with", searchQuery);

  const duckDuckGoWebSearchResults = await getDuckDuckGoWebSearch(searchQuery);
  res.status(200).json({ duckDuckGoWebSearchResults });
};

module.exports = {
  YandexWebSearch,
  GoogleSearch,
  DuckDuckGoSearch,
};
