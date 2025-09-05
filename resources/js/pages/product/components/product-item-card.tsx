import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';
import ProductFormSheet from './product-form-sheet';
import ProductDeleteDialog from './product-delete-dialog';

type Props = {
  product: Product;
};

const ProductItemCard: FC<Props> = ({ product }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ product.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { product.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('product.show', product.id)}>
            <Folder />
          </Link>
        </Button>
        <ProductFormSheet purpose="edit" product={ product }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ProductFormSheet>
        <ProductDeleteDialog product={ product }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ProductDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ProductItemCard;
