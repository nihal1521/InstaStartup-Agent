"use client";

import { motion } from 'framer-motion';
import { Sparkles, Rocket, Palette, FileText, Code, Presentation } from 'lucide-react';

const steps = [
  { icon: Sparkles, label: "Analyzing your idea", description: "Understanding your vision" },
  { icon: Palette, label: "Creating brand identity", description: "Designing logo and colors" },
  { icon: Code, label: "Building your website", description: "Generating code and content" },
  { icon: FileText, label: "Writing marketing copy", description: "Crafting compelling content" },
  { icon: Presentation, label: "Preparing pitch deck", description: "Creating investor materials" },
  { icon: Rocket, label: "Finalizing your startup", description: "Almost ready to launch!" }
];

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Creating Your Startup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our AI is working its magic. This usually takes 30-60 seconds.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <motion.div
                  className="glass-strong rounded-2xl p-6 text-center h-full"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 0 rgba(99, 102, 241, 0)",
                      "0 0 20px rgba(99, 102, 241, 0.3)",
                      "0 0 0 rgba(99, 102, 241, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.1
                    }}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <h3 className="font-semibold mb-2">{step.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <div className="glass-strong rounded-full p-2 max-w-md mx-auto">
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 30, ease: "easeInOut" }}
                />
              </div>
            </div>
            <motion.p
              className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hang tight! We're building something amazing...
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}