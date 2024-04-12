import i18n from '../../../features/i18n';
import { ModalSubmit } from '../../../interfaces';
import { setNotifyUserPostDeleteMessage } from '../../../database';

const modal: ModalSubmit = {
    name: 'settings_setNotifyUserPostDeleteMessage',
    execute: async (_client, interaction) => {
        if (!interaction.guild || !interaction.inCachedGuild()) return;
        const action = interaction.customId.split('_')[1];
        const value = interaction.fields.getTextInputValue('notifyUserPostDeleteMessageString');
        switch (action) {
            case "setNotifyUserPostDeleteMessage": {
                await setNotifyUserPostDeleteMessage(interaction.guildId, value).catch(() => {
                    interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'error'), ephemeral: true });
                })
                await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDeleteMessage-success', { message: `\n\n${value}` }), ephemeral: true });
                break;
            }
        }
    },
};

export default modal;