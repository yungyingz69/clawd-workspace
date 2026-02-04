"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatmapData {
  day: string;
  hour: number;
  engagement: number;
  posts: number;
}

interface BestTimeData {
  heatmap: HeatmapData[];
  bestDays: string[];
  bestHours: string[];
  peakEngagement: number;
}

interface BestTimeHeatmapProps {
  data?: BestTimeData;
  isLoading?: boolean;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = [6, 9, 12, 15, 18, 21]; // 6AM, 9AM, 12PM, 3PM, 6PM, 9PM

export function BestTimeHeatmap({ data, isLoading }: BestTimeHeatmapProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generate mock data if not provided
  const generateHeatmapData = (): HeatmapData[] => {
    const data: HeatmapData[] = [];
    DAYS.forEach((day) => {
      HOURS.forEach((hour) => {
        // Simulate higher engagement on weekends and evenings
        let baseEngagement = Math.random() * 50 + 20;
        if (day === "Sun" || day === "Wed" || day === "Fri") baseEngagement += 30;
        if (hour >= 18 && hour <= 21) baseEngagement += 40;
        data.push({
          day,
          hour,
          engagement: Math.round(baseEngagement),
          posts: Math.floor(Math.random() * 5) + 1,
        });
      });
    });
    return data;
  };

  const heatmapData = data?.heatmap ?? generateHeatmapData();
  const bestDays = data?.bestDays ?? ["Sun", "Wed", "Fri"];
  const bestHours = data?.bestHours ?? ["6-9 PM"];
  const peakEngagement = data?.peakEngagement ?? 95;

  // Get engagement for a specific day/hour
  const getEngagement = (day: string, hour: number) => {
    return heatmapData.find((d) => d.day === day && d.hour === hour)?.engagement ?? 0;
  };

  // Calculate color intensity based on engagement
  const getColorClass = (engagement: number) => {
    const max = Math.max(...heatmapData.map((d) => d.engagement));
    const intensity = engagement / max;
    
    if (intensity >= 0.8) return "bg-green-600 dark:bg-green-500";
    if (intensity >= 0.6) return "bg-green-500/80 dark:bg-green-500/70";
    if (intensity >= 0.4) return "bg-green-400/60 dark:bg-green-400/50";
    if (intensity >= 0.2) return "bg-green-300/40 dark:bg-green-300/30";
    return "bg-green-100/20 dark:bg-green-900/20";
  };

  const getHourLabel = (hour: number) => {
    if (hour === 12) return "12PM";
    if (hour < 12) return `${hour}AM`;
    return `${hour - 12}PM`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Best Time to Post
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded bg-green-100/20 dark:bg-green-900/20" />
            <div className="w-4 h-4 rounded bg-green-300/40 dark:bg-green-300/30" />
            <div className="w-4 h-4 rounded bg-green-400/60 dark:bg-green-400/50" />
            <div className="w-4 h-4 rounded bg-green-500/80 dark:bg-green-500/70" />
            <div className="w-4 h-4 rounded bg-green-600 dark:bg-green-500" />
          </div>
          <span>High</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Heatmap Grid */}
        <TooltipProvider>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Header - Days */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="text-sm font-medium text-muted-foreground text-center">
                  Time
                </div>
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className={`text-sm font-medium text-center py-1 ${
                      bestDays.includes(day)
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {day}
                    {bestDays.includes(day) && (
                      <TrendingUp className="h-3 w-3 inline ml-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Heatmap Rows */}
              <div className="space-y-1">
                {HOURS.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-1">
                    <div className="text-xs text-muted-foreground text-center py-2">
                      {getHourLabel(hour)}
                    </div>
                    {DAYS.map((day) => {
                      const engagement = getEngagement(day, hour);
                      return (
                        <Tooltip key={`${day}-${hour}`}>
                          <TooltipTrigger asChild>
                            <div
                              className={`h-10 rounded-md cursor-pointer transition-all hover:ring-2 hover:ring-green-400 ${getColorClass(
                                engagement
                              )}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-medium">
                                {day} at {getHourLabel(hour)}
                              </p>
                              <p className="text-sm">
                                Engagement Score: {engagement}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Posts: {heatmapData.find((d) => d.day === day && d.hour === hour)?.posts ?? 0}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>

        {/* Summary Badges */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Best Days:
            </span>
            {bestDays.map((day) => (
              <Badge
                key={day}
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                {day}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Best Hours:
            </span>
            {bestHours.map((hour) => (
              <Badge
                key={hour}
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {hour}
              </Badge>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-muted/50 text-sm">
            <span className="font-medium">Peak Engagement:</span>{" "}
            <span className="text-green-600 dark:text-green-400 font-bold">
              {peakEngagement}%
            </span>{" "}
            higher than average during optimal posting times
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
