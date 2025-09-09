import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import ThemeToggler from './theme-toggler';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const { auth } = usePage<SharedData>().props;
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 bg-sidebar px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <div className="space-x-2">
          <Button variant={'outline'}>
            <ShoppingCart />
            <Badge>{auth.cartCount}</Badge>
          </Button>

          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
