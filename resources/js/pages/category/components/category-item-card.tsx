import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Category } from '@/types/category';
import { Link } from '@inertiajs/react';
import CategoryFormSheet from './category-form-sheet';
import CategoryDeleteDialog from './category-delete-dialog';

type Props = {
  category: Category;
};

const CategoryItemCard: FC<Props> = ({ category }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ category.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { category.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('category.show', category.id)}>
            <Folder />
          </Link>
        </Button>
        <CategoryFormSheet purpose="edit" category={ category }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </CategoryFormSheet>
        <CategoryDeleteDialog category={ category }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </CategoryDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default CategoryItemCard;
