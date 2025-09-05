import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Category } from '@/types/category';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import CategoryDeleteDialog from './components/category-delete-dialog';
import CategoryFilterSheet from './components/category-filter-sheet';
import CategoryFormSheet from './components/category-form-sheet';
import CategoryBulkEditSheet from './components/category-bulk-edit-sheet';
import CategoryBulkDeleteDialog from './components/category-bulk-delete-dialog';
// import CategoryUploadMediaSheet from './components/category-upload-sheet';

type Props = {
  categories: Category[];
  query: { [key: string]: string };
};

const CategoryList: FC<Props> = ({ categories, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Categorys"
      description="Manage your categories"
      actions={
        <>
          {permissions?.canAdd && (
            <CategoryFormSheet purpose="create">
              <Button>
                <Plus />
                Create new category
              </Button>
            </CategoryFormSheet>
          )}

        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search categories..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <CategoryFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </CategoryFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <CategoryBulkEditSheet categoryIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </CategoryBulkEditSheet>
            <CategoryBulkDeleteDialog categoryIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </CategoryBulkDeleteDialog>
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
                    checked={ids.length === categories.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(categories.map((category) => category.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories
            .filter((category) => JSON.stringify(category).toLowerCase().includes(cari.toLowerCase()))
            .map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, category.id]);
                          } else {
                            setIds(ids.filter((id) => id !== category.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ category.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('category.show', category.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>

                      <CategoryFormSheet purpose="edit" category={category}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </CategoryFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <CategoryDeleteDialog category={category}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </CategoryDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default CategoryList;
