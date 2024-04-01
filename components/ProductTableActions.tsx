"use client";

import { useTransition } from "react";
import {
  toggleProductAvailability,
  deleteProduct,
} from "@/actions/products.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  id: string;
  isAvailableForPurchase: boolean;
}

export function ToggleProductActiveButton({
  id,
  isAvailableForPurchase,
}: ProductActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={
        isAvailableForPurchase
          ? "w-full hover:bg-red-400 text-red-500 hover:text-red-50"
          : "w-full hover:bg-green-400 text-green-500 hover:text-green-50"
      }
      size="sm"
      variant="ghost"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        })
      }
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </Button>
  );
}

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="w-full hover:bg-red-400 text-red-500 hover:text-red-50"
      size="sm"
      variant="ghost"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        })
      }
    >
      Delete
    </Button>
  );
}
