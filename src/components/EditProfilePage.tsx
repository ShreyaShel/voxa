import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, User, Mail, Camera, Save, X } from 'lucide-react';
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

interface EditProfilePageProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function EditProfilePage({ userProfile, onBack, onUpdateProfile }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    avatar: userProfile.avatar
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateProfile({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar
      });
      setIsLoading(false);
      toast.success('Profile updated successfully!');
      onBack();
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      avatar: userProfile.avatar
    });
    onBack();
  };

  const handleAvatarUpload = () => {
    toast.info('Photo upload coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
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
            Back to Settings
          </Button>
          <div>
            <h1 className="text-2xl flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Edit Profile
            </h1>
            <p className="text-gray-600">Update your personal information</p>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            {/* Avatar Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                    {formData.name.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0"
                  onClick={handleAvatarUpload}
                >
                  <Camera className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">Click the camera icon to update your profile photo</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>

              {/* Account Stats */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-gray-900 mb-3">Account Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{userProfile.level}</p>
                    <p className="text-sm text-gray-600">Level</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{userProfile.totalXP}</p>
                    <p className="text-sm text-gray-600">Total XP</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{userProfile.streak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{userProfile.badges.length}</p>
                    <p className="text-sm text-gray-600">Badges</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}