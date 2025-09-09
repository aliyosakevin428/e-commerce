import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import ProductItemCard from '../product/components/product-item-card';
import DateTimeWidget from './widget/date-time-widget';
import UserInfoWidget from './widget/user-info-widget';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  products: Product[];
};

const Dashboard: FC<Props> = ({ products }) => {
  const {
    auth: { roles },
  } = usePage<SharedData>().props;

  return (
    <AppLayout title="Dashboard" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-2 gap-6">
        <UserInfoWidget />
        <DateTimeWidget />
      </div>

      <div className="grid grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductItemCard key={p.id} product={p} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
