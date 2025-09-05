import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types/category';
import { FC } from 'react';

type Props = {
  category: Category;
};

const ShowCategory: FC<Props> = ({ category }) => {
  return (
    <AppLayout title="Detail Category" description="Detail category">
      <Card>
        <CardHeader>
          <CardTitle>{ category.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowCategory;
