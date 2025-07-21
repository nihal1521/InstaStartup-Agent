import { BaseAgent, AgentContext, AgentMessage, AgentCapability } from './base-agent';

export interface SEOStrategy {
  keywords: {
    primary: string[];
    secondary: string[];
    longTail: string[];
  };
  contentPlan: {
    title: string;
    type: 'blog' | 'landing' | 'guide' | 'case-study';
    keywords: string[];
    outline: string[];
  }[];
  technicalSEO: {
    metaTags: Record<string, string>;
    structuredData: any;
    sitemapStructure: string[];
  };
}

export interface MarketingCampaign {
  channels: {
    name: string;
    strategy: string;
    content: string[];
    metrics: string[];
  }[];
  emailSequences: {
    type: 'welcome' | 'nurture' | 'conversion' | 'retention';
    emails: {
      subject: string;
      content: string;
      timing: string;
    }[];
  }[];
  socialMediaPlan: {
    platform: string;
    contentTypes: string[];
    postingSchedule: string;
    hashtags: string[];
  }[];
}

export class MarketingAgent extends BaseAgent {
  constructor() {
    const capabilities: AgentCapability[] = [
      {
        name: 'create_seo_strategy',
        description: 'Develop comprehensive SEO strategy with keyword research',
        inputSchema: { product: 'object', targetAudience: 'string', competitors: 'array' },
        outputSchema: { seoStrategy: 'SEOStrategy' }
      },
      {
        name: 'generate_blog_content',
        description: 'Create blog posts and content marketing materials',
        inputSchema: { topics: 'array', keywords: 'array', audience: 'string' },
        outputSchema: { blogPosts: 'array' }
      },
      {
        name: 'create_email_campaigns',
        description: 'Design email marketing sequences and campaigns',
        inputSchema: { customerJourney: 'array', product: 'object' },
        outputSchema: { emailCampaigns: 'array' }
      },
      {
        name: 'generate_social_content',
        description: 'Create social media content and posting schedules',
        inputSchema: { platforms: 'array', brand: 'object', audience: 'string' },
        outputSchema: { socialContent: 'array' }
      },
      {
        name: 'create_landing_pages',
        description: 'Design high-converting landing page copy and structure',
        inputSchema: { offer: 'object', audience: 'string', goals: 'array' },
        outputSchema: { landingPages: 'array' }
      }
    ];

    super(
      'marketing-lead',
      'Marketing Lead',
      'Creates SEO strategies, content marketing, email campaigns, and social media content',
      capabilities
    );
  }

  async execute(task: string, context: AgentContext, parameters?: Record<string, any>): Promise<AgentMessage> {
    let result: any;
    
    switch (task) {
      case 'create_seo_strategy':
        result = await this.createSEOStrategy(parameters?.product, parameters?.targetAudience, parameters?.competitors);
        break;
      case 'generate_blog_content':
        result = await this.generateBlogContent(parameters?.topics, parameters?.keywords, parameters?.audience);
        break;
      case 'create_email_campaigns':
        result = await this.createEmailCampaigns(parameters?.customerJourney, parameters?.product);
        break;
      case 'generate_social_content':
        result = await this.generateSocialContent(parameters?.platforms, parameters?.brand, parameters?.audience);
        break;
      case 'create_landing_pages':
        result = await this.createLandingPages(parameters?.offer, parameters?.audience, parameters?.goals);
        break;
      default:
        result = await this.analyzeMarketingNeeds(parameters);
    }

    return {
      id: this.generateMessageId(),
      agentId: this.id,
      content: JSON.stringify(result),
      timestamp: new Date(),
      metadata: { task, parameters }
    };
  }

  private async createSEOStrategy(product: any, targetAudience: string, competitors: string[]): Promise<SEOStrategy> {
    const prompt = `
    As a Senior SEO Strategist, create a comprehensive SEO strategy:
    
    Product: ${JSON.stringify(product)}
    Target Audience: ${targetAudience}
    Competitors: ${competitors.join(', ')}
    
    Develop:
    1. Keyword research and mapping
       - Primary keywords (high volume, high intent)
       - Secondary keywords (supporting topics)
       - Long-tail keywords (specific, lower competition)
    
    2. Content strategy
       - Blog post topics and outlines
       - Landing page optimization
       - Resource pages and guides
       - Case studies and testimonials
    
    3. Technical SEO recommendations
       - Meta tags and descriptions
       - Structured data markup
       - Site architecture and navigation
       - Page speed optimization
    
    Consider:
    - Search intent and user journey
    - Competitor gap analysis
    - Local SEO opportunities
    - Voice search optimization
    - Mobile-first indexing
    
    Return comprehensive SEO strategy as JSON.
    `;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        keywords: {
          primary: ['startup generator', 'ai business tools', 'entrepreneur platform'],
          secondary: ['business planning', 'startup ideas', 'pitch deck creator'],
          longTail: ['how to create startup pitch deck', 'ai powered business plan generator', 'startup idea validation tool']
        },
        contentPlan: [
          {
            title: 'Complete Guide to Startup Validation',
            type: 'guide',
            keywords: ['startup validation', 'business idea validation'],
            outline: ['Introduction', 'Market Research', 'Customer Interviews', 'MVP Testing', 'Metrics and KPIs']
          },
          {
            title: 'How AI is Transforming Entrepreneurship',
            type: 'blog',
            keywords: ['ai entrepreneurship', 'startup technology'],
            outline: ['AI Tools Overview', 'Case Studies', 'Implementation Tips', 'Future Trends']
          }
        ],
        technicalSEO: {
          metaTags: {
            title: 'InstaStartup - AI-Powered Startup Generator',
            description: 'Transform your startup idea into a complete business package with AI. Generate brand names, logos, landing pages, and pitch decks instantly.',
            keywords: 'startup generator, ai business tools, entrepreneur platform'
          },
          structuredData: {
            '@type': 'SoftwareApplication',
            name: 'InstaStartup',
            applicationCategory: 'BusinessApplication'
          },
          sitemapStructure: ['/', '/features', '/pricing', '/blog', '/about', '/contact']
        }
      };
    }
  }

  private async generateBlogContent(topics: string[], keywords: string[], audience: string): Promise<any[]> {
    const prompt = `
    Create comprehensive blog content for:
    Topics: ${topics.join(', ')}
    Keywords: ${keywords.join(', ')}
    Audience: ${audience}
    
    For each blog post, generate:
    1. SEO-optimized title and meta description
    2. Detailed outline with H2/H3 structure
    3. Introduction hook and conclusion
    4. Key points and supporting arguments
    5. Call-to-action suggestions
    6. Internal linking opportunities
    7. Featured image suggestions
    
    Writing style:
    - Engaging and conversational
    - Data-driven with statistics
    - Actionable insights and tips
    - Problem-solution focused
    - Optimized for readability
    
    Return structured blog post content.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async createEmailCampaigns(customerJourney: string[], product: any): Promise<any[]> {
    const prompt = `
    Design email marketing campaigns for:
    Customer Journey: ${customerJourney.join(' -> ')}
    Product: ${JSON.stringify(product)}
    
    Create email sequences for:
    1. Welcome series (3-5 emails)
    2. Educational nurture sequence (5-7 emails)
    3. Product onboarding (4-6 emails)
    4. Re-engagement campaign (3-4 emails)
    5. Customer success stories (ongoing)
    
    For each email:
    - Compelling subject lines (A/B test variants)
    - Personalized content
    - Clear value proposition
    - Strong call-to-action
    - Mobile-optimized format
    - Segmentation criteria
    
    Include timing, triggers, and success metrics.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async generateSocialContent(platforms: string[], brand: any, audience: string): Promise<any[]> {
    const prompt = `
    Create social media content strategy for:
    Platforms: ${platforms.join(', ')}
    Brand: ${JSON.stringify(brand)}
    Audience: ${audience}
    
    For each platform, create:
    1. Content pillars and themes
    2. Posting schedule and frequency
    3. Content formats (posts, stories, videos, etc.)
    4. Hashtag strategy
    5. Engagement tactics
    6. Community building approach
    7. Influencer collaboration ideas
    
    Content types:
    - Educational posts
    - Behind-the-scenes content
    - User-generated content
    - Product announcements
    - Industry insights
    - Interactive content (polls, Q&A)
    
    Include platform-specific best practices and optimization tips.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async createLandingPages(offer: any, audience: string, goals: string[]): Promise<any[]> {
    const prompt = `
    Design high-converting landing pages for:
    Offer: ${JSON.stringify(offer)}
    Audience: ${audience}
    Goals: ${goals.join(', ')}
    
    Create landing page structure with:
    1. Compelling headline and subheadline
    2. Value proposition and benefits
    3. Social proof and testimonials
    4. Feature highlights
    5. Pricing and offers
    6. FAQ section
    7. Strong call-to-action buttons
    8. Trust signals and guarantees
    
    Optimization elements:
    - Above-the-fold optimization
    - Mobile responsiveness
    - Page load speed
    - A/B testing recommendations
    - Conversion tracking setup
    - Exit-intent popups
    
    Include copywriting and design recommendations.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async analyzeMarketingNeeds(parameters: any): Promise<any> {
    return {
      analysis: 'Marketing requirements analyzed',
      recommendations: [
        'Develop comprehensive content marketing strategy',
        'Implement SEO best practices from launch',
        'Create multi-channel marketing campaigns',
        'Build email list and nurture sequences',
        'Establish strong social media presence'
      ],
      channels: [
        'Content marketing and SEO',
        'Email marketing automation',
        'Social media marketing',
        'Paid advertising (Google, Facebook)',
        'Influencer partnerships',
        'Community building'
      ],
      metrics: [
        'Website traffic and organic rankings',
        'Email open and click-through rates',
        'Social media engagement and followers',
        'Lead generation and conversion rates',
        'Customer acquisition cost (CAC)',
        'Lifetime value (LTV)'
      ]
    };
  }
}