import { VoiceChannel } from 'discord.js';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Interaction from '../../strcut/base/Interaction';
import Client from '../../strcut/Client';

export default new Interaction(
    'rename',
    async (client: Client, modal, config, res, room): Promise<any> => {
        await modal.deferReply({ephemeral: true})

        const name = modal.fields.getTextInputValue('name')


        const voice = modal.member.voice.channel as VoiceChannel
        if(room) {
            if( room.cooldown > Date.now()) {
                return modal.editReply({
                    embeds: [ new EmbedBuilder().default(
                        modal.member,
                        config.buttons[modal.customId]!.title,
                        `**özel oda** ${voice.toString()} yeniden **isimlendirildi** ** <t:${Math.round(room.cooldown/ 1000 )}:R>**`        
                    ) ]
                })
            }
        }

        let cd = Date.now()
        if(room.cooldown > Date.now() - 10*1000*60) cd += 10 * 60 * 1000
        room.cooldown = cd
        await client.db.rooms.dbSet(room)
        res.name = name;
        await client.db.settings.dbSet(res);

        await voice.setName(name)

        return modal.editReply({
            embeds: [ new EmbedBuilder().default(
                modal.member,
                config.buttons[modal.customId]!.title,
                `Özel odanız için yeni bir **isim** belirlediniz ${voice.toString()}`
            ) ]
        })
    }
)
