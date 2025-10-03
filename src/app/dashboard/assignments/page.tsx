import dbConnect from "@/lib/mongoose";
import Assignment, { Submission } from "@/models/Assignment";
import Course from "@/models/Course";
import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAssignment, gradeSubmission, autoGradeSubmission } from "@/app/teacher-actions";

async function getData() {
  await dbConnect();
  const assignments = await Assignment.find({}).sort({ createdAt: -1 }).lean();
  const courses = await Course.find({}).lean();
  const chapters = await Chapter.find({}).lean();
  const submissions = await Submission.find({}).sort({ submittedAt: -1 }).populate('student').lean();
  return { assignments: JSON.parse(JSON.stringify(assignments)), courses: JSON.parse(JSON.stringify(courses)), chapters: JSON.parse(JSON.stringify(chapters)), submissions: JSON.parse(JSON.stringify(submissions)) };
}

export default async function AssignmentsPage() {
  const { assignments, courses, chapters, submissions } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Assignments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAssignmentForm courses={courses} chapters={chapters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignments.map((a: any) => (
              <div key={a._id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.description || ""}</p>
                    {a.deadline && <p className="text-xs text-muted-foreground">Deadline: {new Date(a.deadline).toLocaleString()}</p>}
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {submissions.filter((s:any)=> String(s.assignment)===String(a._id)).map((s:any)=> (
                    <SubmissionRow key={s._id} submission={s} />
                  ))}
                  {submissions.filter((s:any)=> String(s.assignment)===String(a._id)).length===0 && (
                    <p className="text-sm text-muted-foreground">No submissions yet.</p>
                  )}
                </div>
              </div>
            ))}
            {assignments.length === 0 && <p className="text-sm text-muted-foreground">No assignments created.</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plagiarism Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <PlagiarismForm />
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";

function CreateAssignmentForm({ courses, chapters }: { courses: any[]; chapters: any[] }) {
  const [courseId, setCourseId] = useState<string>(courses[0]?._id || "");
  const [chapterId, setChapterId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredChapters = chapters.filter((ch: any)=> String(ch.course) === courseId);

  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); startTransition(async ()=>{ await createAssignment({ courseId, chapterId: chapterId || undefined, title, description, deadline: deadline ? new Date(deadline).toISOString() : undefined }); }); }}
      className="grid gap-3 md:grid-cols-2"
    >
      <div className="space-y-2">
        <Label>Course</Label>
        <Select value={courseId} onValueChange={setCourseId}>
          <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
          <SelectContent>
            {courses.map((c)=> <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Chapter</Label>
        <Select value={chapterId} onValueChange={setChapterId}>
          <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
          <SelectContent>
            {filteredChapters.map((ch:any)=> <SelectItem key={ch._id} value={ch._id}>{ch.title}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e)=>setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Description</Label>
        <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Deadline</Label>
        <Input type="datetime-local" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isPending}>Create</Button>
      </div>
    </form>
  );
}
