import dbConnect from "@/lib/mongoose";
import Doubt from "@/models/Doubt";
import Student from "@/models/Student";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getData() {
  await dbConnect();
  const doubts = await Doubt.find({}).sort({ createdAt: -1 }).populate('student').lean();
  return { doubts: JSON.parse(JSON.stringify(doubts)) };
}

export default async function DoubtsPage() {
  const { doubts } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Doubts & Interaction</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student Doubts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {doubts.map((d:any)=> (
              <div key={d._id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{d.student?.name || 'Student'}</p>
                    <p className="text-sm text-muted-foreground">{d.subject || 'General'} • {new Date(d.createdAt).toLocaleString()}</p>
                  </div>
                  {d.resolved ? <span className="text-green-600 text-sm">Resolved</span> : <span className="text-amber-600 text-sm">Open</span>}
                </div>
                <div className="mt-2 space-y-2">
                  {d.messages?.map((m:any, idx:number)=> (
                    <div key={idx} className="text-sm">
                      <span className="font-medium capitalize">{m.senderType}:</span> {m.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {doubts.length === 0 && <p className="text-sm text-muted-foreground">No doubts yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
