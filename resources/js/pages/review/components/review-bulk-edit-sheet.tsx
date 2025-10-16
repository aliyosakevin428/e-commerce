import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Review } from '@/types/review';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  reviewIds: Review['id'][];
};

const ReviewBulkEditSheet: FC<Props> = ({ children, reviewIds }) => {
  const { data, put } = useForm({
    review_ids: reviewIds,
  });

  const handleSubmit = () => {
    put(route('review.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Review updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah review</SheetTitle>
          <SheetDescription>Ubah data {data.review_ids.length} review</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan review
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewBulkEditSheet;
