'use client';

import { ReactChildren } from '@/types';
import { ComponentProps } from 'react';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { cn } from '@/lib/utils';

function Nav({ children }: Readonly<ReactChildren>) {
  return (
    <nav className="fixed top-0 w-full flex justify-center items-center px-4 bg-slate-500 text-primary-foreground">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        'p-4 hover:bg-slate-400 hover:text-secondary-foreground focus:bg-slate-400 focus:text-secondary-foreground',
        props.href === pathname && 'bg-slate-400 text-secondary-foreground',
      )}
    />
  );
}

export default Nav;
