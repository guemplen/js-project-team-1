import axios from 'axios';

const url = "https://tasty-treats-backend.p.goit.global/api/events";

async function fetchHeroMasterClass() {
    try {
        const response = await axios.get(url)
        console.log(response);
        const data = response.data;
        imgCookWebp = data[0].cook.imgWebpUrl;
        imgDish1Webp = data[0].topic.imgWebpUrl;
        imgPreviewDish1Webp = data[0].topic.previewWebpUrl;
        console.log(imgCookWebp);
        console.log(imgDish1Webp);
        console.log(imgPreviewDish1Webp);
    
    } catch (error) {
        console.log(error);
    }
};

fetchHeroMasterClass();
