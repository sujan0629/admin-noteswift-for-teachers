// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import Course from "@/models/Course";
// import Chapter from "@/models/Chapter";
// import Content from "@/models/Content";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreateChapterForm } from "./create-chapter-form";
import { CreateContentForm } from "./create-content-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, FileArchive, CheckSquare, HelpCircle, BarChart3, Users, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData() {
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  return {
    courses: [
      { 
        _id: '1', 
        title: 'Mathematics Grade 10', 
        subject: 'Mathematics',
        totalChapters: 12,
        completedChapters: 8,
        totalStudents: 45,
        avgProgress: 67,
        lastUpdated: new Date(Date.now() - 86400000).toISOString()
      },
      { 
        _id: '2', 
        title: 'Physics Grade 11', 
        subject: 'Physics',
        totalChapters: 10,
        completedChapters: 6,
        totalStudents: 38,
        avgProgress: 60,
        lastUpdated: new Date(Date.now() - 172800000).toISOString()
      },
      { 
        _id: '3', 
        title: 'Chemistry Grade 12', 
        subject: 'Chemistry',
        totalChapters: 15,
        completedChapters: 10,
        totalStudents: 42,
        avgProgress: 73,
        lastUpdated: new Date(Date.now() - 259200000).toISOString()
      }
    ],
    chapters: [
      { _id: 'ch1', course: '1', title: 'Algebra Basics', order: 1, contentCount: 8, studentsCompleted: 35, duration: '120 min' },
      { _id: 'ch2', course: '1', title: 'Geometry', order: 2, contentCount: 6, studentsCompleted: 28, duration: '90 min' },
      { _id: 'ch3', course: '1', title: 'Trigonometry', order: 3, contentCount: 10, studentsCompleted: 22, duration: '150 min' },
      { _id: 'ch4', course: '2', title: 'Mechanics', order: 1, contentCount: 12, studentsCompleted: 30, duration: '180 min' },
      { _id: 'ch5', course: '2', title: 'Thermodynamics', order: 2, contentCount: 8, studentsCompleted: 25, duration: '120 min' }
    ],
    contents: [
      { _id: 'c1', chapter: 'ch1', type: 'video', title: 'Introduction to Algebra', url: 'https://example.com/video1', views: 42, duration: '25 min' },
      { _id: 'c2', chapter: 'ch1', type: 'pdf', title: 'Algebra Notes', url: 'https://example.com/notes1.pdf', downloads: 38 },
      { _id: 'c3', chapter: 'ch1', type: 'slides', title: 'Algebra Presentation', url: 'https://example.com/slides1', views: 35 },
      { _id: 'c4', chapter: 'ch2', type: 'assignment', title: 'Geometry Assignment', deadline: new Date(Date.now() + 604800000).toISOString(), submissions: 15, total: 45 },
      { _id: 'c5', chapter: 'ch2', type: 'video', title: 'Geometry Fundamentals', url: 'https://example.com/video2', views: 40, duration: '30 min' },
      { _id: 'c6', chapter: 'ch2', type: 'question_bank', title: 'Geometry Practice Questions', questions: 50, attempted: 32 }
    ],
    stats: {
      totalContent: 156,
      videosUploaded: 45,
      pdfDocuments: 62,
      assignmentsCreated: 28,
      questionBanks: 21
    }
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
