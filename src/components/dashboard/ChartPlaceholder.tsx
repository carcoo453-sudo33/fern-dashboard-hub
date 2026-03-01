import { memo } from "react";
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

const enrollmentData = [
  { month: "Sep", students: 180 },
  { month: "Oct", students: 240 },
  { month: "Nov", students: 310 },
  { month: "Dec", students: 270 },
  { month: "Jan", students: 390 },
  { month: "Feb", students: 420 },
  { month: "Mar", students: 480 },
];

const revenueData = [
  { category: "Web Dev", revenue: 12400 },
  { category: "Data Sci", revenue: 9800 },
  { category: "Mobile", revenue: 7600 },
  { category: "Cloud", revenue: 6200 },
  { category: "Design", revenue: 4800 },
];

const lineConfig: ChartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--primary))",
  },
};

const barConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
};

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
  return (
    <DashboardCard
      title={title}
      description={description}
      action={
        <Button variant="outline" size="sm" className="text-muted-foreground border-border hover:bg-secondary">
          Export
        </Button>
      }
    >
      <ChartContainer config={type === "line" ? lineConfig : barConfig} className="h-48 w-full">
        {type === "line" ? (
          <LineChart data={enrollmentData} accessibilityLayer>
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
          <BarChart data={revenueData} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={50} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ChartContainer>
    </DashboardCard>
  );
});
