import React, { useState } from 'react';
import { Send, MessageCircle, AlertTriangle } from 'lucide-react';
import { chatWithAI, classifySideEffect } from '../services/gemini';
import { simulateCaregiverAlert } from '../services/notifications';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'normal' | 'side-effect' | 'alert';
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI health assistant. I can help you with medication questions, side effects, and general health guidance. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      type: 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Check if this might be a side effect report
      const sideEffectKeywords = ['side effect', 'feeling sick', 'nausea', 'dizzy', 'headache', 'chest pain', 'vomiting', 'allergic', 'rash', 'breathing'];
      const isSideEffectReport = sideEffectKeywords.some(keyword => 
        inputText.toLowerCase().includes(keyword)
      );

      let aiResponse = '';
      let messageType: 'normal' | 'side-effect' | 'alert' = 'normal';

      if (isSideEffectReport) {
        // Classify the side effect
        const classification = await classifySideEffect(inputText);
        
        messageType = classification.severity === 'severe' ? 'alert' : 'side-effect';
        
        // Get AI response with medical context
        aiResponse = await chatWithAI(inputText, `This appears to be a side effect report. Classification: ${classification.classification}, Severity: ${classification.severity}`);
        
        // Add classification info to response
        aiResponse = `**Side Effect Classification:** ${classification.severity} - ${classification.classification}\n\n${aiResponse}`;
        
        // Send caregiver alert for severe side effects
        if (classification.requiresCaregiver) {
          await simulateCaregiverAlert(`MEDICAL ALERT: Patient reported severe side effect: "${inputText}". Please check on them immediately.`);
          aiResponse += "\n\n🚨 **Important:** I've sent an alert to your caregiver due to the severity of this side effect. Please consider seeking immediate medical attention if symptoms worsen.";
        }
      } else {
        // Regular AI chat
        aiResponse = await chatWithAI(inputText);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        type: messageType
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again later or contact your healthcare provider if this is urgent.",
        isUser: false,
        timestamp: new Date(),
        type: 'normal'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'side-effect':
        return 'bg-yellow-50 border-yellow-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const quickQuestions = [
    "What are common side effects of blood pressure medication?",
    "I missed my morning dose, what should I do?",
    "Can I take my medication with food?",
    "I'm feeling dizzy after taking my medicine",
    "What are drug interactions I should watch for?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MessageCircle className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Health Assistant</h1>
        </div>
        <p className="text-gray-600">
          Get instant help with medication questions, side effects, and health guidance
        </p>
      </div>

      {/* Quick Questions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : `${getMessageStyle(message.type || 'normal')} text-gray-900 border`
                }`}
              >
                {message.type === 'alert' && (
                  <div className="flex items-center text-red-600 mb-2">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">MEDICAL ALERT</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <LoadingSpinner size="sm" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about medications, side effects, or health concerns..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || loading}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This AI assistant provides general health information and is not a substitute for professional medical advice. Always consult your healthcare provider for serious health concerns or before making changes to your medication regimen.
        </p>
      </div>
    </div>
  );
};