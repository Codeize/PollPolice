import i18n from '../../../features/i18n';
import { Button } from '../../../interfaces';
import { setNotifyUserPostDelete } from '../../../database';

const button: Button = {
    name: 'settings_chooseNotifyUserPostDelete_false',
    execute: async (_client, interaction) => {
        if (!interaction.guild || !interaction.inCachedGuild()) return;
        await setNotifyUserPostDelete(interaction.guildId, false).catch(() => {
            interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'error'), ephemeral: true });
        });
        await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDelete-success', { value: 'false' }), ephemeral: true });
    },
};

export default button;