'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, BarChart3, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TaskBoardPage() {
    const [tasks] = useState([
        { id: 1, title: 'Design new homepage', assignedTo: 'John Doe', priority: 'High', status: 'In Progress', dueDate: '2026-08-15' },
        { id: 2, title: 'Implement auth', assignedTo: 'Jane Smith', priority: 'Medium', status: 'Todo', dueDate: '2026-08-20' },
    ]);

    const statusOptions = ['Pending', 'In Progress', 'Completed', 'Blocked'];
    const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
    const employees = ['John Doe', 'Jane Smith', 'Bob'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Board</h1>
                <Button variant="outline" asChild>
                    <Link href="/hr-dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Insights */}
                <Card>
                    <CardHeader className="pb-2">
                        <Badge className="w-fit" variant="secondary">Overview</Badge>
                        <CardTitle className="text-xl">Task Insights</CardTitle>
                        <p className="text-sm text-muted-foreground">2 total · 0 overdue</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                                { s: 'Pending', bg: 'bg-yellow-50', text: 'text-yellow-700' },
                                { s: 'In Progress', bg: 'bg-blue-50', text: 'text-blue-700' },
                                { s: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700' },
                                { s: 'Blocked', bg: 'bg-red-50', text: 'text-red-700' }
                            ].map(item => (
                                <div key={item.s} className={`${item.bg} p-2 rounded-md text-center border border-${item.text.split('-')[1]}-100`}>
                                    <div className="text-[10px] text-muted-foreground uppercase">{item.s}</div>
                                    <div className={`text-lg font-bold ${item.text}`}>0</div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                                { p: 'Low', bg: 'bg-gray-50', text: 'text-gray-700' },
                                { p: 'Medium', bg: 'bg-sky-50', text: 'text-sky-700' },
                                { p: 'High', bg: 'bg-orange-50', text: 'text-orange-700' },
                                { p: 'Critical', bg: 'bg-red-50', text: 'text-red-700' }
                            ].map(item => (
                                <div key={item.p} className={`${item.bg} p-2 rounded-md text-center border border-${item.text.split('-')[1]}-100`}>
                                    <div className="text-[10px] text-muted-foreground uppercase">{item.p}</div>
                                    <div className={`text-lg font-bold ${item.text}`}>0</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* New Task Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Assign New Task</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input placeholder="Task Title" />
                        <Textarea placeholder="Description" />
                        <div className="grid grid-cols-2 gap-6">
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Assign to" /></SelectTrigger>
                                <SelectContent>{employees.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                            </Select>
                            <Input type="date" />
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                                <SelectContent>{priorityOptions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>{statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <Button className="w-auto"><Plus className="mr-2 h-4 w-4" /> Create Task</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Tasks Overview */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
                        <CardTitle>Tasks Overview</CardTitle>
                        <div className="grid grid-cols-2  md:grid-cols-3 gap-2">
                            <Select><SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>{statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select><SelectTrigger className="w-32"><SelectValue placeholder="Priority" /></SelectTrigger>
                                <SelectContent>{priorityOptions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select><SelectTrigger className="w-32"><SelectValue placeholder="Employee" /></SelectTrigger>
                                <SelectContent>{employees.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="overflow-x-auto w-[300px] md:w-full ">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Assigned To</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-semibold">{task.title}</TableCell>
                                    <TableCell>{task.assignedTo}</TableCell>
                                    <TableCell><Badge variant="secondary">{task.priority}</Badge></TableCell>
                                    <TableCell><Badge>{task.status}</Badge></TableCell>
                                    <TableCell>{task.dueDate}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/hr-dashboard/tasks/view/${task.id}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
