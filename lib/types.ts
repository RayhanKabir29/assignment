export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  categories: Category[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: number | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}