"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface GrowthChartProps {
  data?: {
    date: string;
    views: number;
    subscribers: number;
  }[];
  isLoading?: boolean;
}

export function GrowthChart({ data, isLoading }: GrowthChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const chartData = data ?? [
    { date: "Jan 1", views: 1200, subscribers: 150 },
    { date: "Jan 8", views: 1800, subscribers: 180 },
    { date: "Jan 15", views: 1600, subscribers: 200 },
    { date: "Jan 22", views: 2400, subscribers: 230 },
    { date: "Jan 29", views: 2800, subscribers: 260 },
    { date: "Feb 5", views: 3200, subscribers: 290 },
    { date: "Feb 12", views: 3800, subscribers: 320 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="font-medium">{payload[0].payload.date}</div>
                      <div className="text-sm text-blue-500">
                        Views: {payload[0].value?.toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-500">
                        Subscribers: {payload[1].value?.toLocaleString()}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
              name="Views"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="subscribers"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ fill: "#a855f7", r: 4 }}
              activeDot={{ r: 6 }}
              name="Subscribers"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
