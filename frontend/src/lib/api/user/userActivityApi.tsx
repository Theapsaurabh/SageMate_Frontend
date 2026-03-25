/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiService } from "../user/userAuthApi"; // ← FIXED CORRECT IMPORT PATH

export interface ActivityEntry {
  type: string;
  name: string;
  description?: string;
  duration?: number;
  difficulty?: number;
  feedback?: string;
  scheduledFor?: Date | string | null;
  status?: "scheduled" | "completed";
}


export async function logActivity(payload: ActivityEntry) {
  return apiService.request("/user/dashboard/activities/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...apiService.getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
}



export async function getUpcomingActivities(limit = 10, page = 1) {
  return apiService.request(
    `/user/dashboard/activities/upcoming?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
        ...apiService.getAuthHeader(),
      },
    }
  );
}


export async function getActivityHistory(
  limit = 10,
  page = 1,
  type?: string,
  days?: number
) {
  const query = new URLSearchParams();

  query.append("limit", limit.toString());
  query.append("page", page.toString());

  if (type) query.append("type", type);
  if (days) query.append("days", days.toString());

  return apiService.request(`/user/dashboard/activities/history?${query.toString()}`, {
    method: "GET",
    headers: {
         "Content-Type": "application/json",
      ...apiService.getAuthHeader(),
    },
  });
}


export async function updateActivityStatus(
  activityId: string,
  status: "completed" | "cancelled" | "scheduled",
  feedback?: string
) {
  return apiService.request(`/user/dashboard/activities/${activityId}`, {
    method: "PUT",
    headers: {
         "Content-Type": "application/json",
      ...apiService.getAuthHeader(),
    },
    body: JSON.stringify({ status, feedback }),
  });
}


export async function getActivityStats(days = 30) {
  return apiService.request(`/user/dashboard/activities/stats?days=${days}`, {
    method: "GET",
    headers: {
         "Content-Type": "application/json",
      ...apiService.getAuthHeader(),
    },
  });
}
