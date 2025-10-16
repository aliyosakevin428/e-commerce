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
import { FC } from 'react';
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

  if (transaction.status !== 'delivered') return null;
  if (permissions?.canAddReview === false) return null;

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('review.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Review created successfully');
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('review.update', review?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Review updated successfully');
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Review</CardTitle>
        <CardDescription>Review kamu tentang barang kami</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Text */}
        <FormControl>
          <Textarea
            placeholder="Tulis review anda..."
            value={data.comment}
            onChange={(e) => setData('comment', e.target.value)}
            className="min-h-32"
          />
        </FormControl>

        {/* Rating */}
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            return (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={data.rating === value}
                  onChange={() => setData('rating', value as number)}
                  className="hidden"
                />
                <Star size={18} className={`${data.rating >= value ? 'fill-warning stroke-warning' : 'text-warning'}`} />
              </label>
            );
          })}
        </div>
        <SubmitButton onClick={handleSubmit} loading={processing} label="Simpan" icon={Send} />
      </CardFooter>
    </Card>
  );
};

export default TransactionReviewCard;
