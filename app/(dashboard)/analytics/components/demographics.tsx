"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";

interface DemographicsData {
  ageDistribution: {
    ageGroup: string;
    percentage: number;
    count: number;
  }[];
  genderDistribution: {
    gender: string;
    percentage: number;
    count: number;
  }[];
  topCountries: {
    country: string;
    flag: string;
    views: number;
    percentage: number;
  }[];
  topCities: {
    city: string;
    country: string;
    views: number;
    percentage: number;
  }[];
  totalAudience: number;
}

interface DemographicsProps {
  data?: DemographicsData;
  isLoading?: boolean;
}

const AGE_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#22c55e"];
const GENDER_COLORS = ["#3b82f6", "#ec4899", "#9ca3af"];

export function Demographics({ data, isLoading }: DemographicsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const demographicsData: DemographicsData = data ?? {
    ageDistribution: [
      { ageGroup: "13-17", percentage: 8.5, count: 850 },
      { ageGroup: "18-24", percentage: 35.2, count: 3520 },
      { ageGroup: "25-34", percentage: 32.1, count: 3210 },
      { ageGroup: "35-44", percentage: 15.8, count: 1580 },
      { ageGroup: "45+", percentage: 8.4, count: 840 },
    ],
    genderDistribution: [
      { gender: "Male", percentage: 62.5, count: 6250 },
      { gender: "Female", percentage: 34.2, count: 3420 },
      { gender: "Other/Unknown", percentage: 3.3, count: 330 },
    ],
    topCountries: [
      { country: "United States", flag: "🇺🇸", views: 28500, percentage: 45.2 },
      { country: "United Kingdom", flag: "🇬🇧", views: 8200, percentage: 13.0 },
      { country: "Canada", flag: "🇨🇦", views: 6300, percentage: 10.0 },
      { country: "India", flag: "🇮🇳", views: 5400, percentage: 8.6 },
      { country: "Germany", flag: "🇩🇪", views: 3800, percentage: 6.0 },
    ],
    topCities: [
      { city: "New York", country: "US", views: 5200, percentage: 8.2 },
      { city: "Los Angeles", country: "US", views: 4100, percentage: 6.5 },
      { city: "London", country: "UK", views: 3200, percentage: 5.1 },
      { city: "Toronto", country: "CA", views: 2100, percentage: 3.3 },
      { city: "Chicago", country: "US", views: 1800, percentage: 2.9 },
    ],
    totalAudience: 10000,
  };

  const ageData = demographicsData.ageDistribution;
  const genderData = demographicsData.genderDistribution;
  const totalAudience = demographicsData.totalAudience;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Left Column - Age & Gender */}
      <div className="space-y-4">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="ageGroup"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="font-medium">
                            Age {payload[0].payload.ageGroup}
                          </div>
                          <div className="text-sm">
                            {payload[0].payload.percentage}% ({payload[0].payload.count.toLocaleString()})
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="percentage"
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="font-medium">{payload[0].payload.gender}</div>
                            <div className="text-sm">
                              {payload[0].payload.percentage}% ({payload[0].payload.count.toLocaleString()})
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -ml-4">
                <div className="text-2xl font-bold">{totalAudience.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Audience</div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {genderData.map((item, index) => (
                <div key={item.gender} className="flex items-center gap-1">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: GENDER_COLORS[index] }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.gender} {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Countries & Cities */}
      <div className="space-y-4">
        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographicsData.topCountries.map((country) => (
                <div key={country.country} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium">{country.country}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {country.views.toLocaleString()} views
                    </span>
                  </div>
                  <Progress value={country.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demographicsData.topCities.map((city, index) => (
                <div
                  key={city.city}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono w-4">
                      {index + 1}
                    </span>
                    <span className="font-medium">
                      {city.city}, {city.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {city.views.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium w-12 text-right">
                      {city.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
