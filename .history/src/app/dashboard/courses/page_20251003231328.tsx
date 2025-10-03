// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import Course from "@/models/Course";
// import Chapter from "@/models/Chapter";
// import Content from "@/models/Content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateChapterForm } from "./create-chapter-form";
import { CreateContentForm } from "./create-content-form";

async function getData() {
  // await dbConnect();
  // const courses = await Course.find({}).lean();
  // const chapters = await Chapter.find({}).lean();
  // const contents = await Content.find({}).lean();
  // return { courses: JSON.parse(JSON.stringify(courses)), chapters: JSON.parse(JSON.stringify(chapters)), contents: JSON.parse(JSON.stringify(contents)) };
  
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  return {
    courses: [
      { _id: '1', title: 'Mathematics Grade 10', subject: 'Mathematics' },
      { _id: '2', title: 'Physics Grade 11', subject: 'Physics' },
      { _id: '3', title: 'Chemistry Grade 12', subject: 'Chemistry' }
    ],
    chapters: [
      { _id: 'ch1', course: '1', title: 'Algebra Basics', order: 1 },
      { _id: 'ch2', course: '1', title: 'Geometry', order: 2 },
      { _id: 'ch3', course: '2', title: 'Mechanics', order: 1 }
    ],
    contents: [
      { _id: 'c1', chapter: 'ch1', type: 'video', title: 'Introduction to Algebra', url: 'https://example.com/video1' },
      { _id: 'c2', chapter: 'ch1', type: 'pdf', title: 'Algebra Notes', url: 'https://example.com/notes1.pdf' },
      { _id: 'c3', chapter: 'ch2', type: 'assignment', title: 'Geometry Assignment', deadline: new Date().toISOString() }
    ]
  };
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
