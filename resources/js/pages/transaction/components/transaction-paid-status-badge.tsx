import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Transaction } from '@/types/transaction';
import { ImageOff } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  paid: Transaction['paid'];
  media?: Transaction['media'];
};

const TransactionPaidStatusBadge: FC<Props> = ({ children, paid, media = [] }) => {
  return (
    <>
      <Dialog>
        {children ? (
          <DialogTrigger asChild>{children}</DialogTrigger>
        ) : (
          <DialogTrigger>{paid ? <Badge variant="success">Paid</Badge> : <Badge variant="warning">Unpaid</Badge>}</DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bukti Pembayaran</DialogTitle>
            <DialogDescription>Photo bukti pembayaran</DialogDescription>
          </DialogHeader>
          <>
            {(media ?? []).length > 0 ? (
              <Carousel>
                <CarouselContent>
                  {media?.map((m) => (
                    <CarouselItem key={m.id} className="flex items-center justify-center">
                      <img src={m.original_url} alt={m.name} className="h-full max-h-96 object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <Card className="flex w-full items-center justify-center p-12 opacity-50">
                <CardContent>
                  <ImageOff />
                </CardContent>
              </Card>
            )}
          </>
          <DialogFooter>
            <p className="text-sm text-muted-foreground italic">Geser untuk lihat bukti pembayaran lainnya</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionPaidStatusBadge;
