import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Cart } from '@/types/cart';
import { FC } from 'react';

type Props = {
  cart: Cart;
};

const ShowCart: FC<Props> = ({ cart }) => {
  return (
    <AppLayout title="Detail Cart" description="Detail cart">
      <Card>
        <CardHeader>
          <CardTitle>{ cart.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowCart;
