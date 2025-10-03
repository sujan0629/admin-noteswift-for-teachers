import dbConnect from "@/lib/mongoose";
import Announcement from "@/models/Announcement";
import Teacher from "@/models/Teacher";
import Course from "@/models/Course";
import Batch from "@/models/Batch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAnnouncement } from "@/app/teacher-actions";

async function getData() {
  await dbConnect();
  const announcements = await Announcement.find({}).sort({ createdAt: -1 }).populate('createdBy').lean();
  const courses = await Course.find({}).lean();
  const batches = await Batch.find({}).lean();
  const teachers = await Teacher.find({}).lean();
  return { announcements: JSON.parse(JSON.stringify(announcements)), courses: JSON.parse(JSON.stringify(courses)), batches: JSON.parse(JSON.stringify(batches)), teachers: JSON.parse(JSON.stringify(teachers)) };
}

export default async function AnnouncementsPage() {
  const { announcements, courses, batches, teachers } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Announcements</h1>

      <Card>
        <CardHeader>
          <CardTitle>Send Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAnnouncementForm courses={courses} batches={batches} teachers={teachers} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.map((a:any)=> (
              <div key={a._id} className="border rounded p-3">
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-1">By {a.createdBy?.name || 'Teacher'} • {new Date(a.createdAt).toLocaleString()}</p>
              </div>
            ))}
            {announcements.length === 0 && <p className="text-sm text-muted-foreground">No announcements yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";

function CreateAnnouncementForm({ courses, batches, teachers }: { courses: any[]; batches: any[]; teachers: any[] }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [courseId, setCourseId] = useState<string>("");
  const [batchId, setBatchId] = useState<string>("");
  const [teacherId, setTeacherId] = useState<string>(teachers[0]?._id || "");
  const [isPending, startTransition] = useTransition();

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); startTransition(async ()=>{ await createAnnouncement({ title, message, courseId: courseId || undefined, batchId: batchId || undefined, teacherId }); }); }} className="grid gap-3 md:grid-cols-2">
      <div className="md:col-span-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e)=>setTitle(e.target.value)} required />
      </div>
      <div className="md:col-span-2">
        <Label>Message</Label>
        <Textarea value={message} onChange={(e)=>setMessage(e.target.value)} required />
      </div>
      <div>
        <Label>Course</Label>
        <Select value={courseId} onValueChange={setCourseId}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {courses.map((c)=> <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Batch</Label>
        <Select value={batchId} onValueChange={setBatchId}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {batches.map((b)=> <SelectItem key={b._id} value={b._id}>{b.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Label>Sender</Label>
        <Select value={teacherId} onValueChange={setTeacherId}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {teachers.map((t)=> <SelectItem key={t._id} value={t._id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isPending}>Send</Button>
      </div>
    </form>
  );
}
