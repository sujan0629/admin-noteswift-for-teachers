// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import Student from "@/models/Student";
// import Course from "@/models/Course";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ExportCSVButton } from "@/components/ui/export-csv";
import { ExportPDFButton } from "@/components/ui/export-pdf";
import { ManualAttendanceForm } from "./attendance-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, BarChart3, Search, Award, Clock, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

async function getData() {
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  return {
    students: [
      { 
        _id: 's1', 
        name: 'John Doe', 
        email: 'john@example.com', 
        enrolledCourses: ['Mathematics Grade 10', 'Physics Grade 11'],
        overallProgress: 78,
        attendanceRate: 92,
        assignmentsCompleted: 24,
        totalAssignments: 28,
        averageScore: 85,
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        joinedDate: new Date(Date.now() - 7776000000).toISOString(),
        progress: { 
          '1': { 
            chaptersCompleted: 8, 
            totalChapters: 12,
            timeSpentMinutes: 420, 
            testsTaken: 4, 
            averageScore: 85,
            rank: 5
          },
          '2': {
            chaptersCompleted: 6,
            totalChapters: 10,
            timeSpentMinutes: 360,
            testsTaken: 3,
            averageScore: 88,
            rank: 3
          }
        }
      },
      { 
        _id: 's2', 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        enrolledCourses: ['Mathematics Grade 10'],
        overallProgress: 92,
        attendanceRate: 98,
        assignmentsCompleted: 27,
        totalAssignments: 28,
        averageScore: 92,
        lastActive: new Date(Date.now() - 1800000).toISOString(),
        joinedDate: new Date(Date.now() - 7776000000).toISOString(),
        progress: { 
          '1': { 
            chaptersCompleted: 11, 
            totalChapters: 12,
            timeSpentMinutes: 520, 
            testsTaken: 4, 
            averageScore: 94,
            rank: 1
          }
        }
      },
      { 
        _id: 's3', 
        name: 'Mike Johnson', 
        email: 'mike@example.com', 
        enrolledCourses: ['Physics Grade 11', 'Chemistry Grade 12'],
        overallProgress: 65,
        attendanceRate: 85,
        assignmentsCompleted: 19,
        totalAssignments: 28,
        averageScore: 75,
        lastActive: new Date(Date.now() - 86400000).toISOString(),
        joinedDate: new Date(Date.now() - 7776000000).toISOString(),
        progress: { 
          '2': {
            chaptersCompleted: 5,
            totalChapters: 10,
            timeSpentMinutes: 280,
            testsTaken: 3,
            averageScore: 72,
            rank: 8
          }
        }
      },
      { 
        _id: 's4', 
        name: 'Sarah Williams', 
        email: 'sarah@example.com', 
        enrolledCourses: ['Chemistry Grade 12'],
        overallProgress: 88,
        attendanceRate: 95,
        assignmentsCompleted: 26,
        totalAssignments: 28,
        averageScore: 89,
        lastActive: new Date(Date.now() - 7200000).toISOString(),
        joinedDate: new Date(Date.now() - 7776000000).toISOString(),
        progress: {}
      }
    ],
    attendance: [
      { date: new Date(Date.now() - 86400000).toISOString(), present: 42, absent: 3, total: 45 },
      { date: new Date(Date.now() - 172800000).toISOString(), present: 40, absent: 5, total: 45 },
      { date: new Date(Date.now() - 259200000).toISOString(), present: 43, absent: 2, total: 45 },
      { date: new Date(Date.now() - 345600000).toISOString(), present: 41, absent: 4, total: 45 },
      { date: new Date(Date.now() - 432000000).toISOString(), present: 44, absent: 1, total: 45 }
    ],
    stats: {
      totalStudents: 156,
      activeStudents: 142,
      avgAttendance: 91,
      avgProgress: 82
    },
    courses: [
      { _id: '1', title: 'Mathematics Grade 10' },
      { _id: '2', title: 'Physics Grade 11' },
      { _id: '3', title: 'Chemistry Grade 12' }
    ]
  };
}

export default async function StudentsPage() {
  const { students, attendance, stats, courses } = await getData();

  const topPerformers = [...students].sort((a: any, b: any) => b.averageScore - a.averageScore).slice(0, 5);
  const needsAttention = students.filter((s: any) => s.averageScore < 60 || s.attendanceRate < 75);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Students Management</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive student directory with progress tracking, attendance monitoring, performance analytics, and engagement metrics
        </p>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6" />
              {stats.totalStudents}
            </div>
            <p className="text-xs text-white/80 mt-1">Enrolled across all courses</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2 text-blue-600">
              <CheckCircle className="h-6 w-6" />
              {stats.activeStudents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active this week</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500 hover:border-blue-600 transition-colors shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2 text-blue-600">
              <Calendar className="h-6 w-6" />
              {stats.avgAttendance}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2 text-blue-600">
              <TrendingUp className="h-6 w-6" />
              {stats.avgProgress}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Course completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with highest average scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student: any, index: number) => (
                <div key={student._id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.email}</p>
                  </div>
                  <Badge className="bg-blue-500">{student.averageScore}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Attendance Trends
            </CardTitle>
            <CardDescription>Daily attendance for the last 5 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendance.map((record: any) => (
                <div key={record.date}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                    <span className="text-muted-foreground">
                      {record.present}/{record.total} ({Math.round((record.present / record.total) * 100)}%)
                    </span>
                  </div>
                  <Progress value={(record.present / record.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Student Directory & Analytics
          </CardTitle>
          <CardDescription>
            View all students, track individual progress, monitor attendance, and analyze performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="directory" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="directory">Directory ({students.length})</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Student Directory Tab */}
            <TabsContent value="directory" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students by name or email..." className="pl-8" />
                </div>
                <ExportCSVButton filename="students_roster" rows={students} headers={["name","email"]} />
                <ExportPDFButton filename="students_roster" html={`<h1>Students</h1>${students.map((s:any)=>`<div><strong>${s.name}</strong> - ${s.email}</div>`).join("")}`} />
              </div>
              
              <div className="space-y-3">
                {students.map((student: any) => (
                  <Card key={student._id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-base">{student.name}</CardTitle>
                          <CardDescription>{student.email}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            {student.enrolledCourses.map((course: string) => (
                              <Badge key={course} variant="secondary">{course}</Badge>
                            ))}
                          </div>
                        </div>
                        <Badge className={student.overallProgress >= 80 ? 'bg-blue-500' : student.overallProgress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}>
                          {student.overallProgress}% Progress
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                          <p className="text-lg font-bold">{student.attendanceRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Assignments</p>
                          <p className="text-lg font-bold">{student.assignmentsCompleted}/{student.totalAssignments}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                          <p className="text-lg font-bold">{student.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Active</p>
                          <p className="text-xs font-medium">{new Date(student.lastActive).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Send Message</Button>
                        <ManualAttendanceForm studentId={student._id} courses={courses} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Progress Tracking Tab */}
            <TabsContent value="progress" className="space-y-4 mt-4">
              {students.map((student: any) => (
                <Card key={student._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{student.name}</CardTitle>
                        <CardDescription>Detailed progress across all courses</CardDescription>
                      </div>
                      <Badge>{student.overallProgress}% Overall</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(student.progress || {}).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(student.progress).map(([courseId, progress]: any) => {
                          const course = courses.find(c => c._id === courseId);
                          return (
                            <div key={courseId} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-semibold">{course?.title || `Course ${courseId}`}</h4>
                                <Badge variant="outline">Rank #{progress.rank}</Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                <div>
                                  <p className="text-xs text-muted-foreground">Chapters</p>
                                  <p className="text-sm font-bold">{progress.chaptersCompleted}/{progress.totalChapters}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Time Spent</p>
                                  <p className="text-sm font-bold flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {Math.floor(progress.timeSpentMinutes / 60)}h {progress.timeSpentMinutes % 60}m
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Tests Taken</p>
                                  <p className="text-sm font-bold">{progress.testsTaken}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Avg Score</p>
                                  <p className="text-sm font-bold">{progress.averageScore}%</p>
                                </div>
                              </div>
                              <Progress value={(progress.chaptersCompleted / progress.totalChapters) * 100} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No progress data available</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Attendance by Student</CardTitle>
                    <CardDescription>Individual attendance rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {students.sort((a: any, b: any) => b.attendanceRate - a.attendanceRate).map((student: any) => (
                        <div key={student._id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{student.name}</span>
                            <span className="text-muted-foreground">{student.attendanceRate}%</span>
                          </div>
                          <Progress value={student.attendanceRate} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Students Needing Attention</CardTitle>
                    <CardDescription>Low attendance or performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {needsAttention.length > 0 ? (
                      <div className="space-y-3">
                        {needsAttention.map((student: any) => (
                          <div key={student._id} className="flex items-center justify-between p-2 border rounded">
                            <div>
                              <p className="font-semibold text-sm">{student.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {student.attendanceRate < 75 && `Attendance: ${student.attendanceRate}%`}
                                {student.averageScore < 60 && ` Score: ${student.averageScore}%`}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">Contact</Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm font-semibold">All students performing well!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Distribution</CardTitle>
                    <CardDescription>Students by score ranges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Excellent (90-100%)</span>
                        <Badge className="bg-blue-500">
                          {students.filter((s: any) => s.averageScore >= 90).length} students
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Good (80-89%)</span>
                        <Badge className="bg-blue-500">
                          {students.filter((s: any) => s.averageScore >= 80 && s.averageScore < 90).length} students
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Average (60-79%)</span>
                        <Badge className="bg-yellow-500">
                          {students.filter((s: any) => s.averageScore >= 60 && s.averageScore < 80).length} students
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Needs Improvement (&lt;60%)</span>
                        <Badge className="bg-red-500">
                          {students.filter((s: any) => s.averageScore < 60).length} students
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Engagement Metrics</CardTitle>
                    <CardDescription>Student activity and participation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg Assignment Completion</span>
                        <span className="text-lg font-bold">
                          {Math.round(students.reduce((sum: number, s: any) => sum + (s.assignmentsCompleted / s.totalAssignments * 100), 0) / students.length)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active Daily Users</span>
                        <span className="text-lg font-bold">
                          {students.filter((s: any) => Date.now() - new Date(s.lastActive).getTime() < 86400000).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg Study Time</span>
                        <span className="text-lg font-bold">2h 45m</span>
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
