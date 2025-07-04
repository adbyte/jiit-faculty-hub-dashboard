
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Users, Clock, CheckCircle, XCircle, Play, Square, UserPlus } from 'lucide-react';
import { facialRecognitionService, AttendanceRecord } from '@/services/facialRecognitionService';
import StudentRegistrationDialog from '@/components/StudentRegistrationDialog';
import { useToast } from '@/hooks/use-toast';

const FacialAttendance = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentDetected, setCurrentDetected] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionInterval = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const courses = [
    { id: 'CSE101', name: 'Computer Fundamentals', students: 42 },
    { id: 'CSE201', name: 'Data Structures', students: 38 },
    { id: 'CSE301', name: 'Database Management', students: 35 },
    { id: 'CSE401', name: 'Software Engineering', students: 41 },
  ];

  useEffect(() => {
    return () => {
      if (recognitionInterval.current) {
        clearInterval(recognitionInterval.current);
      }
      facialRecognitionService.stopCamera();
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      const stream = await facialRecognitionService.startCamera();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsRecording(true);
      facialRecognitionService.clearAttendance();
      setAttendanceData([]);
      
      // Start recognition simulation
      recognitionInterval.current = setInterval(() => {
        const records = facialRecognitionService.simulateRecognition();
        setAttendanceData(records);
        
        // Update current detected
        const latest = records[records.length - 1];
        if (latest && latest.timestamp !== currentDetected) {
          setCurrentDetected(latest.name);
          toast({
            title: "Student Detected",
            description: `${latest.name} marked present (${latest.confidence}% confidence)`,
          });
        }
      }, 2000);

      toast({
        title: "Camera Started",
        description: "Facial recognition is now active",
      });
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Failed to start camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = () => {
    if (recognitionInterval.current) {
      clearInterval(recognitionInterval.current);
    }
    
    facialRecognitionService.stopCamera();
    setIsRecording(false);
    setCurrentDetected('');
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    toast({
      title: "Recording Stopped",
      description: `Attendance session completed. ${attendanceData.length} students marked present.`,
    });
  };

  const stats = facialRecognitionService.getAttendanceStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Facial Attendance System</h1>
          <p className="text-gray-600 mt-2">Automated attendance tracking using facial recognition</p>
        </div>
        <Button
          onClick={() => setShowRegistration(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Register Student
        </Button>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-blue-600" />
              <span>Camera Feed</span>
            </CardTitle>
            <CardDescription>Live camera feed for facial recognition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isRecording ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">LIVE</span>
                    </div>
                  </div>
                  {currentDetected && (
                    <div className="absolute bottom-4 left-4 bg-green-600 px-3 py-2 rounded-lg">
                      <span className="text-white font-medium">Detected: {currentDetected}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Camera Inactive</p>
                  <p className="text-sm">Select a course and start recording</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.id} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                {!isRecording ? (
                  <Button
                    onClick={handleStartRecording}
                    disabled={!selectedCourse}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={handleStopRecording}
                    variant="destructive"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Total Students
                </span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Present
                </span>
                <span className="font-semibold text-green-600">{stats.present}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-2 text-red-500" />
                  Absent
                </span>
                <span className="font-semibold text-red-600">{stats.absent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Attendance Rate
                </span>
                <span className="font-semibold">{stats.rate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recognition Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="secondary" className={isRecording ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {isRecording ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Model</span>
                  <Badge variant="secondary">SVM + PCA</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Processing</span>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance List */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Real-time Attendance</CardTitle>
          <CardDescription>Students detected and their attendance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Roll Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Confidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.length > 0 ? (
                  attendanceData.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                      <td className="py-3 px-4 text-gray-600">{student.rollNo}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={student.status === 'present' ? 'default' : 'destructive'}
                          className={student.status === 'present' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {student.status === 'present' ? 'Present' : 'Absent'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.confidence > 0 ? `${student.confidence}%` : '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.timestamp}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      {isRecording ? 'Scanning for faces...' : 'No attendance records yet. Start recording to begin.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <StudentRegistrationDialog
        open={showRegistration}
        onOpenChange={setShowRegistration}
      />
    </div>
  );
};

export default FacialAttendance;
