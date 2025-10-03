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
  const { classes, courses, chapters } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Live Classes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Schedule a Live Class</CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleClassForm courses={courses} chapters={chapters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Recent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classes.map((c: any) => (
              <div key={c._id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <p className="font-semibold">{c.subject}</p>
                  <p className="text-sm text-muted-foreground">{new Date(c.scheduledAt).toLocaleString()} • {c.durationMinutes} min • {c.platform.toUpperCase()}</p>
                </div>
                <div className="flex gap-2">
                  <a href={c.meetingUrl} target="_blank" rel="noreferrer" className="text-blue-600">Join</a>
                  {c.recordingUrl && <a href={c.recordingUrl} target="_blank" rel="noreferrer" className="text-sm">Recording</a>}
                </div>
              </div>
            ))}
            {classes.length === 0 && <p className="text-sm text-muted-foreground">No live classes scheduled.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
