// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import LiveClass from "@/models/LiveClass";
// import Announcement from "@/models/Announcement";
// import Attendance from "@/models/Attendance";
// import { Submission } from "@/models/Assignment";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData() {
  // await dbConnect();
  // const now = new Date();
  // const upcoming = await LiveClass.find({ scheduledAt: { $gte: now } }).sort({ scheduledAt: 1 }).limit(3).lean();
  // const pendingToGrade = await Submission.countDocuments({ graded: false });
  // const activeStudents = await Attendance.distinct('student', { date: { $gte: new Date(now.getTime() - 24*60*60*1000) } });
  // const announcements = await Announcement.find({}).sort({ createdAt: -1 }).limit(5).lean();
  // return {
  //   upcoming: JSON.parse(JSON.stringify(upcoming)),
  //   pendingToGrade,
  //   activeCount: activeStudents.length,
  //   announcements: JSON.parse(JSON.stringify(announcements)),
  // };
  
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  return {
    upcoming: [
      { _id: '1', subject: 'Mathematics - Algebra', scheduledAt: new Date(Date.now() + 3600000).toISOString(), platform: 'zoom' },
      { _id: '2', subject: 'Physics - Mechanics', scheduledAt: new Date(Date.now() + 7200000).toISOString(), platform: 'jitsi' }
    ],
    pendingToGrade: 8,
    activeCount: 45,
    announcements: [
      { _id: '1', title: 'Holiday Notice', message: 'School closed next Monday', createdAt: new Date().toISOString() },
      { _id: '2', title: 'Exam Schedule', message: 'Mid-terms start next week', createdAt: new Date(Date.now() - 86400000).toISOString() }
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
