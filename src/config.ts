import { GatewayIntentBits, Collection, ButtonStyle } from 'discord.js';

export const internal = {
    token: process.env.TOKEN, //Bot token (https://discord.com/developers/applications)
}

import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import path from "path";

export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  private io: SocketIOServer;

const PORT = process.env.PORT || 8888;

http.createServer(app).listen(PORT, () => {
    console.log(PORT);
})


export const intents: GatewayIntentBits[] | number = 131071 // all intent

export const cooldownVoiceJoin: number = 1000 // Movement delay

export const settings = {
    webhook : {
        name: 'Voice Manager' // Webhook name
    },
    defaultName: '⭐ {username}',
    color: 0x2f3136,
    style: ButtonStyle.Secondary,
    buttons: { // Emoji and their description :)
        'rename': {
            title: 'Edit Channel Name'
        },
        'limit': {
            title: 'Change Limit'
        },
        'close': {
            title: 'Close/Open'
        },
        'hide': {
            title: 'Hide/Show'
        },
        'user': {
            title: 'Ban/Unban'
        },
        'speak': {
            title: 'Mute/Unmute'
        },
        'kick': {
            title: 'Kick User'
        },
        'reset': {
         title: 'Reset User Permissions'
         },
        'owner': {
            title: 'Transfer owner'
        },
        'info': {
        title: 'Room Information'
        }
    },
    placeholder: { // Titles for the menu when a user or channel is selected
        user: '🔷 Select user',
        channel: '🔷 Choose a private room'
    },
    line: true, // Line in the control panel (now it is not worth it, to put it, enter "true" instead of "false")
    dot: false, // Emoji in front of emoji in the room panel (there is no emoji now, so type "true" instead of "false")
    debug: false // Debugging (now it is not worth it, to put it, enter "true" instead of "false")
}
