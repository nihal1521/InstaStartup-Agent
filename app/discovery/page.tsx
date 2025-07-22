"use client";

import { useState, useEffect } from 'react';
import { ProductDiscoveryChat } from '@/components/product-discovery-chat';
import { DiscoveryResults } from '@/components/discovery-results';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DiscoveryPage() {
  const [showResults, setShowResults] = useState(false);
  const [discoveryData, setDiscoveryData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if we have discovery data from sessionStorage
    const storedData = sessionStorage.getItem('discoveryData');
    if (storedData) {
      setDiscoveryData(JSON.parse(storedData));
      setShowResults(true);
    }
  }, []);

  const handleStartBuilding = () => {
    // Navigate to main generator with discovery context
    router.push('/?discovery=true');
  };

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
          className="flex items-center space-x-4"
        >
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="flex items-center space-x-2 glass rounded-xl hover:glass-strong"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Product Discovery
            </span>
          </div>
        </motion.div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Let's Discover Your Product
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Have a conversation with our AI to explore your idea and get a comprehensive product strategy before we start building.
            </p>
            <ProductDiscoveryChat />
          </motion.div>
        ) : (
          discoveryData && (
            <DiscoveryResults 
              discoveryData={discoveryData} 
              onStartBuilding={handleStartBuilding}
            />
          )
        )}
      </div>
    </div>
  );
}