import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🕒');
  try {
    const name = conn.getName(m.sender);
    const exp = global.db.data.users[m.sender]?.exp || 0;
    const level = global.db.data.users[m.sender]?.level || 0;
    const role = global.db.data.users[m.sender]?.role || 'Sin rango';

    const imagen = 'https://files.catbox.moe/pp7ncd.jpg';

    const res = await fetch(imagen);
    const thumbnail = await res.buffer();

    const sections = [
      {
        title: "✦ MENÚS DISPONIBLES ✦",
        rows: [
          { title: "📥 Menú Descargas", description: "Descarga contenido", id: `${usedPrefix}menudl` },
          { title: "🧿 Menú RPG", description: "Juega y gana exp", id: `${usedPrefix}menurpg` },
          { title: "🔍 Menú Búsquedas", description: "Comandos de búsqueda", id: `${usedPrefix}menuse` },
          { title: "👑 Menú Owner", description: "Comandos de dueño", id: `${usedPrefix}dev` },
          { title: "🎐 Menú Audios", description: "Audios divertidos", id: `${usedPrefix}menu2` },
          { title: "👤 Menú Perfil", description: "Edita tu perfil", id: `${usedPrefix}perfildatesl` },
          { title: "👥 Menú Grupos", description: "Administra grupos", id: `${usedPrefix}menugp` },
          { title: "🔞 Menú +18", description: "Contenido NSFW", id: `${usedPrefix}menu18` },
          { title: "❤️ Menú Logos", description: "Crea logotipos", id: `${usedPrefix}menulogos` }
        ]
      }
    ];

    const texto = `✨ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ✨\n\n👤 Usuario: ${name}\n💠 Exp: ${exp}\n⭐ Nivel: ${level}\n🎖️ Rango: ${role}`;

    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: texto,
      footer: '⏤͟͞ू⃪ 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 - 𝑩𝑶𝑻 • Powered by black',
      buttons: [
        {
          buttonId: `${usedPrefix}menu`,
          buttonText: { displayText: '✅ Menú Completo' },
          type: 1
        },
        {
          buttonId: `${usedPrefix}reg`,
          buttonText: { displayText: '🛡️ Verificar' },
          type: 1
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
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.reply(`✘ Error:\n${e.message}`);
    await m.react('❌');
  }
};

handler.command = ['menu1', 'menulist'];
export default handler;