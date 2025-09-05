import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Courier } from '@/types/courier';
import { FC } from 'react';

type Props = {
  courier: Courier;
};

const ShowCourier: FC<Props> = ({ courier }) => {
  return (
    <AppLayout title="Detail Courier" description="Detail courier">
      <Card>
        <CardHeader>
          <CardTitle>{ courier.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowCourier;
