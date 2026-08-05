"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, LayoutDashboard, Clock, UserCheck, UserX, AlertTriangle, Percent } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const attendanceData = [
  { member: "Gaurav Verma", email: "gaurav@gmail.com", date: "01 Aug", day: "Saturday", in: "14:03", out: "14:53", duration: "00:49:55", status: "Complete" },
  { member: "Kamal", email: "kamal@gmail.com", date: "01 Aug", day: "Saturday", in: "10:08", out: "10:09", duration: "00:00:04", status: "Complete" },
  { member: "Purvansh", email: "purvansh@gmail.com", date: "01 Aug", day: "Saturday", in: "10:08", out: "10:08", duration: "00:00:05", status: "Complete" },
  { member: "Akshay", email: "akshay@gmail.com", date: "01 Aug", day: "Saturday", in: "10:08", out: "10:08", duration: "00:00:05", status: "Complete" },
  { member: "Khushi", email: "khushi@gmail.com", date: "01 Aug", day: "Saturday", in: "10:07", out: "10:07", duration: "00:00:04", status: "Complete" },
  { member: "Indrajeet", email: "indrajeet@gmail.com", date: "01 Aug", day: "Saturday", in: "10:07", out: "10:07", duration: "00:00:05", status: "Complete" },
  { member: "Himanshu Raut", email: "himanshuraut0968@gmail.com", date: "01 Aug", day: "Saturday", in: "10:04", out: "14:45", duration: "04:40:25", status: "Complete" },
  { member: "Himanshu Raut", email: "himanshuraut0968@gmail.com", date: "31 Jul", day: "Friday", in: "18:00", out: "18:57", duration: "00:56:55", status: "Complete" },
];

export default function AttendanceListPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { label: "Working Days", value: "3", icon: <Clock className="h-5 w-5 text-blue-600" /> },
    { label: "Present", value: "31", icon: <UserCheck className="h-5 w-5 text-green-600" /> },
    { label: "Absent", value: "0", icon: <UserX className="h-5 w-5 text-red-600" /> },
    { label: "Half Days", value: "0", icon: <AlertTriangle className="h-5 w-5 text-amber-600" /> },
    { label: "Attendance Rate", value: "95.5%", icon: <Percent className="h-5 w-5 text-purple-600" /> },
  ];

  return (
    <div className="p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Attendance Records</h1>
          <p className="text-sm text-muted-foreground">Monitor your daily check-ins and attendance insights.</p>
        </div>
        <Link href="/hr-dashboard">
          <Button variant="outline" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard</Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid  md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {stat.icon}
                <p className="text-xs text-muted-foreground font-medium uppercase">{stat.label}</p>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Section */}
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Refine Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 pt-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full sm:w-[240px] justify-start text-left font-normal h-9", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button className="h-9">Apply</Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-sm overflow-hidden">
        <div className="w-[300px] md:w-full overflow-x-auto">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>MEMBER</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>IN</TableHead>
                <TableHead>OUT</TableHead>
                <TableHead>DURATION</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-xs">{row.member.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{row.member}</p>
                        <p className="text-xs text-muted-foreground">{row.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{row.date}</p>
                    <p className="text-xs text-muted-foreground">{row.day}</p>
                  </TableCell>
                  <TableCell className="text-sm">{row.in}</TableCell>
                  <TableCell className="text-sm">{row.out}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.duration}</TableCell>
                  <TableCell><Badge variant="secondary" className="font-normal">{row.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
