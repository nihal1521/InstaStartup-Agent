"use client";

import { LoadingState } from '@/components/loading-state';
import { StartupForm } from '@/components/startup-form';
import { StartupGallery } from '@/components/startup-gallery';
import { ThemeToggle } from '@/components/theme-toggle';
import { AIProvider } from '@/utils/ai-providers';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Target, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async (idea: string, provider: AIProvider) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea, provider }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate startup');
      }

      if (result.success && result.data.firestoreId) {
        // Persist startup data in sessionStorage for retrieval on result page
        sessionStorage.setItem(
          `startup-${result.data.firestoreId}`,
          JSON.stringify(result.data)
        );
        router.push(`/result/${result.data.firestoreId}`);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate startup. Please try again.';
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Branding",
      description: "Generate unique brand names, taglines, and visual identity instantly"
    },
    {
      icon: Rocket,
      title: "Complete Landing Page",
      description: "Get a fully functional website with marketing content and design"
    },
    {
      icon: Target,
      title: "Investor-Ready Materials",
      description: "Professional pitch decks and business documentation generated automatically"
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy your startup website live or download the complete codebase"
    }
  ];

  if (isGenerating) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            InstaStartup
          </span>
        </motion.div>
        <ThemeToggle />
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Turn Ideas Into
            <br />
            <span className="relative">
              Startups
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your one-line idea into a complete startup package with AI. 
            Get brand names, logos, landing pages, pitch decks, and deployable code in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <span className="glass px-4 py-2 rounded-full text-sm font-medium">✨ AI-Powered</span>
            <span className="glass px-4 py-2 rounded-full text-sm font-medium">🚀 Instant Deploy</span>
            <span className="glass px-4 py-2 rounded-full text-sm font-medium">💼 Investor-Ready</span>
            <span className="glass px-4 py-2 rounded-full text-sm font-medium">📱 Mobile-First</span>
          </motion.div>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <StartupForm onGenerate={handleGenerate} />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center hover:glass-strong transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Build Your Startup?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of entrepreneurs who have launched their ideas with InstaStartup.
              No coding required, no design skills needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 glass border-2 border-indigo-200 dark:border-indigo-700 rounded-xl font-semibold hover:glass-strong transition-all duration-300"
              >
                View Examples
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Startup Gallery Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mb-20"
        >
          <StartupGallery />
        </motion.section>
      </div>
    </div>
  );
}