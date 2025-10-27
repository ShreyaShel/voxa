import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { MapPin, Brain, Gamepad2, Users, ChevronRight, Mic, Volume2, Headphones, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [micTested, setMicTested] = useState(false);

  const steps = [
    {
      title: "Welcome to Voxa!",
      description: "Your AI-powered conversation coach that helps you practice real-world scenarios",
      icon: <Mic className="w-12 h-12 text-purple-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Voxa uses advanced AI to create realistic conversation practice scenarios. 
            You'll speak naturally, get instant feedback, and build confidence in real-world situations.
          </p>
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800">Voice-First Experience</span>
            </div>
            <p className="text-sm text-purple-700">
              All interactions happen through natural speech - no typing required!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Four Learning Paths",
      description: "Choose how you want to practice and improve your conversation skills",
      icon: <ChevronRight className="w-12 h-12 text-blue-600" />,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-2 border-blue-200 bg-blue-50">
            <MapPin className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="mb-1">Scenario Journey</h4>
            <p className="text-sm text-gray-600">Story-driven roleplay in real-life situations</p>
          </Card>
          <Card className="p-4 border-2 border-green-200 bg-green-50">
            <Brain className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="mb-1">Skill Builder</h4>
            <p className="text-sm text-gray-600">Focus on specific communication skills</p>
          </Card>
          <Card className="p-4 border-2 border-orange-200 bg-orange-50">
            <Gamepad2 className="w-8 h-8 text-orange-600 mb-2" />
            <h4 className="mb-1">Game Mode</h4>
            <p className="text-sm text-gray-600">Gamified challenges and competitions</p>
          </Card>
          <Card className="p-4 border-2 border-purple-200 bg-purple-50">
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="mb-1">Coach on Demand</h4>
            <p className="text-sm text-gray-600">Custom scenarios for any situation</p>
          </Card>
        </div>
      )
    },
    {
      title: "Gamification & Progress",
      description: "Track your improvement with XP, badges, and skill scorecards",
      icon: <Badge className="w-12 h-12 text-green-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-purple-800">Your Progress</span>
              <Badge className="bg-purple-100 text-purple-800">Level 1</Badge>
            </div>
            <Progress value={25} className="h-2 mb-2" />
            <p className="text-sm text-purple-700">25 XP until Level 2</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-200 rounded-full mx-auto mb-1 flex items-center justify-center">
                🏆
              </div>
              <p className="text-xs text-yellow-800">Badges</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-200 rounded-full mx-auto mb-1 flex items-center justify-center">
                📊
              </div>
              <p className="text-xs text-blue-800">Streaks</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-200 rounded-full mx-auto mb-1 flex items-center justify-center">
                📈
              </div>
              <p className="text-xs text-green-800">Skills</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Audio Setup",
      description: "Let's make sure your microphone is working properly",
      icon: <Headphones className="w-12 h-12 text-orange-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-xl text-center">
            <Headphones className="w-16 h-16 text-orange-600 mx-auto mb-3" />
            <p className="text-orange-800 mb-3">
              For the best experience, use headphones or earbuds to prevent echo
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                onClick={() => {
                  // Simulate mic test
                  toast.info('Testing microphone...');
                  setTimeout(() => {
                    setMicTested(true);
                    toast.success("✅ Microphone test successful! You're ready to start.");
                  }, 1500);
                }}
                disabled={micTested}
              >
                {micTested ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Microphone Ready
                  </>
                ) : (
                  'Test Microphone'
                )}
              </Button>
            </motion.div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Speak clearly and at a normal pace</p>
            <p>• Find a quiet environment for best results</p>
            <p>• Voxa will guide you through each conversation</p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-pink-200 rounded-full opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-purple-600 border-purple-300">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <motion.div 
              className="w-32"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />
            </motion.div>
          </div>
          
          <div className="text-center mb-6">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.3, 
                type: "spring", 
                stiffness: 300, 
                damping: 10 
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {currentStepData.icon}
            </motion.div>
            <motion.h2 
              className="text-2xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentStepData.title}
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {currentStepData.description}
            </motion.p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            className="mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStepData.content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-xl"
          >
            Previous
          </Button>
          
          {isLastStep ? (
            <Button
              onClick={onComplete}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Start Using Voxa
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Next
            </Button>
          )}
        </div>
        </Card>
      </motion.div>
    </div>
  );
}