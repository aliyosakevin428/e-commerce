import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Courier } from '@/types/courier';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import CourierDeleteDialog from './components/courier-delete-dialog';
import CourierFilterSheet from './components/courier-filter-sheet';
import CourierFormSheet from './components/courier-form-sheet';
import CourierBulkEditSheet from './components/courier-bulk-edit-sheet';
import CourierBulkDeleteDialog from './components/courier-bulk-delete-dialog';
import CourierUploadMediaSheet from './components/courier-upload-sheet';

type Props = {
  couriers: Courier[];
  query: { [key: string]: string };
};

const CourierList: FC<Props> = ({ couriers, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Couriers"
      description="Manage your couriers"
      actions={
        <>
          {permissions?.canAdd && (
            <CourierFormSheet purpose="create">
              <Button>
                <Plus />
                Create new courier
              </Button>
            </CourierFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search couriers..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <CourierFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </CourierFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <CourierBulkEditSheet courierIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </CourierBulkEditSheet>
            <CourierBulkDeleteDialog courierIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </CourierBulkDeleteDialog>
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
                    checked={ids.length === couriers.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(couriers.map((courier) => courier.id));
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
          {couriers
            .filter((courier) => JSON.stringify(courier).toLowerCase().includes(cari.toLowerCase()))
            .map((courier) => (
              <TableRow key={courier.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(courier.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, courier.id]);
                          } else {
                            setIds(ids.filter((id) => id !== courier.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ courier.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('courier.show', courier.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      
                      <CourierFormSheet purpose="edit" courier={courier}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </CourierFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <CourierDeleteDialog courier={courier}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </CourierDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default CourierList;
