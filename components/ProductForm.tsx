'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createProduct, updateProduct } from '@/actions';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';

import { formatCurrency } from '@/lib/formatters';
import { Product } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  priceInCents: z.coerce.number().int().positive(),
  description: z
    .string()
    .min(2, { message: 'Description must be at least 2 characters.' }),
});

type CurrentProduct = Product | null | undefined;

interface ProductFormProps {
  product?: Product | null;
}

function ProductForm({ product }: ProductFormProps) {
  const isEdit = !!product;
  const [currentProduct, setCurrentProduct] = useState<CurrentProduct>(product);

  const router = useRouter();
  const { toast } = useToast();

  const [priceInCents, setPriceInCents] = useState(
    currentProduct?.priceInCents || 0,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentProduct?.name || '',
      priceInCents,
      description: currentProduct?.description || '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const toastTitleOperation = isEdit ? 'updat' : 'creat';

    try {
      const operation = isEdit ? updateProduct : createProduct;

      const updatedOrCreatedProduct = await operation({
        id: product?.id,
        ...values,
      });

      setCurrentProduct(updatedOrCreatedProduct);

      router.push('admin/products');

      toast({ title: `Product ${toastTitleOperation}ed!`, variant: 'success' });
    } catch (error) {
      console.error(error);
      toast({
        title: `Error ${toastTitleOperation}ing product!`,
        variant: 'error',
      });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceInCents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price In Cents</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price in cents"
                  {...field}
                  onInput={({ target }) =>
                    setPriceInCents(Number((target as HTMLInputElement).value))
                  }
                />
              </FormControl>
              <FormDescription>
                {formatCurrency(Number(priceInCents) / 100)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="block ml-auto" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;
