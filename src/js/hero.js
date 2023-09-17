import axios from 'axios';


import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick-theme.css';


const refs = {
    swiperContainer: document.querySelector(".js-swiper-container"),
};

const url = "https://tasty-treats-backend.p.goit.global/api/events";

async function fetchHeroMasterClass() {
    try {
        const response = await axios.get(url);
        console.log(response);
        const data = response.data;
        
        renderHero(data);

    } catch (error) {
        console.log(error);
    }
}

fetchHeroMasterClass();

function renderHero(data) {
    const markup = data.map(event => {
        return `
         <div class=slide-wrapper>
<div class="slick-slide hero-cook-ph-div"><img src="${event.cook.imgWebpUrl}" class="photo-cook" width=351 height=456/></div>
<div class="slick-slide hero-small-ph-div">
<img src="${event.topic.previewWebpUrl}"class="photo-dish-small" alt ="" width=351px height=456/>
    <h3 class="hero-main-txt-slide">${event.topic.name}</h3>
    <p class="hero-txt-slide">${event.topic.area}</p>
</div>
<div class="slick-slide"><img src="${event.topic.imgWebpUrl}"class="photo-dish-big" width=351px height=456/></div>
</div>
`;
    }).join(" ");
    
  
 refs.swiperContainer.innerHTML = markup;


    $(".js-swiper-container").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300000,
    dots: true,
    infinite: true,
    draggable: true,
});
};
