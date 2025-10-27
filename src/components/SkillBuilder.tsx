import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Brain, Mic, Volume2, TrendingUp, Target, MessageCircle, Presentation, Handshake } from 'lucide-react';

interface UserProfile {
  name: string;
  level: number;
  xp: number;
  streak: number;
  totalXP: number;
  badges: string[];
}

interface SkillBuilderProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function SkillBuilder({ userProfile, onBack }: SkillBuilderProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isInPractice, setIsInPractice] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const skills = [
    {
      id: 'small_talk',
      title: 'Small Talk Mastery',
      description: 'Master the art of casual conversation and breaking the ice',
      icon: <MessageCircle className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      currentLevel: 3,
      maxLevel: 5,
      xpProgress: 75,
      weeklyGoal: 'Practice 3 times this week',
      weeklyProgress: 2,
      focusAreas: ['Conversation starters', 'Active listening', 'Finding common ground'],
      difficulty: 'Beginner'
    },
    {
      id: 'public_speaking',
      title: 'Public Speaking',
      description: 'Build confidence presenting ideas to groups',
      icon: <Presentation className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',  
      bgColor: 'bg-purple-50',
      currentLevel: 1,
      maxLevel: 5,
      xpProgress: 25,
      weeklyGoal: 'Complete 2 presentations',
      weeklyProgress: 0,
      focusAreas: ['Clear articulation', 'Body language', 'Managing nerves'],
      difficulty: 'Intermediate'
    },
    {
      id: 'negotiation',
      title: 'Negotiation Skills',
      description: 'Learn to negotiate effectively in various situations',
      icon: <Handshake className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      currentLevel: 2,
      maxLevel: 5,
      xpProgress: 40,
      weeklyGoal: 'Practice 4 scenarios',
      weeklyProgress: 1,
      focusAreas: ['Win-win solutions', 'Persuasion techniques', 'Handling objections'],
      difficulty: 'Advanced'
    }
  ];

  const practiceExercises = [
    {
      type: 'Conversation Starter',
      prompt: "You're at a networking event. Practice starting a conversation with someone new.",
      aiResponse: "Hi there! I'm Alex. I noticed you're also checking out the tech exhibition. Are you in the industry too?",
      feedbackAreas: ['Tone', 'Clarity', 'Engagement']
    },
    {
      type: 'Active Listening',
      prompt: "Practice responding to someone sharing their weekend plans.",
      aiResponse: "I had such a great weekend! I went hiking in the mountains and tried rock climbing for the first time.",
      feedbackAreas: ['Empathy', 'Follow-up questions', 'Interest level']
    }
  ];

  const handleStartPractice = (skillId: string) => {
    setSelectedSkill(skillId);
    setIsInPractice(true);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Simulate voice processing
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  if (isInPractice && selectedSkill) {
    const skill = skills.find(s => s.id === selectedSkill)!;
    const exercise = practiceExercises[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsInPractice(false)}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skills
            </Button>
            <Badge className="bg-blue-100 text-blue-800 border-0">
              {exercise.type}
            </Badge>
          </div>

          {/* Skill Header */}
          <Card className={`p-4 mb-6 ${skill.bgColor} border-0`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.gradient} flex items-center justify-center text-white`}>
                {skill.icon}
              </div>
              <div>
                <h2 className="text-lg">{skill.title}</h2>
                <p className="text-sm text-gray-600">Focus: {exercise.type}</p>
              </div>
            </div>
          </Card>

          {/* Exercise Prompt */}
          <Card className="p-6 mb-6 bg-white/80 border-0">
            <h3 className="text-lg mb-4">Practice Scenario</h3>
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-blue-900">{exercise.prompt}</p>
            </div>

            {/* AI Response */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-gray-900 mb-2">{exercise.aiResponse}</p>
                  <Button size="sm" variant="outline" className="rounded-lg">
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
                {isListening ? "Listening... Practice your response" : "Tap to practice your response"}
              </p>
            </div>
          </Card>

          {/* Real-time Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {exercise.feedbackAreas.map((area, index) => (
              <Card key={index} className="p-4 bg-white/60 border-0">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="mb-2">{area}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-sm text-gray-600">Good</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" className="rounded-xl">
              Try Again
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
              Next Exercise
            </Button>
          </div>
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
                <Brain className="w-6 h-6 text-green-600" />
                Skill Builder
              </h1>
              <p className="text-gray-600">Focus on specific communication skills with targeted practice</p>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">This Week's Progress</h3>
              <p className="text-green-100">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <p className="text-2xl mb-1">3/7</p>
              <p className="text-green-100 text-sm">Practice Sessions</p>
            </div>
          </div>
          <Progress value={43} className="h-2 bg-white/20" />
        </Card>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card 
              key={skill.id}
              className={`overflow-hidden border-0 ${skill.bgColor} hover:shadow-lg cursor-pointer transition-all duration-200`}
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.gradient} flex items-center justify-center text-white mb-4`}>
                  {skill.icon}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg">{skill.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {skill.difficulty}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4">{skill.description}</p>
                
                {/* Skill Level Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Skill Level {skill.currentLevel}</span>
                    <span className="text-sm text-gray-600">{skill.xpProgress}%</span>
                  </div>
                  <Progress value={skill.xpProgress} className="h-2" />
                </div>

                {/* Weekly Goal */}
                <div className="mb-4 p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Weekly Goal</span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs border-0">
                      {skill.weeklyProgress}/{skill.weeklyGoal.match(/\d+/)?.[0] || 0}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{skill.weeklyGoal}</p>
                </div>
                
                {/* Focus Areas */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Focus areas:</p>
                  <div className="space-y-1">
                    {skill.focusAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className={`w-full rounded-xl bg-gradient-to-r ${skill.gradient} hover:scale-105 text-white transition-transform border-0`}
                  onClick={() => handleStartPractice(skill.id)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Practice Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Skill Scorecard */}
        <Card className="mt-8 p-6 bg-white/80 border-0">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Your Skill Scorecard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.gradient} flex items-center justify-center text-white mx-auto mb-3`}>
                  {skill.icon}
                </div>
                <h4 className="mb-2">{skill.title}</h4>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: skill.maxLevel }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full mx-0.5 ${
                        index < skill.currentLevel ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <Badge className="bg-gray-100 text-gray-800 text-xs border-0">
                  Level {skill.currentLevel}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}