import dbConnect from "@/lib/mongoose";
import Attendance from "@/models/Attendance";
import Assignment from "@/models/Assignment";
import Test from "@/models/Test";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { AttendanceExport } from "./export-client";

async function getData() {
  await dbConnect();
  const attendanceCount = await Attendance.countDocuments({});
  const assignmentCount = await Assignment.countDocuments({});
  const testCount = await Test.countDocuments({});

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const attendanceByDay = await Promise.all(last7.map(async (d) => {
    const start = new Date(d); start.setHours(0,0,0,0);
    const end = new Date(d); end.setHours(23,59,59,999);
    const c = await Attendance.countDocuments({ date: { $gte: start, $lte: end } });
    return { day: d.toLocaleDateString(undefined, { weekday: 'short' }), count: c };
  }));

  return { attendanceCount, assignmentCount, testCount, attendanceByDay };
}

export default async function AnalyticsPage() {
  const { attendanceCount, assignmentCount, testCount, attendanceByDay } = await getData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-headline font-bold">Analytics & Reports</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total Attendance Records</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{attendanceCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Assignments</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{assignmentCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Tests</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{testCount}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance in Last 7 Days</CardTitle>
          <CardDescription>Daily records count</CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceExport rows={attendanceByDay} />
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceByDay}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
