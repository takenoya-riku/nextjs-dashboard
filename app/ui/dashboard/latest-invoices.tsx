// app/ui/dashboard/latest-invoices.tsx (v0.7 ロールバック版)
// 目的: 正しい未完成。区切り無しの素朴な縦並び、emailは常に非表示。
// TODO: 区切り方針（divide/border/背景交互）を決め一貫適用
// TODO: sm以上で email 表示、未満は非表示に段階化
// TODO: アバター/行高/テキストの垂直整合を揃える

import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>

      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* v0.7: 区切りや背景交互は未実装 */}
        <div className="px-6">
          {latestInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-row items-center justify-between py-4"
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {invoice.name}
                  </p>
                  {/* v0.7: email は常に非表示 */}
                  <p className="hidden text-sm text-gray-500">
                    {invoice.email}
                  </p>
                </div>
              </div>

              <p
                className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
              >
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}