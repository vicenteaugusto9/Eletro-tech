import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '@/data/productsData';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Carregar produtos iniciais
  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Salvar produtos no localStorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('eletro-tech-products', JSON.stringify(products));
    }
  }, [products]);

  // Carregar produtos do localStorage se existirem
  useEffect(() => {
    const savedProducts = localStorage.getItem('eletro-tech-products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos do localStorage:', error);
        setProducts(productsData);
      }
    }
  }, []);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (productId, productData) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, ...productData }
          : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (searchTerm) => {
    if (!searchTerm) return products;
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.rating >= 4.5).slice(0, 8);
  };

  const getProductsOnSale = () => {
    return products.filter(product => product.discount > 0);
  };

  const resetProducts = () => {
    setProducts(productsData);
    localStorage.removeItem('eletro-tech-products');
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getFeaturedProducts,
    getProductsOnSale,
    resetProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
