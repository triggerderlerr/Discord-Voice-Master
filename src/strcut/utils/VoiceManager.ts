import { ChannelType, OverwriteType, PermissionFlagsBits, VoiceState } from 'discord.js';
import Client from '../Client';
import { Creator, Setting } from '../../types/base/DB';

export default class VoiceManager {
    private permissionsRoomOwner = {
        allow: [
            PermissionFlagsBits.Speak,
            PermissionFlagsBits.Stream,
            PermissionFlagsBits.UseVAD,
            PermissionFlagsBits.Connect,
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.PrioritySpeaker,
            PermissionFlagsBits.CreateInstantInvite
        ],
        deny: [
            PermissionFlagsBits.MoveMembers,
            PermissionFlagsBits.ManageRoles,
            PermissionFlagsBits.ManageWebhooks,
            PermissionFlagsBits.ManageChannels
        ]
    }

    static async onRoomJoin(client: Client, newState: VoiceState) {
        const { member, channel, guild } = newState
        if(!member || !guild || !channel) return
        const config = client.config.settings
        if(!config) return

        let creator = client.db.creators.find(creator => creator.voiceChannelId === channel.id) as Creator

        if (!creator) return;
        if(member.user.bot) {
            return member.voice.disconnect().catch(() => {})
        }

        const settings = await client.db.settings.dbGet(member.id) as Setting;
        if(settings.leave > Date.now()) {
            return member.voice.disconnect().catch(() => {})
        }

        const name = client.util.resolveChannelName(config, member)

        if(member.voice.channelId !== creator.voiceChannelId) return;

        guild.channels.create(
            {
                name: settings.name === '0' ? name : settings.name,
                userLimit: settings.userLimit,
                type: ChannelType.GuildVoice,
                parent: creator.categoryId,
                permissionOverwrites: [
                  {
                    id: member.id,
                    ...this.prototype.permissionsRoomOwner,
                    type: OverwriteType.Member,
                  },
                  {
                    id: "1237843007349329948",
                    deny: [
                      PermissionFlagsBits.ViewChannel,
                    ],
                   },
                            
                ],
                reason: 'Creating a private room'
            }
        ).then(async channel => {
            member?.voice?.setChannel(channel.id).then(async () => {
                settings.leave = Date.now();
                client.db.settings.dbSet(settings)
                client.db.rooms.dbSet({
                    voiceChannelId: channel.id,
                    ownerId: member.id,
                    cooldown: 0,
                })
            }).catch(async () => await channel.delete('DDoS protection for private rooms').catch(() => {}))
        })
    }

    static async onRoomLeave(client: Client, oldState: VoiceState) {
        const { member, channel, guild } = oldState
        if(!member || !guild || !channel) return
        const config = client.config.settings
        if(!config) return

        const room = await client.db.rooms.dbGet(channel.id)
        let creator = client.db.creators.find(creator => creator.voiceChannelId === channel.id || creator.categoryId === channel.parentId) as Creator
        if(!creator) return;
        if(!channel?.parent || channel.id === creator.voiceChannelId) return
        if(channel.parent.id !== creator?.categoryId) return

        if(channel.members.size === 0 && client.db.rooms.has(channel.id)) {
            await channel.delete('Выход из комнаты').catch(() => {})
            await client.db.rooms.dbDelete(channel.id)
        }

        if(room && room?.ownerId === member.id) {
            let settings = await client.db.settings.get(member.id) as Setting
            settings.leave = Math.round(Date.now() + client.config.cooldownVoiceJoin)
            await client.db.settings.dbSet(settings)
        }
    }
}
