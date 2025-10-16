import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';
import TransactionUploadMediaSheet from './transaction-upload-media-sheet';

type Props = {
  transaction: Transaction;
};

const TransactionStatusBadge: FC<Props> = ({ transaction }) => {
  const { status } = transaction;
  return (
    <>
      {status === 'pending' && (
        <TransactionUploadMediaSheet transaction={transaction}>
          <Badge variant="warning">Menuggu</Badge>
        </TransactionUploadMediaSheet>
      )}
      {status === 'shipping' && <Badge variant="info">Dalam pengiriman</Badge>}
      {status === 'delivered' && <Badge variant="success">Sudah diterima</Badge>}
      {status === 'cancelled' && <Badge variant="destructive">Dibatalkan</Badge>}
    </>
  );
};

export default TransactionStatusBadge;
