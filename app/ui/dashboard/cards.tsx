// app/ui/dashboard/cards.tsx (v0.7 ロールバック版)
// 目的: 正しい未完成。アイコンは非表示/プレースホルダ、数値は生表示。
// TODO: アイコン表示を設計（サイズ/濃度で“値が主役”に）
// TODO: Intl.NumberFormat 等で桁区切り/通貨を導入
// TODO: tone/size など簡易バリアントを追加

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex items-center p-4">
        {/* v0.7: アイコンは非表示のプレースホルダ */}
        <div className="h-5 w-5 opacity-0" aria-hidden="true" />
        <h3 className="ml-2 text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}