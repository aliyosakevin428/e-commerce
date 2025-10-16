import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';
import TransactionPaidStatusBadge from './transaction-paid-status-badge';

type Props = {
  transaction: Transaction;
};

const TransactionPaymentCard: FC<Props> = ({ transaction }) => {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
        <CardDescription>Informasi pembayaran</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">{formatRupiah(transaction.total_price)}</h1>
          <TransactionPaidStatusBadge paid={transaction.paid} media={transaction.media} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPaymentCard;
