const express = require("express");
const {
  YandexWebSearch,
  GoogleSearch,
  DuckDuckGoSearch,
} = require("../../controllers/webSearchController");
const {
  GoogleImagesSearch,
  GoogleReverseImageSearch,
  YandexImageSearch,
} = require("../../controllers/ImageSearchControllers");

const router = express.Router();

router.post("/yandexWebSearch", YandexWebSearch);
router.post("/googleWebSearch", GoogleSearch);
router.post("/duckDuckGoWebSearch", DuckDuckGoSearch);

router.post("/googleImagesSearch", GoogleImagesSearch);
router.post("/googleReverseImageSearch", GoogleReverseImageSearch);
router.post("/yandexImageSearch", YandexImageSearch);

module.exports = router;
