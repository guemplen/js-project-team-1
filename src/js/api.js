import axios from 'axios';

export class TastyTreatsAPI {
  constructor() {
    this.customAxios = axios.create({
      baseURL: 'https://tasty-treats-backend.p.goit.global/api',
    });
    this.page = 1;
  }

  //   async getAllRecipes(onPage) {
  //     const parameters = {
  //       params: {
  //         page: this.page,
  //         limit: onPage,
  //       },
  //     };

  //     try {
  //       const response = await this.customAxios.get('/recipes', parameters);
  //       console.log('AllRecipes', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async getAllPopularRecipes() {
    try {
      const response = await this.customAxios.get('/recipes/popular');
      console.log('AllPopularRecipes', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //   async getRecipesById(id) {
  //     try {
  //       const response = await this.customAxios.get(`/recipes/${id}`);
  //       console.log('RecipesById', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async addRecipeRating(id, rating) {
  //     try {
  //       const response = await this.customAxios.patch(
  //         `/recipes/${id}/rating`,
  //         rating
  //       );
  //       console.log('RecipeRating', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async getAllAreas() {
  //     try {
  //       const response = await this.customAxios.get('/areas');
  //       console.log('AllAreas', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async getAllCategories() {
  //     try {
  //       const response = await this.customAxios.get('/categories');
  //       console.log('AllCategories', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async getAllEvents() {
  //     try {
  //       const response = await this.customAxios.get('/events');
  //       console.log('AllEvents', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async getAllIngredients() {
  //     try {
  //       const response = await this.customAxios.get('/ingredients');
  //       console.log('AllIngredients', response.data);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async addOrder(orderData) {
    try {
      const response = await this.customAxios.post('', objectOrder);
      console.log('addOrder', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// import { TastyTreatsAPI } from './api';

// const api = new TastyTreatsAPI();

// api.getAllRecipes(30);

// api.getAllPopularRecipes();

// api.getRecipesById('6462a8f74c3d0ddd28897fc1');

// api.getAllAreas();

// api.getAllCategories();

// api.getAllEvents();

// api.getAllIngredients();
