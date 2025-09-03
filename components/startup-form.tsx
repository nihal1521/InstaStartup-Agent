"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AIProviderSelector } from '@/components/ai-provider-selector';
import { AIProvider } from '@/utils/ai-providers';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Lightbulb } from 'lucide-react';

interface StartupFormProps {
  onGenerate: (idea: string, provider: AIProvider) => Promise<void>;
}

export function StartupForm({ onGenerate }: StartupFormProps) {
  const [idea, setIdea] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('openai');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    if (idea.trim().length < 10) {
      alert('Please provide a more detailed startup idea (at least 10 characters)');
      return;
    }

    setIsLoading(true);
    try {
      await onGenerate(idea, selectedProvider);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate startup. Please check your API keys and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const exampleIdeas = [
    "A social media platform for pet owners to share pet care tips",
    "An AI-powered meal planning app that reduces food waste",
    "A marketplace for freelance developers to find remote work",
    "A virtual reality fitness platform for home workouts"
  ];

  const handleExampleClick = (example: string) => {
    setIdea(example);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 floating"
          >
            <Lightbulb className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Describe Your Startup Idea
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Just one sentence is enough. Our AI will handle the rest.
          </p>
        </div>

        {/* AI Provider Selection */}
        <AIProviderSelector 
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A social media platform for book lovers to share reviews and recommendations..."
              className="min-h-[120px] text-lg resize-none bg-white/50 dark:bg-black/20 border-2 border-white/30 dark:border-white/20 rounded-2xl focus:border-indigo-400 dark:focus:border-indigo-500 transition-all duration-300 placeholder:text-gray-400"
              maxLength={500}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {idea.length}/500
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={!idea.trim() || isLoading}
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Your Startup Package...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Create My Startup</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Example Ideas */}
        <div className="mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
            💡 Need inspiration? Try one of these trending ideas:
          </p>
          <div className="text-center mb-4">
            <button
              onClick={() => router.push('/discovery')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Or start with our Product Discovery Chat →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleIdeas.map((example, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handleExampleClick(example)}
                className="text-left p-4 glass rounded-xl hover:glass-strong transition-all duration-300 border border-white/20 hover:border-indigo-300 dark:hover:border-indigo-600 group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2 group-hover:scale-125 transition-transform duration-200 animate-pulse"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {example}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              💡 Pro tip: Press Cmd/Ctrl + Enter to generate instantly
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}