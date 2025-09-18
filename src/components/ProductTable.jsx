import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Eye, Star } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Categoria</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Preço</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Estoque</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Avaliação</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Eye className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <Badge variant="outline">
                        {formatCategory(product.category)}
                      </Badge>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                        {product.discount && product.discount > 0 && (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.stockQuantity || 0}
                        </p>
                        <p className="text-sm text-gray-500">unidades</p>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">
                          {product.rating || 0}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({product.reviews || 0})
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      {product.inStock ? (
                        <Badge className="bg-green-100 text-green-800">
                          Em Estoque
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          Sem Estoque
                        </Badge>
                      )}
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(product)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(product.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductTable;
