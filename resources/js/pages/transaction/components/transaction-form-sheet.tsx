import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Transaction } from '@/types/transaction';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  transaction?: Transaction;
  purpose: FormPurpose;
};

const TransactionFormSheet: FC<Props> = ({ children, transaction, purpose }) => {
  const [open, setOpen] = useState(false);

  const { statusLists = [] } = usePage<{ statusLists: string[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    status: transaction?.status ?? '',
    paid: transaction?.paid ?? false,
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('transaction.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Transaction created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('transaction.update', transaction?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Transaction updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data transaction</SheetTitle>
          <SheetDescription>Form untuk {purpose} data transaction</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Status transaksi">
              <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status pengiriman" />
                </SelectTrigger>
                <SelectContent>
                  {statusLists.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Konfirmasi pembayaran">
              <Label className="flex h-8 items-center gap-2">
                <Checkbox checked={data.paid} onCheckedChange={(c: boolean) => setData('paid', c)} />
                Pesanan ini sudah dibayar
              </Label>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} transaction`} loading={processing} disabled={processing} />
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

export default TransactionFormSheet;
