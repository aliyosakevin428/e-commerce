import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';

type Props = {
  items: Transaction['items'];
};

const TransactionItemCard: FC<Props> = ({ items = [] }) => {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Item pesanan</CardTitle>
        <CardDescription>Total {items.flatMap((item) => item.quantity).reduce((acc, red) => acc + red)} item</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={item.image} className="object-cover" />
            </Avatar>
            <CardHeader className="pl-0">
              <CardTitle className="leading-normal">{item.name}</CardTitle>
              <CardDescription>
                Price: {formatRupiah(Number(item.price))} - qty: {item.quantity}
              </CardDescription>
            </CardHeader>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionItemCard;
