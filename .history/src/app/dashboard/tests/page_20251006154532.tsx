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
        title: 'Calculus Mid-term Test', 
        course: 'Grade 11 Study Package',
        chapter: 'Calculus - Differentiation',
        description: 'Differentiation and integration basics', 
        scheduledAt: new Date(now + 86400000).toISOString(),
        duration: 60,
        totalMarks: 100,
        totalQuestions: 20,
        status: 'scheduled',
        enrolledStudents: 3,
        type: 'MCQ + Descriptive',
        difficulty: 'medium'
      },
      { 
        _id: 't2', 
        title: 'Algebra Quiz - Quadratic Equations', 
        course: 'Grade 11 Study Package',
        chapter: 'Algebra - Quadratic Equations',
        description: 'Solving quadratic equations and applications',
        scheduledAt: new Date(now - 86400000).toISOString(),
        duration: 30,
        totalMarks: 50,
        totalQuestions: 15,
        status: 'completed',
        enrolledStudents: 3,
        submittedCount: 3,
        avgScore: 44,
        type: 'MCQ',
        difficulty: 'easy'
      },
      { 
        _id: 't3', 
        title: 'Trigonometry Final Exam', 
        course: 'Grade 11 Study Package',
        chapter: 'Trigonometry - Advanced',
        description: 'Comprehensive trigonometry examination',
        scheduledAt: new Date(now + 172800000).toISOString(),
        duration: 90,
        totalMarks: 150,
        totalQuestions: 30,
        status: 'scheduled',
        enrolledStudents: 3,
        type: 'Mixed',
        difficulty: 'hard'
      }
    ],
    questionBank: [
      { _id: 'q1', subject: 'Mathematics', topic: 'Algebra', difficulty: 'easy', type: 'MCQ', usageCount: 5 },
      { _id: 'q2', subject: 'Mathematics', topic: 'Calculus', difficulty: 'medium', type: 'Descriptive', usageCount: 3 },
      { _id: 'q3', subject: 'Mathematics', topic: 'Trigonometry', difficulty: 'hard', type: 'MCQ', usageCount: 4 }
    ],
    stats: {
      totalTests: 3,
      activeTests: 2,
      completedTests: 1,
      totalQuestions: 65,
      avgCompletionRate: 100
    },
    courses: [
      { _id: '1', title: 'Grade 11 Study Package' }
    ],
    chapters: [
      { _id: 'ch1', course: '1', title: 'Algebra - Quadratic Equations' },
      { _id: 'ch2', course: '1', title: 'Calculus - Differentiation' },
      { _id: 'ch3', course: '1', title: 'Trigonometry - Advanced' },
      { _id: 'ch4', course: '1', title: 'Coordinate Geometry' },
      { _id: 'ch5', course: '1', title: 'Statistics and Probability' }
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
        <h1 className="text-2xl sm:text-3xl font-bold">Tests & Assessments</h1>
        <p className="text-muted-foreground mt-2">
          Create, manage, and analyze tests. Build comprehensive question banks, track student performance, and generate automated grading reports.
        </p>
      </div>

      {/* Tests Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-blue-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              {stats.totalTests}
            </div>
            <p className="text-xs mt-1 text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50/60 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6  text-blue-600" />
              {stats.activeTests}
            </div>
            <p className="text-xs mt-1 text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/60 border-blue-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <CheckCircle className="h-6 w-6  text-blue-600" />
              {stats.completedTests}
            </div>
            <p className="text-xs mt-1 text-muted-foreground">Graded & analyzed</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500 hover:border-blue-600 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Question Bank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6  text-blue-600" />
              {stats.totalQuestions}
            </div>
            <p className="text-xs mt-1 text-muted-foreground">Reusable questions</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50/60 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6  text-blue-600" />
              {stats.avgCompletionRate}%
            </div>
            <p className="text-xs mt-1 text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Tests Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tests Management
          </CardTitle>
          <CardDescription>
            Create tests, manage question bank, and analyze student performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-tests" className="w-full">
            <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-max">
              <TabsTrigger value="all-tests">All Tests ({tests.length})</TabsTrigger>
              <TabsTrigger value="create-test">Create New Test</TabsTrigger>
              <TabsTrigger value="add-questions">Add Questions</TabsTrigger>
              <TabsTrigger value="question-bank">Question Bank ({questionBank.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            </div>

            {/* All Tests Tab */}
            <TabsContent value="all-tests" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Scheduled Tests</h3>
                {scheduledTests.length > 0 ? (
                  scheduledTests.map((test: any) => (
                    <Card key={test._id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-base">{test.title}</CardTitle>
                              <Badge className={getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
                              <Badge variant="outline">{test.type}</Badge>
                            </div>
                            <CardDescription className="text-sm">
                              {test.course} - {test.chapter}
                            </CardDescription>
                            <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Schedule</div>
                          <div className="text-sm font-medium">{new Date(test.scheduledAt).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                          <div className="text-sm font-medium">{test.duration} min</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Questions</div>
                          <div className="text-sm font-medium">{test.totalQuestions}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Total Marks</div>
                          <div className="text-sm font-medium">{test.totalMarks}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Students</div>
                          <div className="text-sm font-medium">{test.enrolledStudents}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No scheduled tests</p>
                )}

                <h3 className="text-lg font-semibold mt-6">Completed Tests</h3>
                {completedTests.length > 0 ? (
                  completedTests.map((test: any) => (
                    <Card key={test._id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-base">{test.title}</CardTitle>
                              <Badge className={getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                            <CardDescription className="text-sm">
                              {test.course} - {test.chapter}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Completed On</div>
                          <div className="text-sm font-medium">{new Date(test.scheduledAt).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Submissions</div>
                          <div className="text-sm font-medium">{test.submittedCount}/{test.enrolledStudents}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Avg Score</div>
                          <div className="text-sm font-medium">{test.avgScore?.toFixed(1)}</div>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">View Results</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No completed tests yet</p>
                )}
              </div>
            </TabsContent>

            {/* Create Test Tab */}
            <TabsContent value="create-test" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create New Test
                  </CardTitle>
                  <CardDescription>
                    Set up a new test with custom questions, duration, and grading criteria for your Grade 11 Mathematics students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateTestForm courses={courses} chapters={chapters} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Questions Tab */}
            <TabsContent value="add-questions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Add Questions to Test
                  </CardTitle>
                  <CardDescription>
                    Add MCQ, descriptive, or short answer questions to your existing tests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AddQuestionForm tests={tests} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Question Bank Tab */}
            <TabsContent value="question-bank" className="space-y-4 mt-4">{/* Scheduled Tests Tab */}
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
