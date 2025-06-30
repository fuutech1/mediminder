import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, MessageCircle, Shield, Users, BarChart3, Play } from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Smart Reminders',
      description: 'Never miss a dose with intelligent scheduling and notifications',
      demo: 'Try Demo'
    },
    {
      icon: MessageCircle,
      title: 'AI Health Assistant',
      description: 'Chat with AI about side effects and get instant medical guidance',
      demo: 'Chat Now'
    },
    {
      icon: BarChart3,
      title: 'Adherence Tracking',
      description: 'Monitor your medication adherence with detailed analytics',
      demo: 'View Sample'
    },
    {
      icon: Shield,
      title: 'Caregiver Alerts',
      description: 'Automatic alerts to caregivers for severe side effects',
      demo: 'See How'
    }
  ];

  const handleDemoClick = (feature: string) => {
    switch (feature) {
      case 'Smart Reminders':
        alert('🔔 Demo: "Time to take your morning Lisinopril 10mg!" - This reminder would appear at your scheduled time.');
        break;
      case 'AI Health Assistant':
        alert('🤖 Demo: "Hello! I\'m your AI health assistant. I can help you understand side effects, medication interactions, and provide general health guidance. What would you like to know?"');
        break;
      case 'Adherence Tracking':
        alert('📊 Demo: Your adherence score is 87% this month. You\'ve taken 26 out of 30 scheduled doses. Great job! Consider setting more reminders for evening medications.');
        break;
      case 'Caregiver Alerts':
        alert('🚨 Demo: "ALERT: John reported severe chest pain after taking medication. Emergency contact has been notified via SMS." - This would be sent to your designated caregiver.');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3">
                <Pill className="h-16 w-16 text-blue-600" />
                <h1 className="text-5xl font-bold text-gray-900">MediMinder</h1>
              </div>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your intelligent medication companion. Never miss a dose, stay safe with AI-powered side effect monitoring, and keep your caregivers informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Medication Management
          </h2>
          <p className="text-xl text-gray-600">
            Try our demo features to see how MediMinder can help you stay healthy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <button
                  onClick={() => handleDemoClick(feature.title)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Play className="h-4 w-4 mr-1" />
                  {feature.demo}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-lg text-gray-600">Medication Adherence Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-lg text-gray-600">AI Health Assistant</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Instant</div>
              <div className="text-lg text-gray-600">Caregiver Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust MediMinder for their medication management
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};