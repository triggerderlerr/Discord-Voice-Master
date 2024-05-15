import { GatewayIntentBits, Collection, ButtonStyle } from "discord.js";

export const internal = {
  token: process.env.TOKEN, //Bot token (https://discord.com/developers/applications)
};

import * as k8s from '@kubernetes/client-node';
import * as net from 'net';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const forward = new k8s.PortForward(kc);

// This simple server just forwards traffic from itself to a service running in kubernetes
// -> localhost:8080 -> port-forward-tunnel -> kubernetes-pod
// This is basically equivalent to 'kubectl port-forward ...' but in TypeScript.
const server = net.createServer((socket) => {
    forward.portForward('default', 'demo', [8080], socket, null, socket);
});

server.listen(8080, '127.0.0.1');

export const intents: GatewayIntentBits[] | number = 131071; // all intent

export const cooldownVoiceJoin: number = 1000; // Movement delay

export const settings = {
  webhook: {
    name: "Ses Asistanı", // Webhook name
  },
  defaultName: "⭐ {username}",
  color: 0x2f3136,
  style: ButtonStyle.Secondary,
  buttons: {
    // Emoji and their description :)
    rename: {
      title: "Kanal Adı Değiştir",
    },
    limit: {
      title: "Limit Değiştir",
    },
    close: {
      title: "Aç/Kapat",
    },
    hide: {
      title: "Göster/Gizle",
    },
    user: {
      title: "Ban/Unban",
    },
    speak: {
      title: "Mute/Unmute",
    },
    kick: {
      title: "Kullanıcı At",
    },
    reset: {
      title: "Izinleri Sıfırla",
    },
    owner: {
      title: "Odayı Aktar",
    },
    info: {
      title: "Oda Bilgisi",
    },
  },
  placeholder: {
    // Titles for the menu when a user or channel is selected
    user: "🔷 Kullanıcı seç",
    channel: "🔷 Özel oda seç",
  },
  line: true, // Line in the control panel (now it is not worth it, to put it, enter "true" instead of "false")
  dot: false, // Emoji in front of emoji in the room panel (there is no emoji now, so type "true" instead of "false")
  debug: false, // Debugging (now it is not worth it, to put it, enter "true" instead of "false")
};
