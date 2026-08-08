"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  MoreHorizontal,
  User,
  Eye,
  Edit,
  Trash2,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditEmployeeDialog } from "@/components/forms/EditEmployeeDialog";
import { AddEmployeeDialog } from "@/components/forms/AddEmployeeDialog";
import { FaceRegistrationDialog } from "../components/FaceRegistrationDialog";

const allEmployees = [
  {
    id: 1,
    name: "Akshay",
    email: "akshay@gmail.com",
    contact: "1681816871",
    aadhar: "2259****2982",
    acct: "1354****1684",
    ifsc: "PUNB0123466",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "5 days, 23 hours ago",
  },
  {
    id: 2,
    name: "Gaurav Verma",
    email: "gaurav@gmail.com",
    contact: "6818671818",
    aadhar: "1681****8416",
    acct: "8418****8184",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "6 days, 1 hour ago",
  },
  {
    id: 3,
    name: "Himanshu Raut",
    email: "himanshuraut0968@gmail.com",
    contact: "7745968882",
    aadhar: "1531****6464",
    acct: "1687****7167",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "6 days, 3 hours ago",
  },
  {
    id: 4,
    name: "Indrajeet",
    email: "indrajeet@gmail.com",
    contact: "68168716871",
    aadhar: "1684****4135",
    acct: "5416****6416",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "6 days, 1 hour ago",
  },
  {
    id: 5,
    name: "Kamal",
    email: "kamal@gmail.com",
    contact: "7871871871",
    aadhar: "5416****8418",
    acct: "8168****1871",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "5 days, 23 hours ago",
  },
  {
    id: 6,
    name: "Khushi",
    email: "khushi@gmail.com",
    contact: "7777777777",
    aadhar: "4168****4168",
    acct: "5415****1684",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 30, 2026",
    timeAgo: "5 days, 1 hour ago",
  },
  {
    id: 7,
    name: "Lokendra",
    email: "lokendra@gmail.com",
    contact: "416841684",
    aadhar: "5525****5295",
    acct: "9529****5292",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "5 days, 23 hours ago",
  },
  {
    id: 8,
    name: "Purvansh",
    email: "purvansh@gmail.com",
    contact: "6871717184",
    aadhar: "8971****6871",
    acct: "4184****4184",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "5 days, 23 hours ago",
  },
  {
    id: 9,
    name: "Shailesh",
    email: "shailesh@gmail.com",
    contact: "8416841861",
    aadhar: "1648****1141",
    acct: "1864****8186",
    ifsc: "PUNB0123456",
    status: "Active",
    created: "Jul 29, 2026",
    timeAgo: "5 days, 23 hours ago",
  },
];

export default function AllEmployeesPage() {
  const [search, setSearch] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const router = useRouter();

  const filteredEmployees = allEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (emp: any) => {
    setSelectedEmployee(emp);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Employees</h1>
          <p className="text-sm text-muted-foreground">
            Manage all employees in the system
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          <span className="md:hidden">Add</span>
          <span className="hidden md:inline">Add Employee</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            Smart search updates results in real time
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-[90vw] lg:w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow key={emp.id} className="whitespace-nowrap">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{emp.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{emp.email}</div>
                      <div className="text-xs text-muted-foreground">
                        {emp.contact}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">Aadhar: {emp.aadhar}</div>
                      <div className="text-xs">Acct: {emp.acct}</div>
                      <div className="text-xs">IFSC: {emp.ifsc}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{emp.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{emp.created}</div>
                      <div className="text-xs text-muted-foreground">
                        {emp.timeAgo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/hr-dashboard/employees/${emp.id}`)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(emp)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <FaceRegistrationDialog employeeName={emp.name} />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      {selectedEmployee && (
        <EditEmployeeDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          employee={selectedEmployee}
        />
      )}

      {/* Add Employee Dialog */}
      <AddEmployeeDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
