import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];
    const name = conn.getName(m.sender);

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];

    const exp = global.db.data.users[m.sender]?.exp || 0;
    const level = global.db.data.users[m.sender]?.level || 0;
    const role = global.db.data.users[m.sender]?.role || 'Sin rango';

    const media = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    const sections = [{
      title: "✦ MENÚS DISPONIBLES ✦",
      rows: [
        { title: "📥 Menú Descargas", description: "Descarga contenido de redes.", id: `${usedPrefix}menudl` },
        { title: "🧿 Menú Economía + RPG", description: "Juega y sube de nivel.", id: `${usedPrefix}menurpg` },
        { title: "🔍 Menú Búsquedas", description: "Comandos de búsqueda en línea.", id: `${usedPrefix}menuse` },
        { title: "👑 Menú Owner", description: "Comandos de dueño.", id: `${usedPrefix}dev` },
        { title: "🎐 Menú Audios", description: "Audios divertidos.", id: `${usedPrefix}menu2` },
        { title: "👤 Menú Perfil", description: "Edita tu perfil.", id: `${usedPrefix}perfildatesl` },
        { title: "👥 Menú Grupos", description: "Administra grupos.", id: `${usedPrefix}menugp` },
        { title: "🔞 Menú +18", description: "Contenido NSFW.", id: `${usedPrefix}menu18` },
        { title: "❤️ Menú Logos", description: "Crea logotipos.", id: `${usedPrefix}menulogos` },
      ]
    }];

    const msg = generateWAMessageFromContent(m.chat, {
      templateMessage: {
        hydratedTemplate: {
          imageMessage: media.imageMessage,
          hydratedContentText: `｡ﾟ･ 𖥸──-ˋˏ❢ˎˊ-──𖥸 ｡ﾟ･
> ✨ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ✨
> ⚘👤 *USUARIO:* ${name}
> ⚘💠 *Exp:* ${exp}
> ⚘⭐ *Nivel:* ${level}
> ⚘🎖️ *Rango:* ${role}
> ┗━━━━━━━━━━━━━━━

╭━═┅═━──────────◈
┃ ⚙️ OPCIONES RÁPIDAS:
┃ ⤷ #menu
┃ ⤷ #menurpg
┃ ⤷ #menudl
┃ ⤷ #menulogos
╰━═┅═━──────────◈`,
          hydratedFooterText: '⏤͟͞ू⃪ 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 - 𝑩𝑶𝑻 • Powered by black',
          hydratedButtons: [
            {
              quickReplyButton: {
                displayText: '✅ Menú Completo',
                id: `${usedPrefix}menu`
              }
            },
            {
              quickReplyButton: {
                displayText: '🛡️ Verificar',
                id: `${usedPrefix}reg`
              }
            },
            {
              singleSelectReply: {
                title: "🌹 Menú List 🐉",
                sections
              }
            }
          ]
        }
      }
    }, { userJid: conn.user.jid });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.reply(`✘ Ocurrió un error al enviar el menú:\n${e.message}`);
    await m.react('❌');
  }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1', 'menulist'];
handler.register = true;

export default handler;