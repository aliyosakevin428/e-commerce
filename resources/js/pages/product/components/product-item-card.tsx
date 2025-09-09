import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@/types/product';
import { router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  product: Product;
};

const ProductItemCard: FC<Props> = ({ product }) => {
  const handleAddToCart = () => {
    router.post(
      route('cart.store'),
      {
        product_id: product.id,
        quantity: 1,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`${product.name} berhasil dimasukkan ke keranjang!`);
        },
      },
    );
  };

  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      {/* Gambar Produk */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={product.thumbnail || '/images/no-image.png'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Price: {formatRupiah(product.price)}</CardDescription>
      </CardHeader>

      <CardContent>
        <Button onClick={handleAddToCart} className="flex w-full items-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductItemCard;
