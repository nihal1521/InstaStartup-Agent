import { BaseAgent, AgentContext, AgentMessage, AgentCapability } from './base-agent';

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: string;
  assignedAgent?: string;
  createdAt: Date;
  updatedAt: Date;
  responses: {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    isInternal: boolean;
  }[];
}

export interface UserFeedback {
  id: string;
  userId: string;
  type: 'bug' | 'feature-request' | 'improvement' | 'compliment' | 'complaint';
  content: string;
  rating?: number;
  category: string;
  status: 'new' | 'reviewed' | 'planned' | 'implemented' | 'rejected';
  createdAt: Date;
}

export class CustomerSuccessAgent extends BaseAgent {
  constructor() {
    const capabilities: AgentCapability[] = [
      {
        name: 'handle_support_ticket',
        description: 'Process and respond to customer support tickets',
        inputSchema: { ticket: 'SupportTicket' },
        outputSchema: { response: 'string', actions: 'array' }
      },
      {
        name: 'generate_auto_reply',
        description: 'Generate automated responses for common inquiries',
        inputSchema: { inquiry: 'string', context: 'object' },
        outputSchema: { reply: 'string', confidence: 'number' }
      },
      {
        name: 'analyze_user_feedback',
        description: 'Analyze and categorize user feedback for product improvements',
        inputSchema: { feedback: 'array' },
        outputSchema: { insights: 'object', recommendations: 'array' }
      },
      {
        name: 'create_help_content',
        description: 'Generate help documentation and FAQ content',
        inputSchema: { topics: 'array', commonIssues: 'array' },
        outputSchema: { helpContent: 'array' }
      },
      {
        name: 'monitor_user_health',
        description: 'Track user engagement and identify at-risk customers',
        inputSchema: { userMetrics: 'array' },
        outputSchema: { healthScores: 'array', interventions: 'array' }
      }
    ];

    super(
      'customer-success',
      'Customer Success Bot',
      'Handles support tickets, user feedback, help content, and customer health monitoring',
      capabilities
    );
  }

  async execute(task: string, context: AgentContext, parameters?: Record<string, any>): Promise<AgentMessage> {
    let result: any;
    
    switch (task) {
      case 'handle_support_ticket':
        result = await this.handleSupportTicket(parameters?.ticket);
        break;
      case 'generate_auto_reply':
        result = await this.generateAutoReply(parameters?.inquiry, parameters?.context);
        break;
      case 'analyze_user_feedback':
        result = await this.analyzeUserFeedback(parameters?.feedback);
        break;
      case 'create_help_content':
        result = await this.createHelpContent(parameters?.topics, parameters?.commonIssues);
        break;
      case 'monitor_user_health':
        result = await this.monitorUserHealth(parameters?.userMetrics);
        break;
      default:
        result = await this.analyzeCustomerNeeds(parameters);
    }

    return {
      id: this.generateMessageId(),
      agentId: this.id,
      content: JSON.stringify(result),
      timestamp: new Date(),
      metadata: { task, parameters }
    };
  }

  private async handleSupportTicket(ticket: SupportTicket): Promise<any> {
    const prompt = `
    As a Customer Success Specialist, handle this support ticket:
    
    Ticket Details:
    Subject: ${ticket.subject}
    Description: ${ticket.description}
    Priority: ${ticket.priority}
    Category: ${ticket.category}
    
    Previous responses: ${JSON.stringify(ticket.responses)}
    
    Provide:
    1. Empathetic and helpful response
    2. Step-by-step solution or troubleshooting
    3. Additional resources or documentation links
    4. Follow-up actions needed
    5. Escalation recommendations if necessary
    6. Estimated resolution time
    
    Response should be:
    - Professional and friendly
    - Clear and actionable
    - Personalized to the user's situation
    - Solution-focused
    - Include preventive measures
    
    Return structured response with actions and recommendations.
    `;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        response: `Thank you for contacting us about "${ticket.subject}". I understand your concern and I'm here to help you resolve this issue quickly.

Based on your description, here are the steps to resolve this:

1. [Specific troubleshooting step based on the issue]
2. [Additional verification or configuration step]
3. [Final confirmation step]

If these steps don't resolve the issue, please let me know and I'll escalate this to our technical team for further investigation.

Is there anything else I can help you with today?

Best regards,
Customer Success Team`,
        actions: [
          'Send response to customer',
          'Update ticket status to in-progress',
          'Set follow-up reminder for 24 hours',
          'Add internal note about troubleshooting steps'
        ],
        priority: ticket.priority,
        estimatedResolution: '24 hours'
      };
    }
  }

  private async generateAutoReply(inquiry: string, context: any): Promise<any> {
    const prompt = `
    Generate an automated response for this customer inquiry:
    
    Inquiry: "${inquiry}"
    Context: ${JSON.stringify(context)}
    
    Create a helpful auto-reply that:
    1. Acknowledges the inquiry
    2. Provides immediate value or next steps
    3. Sets appropriate expectations
    4. Offers additional resources
    5. Includes escalation path if needed
    
    Determine confidence level (0-100) for this auto-response.
    If confidence < 70, recommend human handoff.
    
    Return response text and confidence score.
    `;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        reply: `Thank you for reaching out! I've received your inquiry and I'm here to help.

Based on your message, I believe you're asking about [topic]. Here are some immediate resources that might help:

• [Relevant help article or FAQ]
• [Step-by-step guide]
• [Video tutorial if applicable]

If these resources don't fully address your question, a member of our support team will follow up with you within 24 hours.

You can also check our Help Center at [link] for more information.

Best regards,
Customer Success Team`,
        confidence: 75,
        recommendHumanHandoff: false
      };
    }
  }

  private async analyzeUserFeedback(feedback: UserFeedback[]): Promise<any> {
    const prompt = `
    Analyze this user feedback data to extract insights:
    
    Feedback: ${JSON.stringify(feedback)}
    
    Provide analysis on:
    1. Common themes and patterns
    2. Sentiment analysis by category
    3. Priority issues to address
    4. Feature requests by popularity
    5. User satisfaction trends
    6. Actionable recommendations for product team
    7. Customer success interventions needed
    
    Categorize feedback by:
    - Urgency (critical, high, medium, low)
    - Impact (high, medium, low)
    - Effort to implement (high, medium, low)
    - User segment affected
    
    Return structured insights and prioritized recommendations.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async createHelpContent(topics: string[], commonIssues: string[]): Promise<any[]> {
    const prompt = `
    Create comprehensive help documentation for:
    
    Topics: ${topics.join(', ')}
    Common Issues: ${commonIssues.join(', ')}
    
    For each topic, create:
    1. Clear, step-by-step guides
    2. FAQ sections with common questions
    3. Troubleshooting flowcharts
    4. Video tutorial scripts
    5. Best practices and tips
    6. Related articles and resources
    
    Content should be:
    - Easy to understand for non-technical users
    - Searchable with relevant keywords
    - Organized in logical hierarchy
    - Include screenshots and examples
    - Mobile-friendly format
    - Regularly updatable
    
    Return structured help content with categories and articles.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async monitorUserHealth(userMetrics: any[]): Promise<any> {
    const prompt = `
    Analyze user engagement metrics to assess customer health:
    
    User Metrics: ${JSON.stringify(userMetrics)}
    
    Calculate health scores based on:
    1. Login frequency and recency
    2. Feature adoption and usage depth
    3. Support ticket history
    4. Billing and subscription status
    5. Engagement with communications
    6. Goal achievement and success metrics
    
    Identify users who are:
    - At risk of churning (red flag indicators)
    - Highly engaged and expansion ready
    - Need onboarding assistance
    - Potential advocates and references
    
    Recommend interventions:
    - Proactive outreach strategies
    - Educational content delivery
    - Feature adoption campaigns
    - Success milestone celebrations
    
    Return health scores and intervention recommendations.
    `;

    const response = await this.callAI(prompt);
    return JSON.parse(response);
  }

  private async analyzeCustomerNeeds(parameters: any): Promise<any> {
    return {
      analysis: 'Customer success requirements analyzed',
      recommendations: [
        'Implement proactive customer health monitoring',
        'Create comprehensive self-service help center',
        'Set up automated response system for common inquiries',
        'Establish customer feedback collection and analysis',
        'Build customer success playbooks and workflows'
      ],
      metrics: [
        'Customer Satisfaction Score (CSAT)',
        'Net Promoter Score (NPS)',
        'Customer Health Score',
        'First Response Time',
        'Resolution Time',
        'Ticket Volume and Categories',
        'Self-Service Usage',
        'Customer Retention Rate'
      ],
      tools: [
        'Help desk and ticketing system',
        'Knowledge base and FAQ',
        'Live chat and chatbot',
        'Customer feedback surveys',
        'User analytics and tracking',
        'Email automation for customer success'
      ]
    };
  }
}