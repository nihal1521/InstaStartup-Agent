"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AI_PROVIDERS, AIProvider } from '@/utils/ai-providers';
import { Check } from 'lucide-react';

interface AIProviderSelectorProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

export function AIProviderSelector({ selectedProvider, onProviderChange }: AIProviderSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Choose Your AI Model</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(AI_PROVIDERS).map(([key, config]) => {
          const provider = key as AIProvider;
          const isSelected = selectedProvider === provider;
          
          return (
            <motion.div
              key={provider}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' 
                    : 'hover:shadow-lg glass border-white/20 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
                onClick={() => onProviderChange(provider)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{config.icon}</span>
                      <h4 className="font-semibold">{config.displayName}</h4>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {config.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {provider === 'openai' && (
                      <>
                        <Badge variant="secondary" className="text-xs">GPT-4</Badge>
                        <Badge variant="secondary" className="text-xs">DALL·E 3</Badge>
                        <Badge variant="secondary" className="text-xs">Advanced Reasoning</Badge>
                      </>
                    )}
                    {provider === 'gemini' && (
                      <>
                        <Badge variant="secondary" className="text-xs">Gemini 1.5</Badge>
                        <Badge variant="secondary" className="text-xs">Multimodal</Badge>
                        <Badge variant="secondary" className="text-xs">Fast Processing</Badge>
                      </>
                    )}
                    {provider === 'github' && (
                      <>
                        <Badge variant="secondary" className="text-xs">Copilot</Badge>
                        <Badge variant="secondary" className="text-xs">Code-First</Badge>
                        <Badge variant="secondary" className="text-xs">Developer Tools</Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}