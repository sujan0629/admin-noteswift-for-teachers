// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import Attendance from "@/models/Attendance";
// import Assignment from "@/models/Assignment";
// import Test from "@/models/Test";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, FileText, Calendar, Download, Eye, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData() {
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  return {
    overview: {
      totalStudents: 156,
      totalCourses: 12,
      totalAssignments: 89,
      totalTests: 34,
      attendanceCount: 1248,
      avgAttendance: 91
    },
    attendanceByDay: last7Days.map((d, idx) => ({
      day: d.toLocaleDateString(undefined, { weekday: 'short' }),
      count: 140 + Math.floor(Math.random() * 15),
      percentage: 88 + Math.floor(Math.random() * 10)
    })),
    performanceBySubject: [
      { subject: 'Mathematics', avgScore: 82, tests: 12, students: 45 },
      { subject: 'Physics', avgScore: 78, tests: 10, students: 38 },
      { subject: 'Chemistry', avgScore: 85, tests: 9, students: 42 },
      { subject: 'Biology', avgScore: 80, tests: 8, students: 35 }
    ],
    courseProgress: [
      { course: 'Mathematics Grade 10', enrolled: 45, avgProgress: 78, completionRate: 67 },
      { course: 'Physics Grade 11', enrolled: 38, avgProgress: 72, completionRate: 58 },
      { course: 'Chemistry Grade 12', enrolled: 42, avgProgress: 81, completionRate: 73 },
      { course: 'Biology Grade 11', enrolled: 35, avgProgress: 75, completionRate: 64 }
    ],
    assignmentStats: {
      totalAssigned: 89,
      totalSubmitted: 3124,
      avgSubmissionRate: 78,
      pendingGrading: 42,
      avgScore: 82
    },
    testStats: {
      totalTests: 34,
      totalAttempts: 1456,
      avgScore: 79,
      passRate: 87,
      avgCompletionTime: 45
    },
    studentEngagement: [
      { metric: 'Daily Active Users', value: 142, trend: '+8%' },
      { metric: 'Avg Study Time', value: '2h 45m', trend: '+12%' },
      { metric: 'Content Views', value: 3456, trend: '+15%' },
      { metric: 'Doubt Resolution Rate', value: '94%', trend: '+5%' }
    ],
    topPerformers: [
      { name: 'Jane Smith', course: 'Mathematics Grade 10', score: 94, rank: 1 },
      { name: 'Alex Johnson', course: 'Chemistry Grade 12', score: 92, rank: 2 },
      { name: 'Sarah Williams', course: 'Physics Grade 11', score: 91, rank: 3 },
      { name: 'Mike Brown', course: 'Biology Grade 11', score: 90, rank: 4 },
      { name: 'Emma Davis', course: 'Mathematics Grade 10', score: 89, rank: 5 }
    ],
    recentActivity: [
      { type: 'Test', description: 'Physics Quiz 1 completed by 35 students', time: '2 hours ago' },
      { type: 'Assignment', description: 'Chemistry Lab Report submitted by 28 students', time: '4 hours ago' },
      { type: 'Content', description: 'New video uploaded: Organic Chemistry Basics', time: '5 hours ago' },
      { type: 'Announcement', description: 'Mid-term exam schedule released', time: '1 day ago' }
    ]
  };
}

export default async function AnalyticsPage() {
  const { 
    overview, 
    attendanceByDay, 
    performanceBySubject, 
    courseProgress, 
    assignmentStats, 
    testStats, 
    studentEngagement,
    topPerformers,
    recentActivity 
  } = await getData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into student performance, engagement metrics, course analytics, and institutional trends
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All Reports
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              {overview.totalStudents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              {overview.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              {overview.totalAssignments}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Created</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              {overview.totalTests}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Conducted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              {overview.avgAttendance}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-pink-500" />
              {overview.attendanceCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total entries</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Student Engagement Metrics
            </CardTitle>
            <CardDescription>Key performance indicators for student activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentEngagement.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.metric}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                  <Badge className="bg-green-500">{item.trend}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with highest average scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student) => (
                <div key={student.rank} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm">
                    {student.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.course}</p>
                  </div>
                  <Badge className="bg-green-500">{student.score}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Detailed Analytics & Reports
          </CardTitle>
          <CardDescription>
            In-depth analysis of attendance, performance, course progress, and institutional metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="attendance" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Attendance Analytics */}
            <TabsContent value="attendance" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daily Attendance Trends (Last 7 Days)</CardTitle>
                  <CardDescription>Student attendance patterns throughout the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendanceByDay.map((day) => (
                      <div key={day.day}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{day.day}</span>
                          <span className="text-muted-foreground">
                            {day.count} students ({day.percentage}%)
                          </span>
                        </div>
                        <Progress value={day.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Insights</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Average weekly attendance: {overview.avgAttendance}%</li>
                      <li>• Best attendance day: {attendanceByDay.reduce((max, day) => day.percentage > max.percentage ? day : max).day}</li>
                      <li>• Total present: {attendanceByDay.reduce((sum, day) => sum + day.count, 0)} student-days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Analytics */}
            <TabsContent value="performance" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance by Subject</CardTitle>
                    <CardDescription>Average scores across different subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {performanceBySubject.map((subject) => (
                        <div key={subject.subject}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{subject.subject}</span>
                            <span className="text-muted-foreground">
                              {subject.avgScore}% • {subject.tests} tests
                            </span>
                          </div>
                          <Progress value={subject.avgScore} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Score Distribution</CardTitle>
                    <CardDescription>Student performance ranges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Excellent (90-100%)</span>
                        <Badge className="bg-green-500">24 students</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Good (80-89%)</span>
                        <Badge className="bg-blue-500">58 students</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Average (60-79%)</span>
                        <Badge className="bg-yellow-500">52 students</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Needs Improvement (&lt;60%)</span>
                        <Badge className="bg-red-500">22 students</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Course Progress */}
            <TabsContent value="courses" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Course Progress Overview</CardTitle>
                  <CardDescription>Completion rates and enrollment statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseProgress.map((course) => (
                      <div key={course.course} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{course.course}</h4>
                            <p className="text-xs text-muted-foreground">{course.enrolled} students enrolled</p>
                          </div>
                          <Badge variant="outline">{course.completionRate}% completion</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Avg Progress</p>
                            <p className="text-lg font-bold">{course.avgProgress}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Completion Rate</p>
                            <p className="text-lg font-bold">{course.completionRate}%</p>
                          </div>
                        </div>
                        <Progress value={course.avgProgress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assessments */}
            <TabsContent value="assessments" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Assignment Statistics</CardTitle>
                    <CardDescription>Overview of assignment performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Assigned</span>
                        <span className="text-lg font-bold">{assignmentStats.totalAssigned}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Submissions</span>
                        <span className="text-lg font-bold">{assignmentStats.totalSubmitted}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Submission Rate</span>
                        <span className="text-lg font-bold text-green-600">{assignmentStats.avgSubmissionRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Pending Grading</span>
                        <span className="text-lg font-bold text-orange-600">{assignmentStats.pendingGrading}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Average Score</span>
                        <span className="text-lg font-bold">{assignmentStats.avgScore}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Test Statistics</CardTitle>
                    <CardDescription>Overview of test performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Tests</span>
                        <span className="text-lg font-bold">{testStats.totalTests}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Attempts</span>
                        <span className="text-lg font-bold">{testStats.totalAttempts}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Average Score</span>
                        <span className="text-lg font-bold">{testStats.avgScore}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Pass Rate</span>
                        <span className="text-lg font-bold text-green-600">{testStats.passRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg Completion Time</span>
                        <span className="text-lg font-bold">{testStats.avgCompletionTime} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recent Activity */}
            <TabsContent value="activity" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Platform Activity</CardTitle>
                  <CardDescription>Latest actions and updates across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                          <Eye className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-1">{activity.type}</Badge>
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download comprehensive reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Attendance Report (PDF)
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Performance Report (Excel)
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Complete Analytics (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
