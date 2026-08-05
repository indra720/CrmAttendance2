"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Briefcase, 
  Activity, 
  CheckCircle2, 
  Clock, 
  FileText,
  Calendar,
  Mail,
  Phone,
  Compass
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function OnboardingViewDetails({ 
  open, 
  onOpenChange, 
  task 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  task: any 
}) {
  if (!task) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Completed": 
        return { icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
      case "In Progress": 
      case "Progress":
        return { icon: <Activity className="h-5 w-5 text-indigo-500" />, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" };
      default: 
        return { icon: <Clock className="h-5 w-5 text-amber-500" />, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
    }
  };

  const statusConfig = getStatusConfig(task.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-xl p-0 rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-muted-foreground/10 bg-background">
        {/* Premium Header Banner with absolute offset */}
        <div className="relative pt-8 pb-6 px-6 sm:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Avatar with glowing ring and safe spacing */}
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-background flex items-center justify-center border-2 border-primary/20 shadow-lg overflow-hidden ring-4 ring-primary/5">
                <div className="h-full w-full bg-gradient-to-tr from-primary/10 to-primary/30 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-extrabold tracking-tight">{task.name}</h2>
                <Badge variant="outline" className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] ${statusConfig.color}`}>
                  {task.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                <Briefcase className="h-4 w-4 text-primary/60" /> {task.role}
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Details Body */}
        <div className="flex-1 px-6 sm:px-8 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Overview Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-1">
              <p className="text-[10px] uppercase font-bold text-primary/60 tracking-wider">Current Stage</p>
              <p className="text-sm font-bold flex items-center gap-2 text-foreground">
                <FileText className="h-4 w-4 text-primary" /> {task.progress}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 border space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Start Date</p>
              <p className="text-sm font-bold flex items-center gap-2 text-foreground">
                <Calendar className="h-4 w-4 text-muted-foreground" /> Aug 05, 2026
              </p>
            </div>
          </div>

          {/* Timeline Process */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" /> Onboarding Path
            </h3>
            
            <div className="space-y-4 relative pl-3 before:absolute before:left-[21px] before:top-3 before:bottom-3 before:w-[2px] before:bg-muted-foreground/10">
              {[
                { title: "Document Verification", desc: "Identity & background screening", completed: true },
                { title: "IT Asset Allocation", desc: "Laptop and email account provisioning", completed: task.status === "Completed" || task.progress === "Welcome Kit" },
                { title: "Introduction & Welcome Kit", desc: "Meet the team & documentation overview", completed: task.status === "Completed" },
                { title: "First Week Training", desc: "Orientation and project kickoff", completed: false },
              ].map((step, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-0 top-0.5 h-4 w-4 rounded-full border-2 z-10 flex items-center justify-center bg-background ${step.completed ? 'border-primary' : 'border-muted-foreground/30'}`}>
                    {step.completed && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <div className="space-y-0.5">
                    <p className={`text-xs font-bold ${step.completed ? 'text-foreground' : 'text-muted-foreground/70'}`}>{step.title}</p>
                    <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/20 border hover:bg-muted/40 transition-all cursor-pointer">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                   <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                   <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Email Address</p>
                   <p className="text-xs font-semibold truncate">{task.name.toLowerCase()}@sudo.com</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/20 border hover:bg-muted/40 transition-all cursor-pointer">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                   <Phone className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Phone Number</p>
                   <p className="text-xs font-semibold">+91 98765 43210</p>
                </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
