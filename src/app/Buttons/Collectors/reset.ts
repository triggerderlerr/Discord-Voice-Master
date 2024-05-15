import { ButtonInteraction, UserSelectMenuInteraction } from 'discord.js';
import EmbedBuilder from '../../../strcut/utils/EmbedBuilder';
import IGuildConfig from '../../../types/GuildConfig';

export default async (button: ButtonInteraction<'cached'>, menu: UserSelectMenuInteraction<'cached'>, config: IGuildConfig) => {
    if(menu.users.size === 0) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Kullanıcı **bulunamadı**.`
            ) ],
            components: []
        })
    }

    const member = menu.members.first()

    if(!member) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Kendize erişim **veremezsiniz**.`
            ) ],
            components: []
        })
    }

    if(member.id === menu.member.id) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `İzinleri kendinize **veremezsiniz**.`
            ) ],
            components: []
        })
    }

    const voice = menu.member.voice.channel!

    await voice.permissionOverwrites.delete(member.id)

    return button.editReply({
        embeds: [ new EmbedBuilder().default(
            menu.member,
            config.buttons[menu.customId]!.title,
            `Oyuncunun izinlerini başarıyla **sıfırladınız** ${member.toString()} - ${voice.toString()}`
        ) ],
        components: []
    })
}
