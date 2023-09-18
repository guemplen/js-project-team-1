import axios from 'axios';

// ========================================    localStorageServsce    =============================== 
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
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

  // const productsidentificators = load('BI8886EB');

  const productsidentificators = ['6462a8f74c3d0ddd28897fd9','6462a8f74c3d0ddd28897fe5','6462a8f74c3d0ddd28897fdd','6462a8f74c3d0ddd28897fca','6462a8f74c3d0ddd28897fc1','6462a8f74c3d0ddd28897fbc','6462a8f74c3d0ddd28897fb9','6462a8f74c3d0ddd28897fdf']

  if (productsidentificators === undefined) {
  
    divEl.classList.remove('visually-hidden')

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

         return  `
          <li class="recipes-list-item" style="background-image: url(${productinfo.thumb}); background-repeat: no-repeat">
  <button type="button" class="recipes-list-item-like-btn">
      <svg class="recipes-list-item-like-btn-img" width="22" height="22">
          <use href="./images/icons.svg#heart"></use>
      </svg>
  </button>
  <h3 class="subtitle">${productinfo.title}</h3>
  <p class="recipes-list-item-text">${productinfo.description}</p>
  <div class="recipes-rating">
    <div class="recipes-rating-body">
        <div class="recipes-rating-value">${roundedNumber}</div>
        <div class="recipes-rating-active"></div>
        <div class="recipes-rating-items">
            <input type="radio" class="recipes-rating-item" value="1" name="rating">
            <input type="radio" class="recipes-rating-item" value="2" name="rating">
            <input type="radio" class="recipes-rating-item" value="3" name="rating">
            <input type="radio" class="recipes-rating-item" value="4" name="rating">
            <input type="radio" class="recipes-rating-item" value="5" name="rating">
        </div>
    </div>
</div>
      <button class="recipes-list-see-recipe-btn" type="button">See recipe</button>
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

  allCategoriesEl.classList.remove('is-hiden')

}


const allCategories = event => {

 if (event.target.nodeName !== "BUTTON") {
    return;
  }

  createGalleryCards(productsTocart)
  
  allCategoriesEl.classList.add('is-hiden');
}

divButtonEl.addEventListener("click", selectcategory);
allCategoriesEl.addEventListener("click", allCategories);


const timerIdcreateGalleryCards = setTimeout(createGalleryCards, 600, productsTocart);
const timerIdchoiceСategory = setTimeout(choiceСategory, 600, productsTocart);

