import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function AddEmployeeDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-3xl max-h-[90vh] p-0 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <DialogHeader className="p-4 sm:p-6 pb-2 border-b flex-shrink-0">
          <DialogTitle className="text-xl font-bold">Add New Employee</DialogTitle>
          <DialogDescription>Fill in the details to add a new employee.</DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 flex  min-h-0 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="flex w-full gap-2 flex-shrink-0 h-auto p-1">
              <TabsTrigger value="personal" className="w-full">Personal</TabsTrigger>
              <TabsTrigger value="account" className="w-full">Account</TabsTrigger>
              <TabsTrigger value="emergency" className="w-full">Emergency</TabsTrigger>
            </TabsList>
            
            <div className="pt-4 flex-1 relative overflow-y-auto custom-scrollbar">
              {activeTab === "personal" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Full Name</span>
                      <Input placeholder="Enter full name" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Email</span>
                      <Input type="email" placeholder="Enter email" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Phone</span>
                      <Input placeholder="Enter phone number" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Shift</span>
                      <Input placeholder="e.g. Day/Night" />
                    </Label>
                  </div>
                  <Label className="flex flex-col space-y-2">
                    <span className="text-sm font-medium">Current Address</span>
                    <Textarea placeholder="Enter current address" className="min-h-[80px]" />
                  </Label>
                  <Label className="flex flex-col space-y-2">
                    <span className="text-sm font-medium">Permanent Address</span>
                    <Textarea placeholder="Enter permanent address" className="min-h-[80px]" />
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Password</span>
                      <Input type="password" placeholder="Enter password" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Confirm Password</span>
                      <Input type="password" placeholder="Confirm password" />
                    </Label>
                  </div>
                </div>
              )}
              {activeTab === "account" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Aadhar Number</span>
                      <Input placeholder="Enter Aadhar number" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">PAN Card</span>
                      <Input placeholder="Enter PAN number" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">Bank Account</span>
                      <Input placeholder="Enter bank account" />
                    </Label>
                    <Label className="flex flex-col space-y-2">
                      <span className="text-sm font-medium">IFSC</span>
                      <Input placeholder="Enter IFSC code" />
                    </Label>
                  </div>
                </div>
              )}
              {activeTab === "emergency" && (
                <div className="flex flex-col gap-4">
                  <Label className="flex flex-col space-y-2">
                    <span className="text-sm font-medium">Relative Name</span>
                    <Input placeholder="Enter relative's name" />
                  </Label>
                  <Label className="flex flex-col space-y-2">
                    <span className="text-sm font-medium">Relation with Employee</span>
                    <Input placeholder="e.g. Father/Mother" />
                  </Label>
                  <Label className="flex flex-col space-y-2">
                    <span className="text-sm font-medium">Relative Contact</span>
                    <Input placeholder="Enter relative contact number" />
                  </Label>
                </div>
              )}
            </div>
          </Tabs>
        </div>
        <DialogFooter className="p-4 sm:p-6 border-t bg-muted/50 gap-2 flex flex-row justify-end w-full flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">Cancel</Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
