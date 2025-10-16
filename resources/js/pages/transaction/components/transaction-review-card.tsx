import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { FormPurpose, SharedData } from '@/types';
import { Review } from '@/types/review';
import { Transaction } from '@/types/transaction';
import { useForm, usePage } from '@inertiajs/react';
import { Send, Star } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  review?: Review;
  purpose: FormPurpose;
};

const TransactionReviewCard: FC<Props> = ({ review, purpose }) => {
  const {
    permissions,
    transaction,
    auth: { user },
  } = usePage<SharedData & { transaction: Transaction }>().props;

  const { data, setData, post, put, processing } = useForm({
    transaction_id: transaction?.id,
    user_id: review?.user_id ?? user.id,
    rating: review?.rating ?? 0,
    comment: review?.comment ?? '',
  });

  const [hover, setHover] = useState(0);

  if (transaction.status !== 'delivered') return null;
  if (permissions?.canAddReview === false) return null;

  const handleSubmit = () => {
    console.log('Submitting review:', data); // debug

    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('review.store'), {
        preserveScroll: true,
        onSuccess: () => toast.success('Review created successfully'),
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('review.update', review?.id), {
        preserveScroll: true,
        onSuccess: () => toast.success('Review updated successfully'),
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Review</CardTitle>
        <CardDescription>Bagikan pengalaman kamu terhadap pesanan ini</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormControl>
          <Textarea
            placeholder="Tulis review anda..."
            value={data.comment}
            onChange={(e) => setData('comment', e.target.value)}
            className="min-h-32"
          />
        </FormControl>
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-between">
        {/* ⭐ Rating Section */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            return (
              <Star
                key={value}
                size={26}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onClick={() => {
                  console.log('Clicked star:', value); // debug
                  setData('rating', value);
                }}
                className={`cursor-pointer transition-all duration-200 ${
                  value <= (hover ? hover : data.rating) ? 'scale-110 fill-yellow-400 stroke-yellow-400' : 'stroke-gray-400 hover:stroke-yellow-400'
                }`}
              />
            );
          })}
          <span className="text-sm text-muted-foreground">{data.rating}/5</span>
        </div>

        <SubmitButton onClick={handleSubmit} loading={processing} label="Simpan" icon={Send} />
      </CardFooter>
    </Card>
  );
};

export default TransactionReviewCard;
