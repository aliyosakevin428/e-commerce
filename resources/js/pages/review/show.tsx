import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Review } from '@/types/review';
import { FC } from 'react';

type Props = {
  review: Review;
};

const ShowReview: FC<Props> = ({ review }) => {
  return (
    <AppLayout title="Detail Review" description="Detail review">
      <Card>
        <CardHeader>
          <CardTitle>{ review.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowReview;
