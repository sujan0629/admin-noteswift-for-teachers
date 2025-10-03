import dbConnect from "@/lib/mongoose";
import Assignment, { Submission } from "@/models/Assignment";
import Course from "@/models/Course";
import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreateAssignmentForm, SubmissionRow, PlagiarismForm } from "./assignment-forms";

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
