// app/ui/dashboard/revenue-chart.tsx (v0.7 ロールバック版)
// 目的: 正しい未完成。最小棒グラフ。小画面ラベル最適化は未対応。
// TODO: 小画面のラベル戦略（回転/省略/間引き）を決めて実装
// TODO: topLabel の丸め/自動の方針をPRで説明
// TODO: 親に aria-label、色の主従（棒を弱め、ラベルを読みやすく）

import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../fonts';
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4 sm:grid-cols-13">
          {/* v0.7: y軸ラベルはそのまま全表示 */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* v0.7: 月ラベルは常に -rotate-90（小画面対策は未実装） */}
          {revenue.map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-400"
                style={{ height: `${(chartHeight / topLabel) * m.revenue}px` }}
              />
              <p className="-rotate-90 text-sm text-gray-400">{m.month}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}