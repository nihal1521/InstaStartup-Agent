import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'openai' | 'gemini' | 'github';

export interface AIProviderConfig {
  name: string;
  displayName: string;
  description: string;
  icon: string;
}

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  openai: {
    name: 'openai',
    displayName: 'OpenAI GPT-4',
    description: 'Advanced reasoning and creative content generation',
    icon: '🤖'
  },
  gemini: {
    name: 'gemini',
    displayName: 'Google Gemini',
    description: 'Multimodal AI with strong analytical capabilities',
    icon: '✨'
  },
  github: {
    name: 'github',
    displayName: 'GitHub Copilot',
    description: 'Code-focused AI with business development insights',
    icon: '🐙'
  }
};

export class OpenAIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an expert startup advisor and business strategist. Always return valid JSON responses.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }
      const data = await response.json();
      // Return the assistant's message content
      return data.choices?.[0]?.message?.content || '';
    } catch (err: any) {
      console.error('Error generating content with OpenAI:', err);
      throw err;
    }
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('DALL-E API error:', response.status, response.statusText, errorData);
        throw new Error(`DALL-E API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      if (data.data && data.data[0] && data.data[0].url) {
        return data.data[0].url;
      } else {
        throw new Error('DALL-E API returned invalid response format');
      }
    } catch (error) {
      console.error('Error generating image with DALL-E:', error);
      // Return fallback placeholder instead of throwing
      const brandName = prompt.match(/called "([^"]+)"/)?.[1] || 'Startup';
      return `https://via.placeholder.com/200x200/6366f1/white?text=${encodeURIComponent(brandName.substring(0, 2).toUpperCase())}`;
    }
  }
}

export class GeminiProvider {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Google AI API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const enhancedPrompt = `You are an expert startup advisor and business strategist. Always return valid JSON responses.

${prompt}

Important: Respond only with valid JSON. Do not include any markdown formatting or code blocks.`;

      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error(`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateImage(prompt: string): Promise<string> {
    // Gemini doesn't have image generation, so we'll use a placeholder
    const brandName = prompt.match(/called "([^"]+)"/)?.[1] || 'Startup';
    return `https://via.placeholder.com/200x200/4285f4/white?text=${encodeURIComponent(brandName.substring(0, 2).toUpperCase())}`;
  }
}

export class GitHubProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('GitHub API token is required');
    }
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      // GitHub Copilot doesn't have a direct API for content generation like this
      // We'll use GitHub's API to simulate business-focused responses
      // In a real implementation, you might use GitHub Copilot Chat API or similar
      
      const enhancedPrompt = `You are an expert startup advisor and business strategist with a focus on technical implementation. Always return valid JSON responses.

${prompt}

Focus on technical feasibility, development roadmap, and implementation details. Respond only with valid JSON.`;

      // For now, we'll create a structured response based on GitHub's developer-focused approach
      const businessResponse = await this.generateBusinessFocusedResponse(prompt);
      return JSON.stringify(businessResponse);
    } catch (error) {
      console.error('GitHub API error:', error);
      throw new Error(`GitHub API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateBusinessFocusedResponse(idea: string) {
    // Generate a developer-focused startup response
    const keywords = idea.toLowerCase().split(' ');
    const techStack = this.suggestTechStack(keywords);
    const brandName = this.generateTechBrandName(idea);
    
    return {
      brandName,
      tagline: "Built by developers, for developers",
      description: `${brandName} leverages modern technology stack to solve ${idea} with a developer-first approach.`,
      targetAudience: "Developers, tech startups, and technical teams",
      colors: {
        primary: "#24292e",
        secondary: "#586069", 
        accent: "#0366d6"
      },
      marketingCopy: {
        heroTitle: `Code Your Way to Success`,
        heroSubtitle: `Developer-focused solution for ${idea}`,
        ctaText: "Start Building",
        aboutText: `${brandName} is built by developers who understand the technical challenges of ${idea}. Our platform provides robust APIs, comprehensive documentation, and developer-friendly tools.`
      },
      features: [
        "RESTful API",
        "GraphQL support", 
        "Comprehensive documentation",
        "SDK for multiple languages",
        "Open source components",
        "Developer community"
      ],
      businessModel: `${brandName} follows a developer-first SaaS model with freemium tiers and usage-based pricing.`,
      pricing: {
        plans: [
          {
            name: "Developer",
            price: "Free",
            features: ["Basic API access", "Community support", "5,000 requests/month", "Open source tools"]
          },
          {
            name: "Startup",
            price: "$29/month", 
            features: ["All Developer features", "Priority support", "100,000 requests/month", "Advanced analytics", "Custom integrations"]
          },
          {
            name: "Enterprise",
            price: "Custom",
            features: ["All Startup features", "Dedicated support", "Unlimited requests", "SLA guarantee", "On-premise deployment"]
          }
        ]
      }
    };
  }

  private generateTechBrandName(idea: string): string {
    const techSuffixes = ['API', 'Dev', 'Code', 'Tech', 'Hub', 'Kit', 'Labs'];
    const keywords = idea.split(' ').filter(word => word.length > 3);
    const keyword = keywords[0] || 'Code';
    const suffix = techSuffixes[Math.floor(Math.random() * techSuffixes.length)];
    return keyword.charAt(0).toUpperCase() + keyword.slice(1) + suffix;
  }

  private suggestTechStack(keywords: string[]): string[] {
    const stacks = {
      web: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      backend: ['Node.js', 'Python', 'Go', 'PostgreSQL'],
      ai: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Hugging Face'],
      blockchain: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS']
    };

    if (keywords.some(k => ['mobile', 'app', 'ios', 'android'].includes(k))) {
      return stacks.mobile;
    }
    if (keywords.some(k => ['ai', 'ml', 'machine', 'learning'].includes(k))) {
      return stacks.ai;
    }
    if (keywords.some(k => ['blockchain', 'crypto', 'nft', 'defi'].includes(k))) {
      return stacks.blockchain;
    }
    if (keywords.some(k => ['api', 'backend', 'server'].includes(k))) {
      return stacks.backend;
    }
    return stacks.web;
  }

  async generateImage(prompt: string): Promise<string> {
    // GitHub doesn't have image generation, use GitHub-themed placeholder
    const brandName = prompt.match(/called "([^"]+)"/)?.[1] || 'Startup';
    return `https://via.placeholder.com/200x200/24292e/white?text=${encodeURIComponent(brandName.substring(0, 2).toUpperCase())}`;
  }
}

export function createAIProvider(provider: AIProvider, apiKey: string) {
  switch (provider) {
    case 'openai':
      return new OpenAIProvider(apiKey);
    case 'gemini':
      return new GeminiProvider(apiKey);
    case 'github':
      return new GitHubProvider(apiKey);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}