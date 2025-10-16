import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Order } from '@/types/order';
import { FC } from 'react';

type Props = {
  order: Order;
};

const ShowOrder: FC<Props> = ({ order }) => {
  return (
    <AppLayout title="Detail Order" description="Detail order">
      <Card>
        <CardHeader>
          <CardTitle>{ order.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowOrder;
