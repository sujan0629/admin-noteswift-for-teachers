import dbConnect from "@/lib/mongoose";
import Test from "@/models/Test";
import Course from "@/models/Course";
import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ImportExportQuestions } from "./import-export";
import { CreateTestForm } from "./create-test-form";
import { AddQuestionForm } from "./add-question-form";

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
