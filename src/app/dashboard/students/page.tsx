import dbConnect from "@/lib/mongoose";
import Student from "@/models/Student";
import Course from "@/models/Course";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExportCSVButton } from "@/components/ui/export-csv";
import { ExportPDFButton } from "@/components/ui/export-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { markAttendance } from "@/app/teacher-actions";

async function getData() {
  await dbConnect();
  const students = await Student.find({}).lean();
  const courses = await Course.find({}).lean();
  return { students: JSON.parse(JSON.stringify(students)), courses: JSON.parse(JSON.stringify(courses)) };
}

export default async function StudentsPage() {
  const { students, courses } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Students</h1>

      <Card>
        <CardHeader>
          <CardTitle>Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-2 mb-3">
            <ExportCSVButton filename="students_roster" rows={students} headers={["name","email"]} />
            <ExportPDFButton filename="students_roster" html={`<h1>Students</h1>${students.map((s:any)=>`<div><strong>${s.name}</strong> - ${s.email}</div>`).join("")}`} />
          </div>
          <div className="space-y-3">
            {students.map((s:any)=> (
              <div key={s._id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.email}</p>
                  {Object.keys(s.progress || {}).length>0 && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {Object.entries(s.progress).map(([cid, p]: any) => (
                        <div key={cid}>Course {cid.slice(-4)} • Chapters: {p.chaptersCompleted} • Time: {p.timeSpentMinutes}m • Tests: {p.testsTaken} • Avg: {p.averageScore}</div>
                      ))}
                    </div>
                  )}
                </div>
                <ManualAttendanceForm studentId={s._id} courses={courses} />
              </div>
            ))}
            {students.length === 0 && <p className="text-sm text-muted-foreground">No students found.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState, useTransition } from "react";

function ManualAttendanceForm({ studentId, courses }: { studentId: string; courses: any[] }) {
  const [courseId, setCourseId] = useState<string>(courses[0]?._id || "");
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<string>("present");
  const [note, setNote] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); startTransition(async ()=>{ await markAttendance({ studentId, courseId, date: date ? new Date(date).toISOString() : new Date().toISOString(), status: status as any, note: note || undefined }); }); }} className="flex items-end gap-2">
      <div className="w-40">
        <Label>Course</Label>
        <Select value={courseId} onValueChange={setCourseId}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {courses.map((c)=> <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Date</Label>
        <Input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      </div>
      <div>
        <Label>Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <Label>Note</Label>
        <Input value={note} onChange={(e)=>setNote(e.target.value)} />
      </div>
      <Button type="submit" disabled={isPending}>Mark</Button>
    </form>
  );
}
