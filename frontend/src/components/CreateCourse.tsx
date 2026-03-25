"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { courseApi } from "@/lib/api/doctor/doctorCourseApi";

export default function CreateCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ---- Build FormData (required for image upload) ----
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("duration", duration);
      formData.append("price", price.toString());

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      // ---- Call API using courseApi ----
      const data = await courseApi.formRequest("/doctor/course", formData);

      const courseId = data?.course?._id;
      if (!courseId) throw new Error("Course created but no ID returned.");

      router.push(`/doctor/courses/${courseId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || "Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-10 px-5">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Course</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className="space-y-2">
              <Label>Course Title</Label>
              <Input
                placeholder="e.g. Mindfulness & Meditation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Write a course description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                placeholder="e.g. Meditation, Therapy, Yoga"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            {/* LEVEL */}
            <div className="space-y-2">
              <Label>Level</Label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* DURATION */}
            <div className="space-y-2">
              <Label>Duration (optional)</Label>
              <Input
                placeholder="e.g. 3 hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            {/* PRICE */}
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="0 for free"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            {/* THUMBNAIL */}
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              />
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loading}
              type="submit"
            >
              {loading ? "Creating..." : "Create Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
