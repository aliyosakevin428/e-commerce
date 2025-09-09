import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Cart } from '@/types/cart';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  cartIds: Cart['id'][];
};

const CartBulkEditSheet: FC<Props> = ({ children, cartIds }) => {
  const { data, put } = useForm({
    cart_ids: cartIds,
  });

  const handleSubmit = () => {
    put(route('cart.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Cart updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah cart</SheetTitle>
          <SheetDescription>Ubah data {data.cart_ids.length} cart</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan cart
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

export default CartBulkEditSheet;
