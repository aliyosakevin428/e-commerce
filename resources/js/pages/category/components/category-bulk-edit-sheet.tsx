import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Category } from '@/types/category';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  categoryIds: Category['id'][];
};

const CategoryBulkEditSheet: FC<Props> = ({ children, categoryIds }) => {
  const { data, put } = useForm({
    category_ids: categoryIds,
  });

  const handleSubmit = () => {
    put(route('category.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Category updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah category</SheetTitle>
          <SheetDescription>Ubah data {data.category_ids.length} category</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan category
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryBulkEditSheet;
