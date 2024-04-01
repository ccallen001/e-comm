import { Product } from "@/types";

import { getAllProducts } from "@/actions";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/PageHeader";

import DropdownMenu from "@/components/DropdownMenu";
import {
  DeleteProductButton,
  ToggleProductActiveButton,
} from "@/components/ProductTableActions";

import { CheckCircle2, Info, MoreVertical, XCircle } from "lucide-react";

import { formatCurrency, formatNumber } from "@/lib/formatters";

const dropdownTrigger = (
  <>
    <MoreVertical />
    <span className="sr-only">Product Actions</span>
  </>
);

const isAvailable = (product: { isAvailableForPurchase: boolean }) =>
  product.isAvailableForPurchase ? (
    <>
      <CheckCircle2 className="text-green-500" size={18} />
      <span className="sr-only">Available for Purchase</span>
    </>
  ) : (
    <>
      <XCircle className="text-red-500" size={18} />
      <span className="sr-only">Not Available for Purchase</span>
    </>
  );

const dropdownMenuItems = (product: Product) => [
  [
    <Button key={0} variant="link" asChild>
      <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
    </Button>,
    <ToggleProductActiveButton
      key={1}
      id={product.id}
      isAvailableForPurchase={product.isAvailableForPurchase}
    />,
    <DeleteProductButton key={2} id={product.id} />,
  ],
];

async function ProductsTable() {
  const products = await getAllProducts();

  return products?.length ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead></TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => {
          return (
            <TableRow key={product.id}>
              <TableCell>{isAvailable(product)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {formatCurrency(product.priceInCents / 100)}
              </TableCell>
              <TableCell>{formatNumber(product._count.orders)}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={18} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{product.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <DropdownMenu
                  trigger={dropdownTrigger}
                  label={product.name}
                  items={dropdownMenuItems(product)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      <TableCaption>A list of products</TableCaption>
    </Table>
  ) : (
    <h2>No products found</h2>
  );
}

function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>

      <ProductsTable />
    </>
  );
}

export default AdminProductsPage;
