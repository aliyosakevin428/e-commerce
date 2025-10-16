import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  transactionIds: Transaction['id'][];
};

const TransactionBulkEditSheet: FC<Props> = ({ children, transactionIds }) => {
  const { data, put } = useForm({
    transaction_ids: transactionIds,
  });

  const handleSubmit = () => {
    put(route('transaction.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Transaction updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah transaction</SheetTitle>
          <SheetDescription>Ubah data {data.transaction_ids.length} transaction</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan transaction
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

export default TransactionBulkEditSheet;
