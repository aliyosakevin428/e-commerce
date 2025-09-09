import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Cart } from '@/types/cart';
import { Link } from '@inertiajs/react';
import CartFormSheet from './cart-form-sheet';
import CartDeleteDialog from './cart-delete-dialog';

type Props = {
  cart: Cart;
};

const CartItemCard: FC<Props> = ({ cart }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ cart.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { cart.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('cart.show', cart.id)}>
            <Folder />
          </Link>
        </Button>
        <CartFormSheet purpose="edit" cart={ cart }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </CartFormSheet>
        <CartDeleteDialog cart={ cart }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </CartDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default CartItemCard;
