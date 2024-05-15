import { ButtonInteraction, ChannelType } from 'discord.js';
import ActionRowBuilder from '../../../../strcut/utils/ActionRowBuilder';
import EmbedBuilder from '../../../../strcut/utils/EmbedBuilder';
import IGuildConfig from '../../../../types/GuildConfig';
import Client from '../../../../strcut/Client';

export default async (client: Client, button: ButtonInteraction<'cached'>, btn: ButtonInteraction<'cached'>, config: IGuildConfig) => {
    const channel = btn.member.voice?.channel

    if(!channel || channel.type !== ChannelType.GuildVoice) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                btn.member,
                config.buttons[button.customId]!.title,
                `**seçilen** ses kanalı **bulunamadı** veya **özel oda** değil`
            ) ],
            components: []
        })
    }

    const get: any = await client.db.rooms.get(channel.id)
    if(!get) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                btn.member,
                config.buttons[button.customId]!.title,
                `**seçilen** ses kanalı **bulunamadı** veya **özel oda** değil`
            ) ],
            components: []
        })
    }

    return button.editReply({
        embeds: [ new EmbedBuilder().infoRoom(
            button.member,
            channel,
            get
        ) ],
        components: new ActionRowBuilder().checkMembersPermission(channel.id)
    })
}
