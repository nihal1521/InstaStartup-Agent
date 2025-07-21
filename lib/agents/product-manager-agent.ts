import { BaseAgent, AgentContext, AgentMessage, AgentCapability } from './base-agent';

export interface ProductSpec {
  productName: string;
  vision: string;
  targetAudience: string;
  mvpFeatures: string[];
  userStories: string[];
  acceptanceCriteria: Record<string, string[]>;
  roadmap: {
    phase: string;
    features: string[];
    timeline: string;
  }[];
}

export class ProductManagerAgent extends BaseAgent {
  constructor() {
    const capabilities: AgentCapability[] = [
      {
        name: 'define_product_scope',
        description: 'Analyze raw idea and define comprehensive product scope',
        inputSchema: { idea: 'string', constraints: 'object' },
        outputSchema: { productSpec: 'ProductSpec' }
      },
      {
        name: 'create_mvp_plan',
        description: 'Create minimal viable product feature set',
        inputSchema: { productSpec: 'ProductSpec' },
        outputSchema: { mvpPlan: 'object' }
      },
      {
        name: 'write_user_stories',
        description: 'Generate user stories and acceptance criteria',
        inputSchema: { features: 'array' },
        outputSchema: { userStories: 'array' }
      },
      {
        name: 'create_roadmap',
        description: 'Create product development roadmap',
        inputSchema: { productSpec: 'ProductSpec' },
        outputSchema: { roadmap: 'array' }
      }
    ];

    super(
      'product-manager',
      'Product Manager',
      'Defines product scope, MVP features, user stories, and development roadmap',
      capabilities
    );
  }

  async execute(task: string, context: AgentContext, parameters?: Record<string, any>): Promise<AgentMessage> {
    const { idea, constraints } = parameters || {};
    
    let result: any;
    
    switch (task) {
      case 'define_product_scope':
        result = await this.defineProductScope(idea, constraints);
        break;
      case 'create_mvp_plan':
        result = await this.createMVPPlan(parameters?.productSpec);
        break;
      case 'write_user_stories':
        result = await this.writeUserStories(parameters?.features);
        break;
      case 'create_roadmap':
        result = await this.createRoadmap(parameters?.productSpec);
        break;
      default:
        result = await this.analyzeIdea(idea);
    }

    return {
      id: this.generateMessageId(),
      agentId: this.id,
      content: JSON.stringify(result),
      timestamp: new Date(),
      metadata: { task, parameters }
    };
  }

  private async defineProductScope(idea: string, constraints?: any): Promise<ProductSpec> {
    const prompt = `
    As an experienced Product Manager, analyze this startup idea and create a comprehensive product specification:
    
    Idea: "${idea}"
    Constraints: ${JSON.stringify(constraints || {})}
    
    Define:
    1. Product name and vision statement
    2. Target audience (primary and secondary)
    3. Core value proposition
    4. MVP feature set (5-8 features max)
    5. User stories for each feature
    6. Acceptance criteria for each story
    7. 3-phase development roadmap
    
    Focus on market viability, user needs, and technical feasibility.
    Return as JSON matching ProductSpec interface.
    `;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback product spec
      return {
        productName: this.extractProductName(idea),
        vision: `Transform ${idea} into a scalable, user-friendly solution`,
        targetAudience: 'Early adopters and tech-savvy professionals',
        mvpFeatures: [
          'User authentication',
          'Core functionality',
          'Basic dashboard',
          'Mobile responsiveness',
          'Data persistence'
        ],
        userStories: [
          'As a user, I want to sign up easily so I can start using the platform',
          'As a user, I want to access core features so I can solve my problem',
          'As a user, I want a dashboard so I can track my progress'
        ],
        acceptanceCriteria: {
          'User authentication': ['Email/password signup', 'Email verification', 'Secure login'],
          'Core functionality': ['Main feature works', 'Error handling', 'User feedback'],
          'Basic dashboard': ['Overview metrics', 'Navigation menu', 'User profile']
        },
        roadmap: [
          {
            phase: 'MVP (0-3 months)',
            features: ['Authentication', 'Core features', 'Basic UI'],
            timeline: '3 months'
          },
          {
            phase: 'Growth (3-6 months)',
            features: ['Advanced features', 'Analytics', 'Integrations'],
            timeline: '3 months'
          },
          {
            phase: 'Scale (6-12 months)',
            features: ['Enterprise features', 'API', 'Mobile app'],
            timeline: '6 months'
          }
        ]
      };
    }
  }

  private async createMVPPlan(productSpec: ProductSpec): Promise<any> {
    const prompt = `
    Create a detailed MVP implementation plan for: ${productSpec.productName}
    
    Features: ${productSpec.mvpFeatures.join(', ')}
    
    For each feature, define:
    1. Technical requirements
    2. Dependencies
    3. Effort estimation (story points)
    4. Priority (High/Medium/Low)
    5. Risk assessment
    
    Return as structured JSON.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async writeUserStories(features: string[]): Promise<string[]> {
    const prompt = `
    Write comprehensive user stories for these features: ${features.join(', ')}
    
    Format: "As a [user type], I want [goal] so that [benefit]"
    Include acceptance criteria for each story.
    
    Return as JSON array of story objects with title, story, and criteria.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async createRoadmap(productSpec: ProductSpec): Promise<any[]> {
    const prompt = `
    Create a detailed product roadmap for: ${productSpec.productName}
    
    Vision: ${productSpec.vision}
    MVP Features: ${productSpec.mvpFeatures.join(', ')}
    
    Create 4 phases:
    1. MVP (0-3 months)
    2. Growth (3-6 months) 
    3. Scale (6-12 months)
    4. Expansion (12+ months)
    
    For each phase, define features, goals, metrics, and timeline.
    Return as JSON array.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async analyzeIdea(idea: string): Promise<any> {
    return await this.defineProductScope(idea);
  }

  private extractProductName(idea: string): string {
    const words = idea.split(' ').filter(word => word.length > 3);
    const keyword = words[0] || 'Product';
    return keyword.charAt(0).toUpperCase() + keyword.slice(1) + 'Hub';
  }
}