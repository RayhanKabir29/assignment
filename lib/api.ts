const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const api = {
  // Products
  async getProducts(offset = 0, limit = 8) {
    const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: number) {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async createProduct(productData: any) {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async updateProduct(id: number, productData: any) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async deleteProduct(id: number) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  // Categories
  async getCategories() {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Search
  async searchProducts(query: string) {
    const response = await fetch(`${BASE_URL}/products/?title=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    return response.json();
  },

  // Filter by category
  async getProductsByCategory(categoryId: number, offset = 0, limit = 12) {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/products?offset=${offset}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return response.json();
  },
};