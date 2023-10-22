import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';

class FavoritesService {
  init() {
    this._checkIsEmpty(); 
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
    this._checkIsEmpty(); 
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async clear() {
    await localforage.removeItem(DB);
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
  }

  async isInCart(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _checkIsEmpty() {
    const products = await this.get();
    const empty = products.length < 1
    if (empty) {
      document.querySelector('.fav')?.classList.add('is_empty')
    } else {
      document.querySelector('.fav')?.classList.remove('is_empty')
    }
  }
}

export const favoritesService = new FavoritesService();
