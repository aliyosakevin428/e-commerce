import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateFull, formatRupiah, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Transaction } from '@/types/transaction';
import { Link, usePage } from '@inertiajs/react';
import { Calendar1, Edit, Filter, Folder, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TransactionBulkDeleteDialog from './components/transaction-bulk-delete-dialog';
import TransactionBulkEditSheet from './components/transaction-bulk-edit-sheet';
import TransactionFilterSheet from './components/transaction-filter-sheet';
import TransactionStatusBadge from './components/transaction-status-badge';

type Props = {
  transactions: Transaction[];
  query: { [key: string]: string };
};

const TransactionList: FC<Props> = ({ transactions, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout title="Transactions" description="Manage your transactions">
      <div className="flex gap-2">
        <Input placeholder="Search transactions..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <TransactionFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </TransactionFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <TransactionBulkEditSheet transactionIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </TransactionBulkEditSheet>
            <TransactionBulkDeleteDialog transactionIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </TransactionBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === transactions.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(transactions.map((transaction) => transaction.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions
            .filter((transaction) => JSON.stringify(transaction).toLowerCase().includes(cari.toLowerCase()))
            .map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(transaction.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, transaction.id]);
                          } else {
                            setIds(ids.filter((id) => id !== transaction.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell className="py-6">
                  <Link href={route('transaction.show', transaction.id)} className="flex flex-col gap-4 transition-all hover:opacity-75">
                    <Button variant={'ghost'} size={'xs'} className="justify-start" disabled>
                      <Calendar1 />
                      {dateFull(transaction.created_at)}
                    </Button>
                    {transaction.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <Avatar className="size-9 rounded-lg">
                          <AvatarImage src={item.image} className="object-cover" />
                        </Avatar>
                        <CardHeader className="pl-0">
                          <CardTitle>{strLimit(item.name)}</CardTitle>
                          <CardDescription>
                            Price: {formatRupiah(Number(item.price))} - qty: {item.quantity}
                          </CardDescription>
                        </CardHeader>
                      </div>
                    ))}
                  </Link>
                </TableCell>
                <TableCell>
                  <TransactionStatusBadge transaction={transaction} />
                </TableCell>
                <TableCell>{formatRupiah(Number(transaction.total_price))}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('transaction.show', transaction.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default TransactionList;
