import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Courier } from '@/types/courier';
import { Link } from '@inertiajs/react';
import CourierFormSheet from './courier-form-sheet';
import CourierDeleteDialog from './courier-delete-dialog';

type Props = {
  courier: Courier;
};

const CourierItemCard: FC<Props> = ({ courier }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ courier.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { courier.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('courier.show', courier.id)}>
            <Folder />
          </Link>
        </Button>
        <CourierFormSheet purpose="edit" courier={ courier }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </CourierFormSheet>
        <CourierDeleteDialog courier={ courier }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </CourierDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default CourierItemCard;
