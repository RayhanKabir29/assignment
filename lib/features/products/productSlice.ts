import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

export interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  categories: { id: number; name: string; image: string }[]
  currentProduct: Product | null
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  currentPage: number
  itemsPerPage: number
  totalPages: number
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: '',
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
}
const BASE_URL = 'https://api.escuelajs.co/api/v1';
// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${BASE_URL}/products?offset=0&limit=12`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  }
)

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id: number) => {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    return response.json()
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: { title: string; price: number; description: string; categoryId: number; images: string[] }) => {
    const response = await fetch(`${BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    if (!response.ok) {
      throw new Error('Failed to create product')
    }
    return response.json()
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, ...productData }: { id: number; title: string; price: number; description: string, categoryId: number, images:string[] }) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    if (!response.ok) {
      throw new Error('Failed to update product')
    }
    return response.json()
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete product')
    }
    return id
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      filterProducts(state)
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      state.currentPage = 1
      filterProducts(state)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        filterProducts(state)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      // Fetch single product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
        filterProducts(state)
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
        filterProducts(state)
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload)
        filterProducts(state)
      })
  },
})

function filterProducts(state: ProductState) {
  let filtered = state.products

  // Filter by search query
  if (state.searchQuery) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
  }

  // Filter by category
  if (state.selectedCategory) {
    filtered = filtered.filter(product =>
      product.category.name === state.selectedCategory
    )
  }

  state.filteredProducts = filtered
  state.totalPages = Math.ceil(filtered.length / state.itemsPerPage)
}

export const { setSearchQuery, setSelectedCategory, setCurrentPage, clearCurrentProduct } = productSlice.actions
export default productSlice.reducer