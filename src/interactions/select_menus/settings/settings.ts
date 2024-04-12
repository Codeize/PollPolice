import i18n from '../../../features/i18n';
import { StringSelectMenu } from '../../../interfaces';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ModalBuilder, RoleSelectMenuBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { getExemptChannels, getExemptRoles, getGuild } from '../../../database';

const modalSubmit: StringSelectMenu = {
    name: 'settings_chooseOption',
    execute: async (_client, interaction) => {
        if (!(interaction.user.id === interaction.message.interaction?.user.id)) return;
        if (!interaction.guild || !interaction.inCachedGuild()) return;
        const guildSettings = await getGuild(interaction.guildId);
        const value = interaction.values[0];
        switch (value) {
            case "logChannelId": {
                const row = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents([
                    new ChannelSelectMenuBuilder()
                    .setCustomId(`settings_chooseLogChannel`)
                    .setPlaceholder(i18n(interaction.guild.preferredLocale, 'settings-select-option-logChannel'))
                    .setMinValues(1)
                    .setMaxValues(1)
                    .setChannelTypes(ChannelType.GuildText)
                ])
                await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-logChannel'), components: [row], ephemeral: true });
                break;
            }
            case "notifyUserPostDelete": {
                const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
                    new ButtonBuilder()
                    .setCustomId(`settings_chooseNotifyUserPostDelete_true`)
                    .setLabel(i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDelete'))
                    .setDisabled(guildSettings?.notifyUserPostDelete === true)
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId(`settings_chooseNotifyUserPostDelete_false`)
                    .setLabel(i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDelete'))
                    .setDisabled(guildSettings?.notifyUserPostDelete === false)
                    .setStyle(ButtonStyle.Danger)
                ])
                await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDelete'), components: [row], ephemeral: true });
                break;
            }
            case "exemptRoles": {
                const existingRoles = await getExemptRoles(interaction.guildId!);
                const row = new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents([
                    new RoleSelectMenuBuilder()
                    .setCustomId(`settings_chooseExemptRoles`)
                    .setPlaceholder(i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptRoles'))
                    .setMinValues(0)
                    .setMaxValues(5)
                    .setDefaultRoles(existingRoles.map(role => role.roleId))
                ])
                await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptRoles'), components: [row], ephemeral: true });
                break;
            }
            case "exemptChannels": {
                const existingChannels = await getExemptChannels(interaction.guildId!);
                const row = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents([
                    new ChannelSelectMenuBuilder()
                    .setCustomId(`settings_chooseExemptChannels`)
                    .setPlaceholder(i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptChannels'))
                    .setMinValues(0)
                    .setMaxValues(5)
                    .setChannelTypes(ChannelType.GuildText)
                    .setDefaultChannels(existingChannels.map(channel => channel.channelId))
                ])
                await interaction.reply({ content: i18n(interaction.guild.preferredLocale, 'settings-select-option-exemptChannels'), components: [row], ephemeral: true });
                break;
            }
            case "notifyUserPostDeleteMessage": {
                const modal = new ModalBuilder()
                .setTitle(i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDeleteMessage-modal-title'))
                .setCustomId(`settings_setNotifyUserPostDeleteMessage`)
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents([
                        new TextInputBuilder()
                        .setCustomId(`notifyUserPostDeleteMessageString`)
                        .setPlaceholder(guildSettings?.notifyUserPostDeleteMessage ?? i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDeleteMessage-placeholder'))
                        .setStyle(TextInputStyle.Short)
                        .setValue(guildSettings?.notifyUserPostDeleteMessage ?? '')
                        .setLabel(i18n(interaction.guild.preferredLocale, 'settings-select-option-notifyUserPostDeleteMessage-modal-title'))
                    ])
                )

                await interaction.showModal(modal);
            }
        }
    },
};

export default modalSubmit;