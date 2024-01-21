// import { getYandexWebSearch } from "../services/WebSearchService.js";

// export const YandexWebSearch = async (req, res) => {
//     const { searchQuery } = req.body;

//     if (searchQuery.length === 0) {
//         res.status(400).json({ message: "Search query is empty" });
//     } else {
//         const yandexWebSearchResults = await getYandexWebSearch(searchQuery);
//         res.status(200).json({ yandexWebSearchResults });
//     }
// };


// yandexWebSearchController.js

const { getYandexWebSearch,getGoogleWebSearch,getDuckDuckGoWebSearch } = require('../services/WebSearchService.js');

const YandexWebSearch = async (req, res) => {
    const { searchQuery } = req.body;
    console.log("Body is",req.body)
    
    console.log(searchQuery,"Coming from the controller");
        const yandexWebSearchResults = await getYandexWebSearch(searchQuery);
        res.status(200).json({ yandexWebSearchResults });
    
};

const GoogleSearch = async (req, res) => {
  const { searchQuery} = req.body;
  console.log("The body has",searchQuery)

  const googleWebSearchResults = await getGoogleWebSearch(searchQuery);
  res.status(200).json({ googleWebSearchResults });
}

const DuckDuckGoSearch = async (req, res) => {
  const { searchQuery } = req.body;
  console.log("The body has",searchQuery)

  const duckDuckGoWebSearchResults = await getDuckDuckGoWebSearch(searchQuery);
  res.status(200).json({ duckDuckGoWebSearchResults });
}

module.exports = {
  YandexWebSearch,
  GoogleSearch,
  DuckDuckGoSearch
};
