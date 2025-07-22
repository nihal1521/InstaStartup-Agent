"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Users,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface DiscoveryResultsProps {
  discoveryData: {
    namesSuggestions: string[];
    problemSolution: {
      problem: string;
      solution: string;
      targetAudience: string;
      uniqueValue: string;
    };
    gtmStrategy: {
      channels: string[];
      timeline: string;
      budget: string;
      keyMetrics: string[];
    };
    monetization: {
      model: string;
      pricing: Array<{
        tier: string;
        price: string;
        features: string[];
      }>;
      revenue: string;
    };
    roadmap: Array<{
      phase: string;
      duration: string;
      features: string[];
      goals: string[];
    }>;
  };
  onStartBuilding: () => void;
}

export function DiscoveryResults({ discoveryData, onStartBuilding }: DiscoveryResultsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Product Discovery Complete
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Here's your comprehensive product analysis and strategy
        </p>
      </motion.div>

      {/* Name Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>Name Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {discoveryData.namesSuggestions.map((name, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors"
                >
                  {name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Problem-Solution Fit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span>Problem-Solution Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Problem</h4>
                <p className="text-gray-600 dark:text-gray-300">{discoveryData.problemSolution.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Solution</h4>
                <p className="text-gray-600 dark:text-gray-300">{discoveryData.problemSolution.solution}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Target Audience</h4>
                <p className="text-gray-600 dark:text-gray-300">{discoveryData.problemSolution.targetAudience}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Unique Value</h4>
                <p className="text-gray-600 dark:text-gray-300">{discoveryData.problemSolution.uniqueValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* GTM Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Go-to-Market Strategy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Marketing Channels</h4>
                <div className="space-y-2">
                  {discoveryData.gtmStrategy.channels.map((channel, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Key Metrics</h4>
                <div className="space-y-2">
                  {discoveryData.gtmStrategy.keyMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Timeline</h4>
                <p className="text-gray-600 dark:text-gray-300">{discoveryData.gtmStrategy.timeline}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Budget</h4>
                <p className="text-gray-600 dark:text-gray-300">{discoveryData.gtmStrategy.budget}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monetization Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span>Monetization Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Business Model</h4>
                  <p className="text-gray-600 dark:text-gray-300">{discoveryData.monetization.model}</p>
                </div>
                <div className="text-right">
                  <h4 className="font-semibold">Revenue Target</h4>
                  <p className="text-green-600 dark:text-green-400 font-bold">{discoveryData.monetization.revenue}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Pricing Tiers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {discoveryData.monetization.pricing.map((tier, index) => (
                    <div key={index} className="glass rounded-xl p-4 text-center">
                      <h5 className="font-semibold mb-2">{tier.tier}</h5>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">{tier.price}</p>
                      <ul className="space-y-1 text-sm">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span>Project Roadmap</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {discoveryData.roadmap.map((phase, index) => (
                <div key={index} className="relative">
                  {index < discoveryData.roadmap.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-indigo-500 to-purple-500" />
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{phase.phase}</h4>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Features</h5>
                          <ul className="space-y-1">
                            {phase.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2 text-green-600 dark:text-green-400">Goals</h5>
                          <ul className="space-y-1">
                            {phase.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button
          onClick={onStartBuilding}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-12 py-4 text-lg"
        >
          <Users className="w-5 h-5 mr-3" />
          Start Building with AI Team
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      </motion.div>
    </div>
  );
}