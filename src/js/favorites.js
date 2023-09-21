import axios from 'axios';
import spriteUrl from '../images/sprite.svg';

// ========================================    localStorageServsce    =============================== 
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};


// ========================================    APIServsce      ======================================  

 class UnsplashAPI {
  static BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  
  constructor() {
    this.query = 0;
  }
  fetchPhotosByQuery() {
     
          return axios.get(`${UnsplashAPI.BASE_URL}/recipes/${this.query}`);
    };
}


// ========================================   querySelectorelementov ================================

const productsListEl = document.querySelector(".recipes-list");
const divEl = document.querySelector(".favorites-error");
const divButtonEl = document.querySelector(".js-div-button");
const allCategoriesEl = document.querySelector(".js-all-categories");

const unsplashAPI = new UnsplashAPI();
unsplashAPI.query = 0;
let productsTocart = [];

const onIntersectingElIntersectingViewport = async entries => {
   
 try { 

   const { data } = await unsplashAPI.fetchPhotosByQuery();
   
   productsTocart.push(data);
   
  } catch (err) { console.log(err) };
 
}


//  ============================================ appeal to localStorage ===============================

const appendCartItems = () => {

  const productsidentificators = load('BI8886EB');

  if (productsidentificators === undefined) {
  
    divEl.classList.remove('visually-hidden');
    allCategoriesEl.add ('is-hiden')

      return;
  }
  if (productsidentificators.length === 0) {
  
    divEl.classList.remove('visually-hidden');
    
      return;
  }

  for (const iterator of productsidentificators) {
    
    unsplashAPI.query = iterator

    onIntersectingElIntersectingViewport();
  }

};
appendCartItems();


// =================================================  CreateGalleryCards =============================================


function createGalleryCards (arr) {

  const productsToCartTemplate = arr.map(productinfo => {

    let roundedNumber = parseFloat(productinfo.rating.toFixed(1));
    
     const isActive = isRecipeLiked(productinfo._id)

         return  `
          <li class="recipes-list-item" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 4.82%, rgba(5, 5, 5, 0.00) 108.72%), url(${productinfo.thumb}); background-size: cover;
              background-position: center;
              background-repeat: no-repeat">
              <button type="button" class="recipes-list-item-like-btn">
               <svg class="recipes-list-item-like-btn-img" width="22" height="22">
                 <use class="${isActive ? 'active-heart' : 'not-active-heart'}" href="${spriteUrl}#icon-heart" data-resept-id=${productinfo._id}></use>
               </svg>
              </button>
               <h3 class="subtitle">${productinfo.title}</h3>
               <p class="recipes-list-item-text">${productinfo.description}</p>
               <div class="recipes-rating">
               <div class="recipes-rating-body">
                <div class="recipes-rating-value">${roundedNumber}</div>
              <div class="recipes-rating-active"></div>
              <div class="recipes-rating-items">
          
             </div>
             </div>
             </div>
               <button class="recipes-list-see-recipe-btn" type="button" data-resept-id=${productinfo._id}>See recipe</button>
             </div>
          </li>
            
 `
  }).join('');
  
  productsListEl.innerHTML = productsToCartTemplate;

}


// ============================================  Сategory  ===========================================


const choiceСategory = (productsTocart) => {

  const allCourses = productsTocart.flatMap(product => product.category);
  
  const productCategory = allCourses.filter((course, index, array) => array.indexOf(course) === index);
  
  const productCategoryButton = productCategory.map(category => {

    return `
   
    <button class="favorites-btn">${category}</button>

    `
  }).join('');

  divButtonEl.innerHTML = productCategoryButton;

};


// ====================================  processing button clicks ====================================

const selectcategory = event => {
  

  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  const arrCategory = productsTocart.filter(user => user.category === event.target.innerText);

  productsListEl.innerHTML = '';

  createGalleryCards(arrCategory);

  allCategoriesEl.classList.remove('is-hiden');

}


const allCategories = event => {

 if (event.target.nodeName !== "BUTTON") {
    return;
  }

  createGalleryCards(productsTocart);
  
  allCategoriesEl.classList.add('is-hiden');
}

divButtonEl.addEventListener("click", selectcategory);
allCategoriesEl.addEventListener("click", allCategories);


const timerIdcreateGalleryCards = setTimeout(createGalleryCards, 600, productsTocart);
const timerIdchoiceСategory = setTimeout(choiceСategory, 600, productsTocart);



// ===================================================   Work With LocalStoreg  ==============================================

const buttonEl = document.querySelector(".recipes-list");

const deletLocalSnoregId = event => {
 
  if (event.target.nodeName !== 'use') {
    return;
  }
  
  const localStorageData = localStorage.getItem("BI8886EB");

  const buttonIds = localStorageData ? JSON.parse(localStorageData) : [];
  
  
  const buttonId = event.target.dataset.reseptId; 

  const buttonIndex = buttonIds.indexOf(buttonId);
 
  if (buttonIndex === -1) {

    event.target.classList.remove('not-active-heart');

    event.target.classList.add('active-heart');

    buttonIds.push(buttonId);

  } else {
    
    event.target.classList.remove('active-heart');

    event.target.classList.add('not-active-heart');

    buttonIds.splice(buttonIndex, 1);
  }

  save("BI8886EB", buttonIds);

}

buttonEl.addEventListener("click", deletLocalSnoregId);


function isRecipeLiked(recipeId) {

  const storedData = localStorage.getItem('BI8886EB');

  const existingData = storedData ? JSON.parse(storedData) : [];

  return existingData.includes(recipeId);
}