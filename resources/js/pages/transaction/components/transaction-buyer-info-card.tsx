import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { FC } from 'react';

type Props = {
  user: User;
};

const TransactionBuyerInfoCard: FC<Props> = ({ user }) => {
  return (
    <Card className="break-inside-avoid">
      <div className="flex items-center">
        <CardHeader className="w-full">
          <CardTitle>Informasi pembeli</CardTitle>
          <CardDescription>informasi kontak pembeli</CardDescription>
        </CardHeader>
        <CardFooter>
          <Avatar className="size-10 rounded-lg">
            <AvatarImage src={user.avatar} />
          </Avatar>
        </CardFooter>
      </div>
      <Separator />
      <CardHeader>
        <CardDescription>{user.email}</CardDescription>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardDescription>Nomor telepon</CardDescription>
        <CardTitle>{user.phone ?? '-'}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TransactionBuyerInfoCard;
