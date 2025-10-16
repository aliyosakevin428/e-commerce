import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Transaction } from '@/types/transaction';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TransactionFormSheet from '../transaction/components/transaction-form-sheet';
import TransactionPaidStatusBadge from '../transaction/components/transaction-paid-status-badge';
import OrderBulkDeleteDialog from './components/order-bulk-delete-dialog';
import OrderBulkEditSheet from './components/order-bulk-edit-sheet';
import OrderDeleteDialog from './components/order-delete-dialog';
import OrderFilterSheet from './components/order-filter-sheet';
import OrderFormSheet from './components/order-form-sheet';
import OrderUploadMediaSheet from './components/order-upload-sheet';
import TransactionStatusBadge from '../transaction/components/transaction-status-badge';

type Props = {
  orders: Transaction[];
  query: { [key: string]: string };
};

const OrderList: FC<Props> = ({ orders, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Orders"
      description="Manage your orders"
      actions={
        <>
          {permissions?.canAdd && (
            <OrderFormSheet purpose="create">
              <Button>
                <Plus />
                Create new order
              </Button>
            </OrderFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search orders..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <OrderFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </OrderFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <OrderBulkEditSheet orderIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </OrderBulkEditSheet>
            <OrderBulkDeleteDialog orderIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </OrderBulkDeleteDialog>
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
                    checked={ids.length === orders.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(orders.map((order) => order.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Tanggal pemesanan</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Bukti Bayar</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .filter((order) => JSON.stringify(order).toLowerCase().includes(cari.toLowerCase()))
            .map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(order.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, order.id]);
                          } else {
                            setIds(ids.filter((id) => id !== order.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>
                  {order.media?.length !== 0 && (
                    <OrderUploadMediaSheet order={order}>
                      <Button variant={'outline'}>
                        <Image /> bukti bayar
                      </Button>
                    </OrderUploadMediaSheet>
                  )}
                </TableCell>
                <TableCell>
                  <TransactionPaidStatusBadge media={order.media} paid={order.paid} />
                </TableCell>
                <TableCell>
                  <TransactionStatusBadge transaction={order} />
                </TableCell>
                <TableCell>{formatRupiah(order.total_price)}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('transaction.show', order.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <TransactionFormSheet purpose="edit" transaction={order}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </TransactionFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <OrderDeleteDialog order={order}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </OrderDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default OrderList;
