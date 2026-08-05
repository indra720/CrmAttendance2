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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Plus,
  Eye,
  Edit
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OnboardingFormDialog } from "@/components/forms/OnboardingFormDialog";
import { OnboardingViewDetails } from "@/components/forms/OnboardingViewDetails";

const initialTasks = [
  { id: 1, name: "Akshay", role: "Developer", progress: "Document Verification", status: "Progress" },
  { id: 2, name: "Gaurav Verma", role: "Designer", progress: "IT Setup", status: "Pending" },
  { id: 3, name: "Himanshu Raut", role: "Manager", progress: "Completed", status: "Completed" },
  { id: 4, name: "Khushi", role: "HR", progress: "Welcome Kit", status: "Progress" },
];

export default function OnboardingPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleStartOnboarding = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleViewDetails = (task: any) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-2  space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">Employee Onboarding</h1>
          <p className="text-sm text-muted-foreground">Track and manage new hire onboarding progress.</p>
        </div>
        <Button size="sm" className="sm:h-10 px-4" onClick={handleStartOnboarding}>
          <Plus className="mr-2 h-4 w-4" /> 
          <span className="hidden sm:inline">Start Onboarding</span>
          <span className="sm:hidden">Start</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Hires", value: "12", icon: Users, color: "text-blue-500" },
          { title: "Pending", value: "5", icon: Clock, color: "text-yellow-500" },
          { title: "In Progress", value: "4", icon: FileText, color: "text-purple-500" },
          { title: "Completed", value: "3", icon: CheckCircle2, color: "text-green-500" },
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg">Onboarding Pipeline</CardTitle>
          <CardDescription>Current status of all new hires</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto w-[300px] md:w-full shrink-0">
            <Table className="">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[150px]">Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Current Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium shrink-0 whitespace-nowrap">{task.name}</TableCell>
                    <TableCell className="shrink-0 whitespace-nowrap text-xs sm:text-sm">{task.role}</TableCell>
                    <TableCell className="shrink-0 whitespace-nowrap text-xs sm:text-sm">{task.progress}</TableCell>
                    <TableCell className="shrink-0">
                      <Badge variant={task.status === "Completed" ? "default" : task.status === "Pending" ? "outline" : "secondary"} className="text-[10px] sm:text-xs">
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2" onClick={() => handleViewDetails(task)}>
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => handleEdit(task)}>
                            <Edit className="h-4 w-4" /> Edit
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

      {/* Onboarding Form Dialog (Handles Add and Edit) */}
      <OnboardingFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        task={selectedTask} 
      />

      {/* Onboarding View Details Dialog */}
      <OnboardingViewDetails
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        task={selectedTask}
      />
    </div>
  );
}
