import axios from 'axios';
export class TastyTreatsAPI {
  static BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  constructor(limit) {
    this.title = '';
    this.category = '';
    this.page = 1;
    this.time = '';
    this.area = '';
    this.ingredient = '';
    this.limit = limit;
  }

  filterRecipes() {
    const params = new URLSearchParams({
      limit: this.limit,
    });

    for (const key of Object.keys(this)) {
      if (this[key] !== '') {
        params.set(key, this[key]);
      }
    }
    return axios.get(`${TastyTreatsAPI.BASE_URL}?${params}`);
  }

  getCountry() {
    return axios.get('https://tasty-treats-backend.p.goit.global/api/areas');
  }

  getIngridients() {
    return axios.get(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
  }

  getAllCategories() {
    return axios.get('https://tasty-treats-backend.p.goit.global/api/recipes?');
  }

  getGalleryItem() {
    const BASE_URL =
      'https://tasty-treats-backend.p.goit.global/api/categories';
    return axios.get(`${BASE_URL}`);
  }
}
