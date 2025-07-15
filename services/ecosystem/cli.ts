// CLI Tool for InstaStartup
import { getPlugins } from '@/lib/plugin-loader';
import { Command } from 'commander';

const program = new Command();

program
  .name('instastartup')
  .description('CLI for InstaStartup AI generator')
  .version('1.0.0');

program
  .command('new <idea>')
  .description('Generate a new startup package for the given idea')
  .action(async (idea: string) => {
    console.log(`Generating project for idea: ${idea}`);
    // TODO: call the generate plugin or API endpoint
  });

program
  .command('plugins')
  .description('List available plugins')
  .action(() => {
    const plugins = getPlugins();
    console.table(plugins.map(({ id, name, description }) => ({ id, name, description })));
  });

program.parse(process.argv);
