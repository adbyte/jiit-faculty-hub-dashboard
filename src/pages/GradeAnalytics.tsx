
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Award, BookOpen, Target } from 'lucide-react';
import GradePredictionForm from '@/components/GradePredictionForm';
import { commonDatabase } from '@/services/commonDatabase';

const GradeAnalytics = () => {
  const [selectedCourse, setSelectedCourse] = useState('CSE201');
  const [gradeDistributionData, setGradeDistributionData] = useState<any[]>([]);
  const [studentPerformance, setStudentPerformance] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    classAverage: 0,
    passRate: 0,
    attendanceAverage: 0
  });

  useEffect(() => {
    updateDataForCourse(selectedCourse);
  }, [selectedCourse]);

  const updateDataForCourse = (courseId: string) => {
    const gradeData = commonDatabase.getGradeDistribution(courseId);
    const students = commonDatabase.getStudentsByCourse(courseId);
    const courseStats = commonDatabase.getClassStats(courseId);

    setGradeDistributionData(gradeData);
    setStudentPerformance(students);
    setStats(courseStats);
  };

  const courses = commonDatabase.getCourses();

  const performanceTrendData = [
    { exam: 'Quiz 1', average: 7.2, highest: 9.5, lowest: 4.8 },
    { exam: 'Quiz 2', average: 7.8, highest: 9.8, lowest: 5.2 },
    { exam: 'Midterm', average: 7.5, highest: 9.2, lowest: 4.5 },
    { exam: 'Quiz 3', average: 8.1, highest: 9.7, lowest: 6.0 },
    { exam: 'Assignment', average: 8.4, highest: 9.9, lowest: 6.8 },
  ];

  const pieChartData = gradeDistributionData.map(item => ({
    name: item.grade,
    value: item.count,
    percentage: item.percentage
  }));

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280'];

  const statsData = [
    {
      title: 'Class Average',
      value: stats.classAverage.toString(),
      description: 'Current semester',
      icon: Target,
      color: 'bg-blue-500',
      trend: '+0.3 from last month',
      trendUp: true,
    },
    {
      title: 'Total Students',
      value: stats.totalStudents.toString(),
      description: 'Enrolled students',
      icon: Users,
      color: 'bg-green-500',
      trend: '2 new enrollments',
      trendUp: true,
    },
    {
      title: 'Pass Rate',
      value: `${stats.passRate}%`,
      description: 'Above grade D',
      icon: Award,
      color: 'bg-purple-500',
      trend: '+5% improvement',
      trendUp: true,
    },
    {
      title: 'Attendance',
      value: `${stats.attendanceAverage}%`,
      description: 'Average attendance',
      icon: BookOpen,
      color: 'bg-orange-500',
      trend: 'Class average',
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grade Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive analysis of student performance and grade prediction</p>
        </div>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.code} - {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trendUp ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <p className={`text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend}
                    </p>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="students">Student Details</TabsTrigger>
          <TabsTrigger value="prediction">Grade Prediction</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current grade distribution for {selectedCourse}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution Pie Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Grade Percentage</CardTitle>
                <CardDescription>Percentage breakdown of grades</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Average scores across different assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exam" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={3} name="Class Average" />
                  <Line type="monotone" dataKey="highest" stroke="#10B981" strokeWidth={2} name="Highest Score" />
                  <Line type="monotone" dataKey="lowest" stroke="#EF4444" strokeWidth={2} name="Lowest Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Individual Student Performance</CardTitle>
              <CardDescription>Detailed breakdown of each student's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Roll No</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Midterm</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Quiz 1</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Quiz 2</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Assignment</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentPerformance.map((student, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                        <td className="py-3 px-4 text-gray-600">{student.rollNo}</td>
                        <td className="py-3 px-4 text-gray-600">{student.midterm}</td>
                        <td className="py-3 px-4 text-gray-600">{student.quiz1}</td>
                        <td className="py-3 px-4 text-gray-600">{student.quiz2}</td>
                        <td className="py-3 px-4 text-gray-600">{student.assignment}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{student.total}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{student.grade}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="secondary"
                            className={
                              student.trend === 'up'
                                ? 'bg-green-100 text-green-800'
                                : student.trend === 'down'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {student.trend === 'up' ? '↗ Rising' : student.trend === 'down' ? '↘ Declining' : '→ Stable'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prediction" className="space-y-6">
          <GradePredictionForm onPredictionComplete={() => updateDataForCourse(selectedCourse)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradeAnalytics;
