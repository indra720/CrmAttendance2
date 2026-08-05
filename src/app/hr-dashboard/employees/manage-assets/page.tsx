"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Shield, Filter, Info, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ManageAssetsPage() {
  const [assignmentDate, setAssignmentDate] = useState<Date | undefined>();

  return (
    <div className=" space-y-6">
      <div>
        <Badge variant="secondary">Assign asset</Badge>
        <h1 className="text-2xl font-bold mt-2">Issue a new asset</h1>
        <p className="text-sm text-muted-foreground mt-1">Track who has laptops, access cards, or accessories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6 items-start">
        {/* Left Panel: Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Assign New Asset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">Employee</Label>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="--------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="e1">Himanshu Raut</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Asset Type</Label>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="other">Custom / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Asset Name / Identifier</Label>
              <Input className="h-9" placeholder='e.g., MacBook Pro 16"' />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Assignment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full h-9 justify-start text-left font-normal", !assignmentDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {assignmentDate ? format(assignmentDate, "PPP") : <span>mm/dd/yyyy</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={assignmentDate} onSelect={setAssignmentDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Notes (optional)</Label>
              <Textarea className="min-h-[80px]" placeholder="Serial number, condition, etc." />
            </div>

            <Button className="w-full h-9 bg-purple-600 hover:bg-purple-700">
              <Shield className="mr-2 h-4 w-4" /> Save assignment
            </Button>
          </CardContent>
        </Card>

        {/* Right Panel: Issued Assets */}
        <Card className="shadow-md md:w-auto">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between py-4">
            <CardTitle className="text-lg">Issued assets</CardTitle>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shailesh">Shailesh</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-9"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">Showing 1 record</p>
            </div>
            <div className="overflow-x-auto w-[300px] md:w-[700px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">EMPLOYEE</TableHead>
                    <TableHead className="whitespace-nowrap">ASSET</TableHead>
                    <TableHead className="whitespace-nowrap">TYPE</TableHead>
                    <TableHead className="whitespace-nowrap">STATUS</TableHead>
                    <TableHead className="whitespace-nowrap">VERIFICATION</TableHead>
                    <TableHead className="whitespace-nowrap">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="whitespace-nowrap">Himanshu Raut<br/><span className="text-xs text-muted-foreground">himanshuraut0968@gmail.com</span></TableCell>
                    <TableCell className="whitespace-nowrap">6767<br/><span className="text-xs text-muted-foreground">28 Jul 2026</span></TableCell>
                    <TableCell className="whitespace-nowrap"><Badge className="bg-blue-500">Laptop</Badge></TableCell>
                    <TableCell className="whitespace-nowrap">NOT RECEIVED</TableCell>
                    <TableCell className="whitespace-nowrap"><Badge variant="destructive"><X className="h-3 w-3 mr-1" /> Unverified</Badge></TableCell>
                    <TableCell className="whitespace-nowrap"><Button variant="outline" size="sm" className="h-8"><Info className="h-4 w-4 mr-2" /> Details</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
