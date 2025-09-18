import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from '@/components/ProductForm';
import ProductTable from '@/components/ProductTable';
import { useProducts } from '@/contexts/ProductContext';

const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('list');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Atualizar produtos filtrados quando a lista de produtos mudar
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Filtrar produtos
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Obter categorias únicas
  const categories = ['all', ...new Set(products.map(product => product.category))];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
    setActiveTab('form');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setActiveTab('form');
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(productId);
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Editar produto existente
      updateProduct(editingProduct.id, productData);
    } else {
      // Adicionar novo produto
      addProduct(productData);
    }
    
    setShowForm(false);
    setEditingProduct(null);
    setActiveTab('list');
  };

  const handleResetProducts = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os produtos para os dados originais? Esta ação não pode ser desfeita.')) {
      resetProducts();
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setActiveTab('list');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administração</h1>
              <p className="text-gray-600 mt-1">Gerencie os produtos da loja</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleResetProducts} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Resetar Produtos
              </Button>
              <Button onClick={handleAddProduct} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Produto
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Produtos</TabsTrigger>
            <TabsTrigger value="form">
              {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Filtros e Busca */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'Todas as categorias' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Badge className="bg-green-100 text-green-800">Em Estoque</Badge>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Em Estoque</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {products.filter(p => p.inStock).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Badge className="bg-red-100 text-red-800">Sem Estoque</Badge>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Sem Estoque</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {products.filter(p => !p.inStock).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Badge className="bg-purple-100 text-purple-800">Categorias</Badge>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Categorias</p>
                      <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de Produtos */}
            <ProductTable
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </TabsContent>

          <TabsContent value="form">
            <ProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={handleCancelForm}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
