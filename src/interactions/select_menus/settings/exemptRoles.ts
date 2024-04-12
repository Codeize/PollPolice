import i18n from '../../../features/i18n';
import { RoleSelectMenu } from '../../../interfaces';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, GuildTextBasedChannel, RoleSelectMenuBuilder } from 'discord.js';
import { addExemptRole, addExemptRoleBulk, getExemptRoles, removeExemptRole, setLogChannel } from '../../../database';

const roleSelectMenu: RoleSelectMenu = {
    name: 'settings_chooseExemptRoles',
    execute: async (_client, interaction) => {
        if (!interaction.guild || !interaction.inCachedGuild()) return;
        const action = interaction.customId.split('_')[1];
        const values = interaction.values;
        switch (action) {
            case "chooseExemptRoles": {
                // Basically, the roles that are already existing exempt roles should be removed as exempt roles.
                // The ones that are not already exempt roles should be added as exempt roles.
                const existingRoles = await getExemptRoles(interaction.guildId!);
                const existingRoleIds = existingRoles.map(role => role.roleId);
                const newRoles = values.filter(role => !existingRoleIds.includes(role));
                const removedRoles = existingRoleIds.filter(role => !values.includes(role));
                if (newRoles.length) {
                    await addExemptRoleBulk(interaction.guildId!, newRoles);
                }
                if (removedRoles.length) {
                    await Promise.all(removedRoles.map(role => removeExemptRole(interaction.guildId!, role)));
                }
                // Now return a nice list to the user in the following format:
                // "The following roles have been added to the exempt roles list: @role1, @role2, @role3"
                // "The following roles have been removed from the exempt roles list: @role4, @role5, @role6"
                const addedRoles = newRoles.map(role => `<@&${role}>`).join(', ');
                const removedRolesFormatted = removedRoles.map(role => `<@&${role}>`).join(', ');
                const response = [];
                if (addedRoles.length) response.push(i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptRoles-added', { roles: addedRoles }));
                if (removedRolesFormatted.length) response.push(i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptRoles-removed', { roles: removedRolesFormatted }));
                await interaction.reply({ content: response.join('\n'), ephemeral: true });
            }
        }
    },
};

export default roleSelectMenu;