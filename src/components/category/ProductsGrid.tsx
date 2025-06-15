
import ProductCard from "./ProductCard";
import NoProducts from "./NoProducts";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
}

interface ProductsGridProps {
  products: Product[];
  isFavorite: (productId: string) => boolean;
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
}

const ProductsGrid = ({ products, isFavorite, onAddToCart, onToggleFavorite }: ProductsGridProps) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
