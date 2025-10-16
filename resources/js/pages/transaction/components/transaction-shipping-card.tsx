import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SharedData } from '@/types';
import { Transaction } from '@/types/transaction';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  transaction: Transaction;
};

const TransactionShippingCard: FC<Props> = ({ transaction }) => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Pengiriman</CardTitle>
        <CardDescription>Keterangan pengiriman</CardDescription>
      </CardHeader>
      <Separator />
      <CardHeader>
        <CardDescription>Kurir & Nomor resi</CardDescription>
        <CardTitle>{transaction.courier?.name} [67578273654]</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardDescription>Alamat tujuan</CardDescription>
        <CardTitle onClick={() => {}} className="leading-normal">
          {user.address}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TransactionShippingCard;
