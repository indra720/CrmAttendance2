"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, List, ChevronLeft, ChevronRight, FileDown, Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";

export default function AttendanceCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const stats = [
    { label: "Total Present", value: "7", icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
    { label: "Absent Employees", value: "2", icon: <XCircle className="h-5 w-5 text-red-500" /> },
    { label: "Half Days", value: "0", icon: <Clock className="h-5 w-5 text-blue-500" /> },
    { label: "Total Employees", value: "9", icon: <Users className="h-5 w-5 text-purple-500" /> },
  ];

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Attendance Calendar</h1>
          <p className="text-sm text-muted-foreground">Monitor employee attendance and view detailed insights.</p>
        </div>
        <Link href="/hr-dashboard/attendance/list">
          <Button variant="outline" className="gap-2"><List className="h-4 w-4" /> View List</Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-slate-100 rounded-lg">{stat.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar Controls */}
      <Card className="shadow-sm p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">{format(currentDate, "MMMM yyyy")}</h2>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" className="gap-2"><CalendarIcon className="h-4 w-4" /> Today</Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}><ChevronRight className="h-4 w-4" /></Button>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700"><FileDown className="h-4 w-4" /> Download Report</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {months.map((month, i) => (
            <Badge key={month} variant={i === currentDate.getMonth() ? "default" : "secondary"} className="cursor-pointer">{month}</Badge>
          ))}
          <Select defaultValue="2026">
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-slate-100 border-b">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
            <div key={day} className="bg-slate-50 p-2 text-center text-xs font-bold text-muted-foreground">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7  gap-px bg-slate-100">
          {daysInMonth.map((day, i) => {
            // Mock data for status: this would normally be dynamic based on your data
            const status = i % 8 === 0 ? "holiday" : i % 7 === 0 ? "absent" : i % 6 === 0 ? "half" : i % 5 === 0 ? "partial" : "present";
            
            const statusStyles = {
              present: "bg-green-100 text-green-700",
              absent: "bg-red-100 text-red-700",
              half: "bg-blue-100 text-blue-700",
              partial: "bg-yellow-100 text-yellow-700",
              holiday: "bg-slate-800 text-white",
            };

            return (
              <div key={i} className={cn("bg-white min-h-[80px] sm:min-h-[100px] p-2 flex flex-col gap-1", !isSameMonth(day, currentDate) && "bg-slate-50 text-muted-foreground")}>
                <p className="text-sm font-semibold">{format(day, "d")}</p>
                {isSameMonth(day, currentDate) && (
                    <div className={cn("text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded truncate", statusStyles[status as keyof typeof statusStyles])}>
                        {status.toUpperCase()}
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
