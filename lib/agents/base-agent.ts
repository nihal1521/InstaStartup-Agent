export interface AgentContext {
  conversationId: string;
  userId?: string;
  previousMessages: AgentMessage[];
  sharedMemory: Record<string, any>;
}

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AgentCapability {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
}

export abstract class BaseAgent {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly capabilities: AgentCapability[];
  protected memory: Map<string, any> = new Map();

  constructor(
    id: string,
    name: string,
    description: string,
    capabilities: AgentCapability[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.capabilities = capabilities;
  }

  abstract execute(
    task: string,
    context: AgentContext,
    parameters?: Record<string, any>
  ): Promise<AgentMessage>;

  protected async callAI(prompt: string, provider: string = 'openai'): Promise<string> {
    // This would integrate with the existing AI providers
    const response = await fetch('/api/ai-completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, provider })
    });
    
    if (!response.ok) {
      throw new Error(`AI call failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.content;
  }

  protected updateMemory(key: string, value: any): void {
    this.memory.set(key, value);
  }

  protected getMemory(key: string): any {
    return this.memory.get(key);
  }

  protected generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}