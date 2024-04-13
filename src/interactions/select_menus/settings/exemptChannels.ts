import i18n from '../../../features/i18n';
import { ChannelSelectMenu } from '../../../interfaces';
import { addExemptChannelBulk, getExemptChannels, removeExemptChannel } from '../../../database';

const channelsSelectMenu: ChannelSelectMenu = {
    name: 'settings_chooseExemptChannels',
    execute: async (_client, interaction) => {
        if (!interaction.guild || !interaction.inCachedGuild() || !interaction.guildId) return;
        const action = interaction.customId.split('_')[1];
        const values = interaction.values;
        switch (action) {
        case 'chooseExemptChannels': {
            const existingChannels = await getExemptChannels(interaction.guildId);
            const existingChannelIds = existingChannels.map(channel => channel.channelId);
            const newChannels = values.filter(channel => !existingChannelIds.includes(channel));
            const removedChannels = existingChannelIds.filter(channel => !values.includes(channel));
            if (newChannels.length) {
                await addExemptChannelBulk(interaction.guildId, newChannels);
            }
            if (removedChannels.length) {
                await Promise.all(removedChannels.map(channel => removeExemptChannel(interaction.guildId, channel)));
            }
            const addedChannels = newChannels.map(channel => `<#${channel}>`).join(', ');
            const removedChannelsFormatted = removedChannels.map(channel => `<#${channel}>`).join(', ');
            const response = [];
            if (addedChannels.length) response.push(i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptChannels-added', { channels: addedChannels }));
            if (removedChannelsFormatted.length) response.push(i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptChannels-removed', { channels: removedChannelsFormatted }));
            await interaction.reply({ content: response.join('\n'), ephemeral: true });
        }
        }
    },
};

export default channelsSelectMenu;