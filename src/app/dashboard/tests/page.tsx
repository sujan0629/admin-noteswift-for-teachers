import dbConnect from "@/lib/mongoose";
import Test from "@/models/Test";
import Course from "@/models/Course";
import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTest, addQuestion, suggestQuestions } from "@/app/teacher-actions";

async function getData() {
  await dbConnect();
  const tests = await Test.find({}).sort({ createdAt: -1 }).lean();
  const courses = await Course.find({}).lean();
  const chapters = await Chapter.find({}).lean();
  return { tests: JSON.parse(JSON.stringify(tests)), courses: JSON.parse(JSON.stringify(courses)), chapters: JSON.parse(JSON.stringify(chapters)) };
}

export default async function TestsPage() {
  const { tests, courses, chapters } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Tests</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Test</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateTestForm courses={courses} chapters={chapters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
        </CardHeader>
        <CardContent>
          <AddQuestionForm tests={tests} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import / Export</CardTitle>
        </CardHeader>
        <CardContent>
          <ImportExportQuestions tests={tests} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tests.map((t: any) => (
              <div key={t._id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.description || ""}</p>
                  {t.scheduledAt && <p className="text-xs text-muted-foreground">Scheduled: {new Date(t.scheduledAt).toLocaleString()}</p>}
                </div>
              </div>
            ))}
            {tests.length === 0 && <p className="text-sm text-muted-foreground">No tests created.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";

function CreateTestForm({ courses, chapters }: { courses: any[]; chapters: any[] }) {
  const [courseId, setCourseId] = useState<string>(courses[0]?._id || "");
  const [chapterId, setChapterId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [isPending, startTransition] = useTransition();

  const filteredChapters = chapters.filter((ch: any)=> String(ch.course) === courseId);

  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); startTransition(async ()=>{ await createTest({ courseId, chapterId: chapterId || undefined, title, description, scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : undefined, durationMinutes }); }); }}
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
      <div className="space-y-2">
        <Label>Scheduled At</Label>
        <Input type="datetime-local" value={scheduledAt} onChange={(e)=>setScheduledAt(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Duration (minutes)</Label>
        <Input type="number" value={durationMinutes} onChange={(e)=>setDurationMinutes(parseInt(e.target.value))} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isPending}>Create</Button>
      </div>
    </form>
  );
}

function AddQuestionForm({ tests }: { tests: any[] }) {
  const [testId, setTestId] = useState<string>(tests[0]?._id || "");
  const [type, setType] = useState<string>("mcq");
  const [text, setText] = useState("");
  const [options, setOptions] = useState<{key:string;text:string}[]>([{ key: 'A', text: '' }, { key: 'B', text: '' }, { key: 'C', text: '' }, { key: 'D', text: '' }]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("A");
  const [points, setPoints] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [usesLatex, setUsesLatex] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); startTransition(async ()=>{ await addQuestion({ testId, type: type as any, text, options: type==='mcq'?options:undefined, correctAnswer: type==='mcq'?correctAnswer:undefined, points, difficulty: difficulty as any, usesLatex }); }); }}
      className="grid gap-3 md:grid-cols-2"
    >
      <div className="space-y-2">
        <Label>Test</Label>
        <Select value={testId} onValueChange={setTestId}>
          <SelectTrigger><SelectValue placeholder="Select test" /></SelectTrigger>
          <SelectContent>
            {tests.map((t)=> <SelectItem key={t._id} value={t._id}>{t.title}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="mcq">MCQ</SelectItem>
            <SelectItem value="numerical">Numerical</SelectItem>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Question Text</Label>
        <Textarea value={text} onChange={(e)=>setText(e.target.value)} required />
      </div>
      {type==='mcq' && (
        <div className="md:col-span-2 grid gap-2">
          <Label>Options</Label>
          {options.map((opt,i)=> (
            <div key={opt.key} className="flex gap-2 items-center">
              <span className="w-6">{opt.key}</span>
              <Input value={opt.text} onChange={(e)=>{
                const next=[...options];
                next[i] = { ...opt, text: e.target.value };
                setOptions(next);
              }} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Correct</Label>
              <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {options.map((opt)=> <SelectItem key={opt.key} value={opt.key}>{opt.key}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Points</Label>
              <Input type="number" value={points} onChange={(e)=>setPoints(parseInt(e.target.value))} />
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 md:col-span-2">
        <div>
          <Label>Difficulty</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-2">
          <input id="latex" type="checkbox" checked={usesLatex} onChange={(e)=>setUsesLatex(e.target.checked)} />
          <Label htmlFor="latex">Uses LaTeX</Label>
        </div>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isPending}>Add Question</Button>
      </div>
    </form>
  );
}
