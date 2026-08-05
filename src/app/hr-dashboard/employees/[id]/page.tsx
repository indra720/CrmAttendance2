"use client";

import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Edit, 
  Power, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Activity,
  ChevronRight,
  ShieldCheck,
  Lock,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function EmployeeProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // Mock data based on the prompt
  const employee = {
    name: "Akshay",
    email: "akshay@gmail.com",
    status: "Active",
    faceRegistered: true,
    joinedDate: "Jul 29, 2026",
    personalInfo: {
      fullName: "Akshay",
      email: "akshay@gmail.com",
      phone: "1681816871",
      aadhar: "225982952982",
      pan: "ABCDE1234F",
      bankAccount: "135441841684",
      ifsc: "PUNB0123466",
      staffStatus: "Staff",
      education: "Not provided"
    },
    faceRecognition: {
      status: "Registered",
      date: "Jul 29, 2026 17:12"
    },
    accountStatus: "Active",
    ctc: "Not provided",
    complianceDocs: [],
    address: {
      current: "Not provided",
      permanent: "Not provided"
    },
    emergencyContact: {
      name: "Not provided",
      relation: "Not provided",
      phone: "Not provided"
    },
    stats: {
      totalCheckins: 6,
      thisMonth: 3,
      thisWeek: 6
    },
    recentCheckins: [
      { date: "04 Aug 2026, Tuesday", time: "10:12" },
      { date: "03 Aug 2026, Monday", time: "10:03" },
      { date: "01 Aug 2026, Saturday", time: "10:08" },
      { date: "31 Jul 2026, Friday", time: "10:10" },
      { date: "30 Jul 2026, Thursday", time: "10:05" }
    ],
    attendanceHistory: [
      { date: "Aug 04, 2026", day: "Tuesday", checkin: "10:12", checkout: "10:33", duration: "-", status: "Today" },
      { date: "Aug 03, 2026", day: "Monday", checkin: "10:03", checkout: "19:00", duration: "-", status: "Past" },
      { date: "Aug 01, 2026", day: "Saturday", checkin: "10:08", checkout: "19:29", duration: "-", status: "Past" },
      { date: "Jul 31, 2026", day: "Friday", checkin: "10:10", checkout: "18:56", duration: "-", status: "Past" },
      { date: "Jul 30, 2026", day: "Thursday", checkin: "10:05", checkout: "19:01", duration: "-", status: "Past" },
      { date: "Jul 29, 2026", day: "Wednesday", checkin: "17:12", checkout: "18:58", duration: "-", status: "Past" }
    ]
  };

  return (
    <div className="p-2 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Profile Card */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image Section */}
              <div className="relative group">
                <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 flex items-center justify-center border-4 border-background shadow-inner overflow-hidden">
                  <User className="h-14 w-14 text-primary/60" />
                  {/* Placeholder for actual image: <img src="..." alt="Profile" className="h-full w-full object-cover" /> */}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                  <Edit className="h-4 w-4" />
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => console.log(e.target.files)} />
                </label>
              </div>

              {/* Profile Details */}
              <div className="text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
                  <h1 className="text-4xl font-extrabold tracking-tight">{employee.name}</h1>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 px-3 py-1 text-sm font-semibold">
                    {employee.status}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <Mail className="h-4 w-4" /> {employee.email}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border shadow-sm text-sm font-medium">
                    <ShieldCheck className="h-4 w-4 text-blue-500" /> Face Registered
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border shadow-sm text-sm font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" /> Joined {employee.joinedDate}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                <Edit className="h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="outline" size="lg" className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Power className="h-4 w-4" /> Deactivate
              </Button>
              <Button variant="secondary" size="lg" className="gap-2" onClick={() => router.push('/hr-dashboard/employees/all')}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoItem label="Full Name" value={employee.personalInfo.fullName} />
                <InfoItem label="Email" value={employee.personalInfo.email} />
                <InfoItem label="Phone" value={employee.personalInfo.phone} />
                <InfoItem label="Aadhar Number" value={employee.personalInfo.aadhar} />
                <InfoItem label="PAN Card" value={employee.personalInfo.pan} />
                <InfoItem label="Staff Status" value={employee.personalInfo.staffStatus} />
                <div className="sm:col-span-2 lg:col-span-3">
                   <InfoItem 
                    label="Bank Account" 
                    value={`${employee.personalInfo.bankAccount}`} 
                    subValue={`IFSC: ${employee.personalInfo.ifsc}`}
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <InfoItem label="Educational Qualifications" value={employee.personalInfo.education} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Face Recognition & Account Status */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Verification & Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border">
                  <div>
                    <p className="text-sm font-medium">Face Recognition</p>
                    <p className="text-xs text-muted-foreground">Registered on: {employee.faceRecognition.date}</p>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">Registered</Badge>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border">
                  <div>
                    <p className="text-sm font-medium">Account Status</p>
                    <p className="text-xs text-muted-foreground">Login access enabled</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Active</Badge>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border">
                  <div>
                    <p className="text-sm font-medium">Monthly Salary (CTC)</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{employee.ctc}</p>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Documents */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Compliance Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <FileText className="h-10 w-10 mb-2 opacity-20" />
                <p className="text-sm">No documents uploaded yet</p>
              </CardContent>
            </Card>
          </div>

          {/* Address & Emergency Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <InfoItem label="Current Address" value={employee.address.current} />
                <Separator />
                <InfoItem label="Permanent Address" value={employee.address.permanent} />
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" /> Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <InfoItem label="Relative's Name" value={employee.emergencyContact.name} />
                <InfoItem label="Relation" value={employee.emergencyContact.relation} />
                <InfoItem label="Contact Number" value={employee.emergencyContact.phone} />
              </CardContent>
            </Card>
          </div>

          {/* Attendance History Table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> Recent Attendance History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-md border overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.attendanceHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-xs">{record.date}</TableCell>
                        <TableCell className="text-xs">{record.day}</TableCell>
                        <TableCell className="text-xs">
                          <Badge variant="outline" className="font-normal">{record.checkin}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          <Badge variant="outline" className="font-normal">{record.checkout}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">{record.duration}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={record.status === "Today" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0 h-5"
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="space-y-6">
          {/* Attendance Stats */}
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Attendance Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 py-4">
                <div className="text-center p-2 bg-background rounded-lg border shadow-sm">
                  <p className="text-2xl font-bold text-primary">{employee.stats.totalCheckins}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-semibold">Total</p>
                </div>
                <div className="text-center p-2 bg-background rounded-lg border shadow-sm">
                  <p className="text-2xl font-bold text-primary">{employee.stats.thisMonth}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-semibold">This Month</p>
                </div>
                <div className="text-center p-2 bg-background rounded-lg border shadow-sm">
                  <p className="text-2xl font-bold text-primary">{employee.stats.thisWeek}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-semibold">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Check-ins List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Recent Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {employee.recentCheckins.map((checkin, index) => (
                  <div key={index} className="flex justify-between items-center p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <p className="text-sm">{checkin.date}</p>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">{checkin.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> Quick Actions
              </CardTitle>
              <p className="text-xs text-muted-foreground">Save time with shortcuts</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <ActionButton 
                icon={<Activity className="h-4 w-4" />} 
                label="View Activity Logs" 
                sublabel="Interactive attendance attempts"
              />
              <ActionButton 
                icon={<Edit className="h-4 w-4" />} 
                label="Edit Employee" 
                sublabel="Update employee information"
              />
              <ActionButton 
                icon={<Power className="h-4 w-4" />} 
                label="Deactivate" 
                sublabel="Disable login access"
                className="text-destructive hover:bg-destructive/10"
              />
              <ActionButton 
                icon={<ArrowLeft className="h-4 w-4" />} 
                label="Back to List" 
                sublabel="Return to employees list"
                onClick={() => router.push('/hr-dashboard/employees/all')}
              />
              <ActionButton 
                icon={<Lock className="h-4 w-4" />} 
                label="Change Password" 
                sublabel="Reset employee password"
              />
              <ActionButton 
                icon={<LayoutDashboard className="h-4 w-4" />} 
                label="Admin Dashboard" 
                sublabel="Go to admin panel"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, subValue }: { label: string, value: string, subValue?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{label}</p>
      <p className="text-sm font-medium">{value}</p>
      {subValue && <p className="text-xs text-muted-foreground font-mono">{subValue}</p>}
    </div>
  );
}

function ActionButton({ icon, label, sublabel, onClick, className }: { 
  icon: React.ReactNode, 
  label: string, 
  sublabel: string, 
  onClick?: () => void,
  className?: string
}) {
  return (
    <button 
      className={`w-full flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-all text-left group ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-muted group-hover:bg-background transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-[10px] text-muted-foreground">{sublabel}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
