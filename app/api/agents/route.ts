import { agentCoordinator } from '@/lib/agents/agent-coordinator';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const agents = agentCoordinator.listAgents();
    const teams = agentCoordinator.listTeams();
    const pipelines = agentCoordinator.listPipelines();

    return NextResponse.json({
      agents: agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        capabilities: agent.capabilities
      })),
      teams: teams.map(team => ({
        id: team.id,
        name: team.name,
        agents: team.agents.map(agent => agent.id),
        messageCount: team.messageHistory.length
      })),
      pipelines: pipelines.map(pipeline => ({
        id: pipeline.id,
        name: pipeline.name,
        description: pipeline.description,
        status: pipeline.status,
        stepCount: pipeline.steps.length
      }))
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    switch (action) {
      case 'execute_task':
        const { agentId, task, context, parameters } = params;
        const result = await agentCoordinator.executeTask(agentId, task, context, parameters);
        return NextResponse.json({ success: true, result });

      case 'create_team':
        const { teamId, name, agentIds } = params;
        const team = agentCoordinator.createTeam(teamId, name, agentIds);
        return NextResponse.json({ success: true, team });

      case 'execute_pipeline':
        const { pipelineId } = params;
        const pipeline = await agentCoordinator.executePipeline(pipelineId);
        return NextResponse.json({ success: true, pipeline });

      case 'create_startup_pipeline':
        const { idea } = params;
        const startupPipeline = agentCoordinator.createStartupGenerationPipeline(idea);
        return NextResponse.json({ success: true, pipeline: startupPipeline });

      case 'create_marketing_pipeline':
        const { productData } = params;
        const marketingPipeline = agentCoordinator.createMarketingCampaignPipeline(productData);
        return NextResponse.json({ success: true, pipeline: marketingPipeline });

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error executing agent action:', error);
    return NextResponse.json(
      { error: 'Failed to execute agent action', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}