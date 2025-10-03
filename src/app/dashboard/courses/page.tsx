import dbConnect from "@/lib/mongoose";
import Course from "@/models/Course";
import Chapter from "@/models/Chapter";
import Content from "@/models/Content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createChapter, createContent } from "@/app/teacher-actions";
import { revalidatePath } from "next/cache";

async function getData() {
  await dbConnect();
  const courses = await Course.find({}).lean();
  const chapters = await Chapter.find({}).lean();
  const contents = await Content.find({}).lean();
  return { courses: JSON.parse(JSON.stringify(courses)), chapters: JSON.parse(JSON.stringify(chapters)), contents: JSON.parse(JSON.stringify(contents)) };
}

export default async function CoursesPage() {
  const { courses, chapters, contents } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Courses & Subjects</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Chapter</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateChapterForm courses={courses} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Content to Chapter</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateContentForm chapters={chapters} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course: any) => (
              <div key={course._id} className="border rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.subject}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {chapters.filter((c: any) => String(c.course) === String(course._id)).sort((a: any,b: any)=>a.order-b.order).map((ch: any) => (
                    <div key={ch._id} className="rounded border p-3">
                      <p className="font-medium">{ch.title}</p>
                      <div className="mt-2 grid md:grid-cols-2 gap-2">
                        {contents.filter((cnt: any) => String(cnt.chapter) === String(ch._id)).map((cnt: any) => (
                          <div key={cnt._id} className="flex items-center justify-between border rounded p-2">
                            <div>
                              <p className="text-sm font-semibold capitalize">{cnt.type}: {cnt.title}</p>
                              {cnt.deadline && <p className="text-xs text-muted-foreground">Deadline: {new Date(cnt.deadline).toLocaleString()}</p>}
                            </div>
                            {cnt.url && (
                              <a className="text-blue-600 text-sm" href={cnt.url} target="_blank" rel="noreferrer">Open</a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-sm text-muted-foreground">No courses assigned.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";

function CreateChapterForm({ courses }: { courses: any[] }) {
  const [courseId, setCourseId] = useState<string>(courses[0]?._id || "");
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          await createChapter({ courseId, title, order });
        });
      }}
      className="space-y-3"
    >
      <Label>Course</Label>
      <Select value={courseId} onValueChange={setCourseId}>
        <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
        <SelectContent>
          {courses.map((c) => (
            <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label className="mt-2">Chapter Title</Label>
      <Input value={title} onChange={(e)=>setTitle(e.target.value)} required />

      <Label className="mt-2">Order</Label>
      <Input type="number" value={order} onChange={(e)=>setOrder(parseInt(e.target.value))} />

      <Button type="submit" disabled={isPending}>Create</Button>
    </form>
  );
}

function CreateContentForm({ chapters }: { chapters: any[] }) {
  const [chapterId, setChapterId] = useState<string>(chapters[0]?._id || "");
  const [type, setType] = useState<string>("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          await createContent({ chapterId, type: type as any, title, description, url: url || undefined, deadline: deadline || undefined });
        });
      }}
      className="space-y-3"
    >
      <Label>Chapter</Label>
      <Select value={chapterId} onValueChange={setChapterId}>
        <SelectTrigger><SelectValue placeholder="Select chapter" /></SelectTrigger>
        <SelectContent>
          {chapters.map((c) => (
            <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label className="mt-2">Type</Label>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="slides">Slides</SelectItem>
          <SelectItem value="assignment">Assignment</SelectItem>
          <SelectItem value="question_bank">Question Bank</SelectItem>
        </SelectContent>
      </Select>

      <Label className="mt-2">Title</Label>
      <Input value={title} onChange={(e)=>setTitle(e.target.value)} required />

      <Label className="mt-2">Description</Label>
      <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} />

      <Label className="mt-2">URL</Label>
      <Input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://..." />

      <Label className="mt-2">Deadline (if assignment)</Label>
      <Input type="datetime-local" value={deadline} onChange={(e)=>setDeadline(e.target.value ? new Date(e.target.value).toISOString() : "")} />

      <Button type="submit" disabled={isPending}>Add Content</Button>
    </form>
  );
}
