import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Courier } from '@/types/courier';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  courierIds: Courier['id'][];
};

const CourierBulkEditSheet: FC<Props> = ({ children, courierIds }) => {
  const { data, put } = useForm({
    courier_ids: courierIds,
  });

  const handleSubmit = () => {
    put(route('courier.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Courier updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah courier</SheetTitle>
          <SheetDescription>Ubah data {data.courier_ids.length} courier</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan courier
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

export default CourierBulkEditSheet;
