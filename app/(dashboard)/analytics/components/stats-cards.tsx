"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsProps {
  data?: {
    totalViews: number;
    totalSubscribers: number;
    totalLikes: number;
    totalComments: number;
    engagementRate: number;
    viewsChange: number;
    subscribersChange: number;
    likesChange: number;
    commentsChange: number;
    engagementChange: number;
  };
  isLoading?: boolean;
}

export function StatsCards({ data, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total Views",
      value: data?.totalViews.toLocaleString() ?? "0",
      change: data?.viewsChange ?? 0,
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Subscribers",
      value: data?.totalSubscribers.toLocaleString() ?? "0",
      change: data?.subscribersChange ?? 0,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Likes",
      value: data?.totalLikes.toLocaleString() ?? "0",
      change: data?.likesChange ?? 0,
      icon: ThumbsUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Comments",
      value: data?.totalComments.toLocaleString() ?? "0",
      change: data?.commentsChange ?? 0,
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Engagement Rate",
      value: `${data?.engagementRate.toFixed(1) ?? "0"}%`,
      change: data?.engagementChange ?? 0,
      icon: TrendingUp,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div
                className={`flex items-center text-xs font-medium ${
                  stat.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change >= 0 ? "+" : ""}
                {stat.change}%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
