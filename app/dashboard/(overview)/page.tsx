// app/page.tsx (v0.7 ロールバック版)
// 目的: 完成手前の“正しい未完成”。段差設計とSkeleton整合は未実装。
// TODO: 上段を sm:2 / lg:4 などに設計し直す
// TODO: 下段を md:4 / lg:8 などに復元し、各子の占有比を決める
// TODO: fallback( Skeleton )の高さ/幅を実体と合わせ、CLSを抑える

import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* v0.7: 上段は1列固定 */}
      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      {/* v0.7: 下段も1列固定（占有比は未指定） */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}