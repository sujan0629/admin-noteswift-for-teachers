// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import Test from "@/models/Test";
// import Course from "@/models/Course";
// import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ImportExportQuestions } from "./import-export";
import { CreateTestForm } from "./create-test-form";
import { AddQuestionForm } from "./add-question-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, Users, BarChart3, TrendingUp, AlertCircle, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData() {
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  const now = Date.now();
  return {
    tests: [
      { 
        _id: 't1', 
        title: 'Algebra Mid-term Test', 
        course: 'Mathematics Grade 10',
        chapter: 'Algebra Basics',
        description: 'Chapter 1-3 coverage including equations and expressions', 
        scheduledAt: new Date(now + 86400000).toISOString(),
        duration: 60,
        totalMarks: 100,
        totalQuestions: 25,
        status: 'scheduled',
        enrolledStudents: 45,
        type: 'MCQ + Descriptive',
        difficulty: 'medium'
      },
      { 
        _id: 't2', 
        title: 'Physics Quiz 1', 
        course: 'Physics Grade 11',
        chapter: 'Mechanics',
        description: 'Mechanics basics - Laws of motion',
        scheduledAt: new Date(now - 86400000).toISOString(),
        duration: 30,
        totalMarks: 50,
        totalQuestions: 15,
        status: 'completed',
        enrolledStudents: 38,
        submittedCount: 35,
        avgScore: 38.5,
        type: 'MCQ',
        difficulty: 'easy'
      },
      { 
        _id: 't3', 
        title: 'Chemistry Final Exam', 
        course: 'Chemistry Grade 12',
        chapter: 'Organic Chemistry',
        description: 'Comprehensive final examination',
        scheduledAt: new Date(now + 172800000).toISOString(),
        duration: 120,
        totalMarks: 200,
        totalQuestions: 50,
        status: 'scheduled',
        enrolledStudents: 42,
        type: 'Mixed',
        difficulty: 'hard'
      },
      { 
        _id: 't4', 
        title: 'Geometry Practice Test', 
        course: 'Mathematics Grade 10',
        chapter: 'Geometry',
        description: 'Triangles and circles',
        scheduledAt: new Date(now - 172800000).toISOString(),
        duration: 45,
        totalMarks: 75,
        totalQuestions: 20,
        status: 'completed',
        enrolledStudents: 45,
        submittedCount: 42,
        avgScore: 58.2,
        type: 'MCQ + Short Answer',
        difficulty: 'medium'
      }
    ],
    questionBank: [
      { _id: 'q1', subject: 'Mathematics', topic: 'Algebra', difficulty: 'easy', type: 'MCQ', usageCount: 12 },
      { _id: 'q2', subject: 'Mathematics', topic: 'Geometry', difficulty: 'medium', type: 'Descriptive', usageCount: 8 },
      { _id: 'q3', subject: 'Physics', topic: 'Mechanics', difficulty: 'hard', type: 'MCQ', usageCount: 15 },
      { _id: 'q4', subject: 'Physics', topic: 'Thermodynamics', difficulty: 'easy', type: 'Short Answer', usageCount: 6 },
      { _id: 'q5', subject: 'Chemistry', topic: 'Organic Chemistry', difficulty: 'medium', type: 'MCQ', usageCount: 10 },
      { _id: 'q6', subject: 'Chemistry', topic: 'Physical Chemistry', difficulty: 'hard', type: 'Descriptive', usageCount: 7 }
    ],
    stats: {
      totalTests: 28,
      activeTests: 5,
      completedTests: 23,
      totalQuestions: 456,
      avgCompletionRate: 92
    },
    courses: [
      { _id: '1', title: 'Mathematics Grade 10' },
      { _id: '2', title: 'Physics Grade 11' },
      { _id: '3', title: 'Chemistry Grade 12' }
    ],
    chapters: [
      { _id: 'ch1', course: '1', title: 'Algebra Basics' },
      { _id: 'ch2', course: '1', title: 'Geometry' },
      { _id: 'ch3', course: '2', title: 'Mechanics' },
      { _id: 'ch4', course: '2', title: 'Thermodynamics' },
      { _id: 'ch5', course: '3', title: 'Organic Chemistry' },
      { _id: 'ch6', course: '3', title: 'Physical Chemistry' }
    ]
  };
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
