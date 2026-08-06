'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function TaskDetailsPage() {
    const params = useParams();
    const taskId = params?.id || '1';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold">Task Details</h1>
                <Button variant="outline" asChild>
                    <Link href="/hr-dashboard/tasks/board">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Board
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="w-full shadow-md border-gray-100 rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                            <CardTitle className="text-2xl font-bold">AMS</CardTitle>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">In Progress</Badge>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md"><Calendar className="mr-2 h-4 w-4" /> Aug 13, 2026</span>
                                <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md"><User className="mr-2 h-4 w-4" /> Himanshu Raut</span>
                                <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">Medium</Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm bg-gray-50 p-4 rounded-lg">
                                <div><p className="font-semibold text-gray-900 mb-1">Description</p><p className="text-gray-600">Add Multi-tenant system</p></div>
                                <div><p className="font-semibold text-gray-900 mb-1">Assigned by</p><p className="text-gray-600">Kevin</p></div>
                                <div><p className="font-semibold text-gray-900 mb-1">Created</p><p className="text-gray-600">Aug 6, 2026 3:33 PM</p></div>
                                <div><p className="font-semibold text-gray-900 mb-1">Last updated</p><p className="text-gray-600">Aug 6, 2026 3:33 PM</p></div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-100 rounded-xl">
                        <CardHeader className="border-b pb-4"><CardTitle className="text-lg">Update History</CardTitle></CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            {[
                                { title: 'In Progress from Pending', time: 'Aug 6, 2026 3:33 PM · 1 hour, 48 minutes ago', by: 'Himanshu Raut' },
                                { title: 'Pending', time: 'Aug 6, 2026 3:33 PM · 1 hour, 48 minutes ago', by: 'Kevin' }
                            ].map((item, i) => (
                                <Collapsible key={i} className="border-l-4 border-blue-200 pl-4">
                                    <CollapsibleTrigger className="flex w-full items-center justify-between text-left p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="space-y-1">
                                            <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.time} · By {item.by}</p>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pt-2 pl-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md mt-1">
                                        No additional comments recorded.
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="shadow-sm border-gray-100 rounded-xl">
                        <CardHeader className="border-b pb-4"><CardTitle className="text-lg">Quick Status Update</CardTitle></CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <Select>
                                <SelectTrigger><SelectValue placeholder="In Progress" /></SelectTrigger>
                                <SelectContent><SelectItem value="in-progress">In Progress</SelectItem></SelectContent>
                            </Select>
                            <Textarea placeholder="Share context for the status change" />
                            <Button className="w-full">Update Status</Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-100 rounded-xl">
                        <CardHeader className="border-b pb-4"><CardTitle className="text-lg">Edit Task</CardTitle></CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-1"><label className="text-xs font-semibold text-gray-700">Title</label><Input defaultValue="AMS" /></div>
                            <div className="space-y-1"><label className="text-xs font-semibold text-gray-700">Description</label><Textarea defaultValue="Add Multi-tenant system" /></div>
                            <div className="space-y-1"><label className="text-xs font-semibold text-gray-700">Assignee</label><Input defaultValue="Himanshu Raut (himanshu@gmail.com)" /></div>
                            <div className="space-y-1"><label className="text-xs font-semibold text-gray-700">Priority</label><Select defaultValue="medium"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="medium">Medium</SelectItem></SelectContent></Select></div>
                            <div className="space-y-1"><label className="text-xs font-semibold text-gray-700">Status</label><Select defaultValue="in-progress"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="in-progress">In Progress</SelectItem></SelectContent></Select></div>
                            <div className="space-y-1"><label className="text-xs font-semibold text-gray-700">Due date</label><Input type="date" defaultValue="2026-08-13" /></div>
                            <Button variant="outline" className="w-full">Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
