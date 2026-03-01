import { memo, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

type Period = "7d" | "30d" | "90d";

const enrollmentByPeriod: Record<Period, { month: string; students: number }[]> = {
  "7d": [
    { month: "Mon", students: 52 },
    { month: "Tue", students: 68 },
    { month: "Wed", students: 45 },
    { month: "Thu", students: 73 },
    { month: "Fri", students: 61 },
    { month: "Sat", students: 34 },
    { month: "Sun", students: 48 },
  ],
  "30d": [
    { month: "Sep", students: 180 },
    { month: "Oct", students: 240 },
    { month: "Nov", students: 310 },
    { month: "Dec", students: 270 },
    { month: "Jan", students: 390 },
    { month: "Feb", students: 420 },
    { month: "Mar", students: 480 },
  ],
  "90d": [
    { month: "Q1 '25", students: 720 },
    { month: "Q2 '25", students: 1050 },
    { month: "Q3 '25", students: 1380 },
    { month: "Q4 '25", students: 1620 },
    { month: "Q1 '26", students: 2100 },
  ],
};

const revenueByPeriod: Record<Period, { category: string; revenue: number }[]> = {
  "7d": [
    { category: "Web Dev", revenue: 3200 },
    { category: "Data Sci", revenue: 2400 },
    { category: "Mobile", revenue: 1800 },
    { category: "Cloud", revenue: 1500 },
    { category: "Design", revenue: 1100 },
  ],
  "30d": [
    { category: "Web Dev", revenue: 12400 },
    { category: "Data Sci", revenue: 9800 },
    { category: "Mobile", revenue: 7600 },
    { category: "Cloud", revenue: 6200 },
    { category: "Design", revenue: 4800 },
  ],
  "90d": [
    { category: "Web Dev", revenue: 34200 },
    { category: "Data Sci", revenue: 28500 },
    { category: "Mobile", revenue: 21800 },
    { category: "Cloud", revenue: 18400 },
    { category: "Design", revenue: 13600 },
  ],
};

const lineConfig: ChartConfig = {
  students: { label: "Students", color: "hsl(var(--primary))" },
};

const barConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
};

const periods: { value: Period; label: string }[] = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
];

interface ChartPlaceholderProps {
  title: string;
  description?: string;
  type?: "bar" | "line";
}

export const ChartPlaceholder = memo(function ChartPlaceholder({
  title,
  description,
  type = "bar",
}: ChartPlaceholderProps) {
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <DashboardCard
      title={title}
      description={description}
      action={
        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-0.5">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                period === p.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={period === p.value}
              aria-label={`Show ${p.label} data`}
            >
              {p.label}
            </button>
          ))}
        </div>
      }
    >
      <ChartContainer config={type === "line" ? lineConfig : barConfig} className="h-48 w-full">
        {type === "line" ? (
          <LineChart data={enrollmentByPeriod[period]} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="students"
              stroke="var(--color-students)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--color-students)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        ) : (
          <BarChart data={revenueByPeriod[period]} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={50}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ChartContainer>
    </DashboardCard>
  );
});
