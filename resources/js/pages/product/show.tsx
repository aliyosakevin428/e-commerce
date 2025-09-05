import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types/product';
import { FC } from 'react';

type Props = {
  product: Product;
};

const ShowProduct: FC<Props> = ({ product }) => {
  return (
    <AppLayout title="Detail Product" description="Detail product">
      <Card>
        <CardHeader>
          <CardTitle>{ product.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowProduct;
