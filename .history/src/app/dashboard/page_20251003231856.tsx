// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import LiveClass from "@/models/LiveClass";
// import Announcement from "@/models/Announcement";
// import Attendance from "@/models/Attendance";
// import { Submission } from "@/models/Assignment";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, FileText, MessageSquare, Clock, TrendingUp, Calendar, Bell, Video, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

async function getData() {
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  return {
    stats: {
      totalStudents: 156,
      activeToday: 45,
      pendingGrading: 8,
      upcomingClasses: 2,
      totalCourses: 5,
      doubtsOpen: 12,
      completionRate: 78
    },
    upcoming: [
      { _id: '1', subject: 'Mathematics - Algebra', scheduledAt: new Date(Date.now() + 3600000).toISOString(), platform: 'zoom', durationMinutes: 60, students: 35 },
      { _id: '2', subject: 'Physics - Mechanics', scheduledAt: new Date(Date.now() + 7200000).toISOString(), platform: 'jitsi', durationMinutes: 90, students: 28 },
      { _id: '3', subject: 'Chemistry - Organic', scheduledAt: new Date(Date.now() + 10800000).toISOString(), platform: 'zoom', durationMinutes: 75, students: 42 }
    ],
    recentActivity: [
      { type: 'submission', student: 'John Doe', action: 'submitted', item: 'Algebra Assignment 3', time: '5 min ago' },
      { type: 'doubt', student: 'Jane Smith', action: 'asked a doubt in', item: 'Physics Chapter 2', time: '12 min ago' },
      { type: 'test', student: 'Bob Johnson', action: 'completed', item: 'Mathematics Mid-term', time: '1 hour ago' },
      { type: 'submission', student: 'Alice Brown', action: 'submitted late', item: 'Chemistry Lab Report', time: '2 hours ago' }
    ],
    pendingTasks: [
      { id: 1, task: 'Grade 8 assignment submissions', priority: 'high', dueDate: 'Today' },
      { id: 2, task: 'Respond to 5 student doubts', priority: 'medium', dueDate: 'Tomorrow' },
      { id: 3, task: 'Upload Physics Chapter 4 notes', priority: 'low', dueDate: 'This week' },
      { id: 4, task: 'Schedule next week\'s live classes', priority: 'medium', dueDate: 'Tomorrow' }
    ],
    announcements: [
      { _id: '1', title: 'Holiday Notice', message: 'School closed next Monday for national holiday', createdAt: new Date().toISOString(), priority: 'high' },
      { _id: '2', title: 'Exam Schedule Released', message: 'Mid-term exams start from next week. Check schedule.', createdAt: new Date(Date.now() - 86400000).toISOString(), priority: 'high' },
      { _id: '3', title: 'New Study Material Available', message: 'Updated reference materials uploaded for Physics Chapter 3', createdAt: new Date(Date.now() - 172800000).toISOString(), priority: 'normal' }
    ],
    performanceInsights: [
      { subject: 'Mathematics', avgScore: 85, trend: 'up', change: '+5%' },
      { subject: 'Physics', avgScore: 78, trend: 'down', change: '-2%' },
      { subject: 'Chemistry', avgScore: 82, trend: 'up', change: '+3%' }
    ]
  };
}

export default async function DashboardPage() {
  const { upcoming, pendingToGrade, activeCount, announcements } = await getData();

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Upcoming Classes</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcoming.map((cls:any)=> (
                <div key={cls._id} className="flex items-center justify-between border rounded p-2">
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground">{new Date(cls.scheduledAt).toLocaleString()} • {cls.durationMinutes} min</p>
                  </div>
                  <a href={cls.meetingUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Join</a>
                </div>
              ))}
              {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No upcoming classes.</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pending Grading</CardTitle><CardDescription>Submissions to review</CardDescription></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{pendingToGrade}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Active Students (24h)</CardTitle></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{activeCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {announcements.map((a:any)=> (
                <div key={a._id} className="border rounded p-2">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm">{a.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {announcements.length === 0 && <p className="text-sm text-muted-foreground">No announcements.</p>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quick Links</CardTitle></CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild><Link href="/dashboard/live-classes">Start Live Class</Link></Button>
            <Button asChild variant="secondary"><Link href="/dashboard/courses">Upload Content</Link></Button>
            <Button asChild variant="secondary"><Link href="/dashboard/tests">Create Test</Link></Button>
            <Button asChild variant="secondary"><Link href="/dashboard/doubts">Check Doubts</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
