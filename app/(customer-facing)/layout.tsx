import { ReactChildren } from '@/types';
import Nav, { NavLink } from '@/components/Nav';

export const dynamic = 'force-dynamic';

function CustomerFacingLayout({ children }: Readonly<ReactChildren>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6 pt-[56px]">{children}</div>
    </>
  );
}

export default CustomerFacingLayout;
