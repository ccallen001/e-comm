import { ReactChildren } from '@/types';
import Nav, { NavLink } from '@/components/Nav';
import { Wrench } from 'lucide-react';

export const dynamic = 'force-dynamic';

function CustomerFacingLayout({ children }: Readonly<ReactChildren>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <NavLink href="/admin">
          <Wrench strokeWidth={1} />
        </NavLink>
      </Nav>
      <div className="container my-6 pt-[56px]">{children}</div>
    </>
  );
}

export default CustomerFacingLayout;
