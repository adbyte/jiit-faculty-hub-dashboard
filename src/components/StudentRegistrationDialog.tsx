
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Camera, X } from 'lucide-react';
import { facialRecognitionService } from '@/services/facialRecognitionService';
import { useToast } from '@/hooks/use-toast';

interface StudentRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StudentRegistrationDialog = ({ open, onOpenChange }: StudentRegistrationDialogProps) => {
  const [step, setStep] = useState<'form' | 'capture' | 'processing'>('form');
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [progress, setProgress] = useState(0);
  const [captureCount, setCaptureCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const maxCaptures = 50;

  useEffect(() => {
    if (step === 'capture') {
      startCapture();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [step]);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      simulateCapture();
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Failed to access camera. Please check permissions.",
        variant: "destructive"
      });
      setStep('form');
    }
  };

  const simulateCapture = () => {
    const interval = setInterval(() => {
      setCaptureCount(prev => {
        const newCount = prev + 1;
        setProgress((newCount / maxCaptures) * 100);
        
        if (newCount >= maxCaptures) {
          clearInterval(interval);
          setStep('processing');
          processRegistration();
        }
        
        return newCount;
      });
    }, 100);
  };

  const processRegistration = async () => {
    try {
      await facialRecognitionService.registerStudent(name, rollNo);
      toast({
        title: "Registration Successful",
        description: `${name} has been registered successfully!`,
      });
      handleClose();
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register student. Please try again.",
        variant: "destructive"
      });
      setStep('form');
    }
  };

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStep('form');
    setName('');
    setRollNo('');
    setProgress(0);
    setCaptureCount(0);
    onOpenChange(false);
  };

  const handleStartRegistration = () => {
    if (!name.trim() || !rollNo.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both name and roll number.",
        variant: "destructive"
      });
      return;
    }
    setStep('capture');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Register New Student</span>
          </DialogTitle>
        </DialogHeader>

        {step === 'form' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input
                id="rollNo"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter roll number (e.g., 20CSE001)"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleStartRegistration}>
                Start Registration
              </Button>
            </div>
          </div>
        )}

        {step === 'capture' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Capturing Face Data</h3>
              <p className="text-gray-600">Please look at the camera while we capture your face data</p>
            </div>
            
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">RECORDING</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {captureCount}/{maxCaptures}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <Button variant="destructive" onClick={handleClose} className="w-full">
              <X className="w-4 h-4 mr-2" />
              Cancel Registration
            </Button>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-4 text-center py-8">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="text-lg font-semibold">Processing Registration</h3>
            <p className="text-gray-600">Training the model with your face data...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentRegistrationDialog;
