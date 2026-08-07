"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ListTodo,
  Clock,
  LoaderCircle,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Filter,
} from "lucide-react";
import Link from "next/link";

const mockTickets = [
  {
    id: "T-101",
    employee: "John Doe",
    subject: "Login Issue",
    category: "Technical",
    priority: "High",
    status: "Open",
    created: "Aug 6, 2026",
  },
  {
    id: "T-102",
    employee: "Jane Smith",
    subject: "Salary Query",
    category: "Finance",
    priority: "Medium",
    status: "In Progress",
    created: "Aug 5, 2026",
  },
];

export default function SupportTicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Tickets Management</h1>
        <Button variant="outline" asChild>
          <Link href="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Total", value: "15", icon: ListTodo, color: "text-primary", bg: "bg-primary/10" },
          { label: "Open", value: "5", icon: Clock, color: "text-primary", bg: "bg-primary/10" },
          { label: "In Progress", value: "3", icon: LoaderCircle, color: "text-yellow-600", bg: "bg-yellow-500/10" },
          { label: "Resolved", value: "7", icon: CheckCircle, color: "text-green-600", bg: "bg-green-500/10" },
          { label: "Urgent", value: "1", icon: AlertCircle, color: "text-red-600", bg: "bg-red-500/10" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter & Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="overflow-x-auto w-[300px] md:w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-bold text-primary">
                      {t.id}
                    </TableCell>
                    <TableCell>{t.employee}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{t.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{t.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
