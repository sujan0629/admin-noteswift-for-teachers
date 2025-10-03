import dbConnect from "@/lib/mongoose";
import Doubt from "@/models/Doubt";
import Teacher from "@/models/Teacher";
import Student from "@/models/Student";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { replyToDoubt, assignDoubt } from "@/app/teacher-actions";

async function getData() {
  await dbConnect();
  const doubts = await Doubt.find({}).sort({ createdAt: -1 }).populate('student').lean();
  const teacher = await Teacher.findOne({}).lean();
  return { doubts: JSON.parse(JSON.stringify(doubts)), teacherId: teacher?._id ? String(teacher._id) : null };
}

export default async function DoubtsPage() {
  const { doubts, teacherId } = await getData();

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
                <div className="mt-3">
                  <ReplyAssignForm doubtId={d._id} defaultTeacherId={teacherId} />
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

"use client";
import { useState, useTransition } from "react";

function ReplyAssignForm({ doubtId, defaultTeacherId }: { doubtId: string; defaultTeacherId: string | null }) {
  const [teacherId, setTeacherId] = useState<string>(defaultTeacherId || "");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); startTransition(async ()=>{ if (message) await replyToDoubt({ doubtId, teacherId, message }); }); }} className="grid gap-2 md:grid-cols-4 items-end">
      <div className="md:col-span-3">
        <Label>Reply</Label>
        <Textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a reply..." />
      </div>
      <div>
        <Label>Teacher ID</Label>
        <Input value={teacherId} onChange={(e)=>setTeacherId(e.target.value)} placeholder="Teacher ObjectId" />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>Send</Button>
        <Button type="button" variant="secondary" onClick={()=> startTransition(async ()=>{ if (teacherId) await assignDoubt({ doubtId, teacherId }); })} disabled={isPending}>Assign</Button>
      </div>
    </form>
  );
}
