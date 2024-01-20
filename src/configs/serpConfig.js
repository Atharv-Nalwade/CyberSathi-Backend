// import dotenv from 'dotenv';

// dotenv.config();

// export const API_KEY=process.env.SERP_API_KEY;
// export const YANDEX_ENGINE=process.env.YANDEX_ENGINE;
// export const YANDEX_DOMAIN=process.env.YANDEX_DOMAIN;
// export const GOOGLE_ENGINE=process.env.GOOGLE_ENGINE;
// export const LR=process.env.LR;
// export const LANGUAGE=process.env.LANG;


// serpConfig.js

const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.SERP_API_KEY;
const YANDEX_ENGINE = process.env.YANDEX_ENGINE;
const YANDEX_DOMAIN = process.env.YANDEX_DOMAIN;
const GOOGLE_ENGINE = process.env.GOOGLE_ENGINE;
const LR = process.env.LR;
const LANGUAGE = process.env.LANG;

module.exports = {
  API_KEY,
  YANDEX_ENGINE,
  YANDEX_DOMAIN,
  GOOGLE_ENGINE,
  LR,
  LANGUAGE
};
