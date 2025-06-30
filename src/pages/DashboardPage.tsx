import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdherence } from '../hooks/useAdherence';
import { Pill, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { adherenceScore, loading } = useAdherence(user?.id || '');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return CheckCircle;
      case 'moderate': return Clock;
      case 'high': return AlertTriangle;
      default: return Clock;
    }
  };

  const todaysMedicines = [
    { name: 'Lisinopril', time: '8:00 AM', status: 'taken' },
    { name: 'Metformin', time: '12:00 PM', status: 'pending' },
    { name: 'Atorvastatin', time: '8:00 PM', status: 'pending' },
  ];

  const recentActivity = [
    { action: 'Took Lisinopril 10mg', time: '2 hours ago', status: 'success' },
    { action: 'Missed Metformin dose', time: '1 day ago', status: 'warning' },
    { action: 'Reported mild headache', time: '2 days ago', status: 'info' },
    { action: 'Added new medication', time: '3 days ago', status: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.user_metadata?.full_name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">Here's your medication overview for today</p>
      </div>

      {/* Adherence Score Card */}
      {adherenceScore && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Adherence Risk Score</h2>
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{adherenceScore.score}%</span>
                <div className={`flex items-center px-3 py-1 rounded-full ${getRiskColor(adherenceScore.risk_level)}`}>
                  {React.createElement(getRiskIcon(adherenceScore.risk_level), { className: 'h-4 w-4 mr-1' })}
                  <span className="text-sm font-medium capitalize">{adherenceScore.risk_level} Risk</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${adherenceScore.score}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{adherenceScore.taken_doses} taken</span>
                <span>{adherenceScore.missed_doses} missed</span>
                <span>{adherenceScore.total_doses} total</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Today's Medications</h2>
            <Pill className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {todaysMedicines.map((medicine, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    medicine.status === 'taken' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{medicine.name}</p>
                    <p className="text-sm text-gray-600">{medicine.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  medicine.status === 'taken' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {medicine.status === 'taken' ? 'Taken' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors text-left">
          <Pill className="h-8 w-8 mb-2" />
          <h3 className="font-semibold mb-1">Add Medicine</h3>
          <p className="text-sm text-blue-100">Add a new prescription</p>
        </button>
        <button className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors text-left">
          <CheckCircle className="h-8 w-8 mb-2" />
          <h3 className="font-semibold mb-1">Mark as Taken</h3>
          <p className="text-sm text-green-100">Record medication intake</p>
        </button>
        <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors text-left">
          <AlertTriangle className="h-8 w-8 mb-2" />
          <h3 className="font-semibold mb-1">Report Side Effect</h3>
          <p className="text-sm text-purple-100">Chat with AI assistant</p>
        </button>
      </div>
    </div>
  );
};