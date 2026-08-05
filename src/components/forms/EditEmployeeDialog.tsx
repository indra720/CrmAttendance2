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

export function EditEmployeeDialog({ open, onOpenChange, employee }: { open: boolean; onOpenChange: (open: boolean) => void; employee: any }) {
  const [activeTab, setActiveTab] = useState("personal");

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[98vw] sm:max-w-3xl max-h-[90vh] p-4 rounded-2xl shadow-2xl flex flex-col overflow-y-auto custom-scrollbar">
            <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
                <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
                <DialogDescription>Update the details for {employee.name}.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 flex flex-col min-h-0 p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                    <TabsList className="grid w-full grid-cols-2 gap-2 flex-shrink-0">
                        <TabsTrigger value="personal">Personal Details</TabsTrigger>
                        <TabsTrigger value="account">Account Details</TabsTrigger>
                    </TabsList>
                    <div className="pt-6 flex-1 relative overflow-y-auto custom-scrollbar">
                        {activeTab === "personal" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <Label className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium">Full Name</span>
                                    <Input defaultValue={employee.name} />
                                </Label>
                                <Label className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium">Email</span>
                                    <Input defaultValue={employee.email} />
                                </Label>
                                <Label className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium">Phone</span>
                                    <Input defaultValue={employee.personalInfo?.phone || employee.contact || ""} />
                                </Label>
                                <Label className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium">Aadhar Number</span>
                                    <Input defaultValue={employee.personalInfo?.aadhar || employee.aadhar || ""} />
                                </Label>
                            </div>
                        )}
                        {activeTab === "account" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <Label className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium">Bank Account</span>
                                    <Input defaultValue={employee.personalInfo?.bankAccount || employee.acct || ""} />
                                </Label>
                                <Label className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium">IFSC</span>
                                    <Input defaultValue={employee.personalInfo?.ifsc || employee.ifsc || ""} />
                                </Label>
                            </div>
                        )}
                    </div>
                </Tabs>
            </div>
            <DialogFooter className="p-6 pt-4 border-t bg-muted/50 gap-2 flex justify-between w-full flex-shrink-0">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
