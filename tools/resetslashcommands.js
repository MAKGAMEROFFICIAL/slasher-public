const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

const clientId = process.env.CLIENT_ID; // Your bot's client ID
const token = process.env.DISCORD_BOT_TOKEN; // Your bot's token

// Initialize REST
const rest = new REST({ version: '9' }).setToken(token);

async function removeGlobalSlashCommands() {
  try {
    console.log('Started removing global slash commands.');

    // Fetch all global commands
    const commands = await rest.get(
      Routes.applicationCommands(clientId)
    );

    // Prepare an array of delete promises for each command
    const deletePromises = commands.map(command => {
      return rest.delete(
        Routes.applicationCommand(clientId, command.id)
      );
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    console.log('Successfully removed all global slash commands.');
  } catch (error) {
    console.error('Error removing global slash commands:', error);
  }
}

// Execute the function to remove commands
removeGlobalSlashCommands();