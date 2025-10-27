import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, Play, Pause, RotateCcw, Star, MapPin, Users, Coffee, Briefcase, Volume2, Mic, Award, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  level: number;
  xp: number;
  streak: number;
  totalXP: number;
  badges: string[];
}

interface ScenarioJourneyProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function ScenarioJourney({ userProfile, onBack, onUpdateProfile }: ScenarioJourneyProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isInConversation, setIsInConversation] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const scenarios = [
    {
      id: 'coffee_shop',
      title: 'Coffee Shop Order',
      description: 'Practice ordering at a busy coffee shop',
      difficulty: 'Beginner',
      icon: <Coffee className="w-6 h-6" />,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      character: 'Friendly Barista',
      duration: '3-5 min',
      skills: ['Small talk', 'Clear ordering', 'Polite requests'],
      unlocked: true
    },
    {
      id: 'job_interview',
      title: 'Job Interview',
      description: 'Navigate common interview questions with confidence',
      difficulty: 'Intermediate',
      icon: <Briefcase className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      character: 'HR Manager',
      duration: '8-12 min',
      skills: ['Professional tone', 'Clear answers', 'Confidence'],
      unlocked: userProfile.level >= 2
    },
    {
      id: 'networking_event',
      title: 'Networking Event',
      description: 'Make meaningful connections at a professional event',
      difficulty: 'Advanced',
      icon: <Users className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      character: 'Fellow Professional',
      duration: '10-15 min',
      skills: ['Conversation starters', 'Active listening', 'Follow-up'],
      unlocked: userProfile.level >= 5
    }
  ];

  const conversationSteps = [
    {
      character: "Hi there! Welcome to Bean There Coffee. What can I get started for you today?",
      feedback: "Great opening! The barista is friendly and ready to help.",
      suggestions: ["Start with a greeting", "Be clear about what you want", "Don't be afraid to ask questions"]
    },
    {
      character: "Perfect choice! Would you like that as a small, medium, or large?",
      feedback: "Good job being clear with your order!",
      suggestions: ["Specify size clearly", "Consider asking about options", "Be polite and friendly"]
    },
    {
      character: "Excellent! That'll be $4.50. Would you like to add anything else today?",
      feedback: "Nice interaction! You're building rapport well.",
      suggestions: ["Consider the upsell", "Thank them for the service", "Have your payment ready"]
    }
  ];

  const handleStartConversation = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario?.unlocked) {
      toast.error('This scenario is locked! Complete previous scenarios to unlock.');
      return;
    }
    
    setSelectedScenario(scenarioId);
    setIsInConversation(true);
    setConversationStep(0);
    toast.success(`Starting ${scenario.title}! 🎬`);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      toast.info('Listening... 🎤');
    }
    
    setIsListening(!isListening);
    // Simulate voice processing
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        if (conversationStep < conversationSteps.length - 1) {
          setConversationStep(conversationStep + 1);
          toast.success('Good response! 👏');
        } else {
          // End conversation
          setIsInConversation(false);
          setShowResults(true);
          onUpdateProfile({ 
            xp: userProfile.xp + 25,
            totalXP: userProfile.totalXP + 25 
          });
          toast.success('Scenario completed! +25 XP 🎉');
        }
      }, 3000);
    }
  };

  const handleRetry = () => {
    setConversationStep(Math.max(0, conversationStep - 1));
    toast.info('Let\'s try that again! 🔄');
  };

  if (isInConversation && selectedScenario) {
    const scenario = scenarios.find(s => s.id === selectedScenario)!;
    const currentStep = conversationSteps[conversationStep];
    const isLastStep = conversationStep === conversationSteps.length - 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                onClick={() => setIsInConversation(false)}
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scenarios
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 10 }}
            >
              <Badge className="bg-green-100 text-green-800 border-0">
                Step {conversationStep + 1} of {conversationSteps.length}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Scenario Info */}
          <Card className={`p-4 mb-6 ${scenario.bgColor} border-0`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${scenario.gradient} flex items-center justify-center text-white`}>
                {scenario.icon}
              </div>
              <div>
                <h2 className="text-lg">{scenario.title}</h2>
                <p className="text-sm text-gray-600">Speaking with: {scenario.character}</p>
              </div>
            </div>
          </Card>

          {/* Conversation Area */}
          <Card className="p-8 mb-6 bg-white/80 border-0">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl mb-2">AI Character</h3>
              <Badge className="bg-blue-100 text-blue-800 border-0">{scenario.character}</Badge>
            </div>

            {/* Character Speech */}
            <div className="bg-blue-50 p-6 rounded-2xl mb-6">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-900 mb-2">{currentStep.character}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/80 border-blue-200 text-blue-700 rounded-lg"
                  >
                    <Volume2 className="w-3 h-3 mr-1" />
                    Replay
                  </Button>
                </div>
              </div>
            </div>

            {/* Voice Input */}
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isListening ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={isListening ? { duration: 0.8, repeat: Infinity } : {}}
              >
                <Button
                  size="lg"
                  className={`w-20 h-20 rounded-full ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white border-0 shadow-lg transition-all duration-200`}
                  onClick={handleVoiceToggle}
                >
                  <Mic className="w-8 h-8" />
                </Button>
              </motion.div>
              <motion.p 
                className="mt-3 text-gray-600"
                animate={{ opacity: isListening ? [1, 0.7, 1] : 1 }}
                transition={isListening ? { duration: 1, repeat: Infinity } : {}}
              >
                {isListening ? "Listening... Speak now" : "Tap to speak your response"}
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleRetry}
                disabled={conversationStep === 0}
                className="rounded-xl"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              {isLastStep && (
                <Button 
                  onClick={() => {
                    setIsInConversation(false);
                    onUpdateProfile({ 
                      xp: userProfile.xp + 25,
                      totalXP: userProfile.totalXP + 25 
                    });
                  }}
                  className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  Complete Scenario
                </Button>
              )}
            </div>
          </Card>

          {/* Live Feedback */}
          <Card className="p-6 bg-yellow-50 border-0">
            <h4 className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-600" />
              Live Feedback
            </h4>
            <p className="text-yellow-800 mb-3">{currentStep.feedback}</p>
            <div className="space-y-2">
              <p className="text-sm text-yellow-700">💡 Tips for this interaction:</p>
              <ul className="space-y-1">
                {currentStep.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-yellow-700 flex items-center gap-2">
                    <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                    {suggestion}
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
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={onBack} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </motion.div>
            <div>
              <h1 className="text-2xl flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Scenario Journey
              </h1>
              <p className="text-gray-600">Practice real-life conversations with AI characters</p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h3 className="text-lg mb-1">Journey Progress</h3>
                <p className="text-blue-100">Complete scenarios to unlock new challenges</p>
              </div>
              <div className="text-right">
                <motion.p 
                  className="text-2xl mb-1"
                  whileHover={{ scale: 1.1 }}
                >
                  1/3
                </motion.p>
                <p className="text-blue-100 text-sm">Scenarios Completed</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Scenarios Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ 
                scale: scenario.unlocked ? 1.02 : 1,
                y: scenario.unlocked ? -5 : 0
              }}
              whileTap={{ scale: scenario.unlocked ? 0.98 : 1 }}
            >
              <Card 
                className={`relative overflow-hidden border-0 ${scenario.bgColor} ${
                  scenario.unlocked ? 'hover:shadow-xl cursor-pointer' : 'opacity-60'
                } transition-all duration-300`}
              >
              <div className="p-6">
                {!scenario.unlocked && (
                  <motion.div 
                    className="absolute inset-0 bg-black/10 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Badge className="bg-gray-500 text-white flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      Level {scenario.id === 'job_interview' ? 2 : 5} Required
                    </Badge>
                  </motion.div>
                )}
                
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${scenario.gradient} flex items-center justify-center text-white mb-4`}
                  whileHover={{ 
                    scale: scenario.unlocked ? 1.1 : 1,
                    rotate: scenario.unlocked ? 5 : 0 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {scenario.icon}
                </motion.div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg">{scenario.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {scenario.difficulty}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {scenario.character}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {scenario.duration}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Skills practiced:</p>
                  <div className="flex flex-wrap gap-1">
                    {scenario.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className={`w-full rounded-xl ${
                      scenario.unlocked 
                        ? `bg-gradient-to-r ${scenario.gradient} text-white`
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } border-0 transition-all duration-200`}
                    disabled={!scenario.unlocked}
                    onClick={() => scenario.unlocked && handleStartConversation(scenario.id)}
                  >
                    {scenario.unlocked ? (
                      <Play className="w-4 h-4 mr-2" />
                    ) : (
                      <Lock className="w-4 h-4 mr-2" />
                    )}
                    {scenario.unlocked ? 'Start Scenario' : 'Locked'}
                  </Button>
                </motion.div>
              </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Results Modal */}
        <Dialog open={showResults} onOpenChange={setShowResults}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-yellow-600" />
                Scenario Complete!
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-2">Great Job!</h3>
              <p className="text-gray-600 mb-4">You've earned +25 XP</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Clarity:</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Flow:</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}