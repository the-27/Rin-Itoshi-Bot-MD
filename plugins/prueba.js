import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];
    const name = conn.getName(m.sender);

    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nitem1.TEL;waid=${userId.split("@")[0]}:${userId.split("@")[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    };

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
        { title: "📥 Menu Descargas", description: "Descargas desde redes sociales", id: `${usedPrefix}menudl` },
        { title: "🎮 Menu RPG + Economía", description: "Sistema de aventuras y economía", id: `${usedPrefix}menurpg` },
        { title: "🖼️ Menu busquedas", description: "MENU DE BUSQUEDAS, YOUTUBE, ECT", id: `${usedPrefix}menuse` },
        { title: "🧰 Menu Herramientas", description: "Utilidades variadas", id: `${usedPrefix}menuherramientas` },
        { title: "👤 Menu Perfil", description: "Opciones de perfil", id: `${usedPrefix}menuperfil` },
        { title: "👥 Menu Grupos", description: "Administración de grupos", id: `${usedPrefix}menugrupo` },
        { title: "🔍 Menu Búsquedas", description: "Buscar imágenes, videos y más", id: `${usedPrefix}menubusquedas` },
        { title: "🔞 Menu +18", description: "Contenido NSFW", id: `${usedPrefix}menunsfw` },
      ]
    }];

    const interactiveMessage = {
      header: {
        title: "HOLZ",
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      body: {
        text: `✨ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ✨\n\n> 👤 Nombre: ${name}\n💠 Exp: ${exp}\n⭐ Nivel: ${level}\n🎖️ Rango: ${role}`
      },
      footer: {
        text: "⏤͟͞ू⃪ 𝑺𝑯𝑨𝑫𝑶𝑾 - 𝑩𝑶𝑻 • Powered by black"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "🔍 Selecciona un menú",
              sections
            })
          }
        ],
        messageParamsJson: ""
      }
    };

    const msg = generateWAMessageFromContent(
      m.chat,
      { viewOnceMessage: { message: { interactiveMessage } } },
      { userJid: conn.user.jid, quoted: fkontak }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.reply(`✘ Ocurrió un error al enviar el menú:\n${e}`);
    await m.react('❌');
  }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1', 'menulist'];
handler.register = true;

export default handler;