import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, HelpCircle, MessageCircle, Book, Video, Mail, Phone, Search, Send } from 'lucide-react';
import { toast } from 'sonner';

interface HelpPageProps {
  onBack: () => void;
}

export function HelpPage({ onBack }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: ''
  });

  const faqs = [
    {
      question: "How do I start my first coaching session?",
      answer: "To begin your first session, go to the Dashboard and select either 'Scenario Journey' for story-driven practice or 'Skill Builder' for targeted skill development. Each module will guide you through the setup process and explain how voice interactions work."
    },
    {
      question: "What types of scenarios are available?",
      answer: "Voxa offers four main types of practice: Scenario Journey (real-life situations like job interviews, coffee shop interactions), Skill Builder (targeted practice for specific communication skills), Game Mode (daily challenges with streaks and rewards), and Coach on Demand (custom scenarios for any situation you want to practice)."
    },
    {
      question: "How does the AI voice coaching work?",
      answer: "Our AI coach uses advanced voice recognition and natural language processing to understand your responses and provide real-time feedback. The AI adapts to your communication style and provides personalized suggestions to help you improve specific areas like confidence, clarity, and engagement."
    },
    {
      question: "Can I track my progress over time?",
      answer: "Yes! Voxa includes comprehensive progress tracking with XP points, level progression, streak counters, and detailed analytics. You can view your improvement in different skill areas, see your consistency over time, and earn badges for achieving milestones."
    },
    {
      question: "Is my voice data secure and private?",
      answer: "Absolutely. All voice recordings are encrypted and stored securely. You can control whether your voice data is stored for AI improvement in Privacy Settings. We never share your personal voice recordings with third parties, and you can delete your data at any time."
    },
    {
      question: "How do I earn XP and level up?",
      answer: "You earn XP by completing practice sessions, maintaining daily streaks, achieving scenario goals, and unlocking new skills. Different activities award different amounts of XP - longer sessions and challenging scenarios typically give more points. Check your profile to see detailed XP breakdowns."
    },
    {
      question: "What should I do if the voice recognition isn't working?",
      answer: "First, check your microphone permissions and ensure you're in a quiet environment. Speak clearly and at a normal pace. If issues persist, try refreshing the page or using a different browser. You can also check our troubleshooting guide or contact support for technical assistance."
    },
    {
      question: "Can I practice in different languages?",
      answer: "Currently, Voxa focuses on English communication skills. We're working on adding support for additional languages in future updates. You can practice different accents and communication styles within English-speaking contexts."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = () => {
    if (!contactForm.subject.trim() || !contactForm.message.trim() || !contactForm.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Your message has been sent! We\'ll get back to you within 24 hours.');
    setContactForm({ subject: '', message: '', email: '' });
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
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Help & Support
            </h1>
            <p className="text-gray-600">Get help with Voxa and improve your experience</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-4">Quick Help</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 border-blue-200"
                  onClick={() => toast.info('Video tutorials coming soon!')}
                >
                  <Video className="w-6 h-6 text-blue-600" />
                  <div className="text-center">
                    <p className="font-medium">Video Tutorials</p>
                    <p className="text-xs text-gray-600">Step-by-step guides</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 border-green-200"
                  onClick={() => toast.info('User guide coming soon!')}
                >
                  <Book className="w-6 h-6 text-green-600" />
                  <div className="text-center">
                    <p className="font-medium">User Guide</p>
                    <p className="text-xs text-gray-600">Complete documentation</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 border-purple-200"
                  onClick={() => toast.info('Live chat coming soon!')}
                >
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  <div className="text-center">
                    <p className="font-medium">Live Chat</p>
                    <p className="text-xs text-gray-600">Instant assistance</p>
                  </div>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* FAQ Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-600" />
                Search FAQs
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search for help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
            </Card>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Frequently Asked Questions
              </h3>
              
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-xl">
                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No FAQs found matching your search.</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                Contact Support
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="What can we help you with?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Please describe your issue or question in detail..."
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20 resize-none"
                  />
                </div>
                
                <Button 
                  onClick={handleContactSubmit}
                  className="w-full rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg mb-4">Other Ways to Reach Us</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-gray-600">support@voxa.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-gray-600">+1 (555) 123-VOXA</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm">
                <p className="text-blue-800">
                  <strong>Support Hours:</strong> Monday - Friday, 9AM - 6PM EST<br />
                  We typically respond to emails within 24 hours.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}