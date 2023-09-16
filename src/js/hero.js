import axios from 'axios';
import Swiper from 'swiper';
import "swiper/swiper-bundle.min.css";

const refs = {
    swiperContainer: document.querySelector(".swiper-wrapper"),
};

const url = "https://tasty-treats-backend.p.goit.global/api/events";

async function fetchHeroMasterClass() {
    try {
        const response = await axios.get(url);
        console.log(response);
        const data = response.data;
        
        renderHero(data);

        // Инициализируем Swiper здесь, после получения данных
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 50,
            centeredSlides: true,
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                speed: 3000,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

fetchHeroMasterClass();

function renderHero(data) {
    const markup = data.map(event => {
        return `<div class="swiper-slide"><img src="${event.cook.imgWebpUrl}" class="hero-photo-slider photo-cook" /></div>
             <div class="swiper-slide"><img src="${event.topic.previewWebpUrl}" class="hero-photo-slider photo-dish-small" />
             <h3 class="hero-main-txt-slide">${event.topic.name}</h3>
             <p class="hero-txt-slide">${event.topic.area}</p></div>
             <div class="swiper-slide"><img src="${event.topic.imgWebpUrl}" class="hero-photo-slider photo-dish-big" /></div>
         `;
    }).join(" ");
    
    refs.swiperContainer.innerHTML = markup;
}
