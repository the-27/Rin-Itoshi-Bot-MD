import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  try {
    await m.react('🕒');

    const name = conn.getName(m.sender);
    const exp = global.db.data.users[m.sender]?.exp || 0;
    const level = global.db.data.users[m.sender]?.level || 0;
    const role = global.db.data.users[m.sender]?.role || 'Sin rango';
    const texto = `✨ *INFORMACIÓN DEL USUARIO* ✨\n\n👤 *Usuario:* ${name}\n💠 *Exp:* ${exp}\n⭐ *Nivel:* ${level}\n🎖️ *Rango:* ${role}`;

    const imagen = 'https://files.catbox.moe/pp7ncd.jpg';
    const buf = await (await fetch(imagen)).buffer();
    const media = await prepareWAMessageMedia({ image: buf }, { upload: conn.waUploadToServer });

    const sections = [{
      title: "🌹 Menú por Categorías",
      rows: [
        { title: "📥 Menú Descargas", description: "Descarga contenido", id: `${usedPrefix}menudl` },
        { title: "🧿 Menú RPG", description: "Juega y gana exp", id: `${usedPrefix}menurpg` },
        { title: "🔍 Menú Búsquedas", description: "Info en línea", id: `${usedPrefix}menuse` },
        { title: "👑 Menú Owner", description: "Comandos de dueño", id: `${usedPrefix}dev` },
        { title: "🎐 Menú Audios", description: "Audios divertidos", id: `${usedPrefix}menu2` },
        { title: "👤 Menú Perfil", description: "Edita tu perfil", id: `${usedPrefix}perfildatesl` },
        { title: "👥 Menú Grupos", description: "Administra grupos", id: `${usedPrefix}menugp` },
        { title: "🔞 Menú +18", description: "Contenido NSFW", id: `${usedPrefix}menu18` },
        { title: "❤️ Menú Logos", description: "Diseña logos", id: `${usedPrefix}menulogos` }
      ]
    }];

    const buttons = [
      {
        type: 1,
        buttonId: `${usedPrefix}menu`,
        buttonText: { displayText: '✅ Menú Completo' }
      },
      {
        type: 1,
        buttonId: `${usedPrefix}reg`,
        buttonText: { displayText: '🛡️ Verificar' }
      },
      {
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: '🌹 Menú por Categorías',
            sections
          })
        }
      }
    ];

    await conn.sendMessage(m.chat, {
      image: media.imageMessage,
      caption: texto,
      footer: '⏤͟͞𝑩𝑶𝑻 • by Black Clover',
      buttons,
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.reply('✘ Ocurrió un error:\n' + e.message);
    await m.react('❌');
  }
};

handler.command = ['menu1', 'menulist'];
export default handler;