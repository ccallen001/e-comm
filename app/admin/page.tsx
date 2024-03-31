import { getProductData, getSalesData, getUserData } from "@/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatNumber, formatCurrency } from "@/lib/formatters";

interface AdminPageCardProps {
  title: string;
  description: string;
  content: string;
}

function AdminPageCard({ title, description, content }: AdminPageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}

async function AdminPage() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  const { numberOfSales, amount } = salesData;

  const { userCount } = userData;
  const averageValue = userCount ? amount / userCount : 0;

  const { productCount, activeProductCount } = productData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AdminPageCard
        title="Sales"
        description={`${formatNumber(numberOfSales)} Orders`}
        content={`${formatCurrency(amount)} Total`}
      />

      <AdminPageCard
        title="Customers"
        description={`${formatCurrency(averageValue)} Average Value`}
        content={`${formatNumber(userCount)} Total Customers`}
      />

      <AdminPageCard
        title="Active Products"
        description={`${formatNumber(activeProductCount)} Active`}
        content={`${formatNumber(productCount)} Total Products`}
      />
    </div>
  );
}

export default AdminPage;
