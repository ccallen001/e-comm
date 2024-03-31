import { ReactChildren } from "@/types";
import Nav, { NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

function AdminLayout({ children }: Readonly<ReactChildren>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

export default AdminLayout;
