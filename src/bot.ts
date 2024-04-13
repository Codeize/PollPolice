import { DiscordjsError, EmbedBuilder, GuildTextBasedChannel, GatewayIntentBits as Intents, Partials, WebhookClient } from 'discord.js';
import ExtendedClient from './classes/Client';
import { config } from 'dotenv';

// Load .env file contents
config();
import './features/i18n';

// Initialization (specify intents and partials)
new ExtendedClient({
    intents: [
        Intents.Guilds,
        Intents.GuildMessages,
        Intents.MessageContent,
        Intents.GuildMembers,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
    ],
}).login(process.env.TOKEN)
    .catch((err:unknown) => {
        if (err instanceof DiscordjsError) {
            if (err.code == 'TokenMissing') console.warn(`\n[Error] ${err.name}: ${err.message} Did you create a .env file?\n`);
            else if (err.code == 'TokenInvalid') console.warn(`\n[Error] ${err.name}: ${err.message} Check your .env file\n`);
            else throw err;
        }
        else {
            throw err;
        }
    });

const webhook = new WebhookClient({ url: process.env.LOGGING_WEBHOOK_URL as string });
export const createDiscordLog = async (title: string, message: string, iconURL?: string) => {
    await webhook.send({
        embeds: [{
            title: title,
            description: message,
            thumbnail: { url: iconURL ?? '' },
        }],
    });
    webhook.destroy();
};

export const createServerLog = async (client: ExtendedClient, channelId: string, title: string, message: string, userIconURL?: string) => {
    const channel = await client.channels.fetch(channelId).catch(() => {
        return console.log('Log channel not found');
    });
    if (!channel || !channel.isTextBased()) {
        console.log('Channel not found');
        return;
    }
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setThumbnail(userIconURL ?? '')
        .setColor('Random');
    await channel.send({
        embeds: [embed]
    });
}