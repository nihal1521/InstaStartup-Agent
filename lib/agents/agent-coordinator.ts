import { BaseAgent, AgentContext, AgentMessage } from './base-agent';
import { ProductManagerAgent } from './product-manager-agent';
import { EngineerAgent } from './engineer-agent';
import { DesignerAgent } from './designer-agent';
import { MarketingAgent } from './marketing-agent';
import { CustomerSuccessAgent } from './customer-success-agent';
import { AnalyticsAgent } from './analytics-agent';

export interface TaskPipeline {
  id: string;
  name: string;
  description: string;
  steps: {
    agentId: string;
    task: string;
    parameters?: Record<string, any>;
    dependencies?: string[];
    parallel?: boolean;
  }[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: Record<string, any>;
}

export interface AgentTeam {
  id: string;
  name: string;
  agents: BaseAgent[];
  sharedMemory: Map<string, any>;
  messageHistory: AgentMessage[];
}

export class AgentCoordinator {
  private agents: Map<string, BaseAgent> = new Map();
  private teams: Map<string, AgentTeam> = new Map();
  private pipelines: Map<string, TaskPipeline> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents(): void {
    const agents = [
      new ProductManagerAgent(),
      new EngineerAgent(),
      new DesignerAgent(),
      new MarketingAgent(),
      new CustomerSuccessAgent(),
      new AnalyticsAgent()
    ];

    agents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }

  public createTeam(teamId: string, name: string, agentIds: string[]): AgentTeam {
    const teamAgents = agentIds
      .map(id => this.agents.get(id))
      .filter(agent => agent !== undefined) as BaseAgent[];

    const team: AgentTeam = {
      id: teamId,
      name,
      agents: teamAgents,
      sharedMemory: new Map(),
      messageHistory: []
    };

    this.teams.set(teamId, team);
    return team;
  }

  public async executeTask(
    agentId: string,
    task: string,
    context: AgentContext,
    parameters?: Record<string, any>
  ): Promise<AgentMessage> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    const result = await agent.execute(task, context, parameters);
    
    // Update team memory if agent is part of a team
    this.updateTeamMemory(agentId, result);
    
    return result;
  }

  public async executePipeline(pipelineId: string): Promise<TaskPipeline> {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) {
      throw new Error(`Pipeline not found: ${pipelineId}`);
    }

    pipeline.status = 'running';
    
    try {
      const context: AgentContext = {
        conversationId: `pipeline-${pipelineId}`,
        previousMessages: [],
        sharedMemory: {}
      };

      // Execute steps in order, handling dependencies and parallel execution
      for (const step of pipeline.steps) {
        // Check dependencies
        if (step.dependencies) {
          const dependencyResults = step.dependencies.map(dep => pipeline.results[dep]);
          if (dependencyResults.some(result => !result)) {
            throw new Error(`Dependencies not met for step: ${step.task}`);
          }
        }

        // Merge dependency results into parameters
        const parameters = {
          ...step.parameters,
          ...this.extractDependencyData(step.dependencies || [], pipeline.results)
        };

        // Execute the step
        const result = await this.executeTask(step.agentId, step.task, context, parameters);
        
        // Store result for future steps
        pipeline.results[step.task] = JSON.parse(result.content);
        
        // Update context with new message
        context.previousMessages.push(result);
      }

      pipeline.status = 'completed';
    } catch (error) {
      pipeline.status = 'failed';
      console.error(`Pipeline ${pipelineId} failed:`, error);
    }

    return pipeline;
  }

  public createStartupGenerationPipeline(idea: string): TaskPipeline {
    const pipelineId = `startup-gen-${Date.now()}`;
    
    const pipeline: TaskPipeline = {
      id: pipelineId,
      name: 'Complete Startup Generation',
      description: 'End-to-end startup package generation with all agents',
      steps: [
        {
          agentId: 'product-manager',
          task: 'define_product_scope',
          parameters: { idea, constraints: {} }
        },
        {
          agentId: 'designer',
          task: 'create_design_system',
          parameters: { targetAudience: 'tech-savvy professionals' },
          dependencies: ['define_product_scope']
        },
        {
          agentId: 'engineer',
          task: 'select_tech_stack',
          parameters: { constraints: { budget: 'startup', timeline: '3-months' } },
          dependencies: ['define_product_scope']
        },
        {
          agentId: 'designer',
          task: 'generate_ui_components',
          parameters: { components: ['button', 'form', 'card', 'navigation'] },
          dependencies: ['create_design_system']
        },
        {
          agentId: 'engineer',
          task: 'generate_frontend_code',
          parameters: {},
          dependencies: ['select_tech_stack', 'generate_ui_components']
        },
        {
          agentId: 'marketing-lead',
          task: 'create_seo_strategy',
          parameters: { competitors: [] },
          dependencies: ['define_product_scope']
        },
        {
          agentId: 'marketing-lead',
          task: 'generate_social_content',
          parameters: { platforms: ['linkedin', 'twitter', 'instagram'] },
          dependencies: ['create_seo_strategy']
        },
        {
          agentId: 'customer-success',
          task: 'create_help_content',
          parameters: { commonIssues: ['onboarding', 'billing', 'technical'] },
          dependencies: ['define_product_scope']
        },
        {
          agentId: 'analytics-agent',
          task: 'setup_tracking',
          parameters: { platform: 'web', events: ['signup', 'conversion', 'engagement'] },
          dependencies: ['define_product_scope']
        }
      ],
      status: 'pending',
      results: {}
    };

    this.pipelines.set(pipelineId, pipeline);
    return pipeline;
  }

  public createMarketingCampaignPipeline(productData: any): TaskPipeline {
    const pipelineId = `marketing-campaign-${Date.now()}`;
    
    const pipeline: TaskPipeline = {
      id: pipelineId,
      name: 'Marketing Campaign Launch',
      description: 'Comprehensive marketing campaign setup and execution',
      steps: [
        {
          agentId: 'marketing-lead',
          task: 'create_seo_strategy',
          parameters: { product: productData, competitors: [] }
        },
        {
          agentId: 'marketing-lead',
          task: 'generate_blog_content',
          parameters: { topics: ['startup tips', 'entrepreneurship', 'business planning'] },
          dependencies: ['create_seo_strategy']
        },
        {
          agentId: 'marketing-lead',
          task: 'create_email_campaigns',
          parameters: { customerJourney: ['awareness', 'consideration', 'conversion', 'retention'] },
          dependencies: ['create_seo_strategy']
        },
        {
          agentId: 'marketing-lead',
          task: 'generate_social_content',
          parameters: { platforms: ['linkedin', 'twitter', 'instagram', 'facebook'] },
          dependencies: ['create_seo_strategy']
        },
        {
          agentId: 'analytics-agent',
          task: 'setup_tracking',
          parameters: { platform: 'marketing', goals: ['lead-generation', 'conversions'] },
          dependencies: ['create_seo_strategy']
        }
      ],
      status: 'pending',
      results: {}
    };

    this.pipelines.set(pipelineId, pipeline);
    return pipeline;
  }

  public getAgent(agentId: string): BaseAgent | undefined {
    return this.agents.get(agentId);
  }

  public getTeam(teamId: string): AgentTeam | undefined {
    return this.teams.get(teamId);
  }

  public getPipeline(pipelineId: string): TaskPipeline | undefined {
    return this.pipelines.get(pipelineId);
  }

  public listAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  public listTeams(): AgentTeam[] {
    return Array.from(this.teams.values());
  }

  public listPipelines(): TaskPipeline[] {
    return Array.from(this.pipelines.values());
  }

  private updateTeamMemory(agentId: string, message: AgentMessage): void {
    // Find teams that contain this agent and update their memory
    for (const team of this.teams.values()) {
      if (team.agents.some(agent => agent.id === agentId)) {
        team.messageHistory.push(message);
        
        // Update shared memory with relevant data
        try {
          const messageData = JSON.parse(message.content);
          team.sharedMemory.set(`${agentId}-latest`, messageData);
        } catch (error) {
          // Handle non-JSON messages
          team.sharedMemory.set(`${agentId}-latest`, message.content);
        }
      }
    }
  }

  private extractDependencyData(dependencies: string[], results: Record<string, any>): Record<string, any> {
    const dependencyData: Record<string, any> = {};
    
    dependencies.forEach(dep => {
      if (results[dep]) {
        dependencyData[dep] = results[dep];
      }
    });
    
    return dependencyData;
  }
}

// Singleton instance
export const agentCoordinator = new AgentCoordinator();