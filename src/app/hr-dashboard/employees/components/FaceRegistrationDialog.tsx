import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CameraCapture } from '@/components/ui/camera-capture';

interface FaceRegistrationDialogProps {
  employeeName: string;
}

export function FaceRegistrationDialog({ employeeName }: FaceRegistrationDialogProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {isRegistered ? 'Update Face' : 'Register Face'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register Face for {employeeName}</DialogTitle>
        </DialogHeader>
        
        {isRegistered ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <Badge className="bg-success text-success-foreground">Face Registered</Badge>
            <Button onClick={() => setIsRegistered(false)}>Re-register</Button>
          </div>
        ) : (
          <CameraCapture 
            onCapture={() => setIsRegistered(true)} 
            onClose={() => {}} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
