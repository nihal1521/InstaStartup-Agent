import { v4 as uuidv4 } from 'uuid';
import { AIProvider, createAIProvider, OpenAIProvider, GeminiProvider, GitHubProvider } from './ai-providers';

export interface StartupData {
  id: string;
  idea: string;
  brandName: string;
  tagline: string;
  description: string;
  features: string[];
  targetAudience: string;
  businessModel: string;
  pricing: {
    plans: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
  };
  marketingCopy: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
    aboutText: string;
  };
  pitchDeck: {
    slides: Array<{
      title: string;
      content: string;
      type: 'title' | 'problem' | 'solution' | 'market' | 'product' | 'business-model' | 'competition' | 'team' | 'financials' | 'ask';
    }>;
  };
  socialMedia: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  logoUrl?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  createdAt: Date;
}

export class StartupGenerator {
  private aiProvider: OpenAIProvider | GeminiProvider | GitHubProvider;
  private provider: AIProvider;

  constructor(provider: AIProvider, apiKey: string) {
    this.provider = provider;
    this.aiProvider = createAIProvider(provider, apiKey);
  }

  async generateStartup(idea: string): Promise<StartupData> {
    try {
      // Generate brand and basic info
      const brandData = await this.generateBrandIdentity(idea);
      
      // Generate marketing content
      const marketingData = await this.generateMarketingContent(idea, brandData.brandName);
      
      // Generate business details
      const businessData = await this.generateBusinessDetails(idea, brandData.brandName);
      
      // Generate pitch deck
      const pitchDeck = await this.generatePitchDeck(idea, brandData.brandName, businessData);
      
      // Generate social media content
      const socialMedia = await this.generateSocialMediaContent(idea, brandData.brandName);
      
      // Generate logo (placeholder for now)
      const logoUrl = await this.generateLogo(brandData.brandName);

      const startupData: StartupData = {
        id: uuidv4(),
        idea,
        ...brandData,
        ...marketingData,
        ...businessData,
        pitchDeck,
        socialMedia,
        logoUrl,
        createdAt: new Date()
      };

      return startupData;
    } catch (error) {
      console.error('Error generating startup:', error);
      throw new Error('Failed to generate startup');
    }
  }

  private async generateBrandIdentity(idea: string) {
    const prompt = `
    Based on this startup idea: "${idea}"
    
    Generate a comprehensive brand identity including:
    1. Brand name (creative, memorable, .com available)
    2. Tagline (under 10 words)
    3. Description (2-3 sentences)
    4. Target audience
    5. Color scheme (primary, secondary, accent colors in hex)
    
    Return as JSON with keys: brandName, tagline, description, targetAudience, colors
    `;

    try {
      const response = await this.callAI(prompt);
      const parsed = JSON.parse(response);
      
      // Ensure all required fields are present with fallbacks
      return {
        brandName: parsed.brandName || this.generateFallbackBrandName(idea),
        tagline: parsed.tagline || "Innovation at your fingertips",
        description: parsed.description || `A revolutionary platform that transforms ${idea} into reality.`,
        targetAudience: parsed.targetAudience || "Tech-savvy professionals and early adopters",
        colors: {
          primary: parsed.colors?.primary || "#6366f1",
          secondary: parsed.colors?.secondary || "#8b5cf6",
          accent: parsed.colors?.accent || "#06b6d4"
        }
      };
    } catch (error) {
      console.error('Error generating brand identity:', error);
      return this.getFallbackBrandData(idea);
    }
  }

  private async generateMarketingContent(idea: string, brandName: string) {
    const prompt = `
    For the startup "${brandName}" with idea: "${idea}"
    
    Generate marketing website content:
    1. Hero title (compelling, under 8 words)
    2. Hero subtitle (value proposition, under 20 words)
    3. CTA text (action-oriented, under 4 words)
    4. About section text (2-3 paragraphs)
    5. Key features list (5-7 features)
    
    Return as JSON with keys: marketingCopy (object with heroTitle, heroSubtitle, ctaText, aboutText), features (array)
    `;

    try {
      const response = await this.callAI(prompt);
      const parsed = JSON.parse(response);
      
      return {
        marketingCopy: {
          heroTitle: parsed.marketingCopy?.heroTitle || `Transform Your ${this.extractKeyword(idea)}`,
          heroSubtitle: parsed.marketingCopy?.heroSubtitle || `Revolutionary platform that brings your ${idea} to life`,
          ctaText: parsed.marketingCopy?.ctaText || "Get Started",
          aboutText: parsed.marketingCopy?.aboutText || `${brandName} is revolutionizing the way we approach ${idea}. Our innovative platform combines cutting-edge technology with user-friendly design to deliver exceptional results. Join thousands of satisfied users who have transformed their workflow with our solution.`
        },
        features: parsed.features || [
          "AI-powered automation",
          "Real-time collaboration",
          "Advanced analytics",
          "Seamless integration",
          "Mobile-first design",
          "24/7 customer support"
        ]
      };
    } catch (error) {
      console.error('Error generating marketing content:', error);
      return this.getFallbackMarketingData(idea, brandName);
    }
  }

  private async generateBusinessDetails(idea: string, brandName: string) {
    const prompt = `
    For the startup "${brandName}" with idea: "${idea}"
    
    Generate business model and pricing:
    1. Business model description
    2. Pricing plans (3 tiers: Basic, Pro, Enterprise)
    
    Return as JSON with keys: businessModel, pricing (object with plans array)
    `;

    try {
      const response = await this.callAI(prompt);
      const parsed = JSON.parse(response);
      
      return {
        businessModel: parsed.businessModel || `${brandName} operates on a SaaS model, providing scalable solutions for ${idea} with subscription-based pricing.`,
        pricing: {
          plans: parsed.pricing?.plans || [
            {
              name: "Basic",
              price: "$9/month",
              features: ["Core features", "Email support", "5 projects", "Basic analytics"]
            },
            {
              name: "Pro",
              price: "$29/month",
              features: ["All Basic features", "Priority support", "Unlimited projects", "Advanced analytics", "API access"]
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: ["All Pro features", "Dedicated support", "Custom integrations", "Advanced security", "SLA guarantee"]
            }
          ]
        }
      };
    } catch (error) {
      console.error('Error generating business details:', error);
      return this.getFallbackBusinessData(brandName);
    }
  }

  private async generatePitchDeck(idea: string, brandName: string, businessData: any) {
    const prompt = `
    Create a 10-slide pitch deck for "${brandName}" with idea: "${idea}"
    
    Generate slides for:
    1. Title slide
    2. Problem
    3. Solution
    4. Market opportunity
    5. Product
    6. Business model
    7. Competition
    8. Team
    9. Financials
    10. Ask
    
    Return as JSON with slides array, each slide having: title, content, type
    `;

    try {
      const response = await this.callAI(prompt);
      const parsed = JSON.parse(response);
      
      return {
        slides: parsed.slides || this.getFallbackPitchDeck(idea, brandName)
      };
    } catch (error) {
      console.error('Error generating pitch deck:', error);
      return {
        slides: this.getFallbackPitchDeck(idea, brandName)
      };
    }
  }

  private async generateSocialMediaContent(idea: string, brandName: string) {
    const prompt = `
    Create social media launch posts for "${brandName}" with idea: "${idea}"
    
    Generate:
    1. LinkedIn post (professional, 100-150 words)
    2. Twitter post (engaging, under 280 chars)
    3. Instagram caption (visual, 50-100 words with hashtags)
    
    Return as JSON with keys: linkedin, twitter, instagram
    `;

    try {
      const response = await this.callAI(prompt);
      const parsed = JSON.parse(response);
      
      return {
        linkedin: parsed.linkedin || `🚀 Excited to announce the launch of ${brandName}! We're revolutionizing ${idea} with cutting-edge technology and user-centric design. Our platform empowers businesses to achieve more with less effort. Join us on this incredible journey! #startup #innovation #technology`,
        twitter: parsed.twitter || `🎉 Launching ${brandName}! Transforming ${idea} one step at a time. Ready to revolutionize your workflow? Join us! 🚀 #startup #innovation`,
        instagram: parsed.instagram || `✨ Introducing ${brandName} ✨\n\nWe're here to transform ${idea} and make your life easier! 🚀\n\n#startup #innovation #technology #entrepreneur #newlaunch #gamechange`
      };
    } catch (error) {
      console.error('Error generating social media content:', error);
      return this.getFallbackSocialMedia(idea, brandName);
    }
  }

  private async generateLogo(brandName: string): Promise<string> {
    try {
      const prompt = `Create a modern, minimalist logo for a startup called "${brandName}". The logo should be professional, clean, and suitable for a tech company. Use a simple design with bold colors on a white background. Make it suitable for use as a company logo.`;
      return await this.aiProvider.generateImage(prompt);
    } catch (error) {
      console.error('Error generating logo:', error);
      // Fallback to placeholder
      return `https://via.placeholder.com/200x200/6366f1/white?text=${encodeURIComponent(brandName.substring(0, 2).toUpperCase())}`;
    }
  }

  private async callAI(prompt: string): Promise<string> {
    return await this.aiProvider.generateContent(prompt);
  }

  // Fallback methods for when AI generation fails
  private generateFallbackBrandName(idea: string): string {
    const keywords = idea.split(' ').filter(word => word.length > 3);
    const keyword = keywords[0] || 'Startup';
    const suffixes = ['Hub', 'Pro', 'AI', 'Tech', 'Labs', 'Solutions'];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return keyword.charAt(0).toUpperCase() + keyword.slice(1) + suffix;
  }

  private extractKeyword(idea: string): string {
    const words = idea.split(' ').filter(word => word.length > 3);
    return words[0] || 'Business';
  }

  private getFallbackBrandData(idea: string) {
    const brandName = this.generateFallbackBrandName(idea);
    return {
      brandName,
      tagline: "Innovation at your fingertips",
      description: `${brandName} is a revolutionary platform that transforms ${idea} into reality with cutting-edge technology.`,
      targetAudience: "Tech-savvy professionals and early adopters",
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#06b6d4"
      }
    };
  }

  private getFallbackMarketingData(idea: string, brandName: string) {
    return {
      marketingCopy: {
        heroTitle: `Transform Your ${this.extractKeyword(idea)}`,
        heroSubtitle: `Revolutionary platform that brings your ${idea} to life`,
        ctaText: "Get Started",
        aboutText: `${brandName} is revolutionizing the way we approach ${idea}. Our innovative platform combines cutting-edge technology with user-friendly design to deliver exceptional results.`
      },
      features: [
        "AI-powered automation",
        "Real-time collaboration", 
        "Advanced analytics",
        "Seamless integration",
        "Mobile-first design",
        "24/7 customer support"
      ]
    };
  }

  private getFallbackBusinessData(brandName: string) {
    return {
      businessModel: `${brandName} operates on a SaaS model, providing scalable solutions with subscription-based pricing.`,
      pricing: {
        plans: [
          {
            name: "Basic",
            price: "$9/month",
            features: ["Core features", "Email support", "5 projects", "Basic analytics"]
          },
          {
            name: "Pro", 
            price: "$29/month",
            features: ["All Basic features", "Priority support", "Unlimited projects", "Advanced analytics", "API access"]
          },
          {
            name: "Enterprise",
            price: "Custom",
            features: ["All Pro features", "Dedicated support", "Custom integrations", "Advanced security", "SLA guarantee"]
          }
        ]
      }
    };
  }

  private getFallbackPitchDeck(idea: string, brandName: string) {
    return [
      {
        title: brandName,
        content: `Revolutionizing ${idea} with innovative technology`,
        type: 'title' as const
      },
      {
        title: "The Problem",
        content: `Current solutions for ${idea} are outdated, inefficient, and don't meet modern user expectations.`,
        type: 'problem' as const
      },
      {
        title: "Our Solution",
        content: `${brandName} provides a comprehensive platform that addresses these challenges with cutting-edge technology.`,
        type: 'solution' as const
      },
      {
        title: "Market Opportunity",
        content: "The market for innovative solutions is growing rapidly, with billions in potential revenue.",
        type: 'market' as const
      },
      {
        title: "Product Demo",
        content: "Our platform features intuitive design, powerful automation, and seamless integration capabilities.",
        type: 'product' as const
      },
      {
        title: "Business Model",
        content: "SaaS subscription model with tiered pricing to serve businesses of all sizes.",
        type: 'business-model' as const
      },
      {
        title: "Competition",
        content: "While competitors exist, our unique approach and technology give us a significant advantage.",
        type: 'competition' as const
      },
      {
        title: "Team",
        content: "Experienced team of entrepreneurs and technologists with proven track records.",
        type: 'team' as const
      },
      {
        title: "Financial Projections",
        content: "Projected to reach $10M ARR within 3 years with strong unit economics.",
        type: 'financials' as const
      },
      {
        title: "Investment Ask",
        content: "Seeking $2M Series A to accelerate growth and expand our team.",
        type: 'ask' as const
      }
    ];
  }

  private getFallbackSocialMedia(idea: string, brandName: string) {
    return {
      linkedin: `🚀 Excited to announce the launch of ${brandName}! We're revolutionizing ${idea} with cutting-edge technology and user-centric design. Our platform empowers businesses to achieve more with less effort. Join us on this incredible journey! #startup #innovation #technology`,
      twitter: `🎉 Launching ${brandName}! Transforming ${idea} one step at a time. Ready to revolutionize your workflow? Join us! 🚀 #startup #innovation`,
      instagram: `✨ Introducing ${brandName} ✨\n\nWe're here to transform ${idea} and make your life easier! 🚀\n\n#startup #innovation #technology #entrepreneur #newlaunch #gamechange`
    };
  }
}