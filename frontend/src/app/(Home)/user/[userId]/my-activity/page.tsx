/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, isToday, isTomorrow } from "date-fns";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { getUpcomingActivities } from "../../../../../lib/api/user/userActivityApi"; // 🔥 your API import

// Emoji icons
const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    meditation: "🧘",
    exercise: "💪",
    therapy: "💬",
    journaling: "📝",
    breathing: "🌬️",
    mindfulness: "🌿",
  };
  return icons[type] || "📋";
};

// Type label
const getActivityTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    meditation: "Meditation",
    exercise: "Exercise",
    therapy: "Therapy",
    journaling: "Journaling",
    breathing: "Breathing",
    mindfulness: "Mindfulness",
  };
  return labels[type] || type;
};

export default function AllActivitiesPage() {
  const router = useRouter();

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [limit] = useState(20); // show first 20 activities

  // 🌟 Fetch from real backend API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);

        const response = await getUpcomingActivities(limit, page);

        if (response?.data?.activities) {
          setActivities(response.data.activities);
        } else {
          setActivities([]);
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [limit, page]);

  // Sorting by nearest upcoming
  const sorted = [...activities].sort(
    (a, b) =>
      new Date(a.scheduledFor).getTime() -
      new Date(b.scheduledFor).getTime()
  );

  // Today / Tomorrow / Date label
  const getDateLabel = (date: string) => {
    const d = new Date(date);
    if (isToday(d)) return "Today";
    if (isTomorrow(d)) return "Tomorrow";
    return format(d, "EEEE, MMM d");
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400">
        Loading your activities...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-2xl font-bold">All Scheduled Activities</h1>
      </div>

      {/* When no activities */}
      {activities.length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No activities scheduled.
          </p>
          <p className="text-sm mt-1">
            Start creating activities to stay on track 🚀
          </p>
        </Card>
      )}

      {/* List */}
      <div className="space-y-6">
        {sorted.map((activity, index) => (
          <motion.div
            key={activity._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {/* Emoji */}
                  <span className="text-3xl">{getActivityIcon(activity.type)}</span>

                  <div className="flex flex-col">
                    <span>{activity.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getDateLabel(activity.scheduledFor)} •{" "}
                      {format(new Date(activity.scheduledFor), "h:mm a")}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Type, Duration, Difficulty */}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200">
                    {getActivityTypeLabel(activity.type)}
                  </Badge>

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {activity.duration} min
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Difficulty {activity.difficulty}/10
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button variant="default" size="sm" className="flex-1">
                    View
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      router.push(`/user/activity/edit/${activity._id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      // Later: add delete flow
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
