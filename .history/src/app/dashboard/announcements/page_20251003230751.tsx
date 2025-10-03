import dbConnect from "@/lib/mongoose";
import Announcement from "@/models/Announcement";
import Teacher from "@/models/Teacher";
import Course from "@/models/Course";
import Batch from "@/models/Batch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreateAnnouncementForm } from "./announcement-form";

async function getData() {
  await dbConnect();
  const announcements = await Announcement.find({}).sort({ createdAt: -1 }).populate('createdBy').lean();
  const courses = await Course.find({}).lean();
  const batches = await Batch.find({}).lean();
  const teachers = await Teacher.find({}).lean();
  return { announcements: JSON.parse(JSON.stringify(announcements)), courses: JSON.parse(JSON.stringify(courses)), batches: JSON.parse(JSON.stringify(batches)), teachers: JSON.parse(JSON.stringify(teachers)) };
}

export default async function AnnouncementsPage() {
  const { announcements, courses, batches, teachers } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Announcements</h1>

      <Card>
        <CardHeader>
          <CardTitle>Send Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAnnouncementForm courses={courses} batches={batches} teachers={teachers} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.map((a:any)=> (
              <div key={a._id} className="border rounded p-3">
                <p className="font-semibold">{a.title}</p>
                <p className="text-sm">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-1">By {a.createdBy?.name || 'Teacher'} • {new Date(a.createdAt).toLocaleString()}</p>
              </div>
            ))}
            {announcements.length === 0 && <p className="text-sm text-muted-foreground">No announcements yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
