import { ButtonInteraction, InteractionCollector, Client as DJSClient, UserSelectMenuInteraction } from 'discord.js';
import ActionRowBuilder from '../../strcut/utils/ActionRowBuilder';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Interaction from '../../strcut/base/Interaction';
import IGuildConfig from '../../types/GuildConfig';
import Client from '../../strcut/Client';

export default new Interaction(
    'kick',
    async (client: Client, button: ButtonInteraction<'cached'> , config: IGuildConfig): Promise<any> => {
        await button.deferReply({ephemeral: true, fetchReply: true })

        const fetch = await button.editReply({
            embeds: [
                new EmbedBuilder().default(
                    button.member,
                    config.buttons[button.customId]!.title,
                    `Atmak istediğiniz kullanıcıyı **seçiniz** ${button.member.voice.channel!.toString()}`
                )
            ],
            components: new ActionRowBuilder().menuUser('kick', config.placeholder.user)
        })

        const collector = new InteractionCollector(
            client as DJSClient<true>,
            { time: 30_000, message: fetch }
        )

        collector.on('collect', async (interaction: UserSelectMenuInteraction<'cached'>): Promise<any> => {
            await interaction.deferUpdate()
            collector.stop()
            return (await import('./Collectors/kick')).default(client, button, interaction, config)
        })

        collector.on('end', (collected, reasone: string): any => {
            if(reasone === 'time') {
                return button.editReply({
                    embeds: [
                        new EmbedBuilder().default(
                            button.member,
                            config.buttons[button.customId]!.title,
                            `Lütfen odadan atmak istediğiniz kullanıcıyı seçin.`
                        )
                    ],
                    components: new ActionRowBuilder().menuUser('kick', config.placeholder.user, true)
                })
            }
        })
    }
)
