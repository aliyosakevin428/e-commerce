import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Cart } from '@/types/cart';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import CartBulkDeleteDialog from './components/cart-bulk-delete-dialog';
import CartBulkEditSheet from './components/cart-bulk-edit-sheet';
import CartDeleteDialog from './components/cart-delete-dialog';
import CartFilterSheet from './components/cart-filter-sheet';
import CartFormSheet from './components/cart-form-sheet';
import { formatRupiah } from '@/lib/utils';
import { format } from 'path';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  carts: Cart[];
  query: { [key: string]: string };
};

const CartList: FC<Props> = ({ carts, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Carts"
      description="Manage your carts"
      actions={
        <>
          {permissions?.canAdd && (
            <CartFormSheet purpose="create">
              <Button>
                <Plus />
                Create new cart
              </Button>
            </CartFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search carts..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <CartFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </CartFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <CartBulkEditSheet cartIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </CartBulkEditSheet>
            <CartBulkDeleteDialog cartIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </CartBulkDeleteDialog>
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
                    checked={ids.length === carts.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(carts.map((cart) => cart.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts
            .filter((cart) => JSON.stringify(cart).toLowerCase().includes(cari.toLowerCase()))
            .map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(cart.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, cart.id]);
                          } else {
                            setIds(ids.filter((id) => id !== cart.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{cart.product?.name}</TableCell>
                <TableCell>{formatRupiah(cart.product.price)}</TableCell>
                <TableCell>{cart.quantity}</TableCell>
                <TableCell>{formatRupiah(cart.product.price * cart.quantity)}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('cart.show', cart.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <CartFormSheet purpose="edit" cart={cart}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </CartFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <CartDeleteDialog cart={cart}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </CartDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

    {ids.length > 0 && (
      <Card>
        <CardHeader>
            <CardTitle>CheckOut</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Total Price: {formatRupiah(carts.reduce((total, cart) => total + cart.product.price * cart.quantity, 0))}</CardDescription>
        </CardHeader>
        <CardContent>
            Pilih Kurir
        </CardContent>
        <CardFooter>
            <Button>Checkout</Button>
        </CardFooter>
      </Card>
    )}
    </AppLayout>
  );
};

export default CartList;
