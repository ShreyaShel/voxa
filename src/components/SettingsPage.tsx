import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, Settings, Bell, Volume2, Play, Camera, User, Mail, Shield, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

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
    practiceReminders: boolean;
  };
}

interface SettingsPageProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNavigate: (flow: string) => void;
}

export function SettingsPage({ userProfile, onBack, onUpdateProfile, onNavigate }: SettingsPageProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const updateSetting = (key: keyof UserProfile['settings'], value: any) => {
    const newSettings = { ...userProfile.settings, [key]: value };
    onUpdateProfile({ settings: newSettings });
    toast.success('Settings updated successfully!');
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Button 
            variant="outline" 
            onClick={onBack}
            className="rounded-xl hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-600" />
              Settings
            </h1>
            <p className="text-gray-600">Customize your Voxa experience</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Profile
              </h3>
              
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                      {userProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0"
                    onClick={() => toast.info('Photo upload coming soon!')}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h4 className="text-xl mb-1">{userProfile.name}</h4>
                <p className="text-gray-600 mb-2">{userProfile.email}</p>
                <Badge className="bg-purple-100 text-purple-800 border-0">
                  Level {userProfile.level}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total XP</span>
                  <span className="font-medium">{userProfile.totalXP}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="font-medium">{userProfile.streak} days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Badges Earned</span>
                  <span className="font-medium">{userProfile.badges.length}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => onNavigate('editProfile')}
              >
                Edit Profile
              </Button>
            </Card>
          </motion.div>

          {/* Settings Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* App Preferences */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-lg mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  App Preferences
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-gray-600">Get alerts for practice reminders</p>
                      </div>
                    </div>
                    <Switch
                      checked={userProfile.settings.notifications}
                      onCheckedChange={(checked) => updateSetting('notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Sound Effects</p>
                        <p className="text-sm text-gray-600">Play sounds for interactions</p>
                      </div>
                    </div>
                    <Switch
                      checked={userProfile.settings.soundEffects}
                      onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Auto-play Audio</p>
                        <p className="text-sm text-gray-600">Automatically play AI responses</p>
                      </div>
                    </div>
                    <Switch
                      checked={userProfile.settings.autoplay}
                      onCheckedChange={(checked) => updateSetting('autoplay', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Practice Reminders</p>
                        <p className="text-sm text-gray-600">Daily practice notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={userProfile.settings.practiceReminders}
                      onCheckedChange={(checked) => updateSetting('practiceReminders', checked)}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Account & Privacy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-lg mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Account & Privacy
                </h3>
                
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl hover:bg-gray-50"
                    onClick={() => onNavigate('privacy')}
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    Privacy Settings
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl hover:bg-gray-50"
                    onClick={() => onNavigate('help')}
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                  </Button>

                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl hover:bg-red-50 border-red-200 text-red-600"
                      onClick={() => toast.info('Sign out functionality coming soon!')}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}