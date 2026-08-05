"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function OnboardingFormDialog({ 
  open, 
  onOpenChange, 
  task 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  task?: any 
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    progress: "",
    status: "Pending"
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || "",
        role: task.role || "",
        progress: task.progress || "",
        status: task.status || "Pending"
      });
    } else {
      setFormData({
        name: "",
        role: "",
        progress: "",
        status: "Pending"
      });
    }
  }, [task, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-lg p-0 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
          <DialogTitle className="text-xl font-bold">
            {task ? "Edit Onboarding" : "Start Onboarding"}
          </DialogTitle>
          <DialogDescription>
            {task ? "Update onboarding details." : "Enter details for the new hire."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar">
          <div className="space-y-4 text-left">
            <Label className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Employee Name</span>
              <Input 
                placeholder="Enter full name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Label>
            
            <Label className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Role</span>
              <Input 
                placeholder="e.g. Developer, Designer" 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </Label>

            <Label className="flex flex-col space-y-2 text-left">
              <span className="text-sm font-medium">Current Stage</span>
              <Input 
                placeholder="e.g. IT Setup, Document Verification" 
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
              />
            </Label>

            <div className="space-y-2">
              <span className="text-sm font-medium">Status</span>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t bg-muted/50 gap-2 flex flex-row justify-end w-full flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
            {task ? "Save Changes" : "Start"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
