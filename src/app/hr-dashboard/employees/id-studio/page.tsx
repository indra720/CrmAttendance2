"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, User, IdCard, Mail, Phone, Building2, QrCode } from "lucide-react";

export default function IDStudioPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [employeeData, setEmployeeData] = useState({
    code: "",
    designation: "",
    joiningDate: undefined as Date | undefined,
  });

  const employees = [
    { id: "1", name: "Akshay", email: "akshay@gmail.com" },
    { id: "2", name: "Gaurav Verma", email: "gaurav@gmail.com" },
  ];

  return (
    <div className="p-2 sm:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
            <IdCard className="h-7 w-7 text-primary" /> Dynamic ID Card Generator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Select an employee to generate and preview their ID card.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Select Employee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Employee</Label>
                <Select onValueChange={(value) => setSelectedEmployee(employees.find(e => e.id === value))}>    
                    <SelectTrigger>
                        <SelectValue placeholder="--Select an Employee--" />
                    </SelectTrigger>
                    <SelectContent>
                        {employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Employee Code</Label>
                    <Input placeholder="E.g. EMP001" onChange={(e) => setEmployeeData({...employeeData, code: e.target.value})}/>
                </div>
                <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input placeholder="E.g. Developer" onChange={(e) => setEmployeeData({...employeeData, designation: e.target.value})}/>
                </div>
            </div>

            <div className="space-y-2">
              <Label>Date of Joining</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !employeeData.joiningDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {employeeData.joiningDate ? format(employeeData.joiningDate, "PPP") : <span>mm/dd/yyyy</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={employeeData.joiningDate} onSelect={(date) => setEmployeeData({...employeeData, joiningDate: date})} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: ID Card Preview */}
        <Card className="shadow-md flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🖼️ ID Card Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center min-h-[400px] bg-muted/20 rounded-b-xl border-t">
            {selectedEmployee ? (
                <div className="w-[320px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative">
                    {/* ID Card Design */}
                    <div className="h-32 bg-primary flex items-center justify-between px-6 text-white">
                        <span className="font-bold text-lg">SUDO</span>
                        <Building2 className="h-8 w-8 opacity-80" />
                    </div>
                    <div className="flex flex-col items-center -mt-12">
                        <div className="h-24 w-24 rounded-full bg-slate-200 border-4 border-white shadow-lg flex items-center justify-center">
                            <User className="h-10 w-10 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold mt-2">{selectedEmployee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employeeData.designation || "Designation"}</p>
                    </div>
                    <div className="px-6 mt-6 space-y-3 text-sm">
                        <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> {selectedEmployee.email}</div>
                        <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</div>
                        <div className="flex items-center gap-3"><IdCard className="h-4 w-4 text-primary" /> ID: {employeeData.code || "EMP000"}</div>
                    </div>
                    <div className="absolute bottom-6 left-6">
                        <QrCode className="h-16 w-16 text-slate-800" />
                    </div>
                </div>
            ) : (
                <div className="text-center p-6 bg-amber-50 text-amber-800 rounded-lg border border-amber-200"> 
                    <p className="font-medium">Currently, no employee has been selected.</p>
                    <p className="text-sm mt-1">Select an employee from the left panel to preview their ID card.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
