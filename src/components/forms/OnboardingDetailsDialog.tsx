"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Briefcase, 
  Activity, 
  CheckCircle2, 
  Clock, 
  FileText,
  Calendar
} from "lucide-react";

export function OnboardingDetailsDialog({ 
  open, 
  onOpenChange, 
  task 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  task: any 
}) {
  if (!task) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "In Progress": return <Activity className="h-5 w-5 text-purple-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-lg p-0 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0 bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">{task.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Briefcase className="h-3 w-3" /> {task.role}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-6">
            {/* Status Section */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Status</p>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/10">
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <span className="font-medium">{task.status}</span>
                </div>
                <Badge variant={task.status === "Completed" ? "default" : task.status === "Pending" ? "outline" : "secondary"}>
                  {task.status}
                </Badge>
              </div>
            </div>

            {/* Stage Section */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Onboarding Progress</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded-md bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current Stage</p>
                    <p className="text-sm text-muted-foreground">{task.progress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded-md bg-primary/10 text-primary">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">Aug 05, 2026 (Demo)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Section (Placeholder) */}
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-sm">
              Note: Employee has completed document verification and is currently waiting for IT asset allocation.
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 sm:p-6 border-t bg-muted/50 flex flex-row gap-2 flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Close
          </Button>
          <Button className="flex-1">
            View Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
