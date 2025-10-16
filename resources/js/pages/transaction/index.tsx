import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Transaction } from '@/types/transaction';
import { Link, usePage } from '@inertiajs/react';
import { Calendar1, Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TransactionDeleteDialog from './components/transaction-delete-dialog';
import TransactionFilterSheet from './components/transaction-filter-sheet';
import TransactionFormSheet from './components/transaction-form-sheet';
import TransactionBulkEditSheet from './components/transaction-bulk-edit-sheet';
import TransactionBulkDeleteDialog from './components/transaction-bulk-delete-dialog';
import TransactionUploadMediaSheet from './components/transaction-upload-sheet';
import { dateFull, formatRupiah, strLimit } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  transactions: Transaction[];
  query: { [key: string]: string };
};

const TransactionList: FC<Props> = ({ transactions, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Transactions"
      description="Manage your transactions"
      actions={
        <>
          {permissions?.canAdd && (
            <TransactionFormSheet purpose="create">
              <Button>
                <Plus />
                Create new transaction
              </Button>
            </TransactionFormSheet>
          )}
          <Button variant={'destructive'} size={'icon'} asChild>
            <Link href={route('transaction.archived')}>
              <FolderArchive />
            </Link>
          </Button>
        </>
      }
    >
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
                <Link href={route('transaction.show', transaction.id)} className="flex flex-col gap-4 transition-all hover:opacity-75">
                  <Button variant={'ghost'} size={'sm'} className="justify-start" disabled>
                    <Calendar1 />
                    {dateFull(transaction.created_at)}
                  </Button>
                  {transaction?.items?.map((item, index) => (
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
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('transaction.show', transaction.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <TransactionUploadMediaSheet transaction={transaction}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Image />
                        </Button>
                      </TransactionUploadMediaSheet>
                      <TransactionFormSheet purpose="edit" transaction={transaction}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </TransactionFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <TransactionDeleteDialog transaction={transaction}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </TransactionDeleteDialog>
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
