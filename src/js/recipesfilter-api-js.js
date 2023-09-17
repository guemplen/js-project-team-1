import axios from 'axios';
export class TastyTreatsAPI {
  static BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

  constructor() {
    this.title = '';
    this.category = '';
    this.page = 1;
    this.time = '';
    this.area = '';
    this.ingredient = '';
  }

  filterRecipes() {
    const params = new URLSearchParams({
      title: this.title,
      category: this.category,
      page: this.page,
      limit: 9,
      time: this.time,
      area: this.area,
      ingredient: this.ingredient,
    });

    params.forEach((element, key) => {
      if (element.trim() === '') {
        params.delete(key);
      }
    });
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
}
