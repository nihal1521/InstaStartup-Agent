"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Target, 
  DollarSign, 
  Rocket,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'discovery' | 'analysis' | 'suggestion';
  data?: any;
}

interface ProductDiscovery {
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
}

export function ProductDiscoveryChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you discover and refine your product idea. Tell me about what you're thinking of building - it can be just a rough concept or a detailed vision. I'll ask follow-up questions to help shape it into a complete product strategy.",
      timestamp: new Date(),
      type: 'discovery'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [discoveryData, setDiscoveryData] = useState<ProductDiscovery | null>(null);
  const [discoveryComplete, setDiscoveryComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI discovery conversation
      const response = await generateDiscoveryResponse(input.trim(), messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        type: response.type,
        data: response.data
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check if discovery is complete
      if (response.type === 'analysis' && response.data) {
        setDiscoveryData(response.data);
        setDiscoveryComplete(true);
      }
    } catch (error) {
      console.error('Error in discovery chat:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Could you please rephrase your idea or try again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDiscoveryResponse = async (userInput: string, chatHistory: ChatMessage[]) => {
    // Analyze conversation stage
    const conversationLength = chatHistory.filter(m => m.role === 'user').length;
    
    if (conversationLength === 1) {
      // First user input - ask clarifying questions
      return {
        content: `Interesting! I can see you're thinking about "${userInput}". Let me ask a few questions to better understand your vision:

1. Who would be the primary users of this solution?
2. What specific problem are they facing right now?
3. How are they currently solving this problem (if at all)?
4. What would make your solution better than existing alternatives?

Feel free to answer any or all of these - I'll adapt based on what you share!`,
        type: 'discovery'
      };
    } else if (conversationLength < 4) {
      // Continue discovery conversation
      const responses = [
        "That's helpful context! Can you tell me more about the business model you're envisioning? How would this generate revenue?",
        "Great insights! What would be the most important features for your MVP (minimum viable product)?",
        "Excellent! How do you plan to reach your target customers? What marketing channels seem most promising?"
      ];
      
      return {
        content: responses[conversationLength - 2] || responses[0],
        type: 'discovery'
      };
    } else {
      // Generate complete analysis
      const fullConversation = chatHistory.map(m => `${m.role}: ${m.content}`).join('\n');
      
      const discoveryData: ProductDiscovery = {
        namesSuggestions: [
          "ProductFlow",
          "SolutionHub",
          "InnovatePro",
          "BuildWise",
          "LaunchPad"
        ],
        problemSolution: {
          problem: "Users struggle with complex product development processes",
          solution: "Streamlined platform that simplifies product creation and launch",
          targetAudience: "Entrepreneurs and small business owners",
          uniqueValue: "AI-powered guidance with human-like conversation"
        },
        gtmStrategy: {
          channels: ["Content Marketing", "Social Media", "Product Hunt", "Direct Sales"],
          timeline: "6 months to market leadership",
          budget: "$50K initial marketing spend",
          keyMetrics: ["User Acquisition", "Conversion Rate", "Customer LTV"]
        },
        monetization: {
          model: "SaaS Subscription",
          pricing: [
            {
              tier: "Starter",
              price: "$29/month",
              features: ["Basic features", "Email support", "5 projects"]
            },
            {
              tier: "Professional",
              price: "$99/month", 
              features: ["All Starter features", "Priority support", "Unlimited projects", "Advanced analytics"]
            },
            {
              tier: "Enterprise",
              price: "Custom",
              features: ["All Professional features", "Custom integrations", "Dedicated support"]
            }
          ],
          revenue: "$100K ARR target in Year 1"
        },
        roadmap: [
          {
            phase: "MVP Development",
            duration: "3 months",
            features: ["Core functionality", "User authentication", "Basic dashboard"],
            goals: ["Validate product-market fit", "Gather user feedback"]
          },
          {
            phase: "Growth",
            duration: "3 months",
            features: ["Advanced features", "Integrations", "Mobile app"],
            goals: ["Scale user base", "Improve retention"]
          },
          {
            phase: "Expansion",
            duration: "6 months",
            features: ["Enterprise features", "API platform", "White-label solution"],
            goals: ["Enter enterprise market", "Build partner ecosystem"]
          }
        ]
      };

      return {
        content: `Perfect! Based on our conversation, I've analyzed your idea and created a comprehensive product discovery report. Here's what I found:

🎯 **Core Concept**: Your solution addresses a real market need with a clear value proposition.

📊 **Market Opportunity**: Strong potential with identifiable target audience and monetization path.

🚀 **Go-to-Market**: Multiple viable channels with realistic timeline and budget.

💰 **Revenue Model**: Scalable SaaS approach with tiered pricing strategy.

🗺️ **Development Roadmap**: Phased approach from MVP to enterprise solution.

Ready to see the full analysis and start building with our AI team?`,
        type: 'analysis',
        data: discoveryData
      };
    }
  };

  const startBuilding = () => {
    // Navigate to main startup generator with discovery data
    const ideaSummary = messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .join(' ');
    
    // Store discovery data in sessionStorage
    sessionStorage.setItem('discoveryData', JSON.stringify(discoveryData));
    sessionStorage.setItem('discoveryIdea', ideaSummary);
    
    // Navigate to main generator
    window.location.href = '/?discovery=true';
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      {/* Header */}
      <div className="glass-strong rounded-t-3xl p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Product Discovery Chat</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Let's explore your idea together
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 glass-strong p-6 overflow-y-auto space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-indigo-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className={`glass rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/20' 
                    : 'bg-white/50 dark:bg-black/20'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  
                  {message.type === 'analysis' && discoveryData && (
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold text-sm">Names</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {discoveryData.namesSuggestions.slice(0, 3).map((name, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="glass rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold text-sm">Audience</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {discoveryData.problemSolution.targetAudience}
                          </p>
                        </div>
                        
                        <div className="glass rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-sm">Revenue</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {discoveryData.monetization.revenue}
                          </p>
                        </div>
                        
                        <div className="glass rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Rocket className="w-4 h-4 text-purple-500" />
                            <span className="font-semibold text-sm">Timeline</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {discoveryData.gtmStrategy.timeline}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={startBuilding}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Start Building with AI Team
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl p-4 bg-white/50 dark:bg-black/20">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="glass-strong rounded-b-3xl p-6 border-t border-white/20">
        <div className="flex space-x-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me about your product idea..."
            className="flex-1 min-h-[60px] resize-none glass border-white/20 focus:border-indigo-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {discoveryComplete && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span>Discovery Complete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}