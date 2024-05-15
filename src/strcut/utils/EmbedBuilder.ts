import { EmbedBuilder as DJSEmbedBuilder, GuildMember, VoiceChannel } from 'discord.js';
import { settings } from '../../config';
import Utils from './Utils';
import Client from '../Client';

export default class EmbedBuilder extends DJSEmbedBuilder {
    default(member: GuildMember, title: string, description: string) {
        return this.setTitle(title).setColor(settings!.color)
        .setDescription(`${member.toString()}, ${description}`)
        .setThumbnail(Utils.getAvatar(member))
    }

    settingRoomEmbed(client: Client) {
        return this.setTitle('Ses kanalınızı yönetin.')
        .setColor(settings.color)
        .setDescription(
            '> Odanızı özelleştirmek için aşağıdaki düğmeleri tıklayın' + '\n'
        ).setImage(settings?.line ? 'https://cdn.discordapp.com/attachments/1240076731860123658/1240402189911068802/Pngtreeblack_decorative_line_divider_layout_8293839.png?ex=66466e0f&is=66451c8f&hm=7471ec0c59ab116f727ddc504fce2c7110cd9f54a83b6d0bcd2241782233e3bb&' : null)
        .addFields([ {
            name: '** **',
            value: 
            Object.keys(settings.buttons).filter((btn, i) => i % 2 == 0)
            .map(btn => 
                //@ts-ignore
                (settings.dot || '') + (settings.buttons[btn] ? (`${client.emojisStorage.cache.get(btn)} ・ ${settings.buttons[btn].title.toLowerCase()}`) : '')
            ).join('\n'),
            inline: true
        },
        {  
            name: '** **',
            value: Object.keys(settings.buttons).filter((btn, i) => i % 2 == 1)
            .map(btn => 
                //@ts-ignore
                (settings.dot || '') + (settings.buttons[btn] ? (`${client.emojisStorage.cache.get(btn)} ・ ${settings.buttons[btn].title.toLowerCase()}`) : '')
            ).join('\n'),
            inline: true
        }
        ])
        .setFooter({text: 'Bunları yalnızca özel bir kanalınız olduğunda kullanabilirsiniz'})
    }

    infoRoom(member: GuildMember, channel: VoiceChannel, get: any) {
        const guildPerms = channel.permissionOverwrites.cache.get(member.guild.id)
        //@ts-ignore
        return this.setTitle(settings.buttons['info'].title)
        .setThumbnail(Utils.getAvatar(member))
        .setColor(settings.color)
        .setDescription(
            '**Özel Oda:**' + ` ${channel.toString()}` + '\n'
            + '**Kullanıcılar:**' + ` ${channel.members.size}/${channel.userLimit === 0 ? 'ꝏ' : channel.userLimit}` + '\n'
            + '**Oda Sahibi:**' + ` <@!${get.userId}>` + '\n'
            + '**Oluşturulan Zaman:**' + ` <t:${Math.round(get.created/1000)}>` + '\n'
            + '**Oda herkes tarafından görülebilir mi?:**' + ` ${guildPerms && guildPerms.deny.has('ViewChannel') ? '❌' : '✅'}` + '\n'
            + '**Oda herkese açık mı?:**' + ` ${guildPerms && guildPerms.deny.has('Connect') ? '❌' : '✅'}` + '\n'
        )
    }

    permissions(member: GuildMember, channel: VoiceChannel, page: number = 0) {
        const array = channel.permissionOverwrites.cache
        .filter(p => channel.guild.members.cache.has(p.id))
        .map(p => p)

        const max = Math.ceil(array.length/5) === 0 ? 1 : Math.ceil(array.length/5)

        const embed = this.setTitle('Özel oda kullanıcı izni')
        .setThumbnail(Utils.getAvatar(member))
        .setColor(settings!.color)
        .setFooter(
            { text: `Page: ${page+1}/${max}` }
        )

        for ( let i = page*5; (i < array.length && i < 5*(page+1)) ; i++ ) {
            const p = array[i]
            const target = member.guild.members.cache.get(p.id)
            if(target) {
                embed.addFields(
                    {
                        name: `${i+1}. ${target.displayName}`,
                        value: (
                            `> Kullanıcı ses kanalınıza katılabilir mi?: ${p.deny.has('Connect') ? '❌' : '✅'}` + '\n'
                            + `> Kullanıcı ses kanalınızda konuşabilir mi?: ${p.deny.has('Speak') ? '❌' : '✅'}`
                        )
                    }
                )
            }
        }

        return embed.setDescription((embed.data.fields || [] )?.length === 0 ? 'Пусто' : null)
    }
}
