"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function LeaveTypesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<any>(null);

  const openCreateDialog = () => {
    setSelectedLeaveType(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (leaveType: any) => {
    setSelectedLeaveType(leaveType);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3  ">
        <div className="space-y-1 flex flex-col md:flex-row gap-10">
          <h1 className="text-2xl font-bold">Leave Types</h1>
          <p className="text-muted-foreground">
            Create and manage the leave types employees can apply for.
          </p>
        </div>
        <div className="flex  gap-2">
          <Button variant="outline" asChild>
            <Link href="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> New Leave Type
          </Button>
        </div>
      </div>

      <LeaveTypeFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={selectedLeaveType}
      />

      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900">
                  Casual Leave
                </h3>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
                  CL
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  PAID LEAVE
                </span>
              </div>
              <p className="text-sm text-gray-500">Casual Leave.</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                1.00 day(s) / monthly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => openEditDialog({ name: 'Casual Leave', code: 'CL', desc: 'Casual Leave.', category: 'paid', accrual: '1.00', limit: '', cap: '5.00', carry: true, minService: '0', gender: 'all', doc: false })}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats row - 6 boxes */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Annual Limit
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                No limit
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Max Balance Cap
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">5.00</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Carry Forward
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">Yes</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Min Service Days
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">0</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Gender
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">All</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Document Required
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">No</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaveTypeFormDialog({ open, onOpenChange, initialData }: { open: boolean, onOpenChange: (open: boolean) => void, initialData: any }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px] w-[calc(100%-1rem)] hide-scrollbar">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit leave type" : "Create a leave type"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input placeholder="e.g. Earned Leave" defaultValue={initialData?.name} />
            </div>
            <div className="space-y-2">
              <Label>Code *</Label>
              <Input placeholder="e.g. EL" defaultValue={initialData?.code} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea defaultValue={initialData?.desc} />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select defaultValue={initialData?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid  md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Accrual Frequency</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue placeholder="Monthly" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Accrual Amount (days)</Label>
              <Input type="number" defaultValue={initialData?.accrual || 0} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Annual Limit</Label>
              <Input type="number" defaultValue={initialData?.limit} />
            </div>
            <div className="space-y-2">
              <Label>Max Balance Cap</Label>
              <Input type="number" defaultValue={initialData?.cap} />
            </div>
            <div className="space-y-2">
              <Label>Carry Forward Cap</Label>
              <Input type="number" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Min Service Days Required</Label>
              <Input type="number" defaultValue={initialData?.minService || 0} />
            </div>
            <div className="space-y-2">
              <Label>Applicable Gender</Label>
              <Select defaultValue={initialData?.gender || "all"}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Consecutive Days</Label>
              <Input type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Display Order</Label>
            <Input type="number" defaultValue={0} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Allow Carry Forward</Label>
            <Switch defaultChecked={initialData?.carry} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Requires Document</Label>
            <Switch defaultChecked={initialData?.doc} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch defaultChecked />
          </div>
        </div>
        <Button className="w-full">{initialData ? "Update Leave Type" : "Create Leave Type"}</Button>
      </DialogContent>
    </Dialog>
  );
}
