import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MapPin, Brain, Gamepad2, Users, Flame, Star, Trophy, ChevronRight, Settings, Gift, Zap } from 'lucide-react';
import { toast } from 'sonner';
import type { FlowType } from '../App';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  totalXP: number;
  badges: string[];
  settings: {
    notifications: boolean;
    soundEffects: boolean;
    autoplay: boolean;
    theme: 'light' | 'dark';
    language: string;
    practiceReminders: boolean;
  };
}

interface DashboardProps {
  userProfile: UserProfile;
  onNavigate: (flow: FlowType) => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function Dashboard({ userProfile, onNavigate }: DashboardProps) {
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  
  const xpToNextLevel = (userProfile.level * 100) - (userProfile.totalXP % 100);
  const currentLevelProgress = (userProfile.totalXP % 100);

  const modules = [
    {
      id: 'scenario' as FlowType,
      title: 'Scenario Journey',
      description: 'Practice real-life conversations with AI characters',
      icon: <MapPin className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-700',
      features: ['Story-driven roleplay', 'Live feedback', 'Progressive difficulty'],
      badge: 'Popular'
    },
    {
      id: 'skills' as FlowType,
      title: 'Skill Builder',
      description: 'Focus on specific communication skills',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      textColor: 'text-green-700',
      features: ['Skill scorecards', 'Weekly progress', 'Grammar & tone feedback'],
      badge: null
    },
    {
      id: 'game' as FlowType,
      title: 'Game Mode',
      description: 'Gamified challenges and competitions',
      icon: <Gamepad2 className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      textColor: 'text-orange-700',
      features: ['Daily challenges', 'Boss levels', 'Leaderboards'],
      badge: 'New'
    },
    {
      id: 'coach' as FlowType,
      title: 'Coach on Demand',
      description: 'Custom scenarios for any situation',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      textColor: 'text-purple-700',
      features: ['Custom scenarios', 'Instant AI generation', 'Flexible practice'],
      badge: null
    }
  ];

  const recentBadges = [
    { name: 'First Steps', emoji: '👋', color: 'bg-blue-100 text-blue-800', description: 'Completed your first conversation!' },
    { name: 'Quick Learner', emoji: '⚡', color: 'bg-yellow-100 text-yellow-800', description: 'Mastered 3 skills quickly' },
    { name: 'Conversation Starter', emoji: '💬', color: 'bg-green-100 text-green-800', description: 'Started 10 conversations' }
  ];

  const handleModuleClick = (moduleId: FlowType) => {
    if (userProfile.settings.soundEffects) {
      // Simulate sound effect
      toast.success('Loading module...');
    }
    onNavigate(moduleId);
  };

  const handleBadgeClick = () => {
    setShowBadgeModal(true);
    if (userProfile.settings.soundEffects) {
      toast.info('Badge details opened!');
    }
  };

  const handleRewardClaim = () => {
    setShowRewardModal(true);
    toast.success('🎉 Daily reward claimed! +50 XP');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {userProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <motion.h1 
                  className="text-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome back, {userProfile.name}! 👋
                </motion.h1>
                <p className="text-gray-600">Ready to level up your conversation skills?</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl hover:bg-orange-50 border-orange-200"
                  onClick={handleRewardClaim}
                >
                  <Gift className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-orange-600">Daily Reward</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl"
                  onClick={() => onNavigate('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <h3 className="text-xl mb-1">Level {userProfile.level}</h3>
                <p className="text-purple-100">{xpToNextLevel} XP to next level</p>
              </motion.div>
              <div className="flex items-center gap-4">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Flame className="w-5 h-5 text-orange-300" />
                  <span>{userProfile.streak} day streak</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    <Star className="w-3 h-3 mr-1" />
                    {userProfile.totalXP} Total XP
                  </Badge>
                </motion.div>
              </div>
            </div>
            <div className="relative z-10">
              <Progress value={currentLevelProgress} className="h-3 bg-white/20" />
            </div>
          </Card>
        </motion.div>

        {/* Recent Badges */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Recent Achievements
          </h3>
          <div className="flex gap-3">
            {recentBadges.map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Badge 
                  className={`px-3 py-2 rounded-xl ${badge.color} border-0 cursor-pointer`}
                  onClick={handleBadgeClick}
                >
                  <span className="mr-2">{badge.emoji}</span>
                  {badge.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Modules */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg mb-6">Choose Your Learning Path</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`relative overflow-hidden border-0 bg-gradient-to-br ${module.bgGradient} hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onClick={() => handleModuleClick(module.id)}
                >
                <div className="p-6">
                  {module.badge && (
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 border-0">
                      {module.badge}
                    </Badge>
                  )}
                  
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${module.gradient} flex items-center justify-center text-white mb-4`}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {module.icon}
                  </motion.div>
                  
                  <h4 className={`text-xl mb-2 ${module.textColor}`}>{module.title}</h4>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className={`w-full rounded-xl bg-gradient-to-r ${module.gradient} text-white border-0 group-hover:shadow-lg transition-all duration-200`}
                    >
                      Start Practice
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { emoji: '📈', label: 'Conversations', value: '12', color: 'blue' },
            { emoji: '⏱️', label: 'Practice Time', value: '2.5h', color: 'green' },
            { emoji: '🎯', label: 'Accuracy', value: '87%', color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Card className="p-4 bg-white/70 backdrop-blur-sm border-0 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                    whileHover={{ rotate: 10 }}
                  >
                    {stat.emoji}
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <motion.p 
                      className="text-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Badge Modal */}
        <Dialog open={showBadgeModal} onOpenChange={setShowBadgeModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Your Achievements
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {recentBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="text-3xl">{badge.emoji}</span>
                  <div>
                    <h4 className="font-medium">{badge.name}</h4>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Reward Modal */}
        <Dialog open={showRewardModal} onOpenChange={setShowRewardModal}>
          <DialogContent className="max-w-sm text-center">
            <DialogHeader>
              <DialogTitle className="text-center">
                🎉 Daily Reward Claimed!
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="py-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-2">+50 XP Earned!</h3>
              <p className="text-gray-600">Come back tomorrow for another reward</p>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}