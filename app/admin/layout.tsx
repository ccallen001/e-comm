import { ReactChildren } from '@/types';
import Nav, { NavLink } from '@/components/Nav';
import { Home } from 'lucide-react';

export const dynamic = 'force-dynamic';

function AdminLayout({ children }: Readonly<ReactChildren>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
        <NavLink href="/">
          <Home strokeWidth={1} />
        </NavLink>
      </Nav>
      <div className="container my-6 pt-[56px]">{children}</div>
    </>
  );
}

export default AdminLayout;
