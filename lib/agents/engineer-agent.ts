import { BaseAgent, AgentContext, AgentMessage, AgentCapability } from './base-agent';

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string[];
  testing: string[];
}

export interface CodeGeneration {
  files: {
    path: string;
    content: string;
    type: 'component' | 'api' | 'config' | 'test';
  }[];
  dependencies: string[];
  instructions: string[];
}

export class EngineerAgent extends BaseAgent {
  constructor() {
    const capabilities: AgentCapability[] = [
      {
        name: 'select_tech_stack',
        description: 'Choose optimal technology stack for the project',
        inputSchema: { requirements: 'object', constraints: 'object' },
        outputSchema: { techStack: 'TechStack' }
      },
      {
        name: 'generate_frontend_code',
        description: 'Generate React/Next.js frontend components',
        inputSchema: { features: 'array', design: 'object' },
        outputSchema: { codeGeneration: 'CodeGeneration' }
      },
      {
        name: 'generate_backend_code',
        description: 'Generate API routes and backend logic',
        inputSchema: { endpoints: 'array', database: 'object' },
        outputSchema: { codeGeneration: 'CodeGeneration' }
      },
      {
        name: 'setup_database_schema',
        description: 'Design and generate database schema',
        inputSchema: { dataModels: 'array' },
        outputSchema: { schema: 'object' }
      },
      {
        name: 'create_deployment_config',
        description: 'Generate deployment and CI/CD configuration',
        inputSchema: { techStack: 'TechStack', platform: 'string' },
        outputSchema: { deploymentConfig: 'object' }
      }
    ];

    super(
      'engineer',
      'Software Engineer',
      'Generates frontend/backend code, selects tech stack, and handles deployment',
      capabilities
    );
  }

  async execute(task: string, context: AgentContext, parameters?: Record<string, any>): Promise<AgentMessage> {
    let result: any;
    
    switch (task) {
      case 'select_tech_stack':
        result = await this.selectTechStack(parameters?.requirements, parameters?.constraints);
        break;
      case 'generate_frontend_code':
        result = await this.generateFrontendCode(parameters?.features, parameters?.design);
        break;
      case 'generate_backend_code':
        result = await this.generateBackendCode(parameters?.endpoints, parameters?.database);
        break;
      case 'setup_database_schema':
        result = await this.setupDatabaseSchema(parameters?.dataModels);
        break;
      case 'create_deployment_config':
        result = await this.createDeploymentConfig(parameters?.techStack, parameters?.platform);
        break;
      default:
        result = await this.analyzeRequirements(parameters);
    }

    return {
      id: this.generateMessageId(),
      agentId: this.id,
      content: JSON.stringify(result),
      timestamp: new Date(),
      metadata: { task, parameters }
    };
  }

  private async selectTechStack(requirements: any, constraints: any): Promise<TechStack> {
    const prompt = `
    As a Senior Software Engineer, select the optimal tech stack for this project:
    
    Requirements: ${JSON.stringify(requirements)}
    Constraints: ${JSON.stringify(constraints)}
    
    Consider:
    1. Scalability needs
    2. Team expertise
    3. Time to market
    4. Budget constraints
    5. Performance requirements
    6. Maintenance overhead
    
    Recommend specific technologies for:
    - Frontend (framework, UI library, state management)
    - Backend (runtime, framework, API design)
    - Database (type, specific solution)
    - Deployment (platform, CI/CD)
    - Testing (unit, integration, e2e)
    
    Return as JSON matching TechStack interface.
    `;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Next.js API Routes', 'Prisma ORM'],
        database: ['PostgreSQL', 'Redis'],
        deployment: ['Vercel', 'GitHub Actions'],
        testing: ['Jest', 'React Testing Library', 'Playwright']
      };
    }
  }

  private async generateFrontendCode(features: string[], design: any): Promise<CodeGeneration> {
    const prompt = `
    Generate React/Next.js frontend code for these features: ${features.join(', ')}
    
    Design requirements: ${JSON.stringify(design)}
    
    Create:
    1. Component files with TypeScript
    2. Custom hooks for state management
    3. API integration utilities
    4. Responsive layouts with Tailwind CSS
    5. Form validation and error handling
    6. Loading states and animations
    
    Follow best practices:
    - Component composition
    - Proper TypeScript typing
    - Accessibility (a11y)
    - Performance optimization
    - Clean code principles
    
    Return file structure with complete code for each component.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async generateBackendCode(endpoints: string[], database: any): Promise<CodeGeneration> {
    const prompt = `
    Generate Next.js API routes for these endpoints: ${endpoints.join(', ')}
    
    Database schema: ${JSON.stringify(database)}
    
    Create:
    1. API route handlers with proper HTTP methods
    2. Input validation and sanitization
    3. Error handling and status codes
    4. Database operations with Prisma/ORM
    5. Authentication middleware
    6. Rate limiting and security headers
    7. API documentation comments
    
    Follow REST/GraphQL best practices:
    - Consistent response format
    - Proper error messages
    - Input validation
    - Security considerations
    - Performance optimization
    
    Return complete API implementation.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async setupDatabaseSchema(dataModels: any[]): Promise<any> {
    const prompt = `
    Design database schema for these data models: ${JSON.stringify(dataModels)}
    
    Create:
    1. Table definitions with proper relationships
    2. Indexes for performance
    3. Constraints and validations
    4. Migration scripts
    5. Seed data examples
    
    Consider:
    - Normalization vs denormalization
    - Query patterns
    - Scalability
    - Data integrity
    - Performance optimization
    
    Return Prisma schema and migration files.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async createDeploymentConfig(techStack: TechStack, platform: string): Promise<any> {
    const prompt = `
    Create deployment configuration for:
    Tech Stack: ${JSON.stringify(techStack)}
    Platform: ${platform}
    
    Generate:
    1. CI/CD pipeline configuration
    2. Environment variable setup
    3. Build and deployment scripts
    4. Docker configuration (if needed)
    5. Monitoring and logging setup
    6. Security configurations
    
    Include:
    - Automated testing in pipeline
    - Environment-specific configs
    - Rollback strategies
    - Performance monitoring
    - Error tracking
    
    Return complete deployment setup.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async analyzeRequirements(parameters: any): Promise<any> {
    return {
      analysis: 'Technical requirements analyzed',
      recommendations: [
        'Use modern React patterns with hooks',
        'Implement TypeScript for type safety',
        'Set up proper error boundaries',
        'Use server-side rendering for SEO',
        'Implement proper caching strategies'
      ],
      nextSteps: [
        'Select appropriate tech stack',
        'Set up development environment',
        'Create project structure',
        'Implement core features',
        'Set up deployment pipeline'
      ]
    };
  }
}