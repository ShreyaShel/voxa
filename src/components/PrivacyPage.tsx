import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ArrowLeft, Shield, Eye, Database, Trash2, Download, Lock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    analytics: true,
    personalizedAds: false,
    shareProgress: true,
    publicProfile: false,
    voiceDataStorage: true
  });

  const updatePrivacySetting = (key: keyof typeof privacySettings, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    toast.success('Privacy setting updated');
  };

  const handleDataExport = () => {
    toast.info('Your data export will be ready in 24-48 hours. We\'ll send you an email when it\'s available.');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion is a permanent action. Please contact support to proceed.');
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
            Back to Settings
          </Button>
          <div>
            <h1 className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-600" />
              Privacy Settings
            </h1>
            <p className="text-gray-600">Control your data and privacy preferences</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Data Collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Data Collection & Usage
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Usage Analytics</p>
                      <p className="text-sm text-gray-600">Help us improve Voxa by sharing anonymous usage data</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.analytics}
                    onCheckedChange={(checked) => updatePrivacySetting('analytics', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Voice Data Storage</p>
                      <p className="text-sm text-gray-600">Store voice recordings to improve AI responses</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.voiceDataStorage}
                    onCheckedChange={(checked) => updatePrivacySetting('voiceDataStorage', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Personalized Experience</p>
                      <p className="text-sm text-gray-600">Use your data to personalize content and recommendations</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.dataCollection}
                    onCheckedChange={(checked) => updatePrivacySetting('dataCollection', checked)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Profile Visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                Profile & Sharing
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-gray-600">Make your profile visible to other Voxa users</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.publicProfile}
                    onCheckedChange={(checked) => updatePrivacySetting('publicProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Share Progress</p>
                      <p className="text-sm text-gray-600">Allow sharing of achievements and progress with friends</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.shareProgress}
                    onCheckedChange={(checked) => updatePrivacySetting('shareProgress', checked)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-600" />
                Data Management
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Export Your Data</h4>
                      <p className="text-sm text-blue-700 mb-3">Download a copy of all your data including progress, settings, and voice recordings</p>
                      <Button 
                        variant="outline" 
                        className="bg-white hover:bg-blue-50 border-blue-300 text-blue-700"
                        onClick={handleDataExport}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Request Data Export
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Delete Account</h4>
                      <p className="text-sm text-red-700 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <Button 
                        variant="outline" 
                        className="bg-white hover:bg-red-50 border-red-300 text-red-700"
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Your Privacy Matters
              </h3>
              
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  At Voxa, we're committed to protecting your privacy and giving you control over your data. 
                  We use industry-standard encryption and security measures to keep your information safe.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Encrypted Storage</p>
                      <p className="text-xs">All data is encrypted at rest and in transit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">No Sale of Data</p>
                      <p className="text-xs">We never sell your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Transparent Usage</p>
                      <p className="text-xs">Clear information about how we use your data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Full Control</p>
                      <p className="text-xs">Delete or export your data anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}