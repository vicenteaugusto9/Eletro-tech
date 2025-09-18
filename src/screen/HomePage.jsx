import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Search, User, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";


import productsData from "@/data/productsData" 

export default function HomePage() {

  const featuredProducts = productsData.slice(0, 8); 
  const allCategories = ["Todos", ...new Set(productsData.map(product => product.category))]; 

  return (
    <div className="min-h-screen bg-gray-50">

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

            {/* 👇 CORREÇÃO APLICADA AQUI 👇 */}
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
              
              {/* Link para o login de ADMIN */}
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
              
              {/* Link para o login de CLIENTE (ícone de usuário) */}
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            {/* FIM DA CORREÇÃO */}

          </div>
        </div>
      </header>


      {/* O resto do seu código continua igual... */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Os Melhores Eletrônicos</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Tecnologia de ponta com os melhores preços</p>
            <Link to={"/products/1" } > {/* CORREÇÃO EXTRA: Apontei para a página 1 */}
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Ver Ofertas
            </Button>
            </Link>
          </div>
        </div>
      </section>


      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
         
            {allCategories.map((category) => (
              <Button key={category} variant={category === "Todos" ? "default" : "outline"} className="rounded-full">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Produtos em Destaque</h2>
             <Link to={"/products/1" } > {/* CORREÇÃO EXTRA: Apontei para a página 1 */}
            <Button variant="outline">Ver Todos</Button>
             </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0] || "/placeholder.svg"} // CORREÇÃO EXTRA: Garanti que pega a primeira imagem
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4 flex-1 flex flex-col">
                  <Badge variant="secondary" className="mb-2 w-fit">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg mb-2 line-clamp-2 min-h-[3.5rem] flex items-start">
                    {product.name}
                  </CardTitle>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 mt-auto">
                    <div className="flex w-full gap-2">
                        <Link to={`/product/${product.id}`} className="flex-1">
                            <Button variant="outline" className="w-full bg-transparent">
                            Ver Detalhes
                            </Button>
                        </Link> 
                        <Button className="w-10 h-10">
                            <ShoppingCart className="w-4 h-4" />
                        </Button>
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="text-gray-300 mb-8">Receba ofertas exclusivas e lançamentos em primeira mão</p>
          <div className="flex max-w-md mx-auto">
            <Input placeholder="Seu e-mail" className="rounded-r-none bg-white text-black" />
            <Button className="rounded-l-none">Inscrever-se</Button>
          </div>
        </div>
      </section>


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
              <h3 className="font-semibold mb-4">Categorias</h3>
              <ul className="space-y-2 text-gray-600">
          
                {allCategories.slice(1).map(category => (
                   <li key={category}>
                     <Link to="#" className="hover:text-blue-600">{category}</Link>
                   </li>
                ))}
              </ul>
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
    </div>
  )
}