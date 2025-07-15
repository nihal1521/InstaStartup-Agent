"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Download, 
  Globe, 
  Github, 
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Copy,
  Settings
} from 'lucide-react';

interface DeploymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
  deployTime: string;
  pricing: string;
  popular?: boolean;
}

const deploymentOptions: DeploymentOption[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy instantly with zero configuration',
    icon: Zap,
    color: 'from-black to-gray-800',
    features: ['Instant deployment', 'Global CDN', 'Automatic HTTPS', 'Custom domains'],
    deployTime: '30 seconds',
    pricing: 'Free tier available',
    popular: true
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Modern web development platform',
    icon: Globe,
    color: 'from-teal-500 to-cyan-600',
    features: ['Continuous deployment', 'Form handling', 'Edge functions', 'Split testing'],
    deployTime: '1 minute',
    pricing: 'Free tier available'
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    description: 'Host directly from your repository',
    icon: Github,
    color: 'from-gray-700 to-gray-900',
    features: ['GitHub integration', 'Custom domains', 'Jekyll support', 'Version control'],
    deployTime: '2 minutes',
    pricing: 'Free'
  },
  {
    id: 'download',
    name: 'Download Code',
    description: 'Get the complete source code',
    icon: Download,
    color: 'from-indigo-500 to-purple-600',
    features: ['Full source code', 'Next.js project', 'Tailwind CSS', 'TypeScript'],
    deployTime: 'Instant',
    pricing: 'Free'
  }
];

export function DeploymentOptions({ startupData }: { startupData?: any }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deploymentUrl, setDeploymentUrl] = useState('');

  const handleDeploy = async (optionId: string) => {
    setSelectedOption(optionId);
    setIsDeploying(true);
    setDeploymentStatus('deploying');

    // Simulate deployment process
    setTimeout(() => {
      setDeploymentStatus('success');
      setDeploymentUrl(`https://${startupData?.brandName?.toLowerCase().replace(/\s+/g, '-') || 'startup'}-${Math.random().toString(36).substr(2, 9)}.vercel.app`);
      setIsDeploying(false);
    }, 3000);
  };

  const handleDownload = () => {
    // Create a mock download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('// Your startup code will be here');
    element.download = `${startupData?.brandName || 'startup'}-code.zip`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Deploy Your Startup
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose how you want to launch your startup to the world
          </p>
        </motion.div>
      </div>

      {/* Deployment Status */}
      {deploymentStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
            <CardContent className="p-6">
              {deploymentStatus === 'deploying' && (
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <div>
                    <h3 className="font-semibold">Deploying your startup...</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">This usually takes 30-60 seconds</p>
                  </div>
                </div>
              )}
              
              {deploymentStatus === 'success' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-green-600 dark:text-green-400">Deployment Successful!</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your startup is now live</p>
                    </div>
                  </div>
                  
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your startup is live at:</p>
                        <p className="font-mono text-sm">{deploymentUrl}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(deploymentUrl)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" onClick={() => window.open(deploymentUrl, '_blank')}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Deployment Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {deploymentOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass-strong hover:glass border-indigo-200 dark:border-indigo-700 transition-all duration-300 group relative overflow-hidden ${
              selectedOption === option.id ? 'ring-2 ring-indigo-500' : ''
            }`}>
              {option.popular && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  Popular
                </Badge>
              )}
              
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center shadow-lg`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{option.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">Features</h4>
                  <div className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Deploy Time</p>
                    <p className="font-semibold text-sm">{option.deployTime}</p>
                  </div>
                  <div className="glass rounded-lg p-3 text-center">
                    <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Pricing</p>
                    <p className="font-semibold text-sm">{option.pricing}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 transition-opacity group-hover:scale-105 transition-transform duration-200`}
                  onClick={() => option.id === 'download' ? handleDownload() : handleDeploy(option.id)}
                  disabled={isDeploying}
                >
                  {option.id === 'download' ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Code
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Deploy to {option.name}
                    </>
                  )}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Options */}
      <div className="mt-12 text-center">
        <Card className="glass-strong border-indigo-200 dark:border-indigo-700 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Need Custom Deployment?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Looking for enterprise deployment, custom domains, or specific hosting requirements? 
              We can help you set up the perfect deployment strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="glass">
                <Settings className="w-4 h-4 mr-2" />
                Custom Setup
              </Button>
              <Button variant="outline" className="glass">
                <ExternalLink className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}