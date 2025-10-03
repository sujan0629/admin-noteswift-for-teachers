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
  const { tests, questionBank, stats, courses, chapters } = await getData();

  const scheduledTests = tests.filter((t: any) => t.status === 'scheduled');
  const completedTests = tests.filter((t: any) => t.status === 'completed');

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'easy': 'bg-green-500',
      'medium': 'bg-yellow-500',
      'hard': 'bg-red-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tests & Assessments</h1>
        <p className="text-muted-foreground mt-2">
          Create, manage, and analyze tests. Build comprehensive question banks, track student performance, and generate automated grading reports.
        </p>
      </div>

      {/* Tests Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-blue-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              {stats.totalTests}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Active Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              {stats.activeTests}
            </div>
            <p className="text-xs text-blue-600/70 mt-1">Currently running</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50/60 border-green-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              {stats.completedTests}
            </div>
            <p className="text-xs text-blue-600/70 mt-1">Graded & analyzed</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500 hover:border-blue-600 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Question Bank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              {stats.totalQuestions}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Reusable questions</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              {stats.avgCompletionRate}%
            </div>
            <p className="text-xs text-blue-600/70 mt-1">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Creation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create New Test
            </CardTitle>
            <CardDescription>
              Set up a new test with custom questions, duration, and grading criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateTestForm courses={courses} chapters={chapters} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Add Questions
            </CardTitle>
            <CardDescription>
              Add MCQ, descriptive, or short answer questions to existing tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddQuestionForm tests={tests} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Import / Export
            </CardTitle>
            <CardDescription>
              Bulk import questions from CSV/Excel or export test papers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImportExportQuestions tests={tests} />
          </CardContent>
        </Card>
      </div>

      {/* Tests Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tests Library & Analytics
          </CardTitle>
          <CardDescription>
            View all tests, manage question bank, analyze performance, and track student progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="scheduled">Scheduled ({scheduledTests.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTests.length})</TabsTrigger>
              <TabsTrigger value="questions">Question Bank ({questionBank.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Scheduled Tests Tab */}
            <TabsContent value="scheduled" className="space-y-4 mt-4">
              {scheduledTests.map((test: any) => (
                <Card key={test._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {test.course} • {test.chapter}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">{test.description}</p>
                      </div>
                      <Badge className={getDifficultyColor(test.difficulty)}>
                        {test.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Scheduled</p>
                        <p className="text-base font-bold">
                          {new Date(test.scheduledAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(test.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="text-base font-bold flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {test.duration} min
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Questions</p>
                        <p className="text-base font-bold">{test.totalQuestions}</p>
                        <p className="text-xs text-muted-foreground">{test.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Marks</p>
                        <p className="text-base font-bold">{test.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Students</p>
                        <p className="text-base font-bold flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {test.enrolledStudents}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm">Edit Test</Button>
                      <Button variant="outline" size="sm">Add Questions</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="outline" size="sm">Send Notification</Button>
                      <Button variant="destructive" size="sm">Cancel Test</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Completed Tests Tab */}
            <TabsContent value="completed" className="space-y-4 mt-4">
              {completedTests.map((test: any) => (
                <Card key={test._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        <CardDescription>
                          {test.course} • Completed on {new Date(test.scheduledAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(test.difficulty)}>
                        {test.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Submissions</p>
                        <p className="text-xl font-bold">
                          {test.submittedCount}/{test.enrolledStudents}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((test.submittedCount / test.enrolledStudents) * 100)}% rate
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-xl font-bold">
                          {test.avgScore}/{test.totalMarks}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((test.avgScore / test.totalMarks) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pass Rate</p>
                        <p className="text-xl font-bold text-green-600">
                          {Math.round(((test.avgScore / test.totalMarks) * 100 > 40 ? 85 : 60))}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Highest</p>
                        <p className="text-xl font-bold flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {Math.round(test.avgScore * 1.25)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lowest</p>
                        <p className="text-xl font-bold flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          {Math.round(test.avgScore * 0.5)}
                        </p>
                      </div>
                    </div>
                    <Progress 
                      value={(test.submittedCount / test.enrolledStudents) * 100} 
                      className="h-2 mb-4" 
                    />
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm">View Results</Button>
                      <Button variant="outline" size="sm">Grade Submissions</Button>
                      <Button variant="outline" size="sm">Analytics</Button>
                      <Button variant="outline" size="sm">Export Report</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Question Bank Tab */}
            <TabsContent value="questions" className="space-y-4 mt-4">
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">MCQ</Button>
                <Button variant="outline" size="sm">Descriptive</Button>
                <Button variant="outline" size="sm">Short Answer</Button>
                <Button variant="outline" size="sm">True/False</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {questionBank.map((q: any) => (
                  <Card key={q._id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="secondary">{q.type}</Badge>
                          <Badge className={`ml-2 ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">•••</Button>
                      </div>
                      <CardTitle className="text-base mt-2">{q.subject}</CardTitle>
                      <CardDescription className="text-xs">{q.topic}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Used in</span>
                          <span className="font-medium">{q.usageCount} tests</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type</span>
                          <span className="font-medium">{q.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Difficulty</span>
                          <span className="font-medium capitalize">{q.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button variant="outline" size="sm" className="flex-1">Use</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance by Test</CardTitle>
                    <CardDescription>Average scores across completed tests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {completedTests.map((test: any) => (
                        <div key={test._id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{test.title.substring(0, 25)}...</span>
                            <span className="text-muted-foreground">
                              {Math.round((test.avgScore / test.totalMarks) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(test.avgScore / test.totalMarks) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Submission Rates</CardTitle>
                    <CardDescription>Student completion rates for tests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {completedTests.map((test: any) => (
                        <div key={test._id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{test.title.substring(0, 25)}...</span>
                            <span className="text-muted-foreground">
                              {test.submittedCount}/{test.enrolledStudents}
                            </span>
                          </div>
                          <Progress 
                            value={(test.submittedCount / test.enrolledStudents) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Question Difficulty Distribution</CardTitle>
                    <CardDescription>Breakdown of question bank by difficulty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Easy Questions</span>
                        <Badge className="bg-green-500">
                          {questionBank.filter((q: any) => q.difficulty === 'easy').length} questions
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Medium Questions</span>
                        <Badge className="bg-yellow-500">
                          {questionBank.filter((q: any) => q.difficulty === 'medium').length} questions
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Hard Questions</span>
                        <Badge className="bg-red-500">
                          {questionBank.filter((q: any) => q.difficulty === 'hard').length} questions
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Question Type Usage</CardTitle>
                    <CardDescription>Most used question formats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">MCQ Questions</span>
                        <div className="flex items-center gap-2">
                          <Progress value={60} className="h-2 w-24" />
                          <span className="font-medium text-sm">
                            {questionBank.filter((q: any) => q.type === 'MCQ').length}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Descriptive</span>
                        <div className="flex items-center gap-2">
                          <Progress value={30} className="h-2 w-24" />
                          <span className="font-medium text-sm">
                            {questionBank.filter((q: any) => q.type === 'Descriptive').length}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Short Answer</span>
                        <div className="flex items-center gap-2">
                          <Progress value={45} className="h-2 w-24" />
                          <span className="font-medium text-sm">
                            {questionBank.filter((q: any) => q.type === 'Short Answer').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
