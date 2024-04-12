import { ClientEvents, Events, Message } from "discord.js";
import { Event } from "../interfaces";
import { getGuild } from "../database";
import i18n from "../features/i18n";
import { createDiscordLog } from "../bot";

const event: Event = {
	name: Events.Raw as keyof ClientEvents,
    execute: async (client, packet) => {
		if (packet.d.poll) {
			const guildSettings = await getGuild(packet.d.guild_id);
			const guild = await client.guilds.fetch(packet.d.guild_id);
			const channel = await client.channels.fetch(packet.d.channel_id);
			if (!channel || !channel.isTextBased()) {
				console.log("Channel not found");
				return;
			}
			const messageAuthorMember = await guild.members.fetch(packet.d.author.id);
			const message = await channel.messages.fetch(packet.d.id).catch(() => {
				console.log("Message not found");
			});

			// Process of determining if the message should be deleted:
			// - Check if the message is in a an exempted channel
			// - Check if the author has an exempted role
			// - Delete the message
			// - Check if the user should be notified
			// - Notify the user

			if (message) {
				const hasExemptChannel = guildSettings?.exemptChannels.some((channel) => message.channel.id === channel.channelId);
				if (hasExemptChannel) return
				const hasExemptRole = guildSettings?.exemptRoles.some((role) => messageAuthorMember.roles.cache.has(role.roleId));
				if (hasExemptRole) return
				await (message as Message).delete().catch((err) => {
					return console.log("Error deleting message: ", err);
				});
				if (guildSettings?.notifyUserPostDelete) {
					const msg = await message
						.channel.send(`<@${messageAuthorMember.user.id}>, ${guildSettings.notifyUserPostDeleteMessage}`)
						.catch((err) => {
							console.log("Error replying to message: ", err);
						});
					setTimeout(() => {
						msg?.delete().catch(() => {
							console.log("Error deleting reply message");
						});
					}, 5000);
				}
				await createDiscordLog("Poll Message Deleted", `Guild ID: ${guild.id}\nGuild Name: ${guild.name}`, guild.iconURL() ?? "")
			}
		}
	}
};

export default event;
