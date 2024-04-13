import i18n from '../../../features/i18n';
import { ChannelSelectMenu } from '../../../interfaces';
import { setLogChannel } from '../../../database';

const channelSelectMenu: ChannelSelectMenu = {
    name: 'settings_chooseLogChannel',
    execute: async (_client, interaction) => {
        if (!interaction.guild || !interaction.inCachedGuild()) return;
        const action = interaction.customId.split('_')[1];
        const value = interaction.values[0];
        switch (action) {
        case 'chooseLogChannel': {
            await setLogChannel(interaction.guildId, value).catch(() => {
                interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'error'), ephemeral: true });
            });
            await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-logChannel-success', { channel: `<#${value}>` }), ephemeral: true });
            break;
        }
        }
    },
};

export default channelSelectMenu;