import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ScenarioJourney } from './components/ScenarioJourney';
import { SkillBuilder } from './components/SkillBuilder';
import { GameMode } from './components/GameMode';
import { CoachOnDemand } from './components/CoachOnDemand';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { SettingsPage } from './components/SettingsPage';
import { EditProfilePage } from './components/EditProfilePage';
import { PrivacyPage } from './components/PrivacyPage';
import { HelpPage } from './components/HelpPage';
import { Toaster } from './components/ui/sonner';

export type FlowType = 'dashboard' | 'scenario' | 'skills' | 'game' | 'coach' | 'login' | 'onboarding' | 'settings' | 'editProfile' | 'privacy' | 'help';

export default function App() {
  const [currentFlow, setCurrentFlow] = useState<FlowType>('login');
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    avatar: '',
    level: 1,
    xp: 0,
    streak: 0,
    totalXP: 0,
    badges: [] as string[],
    isFirstTime: true,
    settings: {
      notifications: true,
      soundEffects: true,
      autoplay: true,
      practiceReminders: true
    }
  });

  const handleLogin = (name: string, email?: string, avatar?: string) => {
    setUserProfile(prev => ({ ...prev, name, email: email || '', avatar: avatar || '' }));
    if (userProfile.isFirstTime) {
      setCurrentFlow('onboarding');
    } else {
      setCurrentFlow('dashboard');
    }
  };

  const handleOnboardingComplete = () => {
    setUserProfile(prev => ({ ...prev, isFirstTime: false }));
    setCurrentFlow('dashboard');
  };

  const navigateToFlow = (flow: FlowType) => {
    setCurrentFlow(flow);
  };

  const updateProfile = (updates: Partial<typeof userProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  if (currentFlow === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentFlow === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {currentFlow === 'dashboard' && (
        <Dashboard 
          userProfile={userProfile}
          onNavigate={navigateToFlow}
          onUpdateProfile={updateProfile}
        />
      )}
      {currentFlow === 'scenario' && (
        <ScenarioJourney 
          userProfile={userProfile}
          onBack={() => setCurrentFlow('dashboard')}
          onUpdateProfile={updateProfile}
        />
      )}
      {currentFlow === 'skills' && (
        <SkillBuilder 
          userProfile={userProfile}
          onBack={() => setCurrentFlow('dashboard')}
          onUpdateProfile={updateProfile}
        />
      )}
      {currentFlow === 'game' && (
        <GameMode 
          userProfile={userProfile}
          onBack={() => setCurrentFlow('dashboard')}
          onUpdateProfile={updateProfile}
        />
      )}
      {currentFlow === 'coach' && (
        <CoachOnDemand 
          userProfile={userProfile}
          onBack={() => setCurrentFlow('dashboard')}
          onUpdateProfile={updateProfile}
        />
      )}
      {currentFlow === 'settings' && (
        <SettingsPage 
          userProfile={userProfile}
          onBack={() => setCurrentFlow('dashboard')}
          onUpdateProfile={updateProfile}
          onNavigate={navigateToFlow}
        />
      )}
      {currentFlow === 'editProfile' && (
        <EditProfilePage 
          userProfile={userProfile}
          onBack={() => setCurrentFlow('settings')}
          onUpdateProfile={updateProfile}
        />
      )}
      {currentFlow === 'privacy' && (
        <PrivacyPage 
          onBack={() => setCurrentFlow('settings')}
        />
      )}
      {currentFlow === 'help' && (
        <HelpPage 
          onBack={() => setCurrentFlow('settings')}
        />
      )}
      <Toaster />
    </div>
  );
}