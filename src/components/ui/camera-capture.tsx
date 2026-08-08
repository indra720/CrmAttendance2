import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        setStatus('error');
      }
    }

    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    setStatus('scanning');
    setTimeout(() => {
      setStatus('success');
      onCapture('data:image/png;base64,mock-data');
    }, 2000);
  };

  const reset = () => {
    setStatus('idle');
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Circular Camera Preview Area */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl flex items-center justify-center bg-black">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover ${status !== 'idle' ? 'hidden' : 'block'}`}
        />

        {/* Status Overlays */}
        {status !== 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
            {status === 'scanning' && <Loader2 className="w-12 h-12 animate-spin text-primary" />}
            {status === 'success' && <CheckCircle className="w-16 h-16 text-success" />}
            {status === 'error' && <XCircle className="w-16 h-16 text-destructive" />}
            <p className="mt-2 text-sm font-medium">
              {status === 'scanning' && 'Verifying...'}
              {status === 'success' && 'Verified!'}
              {status === 'error' && 'Failed'}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 w-full justify-center">
        {status === 'idle' && (
          <Button size="lg" className="rounded-full px-8" onClick={handleCapture}>
            <Camera className="w-5 h-5 mr-2" />
            Capture & Verify
          </Button>
        )}
        {(status === 'success' || status === 'error') && (
          <Button variant="outline" size="lg" className="rounded-full px-8" onClick={reset}>
            <RefreshCw className="w-5 h-5 mr-2" /> Try Again
          </Button>
        )}
        <Button variant="ghost" size="lg" className="rounded-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
