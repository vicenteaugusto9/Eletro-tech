import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from 'react';
import { Star, ShoppingCart, Search, User, Heart } from "lucide-react"
import { useParams, Navigate, Link } from 'react-router-dom'; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import allProducts from '@/data/productsData';
import ProductList from '../screen/ProductList';
import Pagination from '../components/Pagination';

const ProductListPage = () => {
  const { pageNumber = '1' } = useParams();
  const currentPage = parseInt(pageNumber, 10);

  const productsPerPage = 25;
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (currentPage < 1 || isNaN(currentPage) || currentPage > totalPages) {
    return <Navigate to="/products/1" />;
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  return (
  <>
    <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ET</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ElectroTech</span>
              </Link>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar produtos..." className="pl-10 pr-4 w-full" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    0
                  </Badge>
                </Button>
              </Link>
              
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
     
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
        Nossos Produtos
      </h1>
      <p className='text-center text-gray-600 mb-8'>Página {currentPage} de {totalPages}</p>
      
      <Pagination totalPages={totalPages} />
      <ProductList products={currentProducts} />
      <Pagination totalPages={totalPages} />

     
    </div>
         <footer className="bg-white border-t py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">ET</span>
                        </div>
                        <span className="text-xl font-bold">ElectroTech</span>
                      </div>
                      <p className="text-gray-600">Sua loja de eletrônicos online com os melhores produtos e preços.</p>
                    </div>
        
                  
        
                    <div>
                      <h3 className="font-semibold mb-4">Atendimento</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li><Link to="#" className="hover:text-blue-600">Central de Ajuda</Link></li>
                        <li><Link to="#" className="hover:text-blue-600">Trocas e Devoluções</Link></li>
                        <li><Link to="#" className="hover:text-blue-600">Garantia</Link></li>
                        <li><Link to="#" className="hover:text-blue-600">Contato</Link></li>
                      </ul>
                    </div>
        
                    <div>
                      <h3 className="font-semibold mb-4">Empresa</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li><Link to="#" className="hover:text-blue-600">Sobre Nós</Link></li>
                        <li><Link to="#" className="hover:text-blue-600">Trabalhe Conosco</Link></li>
                        <li><Link to="#" className="hover:text-blue-600">Política de Privacidade</Link></li>
                        <li><Link to="#" className="hover:text-blue-600">Termos de Uso</Link></li>
                      </ul>
                    </div>
                  </div>
        
                  <div className="border-t mt-8 pt-8 text-center text-gray-600">
                    <p>&copy; 2025 ElectroTech. Todos os direitos reservados.</p>
                  </div>
                </div>
              </footer>
    
  </>
  );
};

export default ProductListPage;