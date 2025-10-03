import dbConnect from "@/lib/mongoose";
import Content from "@/models/Content";
import Chapter from "@/models/Chapter";
import Course from "@/models/Course";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

async function getData() {
  await dbConnect();
  const contents = await Content.find({}).sort({ createdAt: -1 }).lean();
  const chapters = await Chapter.find({}).lean();
  const courses = await Course.find({}).lean();
  return { contents: JSON.parse(JSON.stringify(contents)), chapters: JSON.parse(JSON.stringify(chapters)), courses: JSON.parse(JSON.stringify(courses)) };
}

export default async function ResourcesPage() {
  const { contents, chapters, courses } = await getData();

  const chapterMap: Record<string, any> = Object.fromEntries(chapters.map((c:any)=>[String(c._id), c]));
  const courseMap: Record<string, any> = Object.fromEntries(courses.map((c:any)=>[String(c._id), c]));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Resource Library</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {contents.map((cnt:any)=> {
              const ch = chapterMap[String(cnt.chapter)];
              const cr = ch ? courseMap[String(ch.course)] : null;
              return (
                <div key={cnt._id} className="border rounded p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{cnt.title}</p>
                    <p className="text-sm text-muted-foreground">{cnt.type.toUpperCase()} • {ch?.title || 'Chapter'} • {cr?.title || 'Course'}</p>
                  </div>
                  {cnt.url && <a href={cnt.url} target="_blank" rel="noreferrer" className="text-blue-600">Open</a>}
                </div>
              );
            })}
            {contents.length === 0 && <p className="text-sm text-muted-foreground">No resources.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
