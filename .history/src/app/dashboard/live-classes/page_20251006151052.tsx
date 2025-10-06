// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import LiveClass from "@/models/LiveClass";
// import Course from "@/models/Course";
// import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScheduleClassForm } from "./schedule-class-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Users, PlayCircle, Download, MessageSquare, TrendingUp, BarChart3, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData() {
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  const now = Date.now();
  return {
    upcomingClasses: [
      { 
        _id: '1', 
        subject: 'Mathematics - Algebra', 
        course: 'Mathematics Grade 10',
        chapter: 'Algebra Basics',
        scheduledAt: new Date(now + 3600000).toISOString(), 
        durationMinutes: 60, 
        platform: 'zoom', 
        meetingUrl: 'https://zoom.us/j/123456789',
        enrolledStudents: 45,
        expectedAttendees: 42,
        description: 'Introduction to algebraic expressions and equations'
      },
      { 
        _id: '2', 
        subject: 'Physics - Mechanics', 
        course: 'Physics Grade 11',
        chapter: 'Mechanics',
        scheduledAt: new Date(now + 7200000).toISOString(), 
        durationMinutes: 90, 
        platform: 'google-meet', 
        meetingUrl: 'https://meet.google.com/abc-defg-hij',
        enrolledStudents: 38,
        expectedAttendees: 35,
        description: 'Newton\'s laws of motion and applications'
      },
      { 
        _id: '3', 
        subject: 'Chemistry - Organic Chemistry', 
        course: 'Chemistry Grade 12',
        chapter: 'Organic Compounds',
        scheduledAt: new Date(now + 86400000).toISOString(), 
        durationMinutes: 75, 
        platform: 'jitsi', 
        meetingUrl: 'https://meet.jit.si/chemistry-class',
        enrolledStudents: 42,
        expectedAttendees: 40,
        description: 'Nomenclature and properties of organic compounds'
      }
    ],
    pastClasses: [
      { 
        _id: '4', 
        subject: 'Mathematics - Trigonometry', 
        course: 'Mathematics Grade 10',
        scheduledAt: new Date(now - 86400000).toISOString(), 
        durationMinutes: 60, 
        platform: 'zoom',
        actualAttendees: 40,
        enrolledStudents: 45,
        recordingUrl: 'https://example.com/recording1.mp4',
        recordingViews: 28,
        averageWatchTime: 52,
        chatMessages: 34,
        pollsCreated: 3
      },
      { 
        _id: '5', 
        subject: 'Physics - Thermodynamics', 
        course: 'Physics Grade 11',
        scheduledAt: new Date(now - 172800000).toISOString(), 
        durationMinutes: 90, 
        platform: 'google-meet',
        actualAttendees: 35,
        enrolledStudents: 38,
        recordingUrl: 'https://example.com/recording2.mp4',
        recordingViews: 22,
        averageWatchTime: 78,
        chatMessages: 41,
        pollsCreated: 2
      },
      { 
        _id: '6', 
        subject: 'Chemistry - Chemical Bonding', 
        course: 'Chemistry Grade 12',
        scheduledAt: new Date(now - 259200000).toISOString(), 
        durationMinutes: 75, 
        platform: 'jitsi',
        actualAttendees: 38,
        enrolledStudents: 42,
        recordingUrl: 'https://example.com/recording3.mp4',
        recordingViews: 31,
        averageWatchTime: 65,
        chatMessages: 29,
        pollsCreated: 4
      }
    ],
    stats: {
      totalClassesThisMonth: 18,
      averageAttendance: 87,
      totalRecordingViews: 234,
      totalLiveHours: 32
    },
    courses: [
      { _id: '1', title: 'Mathematics Grade 10', subject: 'Mathematics' },
      { _id: '2', title: 'Physics Grade 11', subject: 'Physics' },
      { _id: '3', title: 'Chemistry Grade 12', subject: 'Chemistry' }
    ],
    chapters: [
      { _id: 'ch1', course: '1', title: 'Algebra Basics' },
      { _id: 'ch2', course: '1', title: 'Trigonometry' },
      { _id: 'ch3', course: '2', title: 'Mechanics' },
      { _id: 'ch4', course: '2', title: 'Thermodynamics' },
      { _id: 'ch5', course: '3', title: 'Organic Compounds' },
      { _id: 'ch6', course: '3', title: 'Chemical Bonding' }
    ]
  };
}

export default async function LiveClassesPage() {
  const { upcomingClasses, pastClasses, stats, courses, chapters } = await getData();

  const getPlatformBadge = (platform: string) => {
    const colors: Record<string, string> = {
      'zoom': 'bg-blue-500',
      'google-meet': 'bg-red-500',
      'jitsi': 'bg-green-500',
      'microsoft-teams': 'bg-purple-500'
    };
    return colors[platform] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Live Classes Management</h1>
        <p className="text-muted-foreground mt-2">
          Schedule, conduct, and manage live interactive sessions with your students. Track attendance, engagement, and access recordings.
        </p>
      </div>

      {/* Live Classes Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50/60 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Video className="h-6 w-6 text-blue-600" />
              {stats.totalClassesThisMonth}
            </div>
            <p className="text-xs mt-1 text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500 hover:border-blue-600 transition-colors shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6  text-blue-600" />
              {stats.averageAttendance}%
            </div>
            <p className="text-xs mt-1 text-muted-foreground">Strong participation</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/60 border-blue-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recording Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <PlayCircle className="h-6 w-6  text-blue-600" />
              {stats.totalRecordingViews}
            </div>
            <p className="text-xs mt-1 text-muted-foreground">Students catching up</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50/60 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Live Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              {stats.totalLiveHours}h
            </div>
            <p className="text-xs mt-1 text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule New Class */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule New Live Class
          </CardTitle>
          <CardDescription>
            Create and schedule live interactive sessions. Choose platform, set date/time, and configure class settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScheduleClassForm courses={courses} chapters={chapters} />
        </CardContent>
      </Card>

      {/* Classes Overview with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Classes Overview
          </CardTitle>
          <CardDescription>
            Manage upcoming sessions, view past classes, and access recordings and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4 min-w-max">
              <TabsTrigger value="upcoming">Upcoming ({upcomingClasses.length})</TabsTrigger>
                            <TabsTrigger value="past">Past Classes</TabsTrigger>
            </TabsList>
            </div>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Upcoming Classes Tab */}
            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {upcomingClasses.map((cls: any) => (
                <Card key={cls._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{cls.subject}</CardTitle>
                        <CardDescription className="mt-1">
                          {cls.course} • {cls.chapter}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">{cls.description}</p>
                      </div>
                      <Badge className={getPlatformBadge(cls.platform)}>
                        {cls.platform.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(cls.scheduledAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(cls.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{cls.durationMinutes} min</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{cls.enrolledStudents} students</p>
                          <p className="text-xs text-muted-foreground">Enrolled</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{cls.expectedAttendees} expected</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((cls.expectedAttendees / cls.enrolledStudents) * 100)}% rate
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Video className="h-4 w-4 mr-2" />
                        Start Class
                      </Button>
                      <Button variant="outline">
                        <a href={cls.meetingUrl} target="_blank" rel="noreferrer" className="flex items-center">
                          Copy Link
                        </a>
                      </Button>
                      <Button variant="outline">Edit</Button>
                      <Button variant="outline">Send Reminder</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Past Classes Tab */}
            <TabsContent value="past" className="space-y-4 mt-4">
              {pastClasses.map((cls: any) => (
                <Card key={cls._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{cls.subject}</CardTitle>
                        <CardDescription>
                          {cls.course} • {new Date(cls.scheduledAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getPlatformBadge(cls.platform)}>
                        {cls.platform.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Attendance</p>
                        <p className="text-xl font-bold">
                          {cls.actualAttendees}/{cls.enrolledStudents}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((cls.actualAttendees / cls.enrolledStudents) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Recording Views</p>
                        <p className="text-xl font-bold flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {cls.recordingViews}
                        </p>
                        <p className="text-xs text-muted-foreground">Total views</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Watch Time</p>
                        <p className="text-xl font-bold">{cls.averageWatchTime} min</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((cls.averageWatchTime / cls.durationMinutes) * 100)}% of class
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-xl font-bold flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {cls.chatMessages}
                        </p>
                        <p className="text-xs text-muted-foreground">{cls.pollsCreated} polls</p>
                      </div>
                    </div>
                    <Progress 
                      value={(cls.actualAttendees / cls.enrolledStudents) * 100} 
                      className="h-2 mb-4" 
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline">View Attendance</Button>
                      <Button variant="outline">Analytics</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Recordings Library Tab */}
            <TabsContent value="recordings" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastClasses.map((cls: any) => (
                  <Card key={cls._id}>
                    <CardHeader className="pb-3">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                        <PlayCircle className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-base">{cls.subject}</CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(cls.scheduledAt).toLocaleDateString()} • {cls.durationMinutes} min
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Views</span>
                          <span className="font-medium">{cls.recordingViews}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg Watch Time</span>
                          <span className="font-medium">{cls.averageWatchTime} min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Attendance</span>
                          <span className="font-medium">{cls.actualAttendees} students</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
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
                    <CardTitle className="text-base">Attendance Trends</CardTitle>
                    <CardDescription>Student participation over the last 6 classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pastClasses.map((cls: any, idx: number) => (
                        <div key={cls._id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{cls.subject.substring(0, 20)}...</span>
                            <span className="text-muted-foreground">
                              {cls.actualAttendees}/{cls.enrolledStudents}
                            </span>
                          </div>
                          <Progress 
                            value={(cls.actualAttendees / cls.enrolledStudents) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recording Engagement</CardTitle>
                    <CardDescription>Most watched recordings and completion rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pastClasses
                        .sort((a: any, b: any) => b.recordingViews - a.recordingViews)
                        .map((cls: any) => (
                          <div key={cls._id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{cls.subject.substring(0, 20)}...</span>
                              <span className="text-muted-foreground">{cls.recordingViews} views</span>
                            </div>
                            <Progress 
                              value={(cls.recordingViews / cls.enrolledStudents) * 100} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Platform Usage</CardTitle>
                    <CardDescription>Distribution of classes across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Zoom</span>
                        <Badge className="bg-blue-500">
                          {pastClasses.filter((c: any) => c.platform === 'zoom').length} classes
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Google Meet</span>
                        <Badge className="bg-red-500">
                          {pastClasses.filter((c: any) => c.platform === 'google-meet').length} classes
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Jitsi</span>
                        <Badge className="bg-green-500">
                          {pastClasses.filter((c: any) => c.platform === 'jitsi').length} classes
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Session Insights</CardTitle>
                    <CardDescription>Average metrics across all live classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg Session Duration</span>
                        <span className="text-lg font-bold">
                          {Math.round(pastClasses.reduce((sum: number, c: any) => sum + c.durationMinutes, 0) / pastClasses.length)} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg Chat Messages</span>
                        <span className="text-lg font-bold">
                          {Math.round(pastClasses.reduce((sum: number, c: any) => sum + c.chatMessages, 0) / pastClasses.length)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg Polls per Class</span>
                        <span className="text-lg font-bold">
                          {Math.round(pastClasses.reduce((sum: number, c: any) => sum + c.pollsCreated, 0) / pastClasses.length)}
                        </span>
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
