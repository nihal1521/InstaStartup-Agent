"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Bot, 
  Workflow, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Settings
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: Array<{
    name: string;
    description: string;
  }>;
}

interface Team {
  id: string;
  name: string;
  agents: string[];
  messageCount: number;
}

interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  stepCount: number;
}

export function MultiAgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('agents');

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
    try {
      const response = await fetch('/api/agents');
      const data = await response.json();
      
      setAgents(data.agents || []);
      setTeams(data.teams || []);
      setPipelines(data.pipelines || []);
    } catch (error) {
      console.error('Error fetching agent data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createStartupPipeline = async (idea: string) => {
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_startup_pipeline',
          idea
        })
      });
      
      const result = await response.json();
      if (result.success) {
        await fetchAgentData(); // Refresh data
        return result.pipeline;
      }
    } catch (error) {
      console.error('Error creating startup pipeline:', error);
    }
  };

  const executePipeline = async (pipelineId: string) => {
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute_pipeline',
          pipelineId
        })
      });
      
      const result = await response.json();
      if (result.success) {
        await fetchAgentData(); // Refresh data
      }
    } catch (error) {
      console.error('Error executing pipeline:', error);
    }
  };

  const getAgentIcon = (agentId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'product-manager': Target,
      'engineer': Zap,
      'designer': Settings,
      'marketing-lead': BarChart3,
      'customer-success': MessageSquare,
      'analytics-agent': BarChart3
    };
    return iconMap[agentId] || Bot;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'pending': 'bg-yellow-500',
      'running': 'bg-blue-500',
      'completed': 'bg-green-500',
      'failed': 'bg-red-500'
    };
    return colorMap[status] || 'bg-gray-500';
  };

  const getStatusIcon = (status: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'pending': Clock,
      'running': Play,
      'completed': CheckCircle,
      'failed': AlertCircle
    };
    return iconMap[status] || Clock;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Multi-Agent System Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Coordinate specialized AI agents to build complete startup packages
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-strong mb-8">
          <TabsTrigger value="agents" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>Agents ({agents.length})</span>
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Teams ({teams.length})</span>
          </TabsTrigger>
          <TabsTrigger value="pipelines" className="flex items-center space-x-2">
            <Workflow className="w-4 h-4" />
            <span>Pipelines ({pipelines.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => {
              const IconComponent = getAgentIcon(agent.id);
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-strong border-indigo-200 dark:border-indigo-700 hover:glass transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {agent.id}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {agent.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Capabilities:</h4>
                        <div className="space-y-1">
                          {agent.capabilities.slice(0, 3).map((capability, capIndex) => (
                            <div key={capIndex} className="text-xs text-gray-500 dark:text-gray-400">
                              • {capability.name}
                            </div>
                          ))}
                          {agent.capabilities.length > 3 && (
                            <div className="text-xs text-indigo-600 dark:text-indigo-400">
                              +{agent.capabilities.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-indigo-500" />
                        <span>{team.name}</span>
                      </CardTitle>
                      <Badge variant="outline">
                        {team.agents.length} agents
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Team Members:</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.agents.map(agentId => {
                            const agent = agents.find(a => a.id === agentId);
                            return (
                              <Badge key={agentId} variant="secondary" className="text-xs">
                                {agent?.name || agentId}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Messages:</span>
                        <span className="font-semibold">{team.messageCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-6">
          <div className="mb-6">
            <Button
              onClick={() => {
                const idea = prompt('Enter your startup idea:');
                if (idea) {
                  createStartupPipeline(idea);
                }
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Create Startup Pipeline
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pipelines.map((pipeline, index) => {
              const StatusIcon = getStatusIcon(pipeline.status);
              return (
                <motion.div
                  key={pipeline.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-strong border-indigo-200 dark:border-indigo-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Workflow className="w-5 h-5 text-indigo-500" />
                          <span>{pipeline.name}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(pipeline.status)}`} />
                          <StatusIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {pipeline.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Steps:</span>
                          <span className="font-semibold">{pipeline.stepCount}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Status:</span>
                          <Badge 
                            variant={pipeline.status === 'completed' ? 'default' : 'secondary'}
                            className="capitalize"
                          >
                            {pipeline.status}
                          </Badge>
                        </div>

                        <div className="flex space-x-2">
                          {pipeline.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => executePipeline(pipeline.id)}
                              className="flex-1"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Execute
                            </Button>
                          )}
                          {pipeline.status === 'running' && (
                            <Button size="sm" disabled className="flex-1">
                              <div className="w-3 h-3 mr-1 animate-spin rounded-full border border-white border-t-transparent" />
                              Running
                            </Button>
                          )}
                          {pipeline.status === 'completed' && (
                            <Button size="sm" variant="outline" className="flex-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              View Results
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}