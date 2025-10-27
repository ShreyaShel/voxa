import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Gamepad2, Trophy, Zap, Crown, Target, Mic, Volume2, Star, Flame } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  level: number;
  xp: number;
  streak: number;
  totalXP: number;
  badges: string[];
}

interface GameModeProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function GameMode({ userProfile, onBack }: GameModeProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [isInChallenge, setIsInChallenge] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  const dailyChallenges = [
    {
      id: 'speed_chat',
      title: 'Speed Chat Challenge',
      description: 'Have a 2-minute conversation about a random topic',
      points: 50,
      timeLimit: '2 min',
      difficulty: 'Easy',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      completed: false
    },
    {
      id: 'empathy_master',
      title: 'Empathy Master',
      description: 'Respond with high empathy scores in 3 scenarios',
      points: 75,
      timeLimit: '5 min',
      difficulty: 'Medium',
      icon: <Target className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      completed: true
    },
    {
      id: 'boss_level',
      title: 'Boss Level: Difficult Customer',
      description: 'Handle a challenging customer service scenario',
      points: 150,
      timeLimit: '8 min',
      difficulty: 'Hard',
      icon: <Crown className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      completed: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 2850, level: 12, avatar: '👩‍💼' },
    { rank: 2, name: 'Alex Rivera', points: 2640, level: 11, avatar: '👨‍💻' },
    { rank: 3, name: 'Maya Patel', points: 2420, level: 10, avatar: '👩‍🎓' },
    { rank: 4, name: userProfile.name, points: userProfile.totalXP, level: userProfile.level, avatar: '😊', isUser: true },
    { rank: 5, name: 'Jordan Kim', points: 1980, level: 8, avatar: '👨‍🎨' }
  ];

  const badges = [
    { name: 'Speed Demon', emoji: '⚡', description: 'Complete 10 speed challenges', progress: 7, total: 10 },
    { name: 'Empathy Expert', emoji: '❤️', description: 'Score 90%+ empathy 5 times', progress: 3, total: 5 },
    { name: 'Boss Slayer', emoji: '👑', description: 'Complete 3 boss levels', progress: 1, total: 3 },
    { name: 'Streak Master', emoji: '🔥', description: 'Maintain 7-day streak', progress: 4, total: 7 }
  ];

  const handleStartChallenge = (challengeId: string) => {
    setSelectedChallenge(challengeId);
    setIsInChallenge(true);
    setCurrentScore(0);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setCurrentScore(prev => prev + Math.floor(Math.random() * 20) + 10);
      }, 3000);
    }
  };

  if (isInChallenge && selectedChallenge) {
    const challenge = dailyChallenges.find(c => c.id === selectedChallenge)!;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsInChallenge(false)}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Button>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-100 text-yellow-800 border-0">
                <Star className="w-3 h-3 mr-1" />
                {currentScore} points
              </Badge>
              <Badge className="bg-red-100 text-red-800 border-0">
                ⏰ {challenge.timeLimit}
              </Badge>
            </div>
          </div>

          {/* Challenge Header */}
          <Card className={`p-6 mb-6 ${challenge.bgColor} border-0`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${challenge.gradient} flex items-center justify-center text-white`}>
                  {challenge.icon}
                </div>
                <div>
                  <h2 className="text-xl mb-1">{challenge.title}</h2>
                  <p className="text-gray-600">{challenge.description}</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-0">
                {challenge.difficulty}
              </Badge>
            </div>
          </Card>

          {/* Game Interface */}
          <Card className="p-8 mb-6 bg-white/80 border-0">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <Gamepad2 className="w-12 h-12 text-purple-600" />
                </div>
                {isListening && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                )}
              </div>
              <h3 className="text-xl mb-2">Challenge in Progress</h3>
              <p className="text-gray-600">Speak naturally and earn points for great conversation!</p>
            </div>

            {/* AI Prompt */}
            <div className="bg-blue-50 p-6 rounded-2xl mb-6">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-900 mb-2">
                    "Hi! I'm having trouble with my order. I placed it three days ago and it still hasn't arrived. 
                    Can you help me figure out what's going on?"
                  </p>
                  <Button size="sm" variant="outline" className="bg-white/80 border-blue-200 text-blue-700 rounded-lg">
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
                className={`w-24 h-24 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white border-0`}
                onClick={handleVoiceToggle}
              >
                <Mic className="w-10 h-10" />
              </Button>
              <p className="mt-3 text-gray-600">
                {isListening ? "🎤 Listening..." : "Tap to respond and earn points!"}
              </p>
            </div>

            {/* Live Score */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800">Current Score: {currentScore} points</span>
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-green-50 border-0 text-center">
              <div className="text-2xl mb-1">85%</div>
              <p className="text-sm text-gray-600">Empathy Score</p>
            </Card>
            <Card className="p-4 bg-blue-50 border-0 text-center">
              <div className="text-2xl mb-1">92%</div>
              <p className="text-sm text-gray-600">Clarity</p>
            </Card>
            <Card className="p-4 bg-purple-50 border-0 text-center">
              <div className="text-2xl mb-1">88%</div>
              <p className="text-sm text-gray-600">Tone</p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" className="rounded-xl">
              Skip Turn
            </Button>
            <Button 
              className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500"
              onClick={() => {
                setIsInChallenge(false);
                // Add points to user profile
              }}
            >
              Complete Challenge
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
                <Gamepad2 className="w-6 h-6 text-orange-600" />
                Game Mode
              </h1>
              <p className="text-gray-600">Gamified challenges and competitions</p>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl mb-1">{userProfile.streak} Day Streak! 🔥</h3>
                <p className="text-orange-100">Keep playing daily to maintain your streak</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              <Star className="w-4 h-4 mr-1" />
              Streak Master
            </Badge>
          </div>
        </Card>

        {/* Daily Challenges */}
        <div className="mb-8">
          <h3 className="text-lg mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Daily Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyChallenges.map((challenge) => (
              <Card 
                key={challenge.id}
                className={`overflow-hidden border-0 ${challenge.bgColor} ${
                  !challenge.completed ? 'hover:shadow-lg cursor-pointer' : 'opacity-75'
                } transition-all duration-200 relative`}
              >
                {challenge.completed && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white border-0">
                      ✓ Complete
                    </Badge>
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${challenge.gradient} flex items-center justify-center text-white mb-4`}>
                    {challenge.icon}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg">{challenge.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      ⏰ {challenge.timeLimit}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-yellow-700">{challenge.points} pts</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full rounded-xl ${
                      challenge.completed
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : `bg-gradient-to-r ${challenge.gradient} hover:scale-105 text-white`
                    } transition-transform border-0`}
                    disabled={challenge.completed}
                    onClick={() => !challenge.completed && handleStartChallenge(challenge.id)}
                  >
                    {challenge.completed ? 'Completed' : 'Start Challenge'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <Card className="p-6 bg-white/80 border-0">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Weekly Leaderboard
            </h3>
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    player.isUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    player.rank === 1 ? 'bg-yellow-500' : 
                    player.rank === 2 ? 'bg-gray-400' : 
                    player.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                  }`}>
                    {player.rank}
                  </div>
                  <div className="text-2xl">{player.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={player.isUser ? 'text-blue-800' : ''}>
                        {player.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Level {player.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{player.points} points</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Badge Progress */}
          <Card className="p-6 bg-white/80 border-0">  
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              Badge Progress
            </h3>
            <div className="space-y-4">
              {badges.map((badge, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{badge.emoji}</span>
                    <div className="flex-1">
                      <h4 className="mb-1">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {badge.progress}/{badge.total}
                    </span>
                    <span className="text-sm text-gray-600">
                      {Math.round((badge.progress / badge.total) * 100)}%
                    </span>
                  </div>
                  <Progress value={(badge.progress / badge.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}