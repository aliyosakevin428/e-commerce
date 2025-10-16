import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { em, formatRupiah, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Cart } from '@/types/cart';
import { Courier } from '@/types/courier';
import { router, useForm, usePage } from '@inertiajs/react';
import { LogIn, Minus, Plus, Trash2, X } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import CartBulkDeleteDialog from './components/cart-bulk-delete-dialog';
import CartDeleteDialog from './components/cart-delete-dialog';

type Props = {
  carts: Cart[];
  query: { [key: string]: string };
  couriers: Courier[];
};

const CartList: FC<Props> = ({ carts = [], couriers = [] }) => {
  const [cari, setCari] = useState('');

  const {
    permissions,
    auth: { user },
  } = usePage<SharedData>().props;

  const { data, setData, post } = useForm({
    cart_ids: [] as number[],
    courier_id: '',
    description: '',
  });

  const handleUpdateQty = (cart: Cart, newqty: number) => {
    router.put(
      route('cart.update', cart.id),
      { qty: cart.qty + newqty },
      {
        preserveScroll: true,
      },
    );
  };

  const totalHarga = carts
    .filter((cart) => data.cart_ids.includes(cart.id))
    .reduce((total, cart) => {
      return total + cart.product.price * cart.qty;
    }, 0);

  const handleCheckout = () => {
    post(route('transaction.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Transaction created successfully');
        setData('cart_ids', []);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AppLayout title="Carts" description="Manage your carts">
      <div className="flex gap-2">
        <Input placeholder="Search carts..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {data.cart_ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {data.cart_ids.length} item selected
            </Button>
            <CartBulkDeleteDialog cartIds={data.cart_ids}>
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
                    checked={data.cart_ids.length === carts.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setData(
                          'cart_ids',
                          carts.map((cart) => cart.id),
                        );
                      } else {
                        setData('cart_ids', []);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Produk</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Total</TableHead>
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
                        checked={data.cart_ids.includes(cart.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setData('cart_ids', [...data.cart_ids, cart.id]);
                          } else {
                            setData(
                              'cart_ids',
                              data.cart_ids.filter((id) => id !== cart.id),
                            );
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="my-4 size-20 rounded-lg">
                      <AvatarImage src={cart.product.thumbnail} alt={cart.product.name} className="object-cover" />
                    </Avatar>
                    <div className="flex flex-col">
                      <div>{strLimit(cart.product.name)}</div>
                      <div className="text-sm text-muted-foreground">{cart.product.category.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(cart.product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      onClick={() => handleUpdateQty(cart, -1)}
                      disabled={cart.qty === 1}
                      variant={'outline'}
                      size={'icon'}
                      children={<Minus />}
                    />
                    <Button size={'icon'} disabled variant={'ghost'} children={cart.qty} />
                    <Button
                      onClick={() => handleUpdateQty(cart, 1)}
                      disabled={cart.qty === cart.product.stock}
                      variant={'outline'}
                      size={'icon'}
                      children={<Plus />}
                    />
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(cart.product.price * cart.qty)}</TableCell>
                <TableCell>
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
      <Card>
        <CardHeader>
          <CardTitle>Lanjutkan ke pembelian</CardTitle>
          <CardDescription>Harap pilih item yang ingin dibeli</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardDescription>Total yang harus dibayar :</CardDescription>
            <h1 className="text-2xl font-bold">{formatRupiah(totalHarga)}</h1>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={data.cart_ids.length === 0}>
                  <LogIn />
                  Checkout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Checkout</DialogTitle>
                  <DialogDescription>lanjutkan untuk checkout {data.cart_ids.length} item</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {user.address == null ? (
                    <Alert variant="destructive">
                      <AlertTitle>Alamat belum diisi</AlertTitle>
                      <AlertDescription>Silahkan isi alamat pengiriman. ganti alamat di halaman profile anda</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-1.5">
                      <CardTitle>Alamat pengiriman</CardTitle>
                      <CardDescription className="leading-normal">{user.address}</CardDescription>
                    </div>
                  )}
                  <FormControl label="Pilih Kurir" required>
                    <Select value={data.courier_id} onValueChange={(value) => setData('courier_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kurir" />
                      </SelectTrigger>
                      <SelectContent>
                        {couriers.map((courier) => (
                          <SelectItem key={courier.id} value={courier.id.toString()}>
                            {courier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormControl label="Catatan pengiriman">
                    <Textarea
                      placeholder="Tuliskan catatan pengiriman"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                    />
                  </FormControl>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={'outline'}>
                      <X />
                      Batalin
                    </Button>
                  </DialogClose>
                  <SubmitButton disabled={data.cart_ids.length === 0} onClick={handleCheckout} label="Checkout" icon={LogIn} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default CartList;
