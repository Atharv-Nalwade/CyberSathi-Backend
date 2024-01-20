const {getGoogleImagesSearch,getGoogleReverseImageSearch,getYandexImagesSearch} = require('../services/ImageSearchService.js');

const GoogleImagesSearch = async (req, res) => {
    const { searchQuery,location } = req.body;
    console.log("The body has",searchQuery)

        let googleImagesSearchResults = await getGoogleImagesSearch(searchQuery);
    
    
    res.status(200).json({ googleImagesSearchResults });
}

const GoogleReverseImageSearch = async (req, res) => {
    const { imageUrl,searchQuery } = req.body;

    let googleReverseImageSearchResults = [];
    if(searchQuery==="undefined"){
        googleReverseImageSearchResults = await getGoogleReverseImageSearch(imageUrl);
    }else{
        googleReverseImageSearchResults = await getGoogleReverseImageSearch(imageUrl,searchQuery);
    }
    
    
    res.status(200).json({ googleReverseImageSearchResults });
}

const YandexImageSearch = async (req, res) => {
    const { searchQuery,imageUrl } = req.body;
    console.log("The body has",searchQuery)

    let yandexImageSearchResults=[];
    if(searchQuery==="undefined"){
        yandexImageSearchResults = await getYandexImagesSearch(imageUrl);
    }else{
     yandexImageSearchResults = await getYandexImagesSearch(searchQuery,imageUrl);

    }
    
    
    res.status(200).json({ yandexImageSearchResults });
}


module.exports = {
    GoogleImagesSearch,
    GoogleReverseImageSearch,
    YandexImageSearch
}