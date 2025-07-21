import { BaseAgent, AgentContext, AgentMessage, AgentCapability } from './base-agent';

export interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string[];
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSizes: Record<string, string>;
    fontWeights: Record<string, number>;
    lineHeights: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
}

export interface UIComponents {
  components: {
    name: string;
    code: string;
    props: Record<string, any>;
    variants: string[];
  }[];
  layouts: {
    name: string;
    code: string;
    responsive: boolean;
  }[];
  animations: {
    name: string;
    keyframes: string;
    duration: string;
  }[];
}

export class DesignerAgent extends BaseAgent {
  constructor() {
    const capabilities: AgentCapability[] = [
      {
        name: 'create_design_system',
        description: 'Create comprehensive design system with colors, typography, spacing',
        inputSchema: { brandGuidelines: 'object', targetAudience: 'string' },
        outputSchema: { designSystem: 'DesignSystem' }
      },
      {
        name: 'generate_ui_components',
        description: 'Generate reusable UI components with Tailwind CSS',
        inputSchema: { designSystem: 'DesignSystem', components: 'array' },
        outputSchema: { uiComponents: 'UIComponents' }
      },
      {
        name: 'create_responsive_layouts',
        description: 'Design responsive layouts for different screen sizes',
        inputSchema: { pages: 'array', designSystem: 'DesignSystem' },
        outputSchema: { layouts: 'array' }
      },
      {
        name: 'design_user_flows',
        description: 'Create user experience flows and wireframes',
        inputSchema: { userStories: 'array', features: 'array' },
        outputSchema: { userFlows: 'array' }
      },
      {
        name: 'generate_animations',
        description: 'Create micro-interactions and animations',
        inputSchema: { interactions: 'array', designSystem: 'DesignSystem' },
        outputSchema: { animations: 'array' }
      }
    ];

    super(
      'designer',
      'UI/UX Designer',
      'Creates design systems, UI components, layouts, and user experience flows',
      capabilities
    );
  }

  async execute(task: string, context: AgentContext, parameters?: Record<string, any>): Promise<AgentMessage> {
    let result: any;
    
    switch (task) {
      case 'create_design_system':
        result = await this.createDesignSystem(parameters?.brandGuidelines, parameters?.targetAudience);
        break;
      case 'generate_ui_components':
        result = await this.generateUIComponents(parameters?.designSystem, parameters?.components);
        break;
      case 'create_responsive_layouts':
        result = await this.createResponsiveLayouts(parameters?.pages, parameters?.designSystem);
        break;
      case 'design_user_flows':
        result = await this.designUserFlows(parameters?.userStories, parameters?.features);
        break;
      case 'generate_animations':
        result = await this.generateAnimations(parameters?.interactions, parameters?.designSystem);
        break;
      default:
        result = await this.analyzeDesignRequirements(parameters);
    }

    return {
      id: this.generateMessageId(),
      agentId: this.id,
      content: JSON.stringify(result),
      timestamp: new Date(),
      metadata: { task, parameters }
    };
  }

  private async createDesignSystem(brandGuidelines: any, targetAudience: string): Promise<DesignSystem> {
    const prompt = `
    As a Senior UI/UX Designer, create a comprehensive design system:
    
    Brand Guidelines: ${JSON.stringify(brandGuidelines)}
    Target Audience: ${targetAudience}
    
    Design a cohesive system including:
    1. Color palette (primary, secondary, accent, neutrals, semantic colors)
    2. Typography scale (font families, sizes, weights, line heights)
    3. Spacing system (consistent spacing scale)
    4. Border radius values
    5. Shadow system
    6. Responsive breakpoints
    
    Consider:
    - Accessibility (WCAG 2.1 AA compliance)
    - Brand personality and values
    - Target audience preferences
    - Modern design trends
    - Cross-platform consistency
    
    Return as JSON matching DesignSystem interface.
    Use hex colors and rem/px units appropriately.
    `;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        colors: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#06b6d4',
          neutral: ['#ffffff', '#f8fafc', '#e2e8f0', '#64748b', '#334155', '#0f172a'],
          semantic: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6'
          }
        },
        typography: {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
          },
          fontWeights: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
          },
          lineHeights: {
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75
          }
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem'
        },
        borderRadius: {
          sm: '0.25rem',
          md: '0.5rem',
          lg: '0.75rem',
          xl: '1rem'
        },
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
        },
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      };
    }
  }

  private async generateUIComponents(designSystem: DesignSystem, components: string[]): Promise<UIComponents> {
    const prompt = `
    Generate reusable UI components using React, TypeScript, and Tailwind CSS:
    
    Design System: ${JSON.stringify(designSystem)}
    Required Components: ${components.join(', ')}
    
    For each component, create:
    1. TypeScript interface for props
    2. React component with proper typing
    3. Multiple variants (sizes, colors, states)
    4. Accessibility features (ARIA labels, keyboard navigation)
    5. Responsive behavior
    6. Hover/focus states
    7. Loading and error states where applicable
    
    Use design system tokens consistently.
    Follow React best practices and composition patterns.
    Include proper JSDoc comments.
    
    Return complete component code with variants and usage examples.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async createResponsiveLayouts(pages: string[], designSystem: DesignSystem): Promise<any[]> {
    const prompt = `
    Create responsive layouts for these pages: ${pages.join(', ')}
    
    Design System: ${JSON.stringify(designSystem)}
    
    For each layout:
    1. Mobile-first responsive design
    2. Grid and flexbox layouts
    3. Proper spacing and typography
    4. Navigation patterns
    5. Content hierarchy
    6. Interactive elements placement
    7. Accessibility considerations
    
    Consider:
    - Touch targets on mobile
    - Reading patterns (F-pattern, Z-pattern)
    - Content prioritization
    - Performance optimization
    - Cross-browser compatibility
    
    Return layout components with responsive breakpoints.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async designUserFlows(userStories: string[], features: string[]): Promise<any[]> {
    const prompt = `
    Design user experience flows for:
    User Stories: ${userStories.join(', ')}
    Features: ${features.join(', ')}
    
    Create:
    1. User journey maps
    2. Wireframe sequences
    3. Decision points and branches
    4. Error handling flows
    5. Success states and feedback
    6. Navigation patterns
    7. Information architecture
    
    Consider:
    - User mental models
    - Cognitive load reduction
    - Clear call-to-actions
    - Progressive disclosure
    - Error prevention and recovery
    
    Return structured flow definitions with steps and transitions.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async generateAnimations(interactions: string[], designSystem: DesignSystem): Promise<any[]> {
    const prompt = `
    Create micro-interactions and animations for: ${interactions.join(', ')}
    
    Design System: ${JSON.stringify(designSystem)}
    
    Generate:
    1. CSS keyframes and transitions
    2. Framer Motion variants
    3. Loading animations
    4. Hover and focus effects
    5. Page transitions
    6. Form feedback animations
    7. Success/error state animations
    
    Principles:
    - Purposeful and meaningful
    - Consistent timing and easing
    - Respect user preferences (prefers-reduced-motion)
    - Performance optimized
    - Accessible and not distracting
    
    Return animation definitions with CSS and React code.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async analyzeDesignRequirements(parameters: any): Promise<any> {
    return {
      analysis: 'Design requirements analyzed',
      recommendations: [
        'Create consistent design system',
        'Focus on accessibility and usability',
        'Implement responsive design patterns',
        'Use meaningful animations and transitions',
        'Maintain visual hierarchy and contrast'
      ],
      designPrinciples: [
        'Simplicity and clarity',
        'Consistency across all touchpoints',
        'Accessibility for all users',
        'Performance and fast loading',
        'Mobile-first approach'
      ]
    };
  }
}