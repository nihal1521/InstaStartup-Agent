import { db } from '@/firebase/firebase';
import { addDoc, collection } from '@/lib/firestore-wrapper';
import { saveStartup } from '@/lib/startup-store';
import { AIProvider } from '@/utils/ai-providers';
import { StartupGenerator } from '@/utils/startup-generator';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { idea, provider = 'openai' } = await request.json();

    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid idea provided' },
        { status: 400 }
      );
    }

    if (idea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a more detailed startup idea (at least 10 characters)' },
        { status: 400 }
      );
    }

    // Get the appropriate API key based on provider
    let apiKey: string;
    if (provider === 'openai') {
      apiKey = process.env.OPENAI_API_KEY || '';
      if (!apiKey) {
        console.error('OpenAI API key not configured. Please check your .env.local file.');
        return NextResponse.json(
          { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
          { status: 500 }
        );
      }
    } else if (provider === 'gemini') {
      apiKey = process.env.GOOGLE_API_KEY || '';
      if (!apiKey) {
        console.error('Google API key not configured. Please check your .env.local file.');
        return NextResponse.json(
          { error: 'Google API key not configured. Please add GOOGLE_API_KEY to your environment variables.' },
          { status: 500 }
        );
      }
    } else if (provider === 'github') {
      apiKey = process.env.GITHUB_API_TOKEN || '';
      if (!apiKey) {
        console.error('GitHub API token not configured. Please check your .env.local file.');
        return NextResponse.json(
          { error: 'GitHub API token not configured. Please add GITHUB_API_TOKEN to your environment variables.' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported AI provider' },
        { status: 500 }
      );
    }

    console.log('Generating startup for idea:', idea.trim(), 'using provider:', provider);

    // Generate startup data
    const generator = new StartupGenerator(provider as AIProvider, apiKey);
    const startupData = await generator.generateStartup(idea.trim());

    console.log('Generated startup data:', { 
      brandName: startupData.brandName, 
      id: startupData.id 
    });

    // Save to Firestore
    let docRef;
    try {
      if (db) {
        docRef = await addDoc(collection(db, 'startups'), {
          ...startupData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('Saved to Firestore with ID:', docRef.id);
        // Save to in-memory store under Firestore ID for retrieval
        const inMemoryData = { ...startupData, id: docRef.id, createdAt: new Date() };
        saveStartup(inMemoryData);
      } else {
        console.warn('Firestore not available, skipping save');
        // Save to in-memory store under original ID fallback
        saveStartup(startupData);
        return NextResponse.json({
          success: true,
          data: {
            ...startupData,
            firestoreId: startupData.id // Use generated ID as fallback
          }
        });
      }
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);
      // Continue without Firestore if it fails
      // Save to in-memory store under original ID fallback
      saveStartup(startupData);
      return NextResponse.json({
        success: true,
        data: {
          ...startupData,
          firestoreId: startupData.id // Use generated ID as fallback
        }
      });
    }

    // Return the generated data with Firestore document ID
    return NextResponse.json({
      success: true,
      data: {
        ...startupData,
        firestoreId: docRef?.id || startupData.id
      }
    });

  } catch (error) {
    console.error('Error generating startup:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate startup',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Startup generation API endpoint' });
}