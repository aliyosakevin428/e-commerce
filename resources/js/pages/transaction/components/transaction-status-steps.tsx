import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Transaction } from '@/types/transaction';
import { Box, Car, Check, CheckCheck, Image, LogIn, LucideIcon } from 'lucide-react';
import { FC } from 'react';
import TransactionUploadMediaSheet from './transaction-upload-media-sheet';

type Props = {
  transaction: Transaction;
};

type StatusStep = {
  status: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
  done?: boolean;
};

const TransactionStatusStep: FC<Props> = ({ transaction }) => {
  const statusSteps: StatusStep[] = [
    {
      status: 'pending',
      icon: LogIn,
      label: 'Pesanan telah dibuat',
      active: ['pending', 'shipping', 'delivered'].includes(transaction.status),
      done: ['shipping', 'delivered'].includes(transaction.status),
    },
    {
      status: 'upload',
      icon: Image,
      label: 'Upload bukti pembayaran',
      active: transaction.media?.length > 0,
      done: transaction.media?.length > 0,
    },
    {
      status: 'shipping',
      icon: CheckCheck,
      label: 'Pembayaran diverifikasi',
      active: transaction.paid === true,
      done: transaction.paid === true,
    },
    {
      status: 'shipping',
      icon: Car,
      label: 'Pesanan dalam pengiriman',
      active: ['shipping', 'delivered'].includes(transaction.status),
      done: ['delivered'].includes(transaction.status),
    },
    {
      status: 'delivered',
      icon: Box,
      label: 'Pesanan diterima',
      active: transaction.status === 'delivered',
      done: transaction.status === 'delivered',
    },
  ];

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Cek status pengiriman</CardTitle>
        <CardDescription>Log status pengiriman</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col space-y-1">
        {statusSteps.map((step, idx) => {
          const ButtonContent = (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <step.icon className="mr-2 h-4 w-4" />
                {step.label}
              </div>
              {step.done && <Check className="h-4 w-4 text-green-500" />}
            </div>
          );

          if (step.status === 'upload') {
            return (
              <TransactionUploadMediaSheet key={idx} transaction={transaction}>
                <Button
                  size="lg"
                  variant="ghost"
                  className={`w-full justify-start ${step.active ? 'bg-success/10 text-success' : 'text-muted-foreground'}`}
                >
                  {ButtonContent}
                </Button>
              </TransactionUploadMediaSheet>
            );
          }

          return (
            <Button
              key={idx}
              size="lg"
              variant="ghost"
              className={`w-full justify-start ${step.active ? 'bg-success/10 text-success' : 'text-muted-foreground'}`}
            >
              {ButtonContent}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TransactionStatusStep;
