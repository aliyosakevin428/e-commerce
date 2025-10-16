import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { dateFull, em } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  transaction: Transaction;
};

const TransactionDeliveredAction: FC<Props> = ({ transaction }) => {
  if (transaction.status !== 'shipping') return null;

  const hanldeDelivered = () => {
    router.put(
      route('transaction.update', transaction.id),
      {
        status: 'delivered',
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Transaction updated successfully');
        },
        onError: (e) => toast.error(em(e)),
      },
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Barang anda sedang dikirim</CardTitle>
        <CardDescription>{dateFull(transaction.updated_at)}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" variant={'success'} onClick={hanldeDelivered}>
          Saya sudah terima barangnya <Check />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionDeliveredAction;
