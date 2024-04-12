import { Events, Guild } from 'discord.js';
import { Event } from '../interfaces';
import { createGuild } from '../database';
import { createDiscordLog } from '../bot';

const event: Event = {
    name: Events.GuildCreate,
    execute: async (_client, guild: Guild) => {
        await createGuild(guild.id, guild.name, guild.ownerId).catch(console.error);
        console.log(`Joined guild: ${guild.name}`);
        await createDiscordLog('Guild Joined', `Guild ID: ${guild.id}\nGuild Name: ${guild.name}`, guild.iconURL() ?? '');
    },
};

export default event;