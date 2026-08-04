'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import AddHrFormDialog from "@/components/forms/AddHrFormDialog";

export default function HrUsersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage HR Users</h1>
        <Button size="sm" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add HR
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>HR Users</CardTitle>
          <CardDescription>
            List of HR users. (This section can be populated with an API call later)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">HR user list will be displayed here.</p>
        </CardContent>
      </Card>

      <AddHrFormDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSuccess={() => {
          // You can add logic here to refresh the list if you add an API call to fetch them
          console.log("HR user added successfully");
        }} 
      />
    </div>
  );
}
