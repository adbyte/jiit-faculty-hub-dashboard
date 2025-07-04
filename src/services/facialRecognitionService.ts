
// Mock service that simulates the Python backend functionality
// In a real implementation, this would communicate with a Python backend via API

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  encodings?: number[];
}

export interface AttendanceRecord {
  id: string;
  name: string;
  rollNo: string;
  status: 'present' | 'absent';
  confidence: number;
  timestamp: string;
}

class FacialRecognitionService {
  private students: Student[] = [
    { id: '1', name: 'Aarav Sharma', rollNo: '20CSE001' },
    { id: '2', name: 'Priya Singh', rollNo: '20CSE002' },
    { id: '3', name: 'Rahul Kumar', rollNo: '20CSE003' },
    { id: '4', name: 'Sneha Patel', rollNo: '20CSE004' },
    { id: '5', name: 'Arjun Gupta', rollNo: '20CSE005' },
  ];

  private attendanceRecords: AttendanceRecord[] = [];
  private isRecording = false;
  private currentStream: MediaStream | null = null;

  async startCamera(): Promise<MediaStream> {
    try {
      this.currentStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      this.isRecording = true;
      return this.currentStream;
    } catch (error) {
      throw new Error('Failed to access camera: ' + error);
    }
  }

  stopCamera(): void {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }
    this.isRecording = false;
  }

  // Simulate face recognition (in real app, this would call Python backend)
  simulateRecognition(): AttendanceRecord[] {
    if (!this.isRecording) return this.attendanceRecords;

    // Simulate detecting random students
    const randomStudent = this.students[Math.floor(Math.random() * this.students.length)];
    const existingRecord = this.attendanceRecords.find(r => r.rollNo === randomStudent.rollNo);
    
    if (!existingRecord && Math.random() > 0.7) { // 30% chance to detect
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        name: randomStudent.name,
        rollNo: randomStudent.rollNo,
        status: 'present',
        confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
        timestamp: new Date().toLocaleTimeString()
      };
      this.attendanceRecords.push(newRecord);
    }

    return this.attendanceRecords;
  }

  registerStudent(name: string, rollNo: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate registration process
      setTimeout(() => {
        const newStudent: Student = {
          id: Date.now().toString(),
          name,
          rollNo
        };
        this.students.push(newStudent);
        console.log(`Student ${name} registered successfully`);
        resolve(true);
      }, 3000); // Simulate 3 second registration process
    });
  }

  getRegisteredStudents(): Student[] {
    return this.students;
  }

  clearAttendance(): void {
    this.attendanceRecords = [];
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  getAttendanceStats() {
    const totalStudents = this.students.length;
    const presentCount = this.attendanceRecords.length;
    const absentCount = totalStudents - presentCount;
    const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

    return {
      total: totalStudents,
      present: presentCount,
      absent: absentCount,
      rate: attendanceRate
    };
  }
}

export const facialRecognitionService = new FacialRecognitionService();
