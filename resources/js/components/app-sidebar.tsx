import { Link, usePage } from '@inertiajs/react';
import {
  BookOpen,
  CreditCard,
  Database,
  Grid2X2,
  KeySquare,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Stars,
  Truck,
  Users,
  Wallet2,
} from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

// Bagian menu utama
const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
  { title: 'Documentation', href: route('documentation'), icon: BookOpen },
  { title: 'Couriers', href: route('courier.index'), icon: Truck },
];

// Bagian produk
const productNavItems: NavItem[] = [
  { title: 'Products', href: route('product.index'), icon: ShoppingBag },
  { title: 'Categories', href: route('category.index'), icon: Grid2X2 },
  { title: 'Carts Items', href: route('cart.index'), icon: ShoppingCart },
  { title: 'Product Reviews', href: route('review.index'), icon: Stars },
];

// Bagian transaksi
const transactionNavItems: NavItem[] = [
  { title: 'New Orders', href: route('order.index'), icon: Wallet2 },
  { title: 'Transactions', href: route('transaction.index'), icon: CreditCard },
];

export function AppSidebar() {
  const { menus } = usePage<{ menus?: Record<string, boolean> }>().props;
  const availableMenus = menus ?? {};

  const settingsItems: NavItem[] = [
    {
      title: 'User Management',
      href: route('user.index'),
      icon: Users,
      available: availableMenus.user,
    },
    {
      title: 'Role & Permission',
      href: route('role.index'),
      icon: KeySquare,
      available: availableMenus.role,
    },
    {
      title: 'Adminer Database',
      href: '/adminer',
      icon: Database,
      available: availableMenus.adminer,
    },
  ].filter((item) => item.available !== false);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route('dashboard')} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain items={mainNavItems} label="Main Menu" />
        <NavMain items={productNavItems} label="Products" />
        <NavMain items={transactionNavItems} label="Transactions" />
        {settingsItems.length > 0 && <NavMain items={settingsItems} label="Settings" />}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavFooter items={[]} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
