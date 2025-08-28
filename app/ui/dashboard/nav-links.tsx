// app/ui/dashboard/nav-links.tsx (v0.7 改訂: focus-visible + aria-current 対応)

'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              // hoverはそのまま、focus-visibleでキーボード操作時にだけ枠を出す
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium transition-colors hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2',
              { 'bg-sky-100 text-blue-600': isActive }
            )}
            // 現在ページをスクリーンリーダーに伝える
            aria-current={isActive ? 'page' : undefined}
          >
            <LinkIcon className="w-6" aria-hidden="true" />
            <span className="hidden md:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}