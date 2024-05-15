import { GatewayIntentBits, Collection, ButtonStyle } from "discord.js";

export const internal = {
  token: process.env.TOKEN, //Bot token (https://discord.com/developers/applications)
};

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});

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
