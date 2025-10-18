import AppLayout from '@/layouts/app-layout';
import { Transaction } from '@/types/transaction';
import { FC } from 'react';
import TransactionStatusStep from './components/transaction-status-steps';
import TransactionDeliveredAction from './components/transaction-delivered-action';
import TransactionShippingCard from './components/transaction-shipping-card';
import TransactionItemCard from './components/transaction-item-card';
import TransactionBuyerInfoCard from './components/transaction-buyer-info-card';
import TransactionPaymentCard from './components/transaction-payment-card';
import TransactionReviewCard from './components/transaction-review-card';

type Props = {
  transaction: Transaction;
};

const ShowTransaction: FC<Props> = ({ transaction }) => {
  return (
    <AppLayout title="Detail Transaction" description="Detail transaction">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 space-y-6 xl:col-span-2">
          <TransactionStatusStep transaction={transaction} />
          <TransactionDeliveredAction transaction={transaction} />
          <TransactionShippingCard transaction={transaction} />
          <TransactionItemCard items={transaction.items} />
        </div>

        <div className="col-span-1 space-y-6">
          <TransactionBuyerInfoCard user={transaction.user} />
          <TransactionPaymentCard transaction={transaction} />
          <TransactionReviewCard review={transaction.review} purpose={transaction.review ? 'edit' : 'create'} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowTransaction;
