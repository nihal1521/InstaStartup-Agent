import { createAIProvider } from '@/utils/ai-providers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, provider = 'openai' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get the appropriate API key based on provider
    let apiKey: string;
    if (provider === 'openai') {
      apiKey = process.env.OPENAI_API_KEY || '';
    } else if (provider === 'gemini') {
      apiKey = process.env.GOOGLE_API_KEY || '';
    } else if (provider === 'github') {
      apiKey = process.env.GITHUB_API_TOKEN || '';
    } else {
      return NextResponse.json(
        { error: 'Unsupported AI provider' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: `API key not configured for provider: ${provider}` },
        { status: 500 }
      );
    }

    const aiProvider = createAIProvider(provider as any, apiKey);
    const content = await aiProvider.generateContent(prompt);

    return NextResponse.json({
      success: true,
      content,
      provider
    });

  } catch (error) {
    console.error('AI completion error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate AI completion',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}