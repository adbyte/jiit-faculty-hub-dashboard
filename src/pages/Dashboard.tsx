
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Clock, TrendingUp, Calendar, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '156',
      description: 'Across all courses',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Courses',
      value: '4',
      description: 'This semester',
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Attendance Rate',
      value: '87%',
      description: 'Last 30 days',
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      title: 'Grade Average',
      value: '8.2',
      description: 'Current semester',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  const recentActivities = [
    {
      title: 'Grade submission for CSE101',
      description: 'Midterm grades uploaded',
      time: '2 hours ago',
    },
    {
      title: 'Attendance marked for CSE201',
      description: 'Data Structures class',
      time: '4 hours ago',
    },
    {
      title: 'New assignment created',
      description: 'Algorithm Analysis - Due next week',
      time: '1 day ago',
    },
  ];

  const upcomingClasses = [
    {
      course: 'Data Structures',
      code: 'CSE201',
      time: '10:00 AM - 11:30 AM',
      room: 'Room 301',
    },
    {
      course: 'Database Management',
      code: 'CSE301',
      time: '2:00 PM - 3:30 PM',
      room: 'Room 205',
    },
    {
      course: 'Software Engineering',
      code: 'CSE401',
      time: '4:00 PM - 5:30 PM',
      room: 'Room 102',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Here's what's happening in your courses today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Today's Classes</span>
            </CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{class_.course}</h4>
                    <p className="text-sm text-gray-600">{class_.code} • {class_.room}</p>
                    <p className="text-sm text-gray-500">{class_.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-green-600" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
