// BACKEND TEMPORARILY DISABLED FOR FRONTEND DEVELOPMENT
// import dbConnect from "@/lib/mongoose";
// import LiveClass from "@/models/LiveClass";
// import Course from "@/models/Course";
// import Chapter from "@/models/Chapter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScheduleClassForm } from "./schedule-class-form";

async function getData() {
  // await dbConnect();
  // const now = new Date();
  // const classes = await LiveClass.find({ scheduledAt: { $gte: new Date(now.getTime() - 24*60*60*1000) } }).sort({ scheduledAt: 1 }).lean();
  // const courses = await Course.find({}).lean();
  // const chapters = await Chapter.find({}).lean();
  // return { classes: JSON.parse(JSON.stringify(classes)), courses: JSON.parse(JSON.stringify(courses)), chapters: JSON.parse(JSON.stringify(chapters)) };
  
  // MOCK DATA FOR FRONTEND DEVELOPMENT
  return {
    classes: [
      { _id: '1', subject: 'Mathematics - Algebra', scheduledAt: new Date(Date.now() + 3600000).toISOString(), durationMinutes: 60, platform: 'zoom', meetingUrl: 'https://zoom.us/j/123456789' },
      { _id: '2', subject: 'Physics - Mechanics', scheduledAt: new Date(Date.now() + 7200000).toISOString(), durationMinutes: 90, platform: 'jitsi', meetingUrl: 'https://meet.jit.si/physics-class', recordingUrl: 'https://example.com/recording1.mp4' }
    ],
    courses: [
      { _id: '1', title: 'Mathematics Grade 10', subject: 'Mathematics' },
      { _id: '2', title: 'Physics Grade 11', subject: 'Physics' }
    ],
    chapters: [
      { _id: 'ch1', course: '1', title: 'Algebra Basics' },
      { _id: 'ch2', course: '2', title: 'Mechanics' }
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
