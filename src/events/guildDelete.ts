import { Events, Guild } from 'discord.js';
import { Event } from '../interfaces';
import { deleteGuild } from '../database';
import { createDiscordLog } from '../bot';

const event: Event = {
    name: Events.GuildDelete,
    execute: async (_client, guild: Guild) => {
        await deleteGuild(guild.id).catch(console.error);
        console.log(`Left guild: ${guild.name}`);
        await createDiscordLog('Guild Left', `Guild ID: ${guild.id}\nGuild Name: ${guild.name}`, guild.iconURL() ?? '');
    },
};

export default event;