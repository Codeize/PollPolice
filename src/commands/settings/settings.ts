import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable, EmbedBuilder, Locale, MessageActionRowComponentBuilder, PermissionsBitField, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';
import i18n, { localization } from '../../features/i18n';
import { ChatInputCommand } from '../../interfaces';
import { createGuild } from '../../database';
import { colors } from '../../config.json';

// Example slash command
const command: ChatInputCommand = {
    options: new SlashCommandBuilder()
        .setName(i18n(Locale.EnglishUS, 'settings-name'))
        .setNameLocalizations(localization('settings-name'))
        .setDescription(i18n(Locale.EnglishUS, 'settings-description'))
        .setDescriptionLocalizations(localization('settings-description'))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),
    global: true,
    execute: async (_client, interaction) => {
        if (!interaction.guild || !interaction.inCachedGuild()) return;
        const guildSettings = await createGuild(interaction.guildId, interaction.guild.name, interaction.guild.ownerId);
        const embed = new EmbedBuilder()
            .setTitle(i18n(interaction.guildLocale, 'settings-embed-title'))
            .setDescription(i18n(interaction.guildLocale, 'settings-embed-description'))
            .setColor(colors.embed as ColorResolvable)
            .addFields([
                {
                    name: `:globe_with_meridians: ${i18n(interaction.guildLocale, 'settings-embed-field-language')}`,
                    value: interaction.guildLocale,
                    inline: true,
                },
                {
                    name: `:memo: ${i18n(interaction.guildLocale, 'settings-embed-field-logChannel')}`,
                    value: guildSettings?.logChannelId ? `<#${guildSettings?.logChannelId}>` : i18n(interaction.guildLocale, 'settings-embed-not-set'),
                    inline: true,
                },
                {
                    name: `:speaking_head: ${i18n(interaction.guildLocale, 'settings-embed-field-notifyUserPostDelete')}`,
                    value: guildSettings?.notifyUserPostDelete ? i18n(interaction.guildLocale, 'settings-embed-enabled') : i18n(interaction.guildLocale, 'settings-embed-disabled'),
                    inline: true,
                },
                {
                    name: `:passport_control: ${i18n(interaction.guildLocale, 'settings-embed-field-exemptRoles')}`,
                    value: guildSettings?.exemptRoles.length ? guildSettings?.exemptRoles.map(role => `<@&${role.roleId}>`).join(', ') : i18n(interaction.guildLocale, 'settings-embed-not-set'),
                },
                {
                    name: `:shield: ${i18n(interaction.guildLocale, 'settings-embed-field-exemptChannels')}`,
                    value: guildSettings?.exemptChannels.length ? guildSettings?.exemptChannels.map(channel => `<#${channel.channelId}>`).join(', ') : i18n(interaction.guildLocale, 'settings-embed-not-set'),
                },
                {
                    name: `:speech_balloon: ${i18n(interaction.guildLocale, 'settings-select-option-notifyUserPostDeleteMessage-modal-title')}`,
                    value: guildSettings?.notifyUserPostDeleteMessage ? `<USER>, ${guildSettings?.notifyUserPostDeleteMessage}` : i18n(interaction.guildLocale, 'settings-embed-not-set'),
                },
            ]);
        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents([
            new StringSelectMenuBuilder()
                .setCustomId('settings_chooseOption')
                .setPlaceholder(i18n(interaction.guildLocale, 'settings-select-placeholder'))
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: `${i18n(interaction.guildLocale, 'settings-select-option-logChannel')}`,
                        emoji: '📝',
                        value: 'logChannelId',
                    },
                    {
                        label: `${i18n(interaction.guildLocale, 'settings-select-option-notifyUserPostDelete')}`,
                        emoji: '🗣️',
                        value: 'notifyUserPostDelete',
                    },
                    {
                        label: `${i18n(interaction.guildLocale, 'settings-select-option-exemptRoles')}`,
                        emoji: '🛂',
                        value: 'exemptRoles',
                    },
                    {
                        label: `${i18n(interaction.guildLocale, 'settings-select-option-exemptChannels')}`,
                        emoji: '🛡️',
                        value: 'exemptChannels',
                    },
                    {
                        label: `${i18n(interaction.guildLocale, 'settings-select-option-notifyUserPostDeleteMessage-modal-title')}`,
                        emoji: '💬',
                        value: 'notifyUserPostDeleteMessage',
                    },
                ]),
        ]);
        const upsellRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
                .setLabel(i18n(interaction.guildLocale, 'support-server'))
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/invite/Tt6XC3FQZd'),
            new ButtonBuilder()
                .setLabel(i18n(interaction.guildLocale, 'invite-bot'))
                .setStyle(ButtonStyle.Link)
                .setURL('https://go.buape.com/pollpolice'),
        ]);

        await interaction.reply({ embeds: [embed], components: [row, upsellRow] });
    },
};
export default command;