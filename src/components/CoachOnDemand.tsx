import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Users, Sparkles, Mic, Volume2, MessageCircle, Zap, Clock, Target } from 'lucide-react';

interface UserProfile {
  name: string;
  level: number;
  xp: number;
  streak: number;
  totalXP: number;
  badges: string[];
}

interface CoachOnDemandProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function CoachOnDemand({ userProfile, onBack }: CoachOnDemandProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [customRequest, setCustomRequest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInSession, setIsInSession] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionStep, setSessionStep] = useState(0);

  const quickScenarios = [
    {
      id: 'first_date',
      title: 'First Date Conversation',
      description: 'Practice making a great first impression',
      icon: '💕',
      gradient: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      estimatedTime: '5-8 min',
      difficulty: 'Beginner'
    },
    {
      id: 'salary_negotiation',
      title: 'Salary Negotiation',
      description: 'Learn to negotiate your worth professionally',
      icon: '💰',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      estimatedTime: '8-12 min',
      difficulty: 'Advanced'
    },
    {
      id: 'difficult_feedback',
      title: 'Giving Difficult Feedback',
      description: 'Deliver constructive criticism tactfully',
      icon: '🎯',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      estimatedTime: '6-10 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'parent_teacher',
      title: 'Parent-Teacher Conference',
      description: 'Discuss your child\'s progress professionally',
      icon: '🍎',
      gradient: 'from-blue-500 to-cyan-500', 
      bgColor: 'bg-blue-50',
      estimatedTime: '7-10 min',
      difficulty: 'Intermediate'
    }
  ];

  const recentSessions = [
    { title: 'Practice for a job interview at tech startup', date: '2 days ago', rating: 4.5 },
    { title: 'Apologizing to a friend after an argument', date: '1 week ago', rating: 4.2 },
    { title: 'Asking for a promotion conversation', date: '2 weeks ago', rating: 4.8 }
  ];

  const sessionSteps = [
    {
      ai: "Hi! I'm excited to help you practice. I understand you want to work on a first date conversation. Let's set the scene - imagine we just met at a coffee shop and I've asked about your hobbies. How would you respond?",
      feedback: "Great start! You're showing enthusiasm and asking follow-up questions.",
      tips: ["Share something genuine about yourself", "Ask engaging follow-up questions", "Match their energy level"]
    },
    {
      ai: "That's so interesting! I love hiking too. What's the most challenging trail you've done recently?",
      feedback: "Excellent! You're building on common interests.",
      tips: ["Share specific details", "Show genuine interest", "Keep the conversation balanced"]
    }
  ];

  const handleGenerateScenario = () => {
    if (!customRequest.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsInSession(true);
      setSessionStep(0);
    }, 2000);
  };

  const handleQuickScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setIsInSession(true);
    setSessionStep(0);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        if (sessionStep < sessionSteps.length - 1) {
          setSessionStep(sessionStep + 1);
        }
      }, 3000);
    }
  };

  if (isInSession) {
    const currentStep = sessionSteps[sessionStep] || sessionSteps[0];
    const scenarioTitle = selectedScenario 
      ? quickScenarios.find(s => s.id === selectedScenario)?.title 
      : customRequest;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsInSession(false)}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              End Session
            </Button>
            <Badge className="bg-purple-100 text-purple-800 border-0">
              Custom Practice Session
            </Badge>
          </div>

          {/* Session Info */}
          <Card className="p-4 mb-6 bg-purple-50 border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg">{scenarioTitle}</h2>
                <p className="text-sm text-gray-600">Step {sessionStep + 1} - AI Coach Session</p>
              </div>
            </div>
          </Card>

          {/* AI Coach Interface */}
          <Card className="p-8 mb-6 bg-white/80 border-0">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl mb-2">AI Practice Partner</h3>
              <Badge className="bg-purple-100 text-purple-800 border-0">Ready to help you improve</Badge>
            </div>

            {/* AI Response */}
            <div className="bg-purple-50 p-6 rounded-2xl mb-6">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-purple-900 mb-3">{currentStep.ai}</p>
                  <Button size="sm" variant="outline" className="bg-white/80 border-purple-200 text-purple-700 rounded-lg">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Replay
                  </Button>
                </div>
              </div>
            </div>

            {/* Voice Input */}
            <div className="text-center mb-6">
              <Button
                size="lg"
                className={`w-20 h-20 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white border-0`}
                onClick={handleVoiceToggle}
              >
                <Mic className="w-8 h-8" />
              </Button>
              <p className="mt-3 text-gray-600">
                {isListening ? "🎤 Listening..." : "Tap to respond naturally"}
              </p>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-3">
              <Button variant="outline" className="rounded-xl">
                Ask for Hint
              </Button>
              <Button variant="outline" className="rounded-xl">
                Try Different Approach
              </Button>
            </div>
          </Card>

          {/* Live Coaching Feedback */}
          <Card className="p-6 bg-green-50 border-0">
            <h4 className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-green-600" />
              Live Coaching Feedback
            </h4>
            <p className="text-green-800 mb-3">{currentStep.feedback}</p>
            <div className="space-y-2">
              <p className="text-sm text-green-700">💡 Coaching tips:</p>
              <ul className="space-y-1">
                {currentStep.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack} className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div>
              <h1 className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Coach on Demand
              </h1>
              <p className="text-gray-600">Request any scenario and get instant AI coaching</p>
            </div>
          </div>
        </div>

        {/* Custom Request Section */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <div className="mb-6">
            <h3 className="text-xl mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Create Your Custom Practice
            </h3>
            <p className="text-purple-100">
              Describe any conversation scenario and our AI will create a personalized roleplay experience
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Input
                placeholder="e.g., Practice for a date, asking for a raise, difficult conversation with roommate..."
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
                className="rounded-xl border-white/20 bg-white/10 placeholder:text-purple-200 text-white"
              />
            </div>
            <div>
              <Textarea
                placeholder="Add any specific details or context you'd like to include... (optional)"
                className="rounded-xl border-white/20 bg-white/10 placeholder:text-purple-200 text-white"
                rows={3}
              />
            </div>
            <Button 
              onClick={handleGenerateScenario}
              disabled={!customRequest.trim() || isGenerating}
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-xl"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Generating Scenario...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Practice Session
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Quick Scenarios */}
        <div className="mb-8">
          <h3 className="text-lg mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Quick Start Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickScenarios.map((scenario) => (
              <Card 
                key={scenario.id}
                className={`overflow-hidden border-0 ${scenario.bgColor} hover:shadow-lg cursor-pointer transition-all duration-200`}
                onClick={() => handleQuickScenario(scenario.id)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{scenario.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg mb-1">{scenario.title}</h4>
                      <p className="text-gray-600 text-sm">{scenario.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {scenario.estimatedTime}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full rounded-xl bg-gradient-to-r ${scenario.gradient} hover:scale-105 text-white transition-transform border-0`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Practice
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <Card className="p-6 bg-white/80 border-0">
          <h3 className="text-lg mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Recent Practice Sessions
          </h3>
          
          {recentSessions.length > 0 ? (
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="mb-1">{session.title}</h4>
                    <p className="text-sm text-gray-600">{session.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < Math.floor(session.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{session.rating}</span>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-lg">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No recent sessions yet. Create your first custom practice above!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}