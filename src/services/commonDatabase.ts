
export interface Student {
  id: string;
  name: string;
  rollNo: string;
  course: string;
  semester: string;
  midterm: number;
  quiz1: number;
  quiz2: number;
  assignment: number;
  total: number;
  trend: 'up' | 'down' | 'stable';
  grade: string;
  gpa: number;
  attendance: number;
  previousSemesterGPA: number;
  cumulativeGPA: number;
  t1Marks: number;
  t2Marks: number;
  t3Marks: number;
  taMarks: number;
  numberOfBacklogs: number;
  adherenceToDeadlines: number;
  attendancePercentage: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

// Common database with consistent student data
class CommonDatabase {
  private students: Student[] = [
    {
      id: '1',
      name: 'Aditi Jain',
      rollNo: '22103310',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 8.5,
      quiz1: 7.8,
      quiz2: 8.2,
      assignment: 9.0,
      total: 8.4,
      trend: 'up',
      grade: 'A',
      gpa: 8.4,
      attendance: 85,
      previousSemesterGPA: 7.8,
      cumulativeGPA: 8.1,
      t1Marks: 18,
      t2Marks: 17,
      t3Marks: 30,
      taMarks: 22,
      numberOfBacklogs: 0,
      adherenceToDeadlines: 4,
      attendancePercentage: 85
    },
    {
      id: '2',
      name: 'Rohit Sharma',
      rollNo: '22103311',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 9.2,
      quiz1: 8.9,
      quiz2: 9.1,
      assignment: 9.5,
      total: 9.2,
      trend: 'up',
      grade: 'A+',
      gpa: 9.2,
      attendance: 92,
      previousSemesterGPA: 8.5,
      cumulativeGPA: 8.8,
      t1Marks: 20,
      t2Marks: 19,
      t3Marks: 33,
      taMarks: 24,
      numberOfBacklogs: 0,
      adherenceToDeadlines: 5,
      attendancePercentage: 92
    },
    {
      id: '3',
      name: 'Priya Singh',
      rollNo: '22103312',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 6.8,
      quiz1: 7.2,
      quiz2: 6.5,
      assignment: 7.8,
      total: 7.1,
      trend: 'down',
      grade: 'B',
      gpa: 7.1,
      attendance: 78,
      previousSemesterGPA: 8.0,
      cumulativeGPA: 7.6,
      t1Marks: 15,
      t2Marks: 14,
      t3Marks: 25,
      taMarks: 18,
      numberOfBacklogs: 1,
      adherenceToDeadlines: 2,
      attendancePercentage: 78
    },
    {
      id: '4',
      name: 'Arjun Gupta',
      rollNo: '22103313',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 8.8,
      quiz1: 8.5,
      quiz2: 8.9,
      assignment: 9.2,
      total: 8.9,
      trend: 'up',
      grade: 'A',
      gpa: 8.9,
      attendance: 88,
      previousSemesterGPA: 8.2,
      cumulativeGPA: 8.5,
      t1Marks: 19,
      t2Marks: 18,
      t3Marks: 31,
      taMarks: 23,
      numberOfBacklogs: 0,
      adherenceToDeadlines: 4,
      attendancePercentage: 88
    },
    {
      id: '5',
      name: 'Sneha Patel',
      rollNo: '22103314',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 7.5,
      quiz1: 7.8,
      quiz2: 7.2,
      assignment: 8.1,
      total: 7.7,
      trend: 'stable',
      grade: 'B+',
      gpa: 7.7,
      attendance: 82,
      previousSemesterGPA: 7.6,
      cumulativeGPA: 7.7,
      t1Marks: 16,
      t2Marks: 15,
      t3Marks: 27,
      taMarks: 20,
      numberOfBacklogs: 0,
      adherenceToDeadlines: 3,
      attendancePercentage: 82
    },
    {
      id: '6',
      name: 'Vikram Kumar',
      rollNo: '22103315',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 5.2,
      quiz1: 6.1,
      quiz2: 5.8,
      assignment: 6.5,
      total: 5.9,
      trend: 'down',
      grade: 'C',
      gpa: 5.9,
      attendance: 65,
      previousSemesterGPA: 6.8,
      cumulativeGPA: 6.4,
      t1Marks: 12,
      t2Marks: 11,
      t3Marks: 20,
      taMarks: 15,
      numberOfBacklogs: 2,
      adherenceToDeadlines: 2,
      attendancePercentage: 65
    },
    {
      id: '7',
      name: 'Kavya Reddy',
      rollNo: '22103316',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 9.5,
      quiz1: 9.2,
      quiz2: 9.6,
      assignment: 9.8,
      total: 9.5,
      trend: 'up',
      grade: 'A+',
      gpa: 9.5,
      attendance: 95,
      previousSemesterGPA: 9.0,
      cumulativeGPA: 9.2,
      t1Marks: 20,
      t2Marks: 20,
      t3Marks: 35,
      taMarks: 25,
      numberOfBacklogs: 0,
      adherenceToDeadlines: 5,
      attendancePercentage: 95
    },
    {
      id: '8',
      name: 'Rahul Verma',
      rollNo: '22103317',
      course: 'CSE201',
      semester: 'Fall 2024',
      midterm: 4.8,
      quiz1: 5.2,
      quiz2: 4.5,
      assignment: 5.8,
      total: 5.1,
      trend: 'down',
      grade: 'C',
      gpa: 5.1,
      attendance: 58,
      previousSemesterGPA: 6.2,
      cumulativeGPA: 5.7,
      t1Marks: 10,
      t2Marks: 9,
      t3Marks: 18,
      taMarks: 13,
      numberOfBacklogs: 3,
      adherenceToDeadlines: 1,
      attendancePercentage: 58
    }
  ];

  private courses: Course[] = [
    { id: 'CSE101', name: 'Computer Fundamentals', code: 'CSE101' },
    { id: 'CSE201', name: 'Data Structures', code: 'CSE201' },
    { id: 'CSE301', name: 'Database Management', code: 'CSE301' },
    { id: 'CSE401', name: 'Software Engineering', code: 'CSE401' },
  ];

  getAllStudents(): Student[] {
    return [...this.students];
  }

  getStudentsBycourse(courseId: string): Student[] {
    return this.students.filter(student => student.course === courseId);
  }

  getStudentById(id: string): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  getStudentByRollNo(rollNo: string): Student | undefined {
    return this.students.find(student => student.rollNo === rollNo);
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  updateStudent(id: string, updatedStudent: Partial<Student>): void {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updatedStudent };
    }
  }

  getCourses(): Course[] {
    return [...this.courses];
  }

  getGradeDistribution(courseId: string): { grade: string; count: number; percentage: number }[] {
    const courseStudents = this.getStudentsByourse(courseId);
    const gradeCount = courseStudents.reduce((acc, student) => {
      acc[student.grade] = (acc[student.grade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = courseStudents.length;
    const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
    
    return grades.map(grade => ({
      grade,
      count: gradeCount[grade] || 0,
      percentage: total > 0 ? Math.round(((gradeCount[grade] || 0) / total) * 100) : 0
    }));
  }

  getClassStats(courseId: string) {
    const courseStudents = this.getStudentsByourse(courseId);
    const totalStudents = courseStudents.length;
    
    if (totalStudents === 0) {
      return {
        totalStudents: 0,
        classAverage: 0,
        passRate: 0,
        attendanceAverage: 0
      };
    }

    const averageGPA = courseStudents.reduce((sum, student) => sum + student.gpa, 0) / totalStudents;
    const passCount = courseStudents.filter(student => ['A+', 'A', 'B+', 'B', 'C+', 'C'].includes(student.grade)).length;
    const passRate = (passCount / totalStudents) * 100;
    const attendanceAverage = courseStudents.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;

    return {
      totalStudents,
      classAverage: Number(averageGPA.toFixed(1)),
      passRate: Math.round(passRate),
      attendanceAverage: Math.round(attendanceAverage)
    };
  }

  // Helper method to fix typo
  private getStudentsByourse(courseId: string): Student[] {
    return this.getStudentsByourse(courseId);
  }
}

export const commonDatabase = new CommonDatabase();
