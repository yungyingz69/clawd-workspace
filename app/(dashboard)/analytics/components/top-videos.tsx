"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageSquare } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
  publishedAt: string;
}

interface TopVideosProps {
  videos?: Video[];
  isLoading?: boolean;
}

export function TopVideos({ videos, isLoading }: TopVideosProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const topVideos = videos ?? [
    {
      id: "1",
      title: "How to Build a YouTube Channel from Scratch",
      thumbnail: "https://i.ytimg.com/vi/1/default.jpg",
      views: 45000,
      likes: 3200,
      comments: 180,
      engagementRate: 7.5,
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "10 Tips for Better Video Quality",
      thumbnail: "https://i.ytimg.com/vi/2/default.jpg",
      views: 32000,
      likes: 2400,
      comments: 120,
      engagementRate: 7.9,
      publishedAt: "2024-01-10",
    },
    {
      id: "3",
      title: "My YouTube Studio Setup Tour",
      thumbnail: "https://i.ytimg.com/vi/3/default.jpg",
      views: 28000,
      likes: 1800,
      comments: 95,
      engagementRate: 6.8,
      publishedAt: "2024-01-05",
    },
    {
      id: "4",
      title: "How to Edit Videos Like a Pro",
      thumbnail: "https://i.ytimg.com/vi/4/default.jpg",
      views: 22000,
      likes: 1500,
      comments: 80,
      engagementRate: 7.2,
      publishedAt: "2024-01-01",
    },
    {
      id: "5",
      title: "YouTube Algorithm Explained",
      thumbnail: "https://i.ytimg.com/vi/5/default.jpg",
      views: 18000,
      likes: 1200,
      comments: 65,
      engagementRate: 7.0,
      publishedAt: "2023-12-28",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Video</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Likes</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topVideos.map((video, index) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-16 rounded bg-muted flex-shrink-0 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Crect fill='%23e5e7eb' width='16' height='10'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]">
                        {video.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                    <span>{video.likes.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <MessageSquare className="h-3 w-3 text-muted-foreground" />
                    <span>{video.comments.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={video.engagementRate >= 7 ? "default" : "secondary"}
                  >
                    {video.engagementRate.toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
