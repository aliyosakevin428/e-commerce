import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import ProductItemCard from '@/pages/product/components/product-item-card'; // pastikan path benar
import { Category } from '@/types/category';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  category: Category;
};

const ShowCategory: FC<Props> = ({ category }) => {
  return (
    <AppLayout title="Detail Category" description="Detail category">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* List Product */}
      {category.products && category.products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {category.products.map((p) => (
            <ProductItemCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Belum ada produk di kategori ini.</p>
      )}
      <div className="mt-4 flex justify-end gap-2">
        <Button className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-700" asChild>
          <Link href={route('category.index')} method="get">
            Kembali
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
};

export default ShowCategory;
