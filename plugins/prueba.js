import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🕒');
  try {
    // Datos del usuario
    const name = conn.getName(m.sender);
    const exp = global.db.data.users[m.sender]?.exp || 0;
    const level = global.db.data.users[m.sender]?.level || 0;
    const role = global.db.data.users[m.sender]?.role || 'Sin rango';

    const caption = `✨ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ✨\n\n👤 Usuario: ${name}\n💠 Exp: ${exp}\n⭐ Nivel: ${level}\n🎖️ Rango: ${role}`;

    // Imagen
    const imageURL = 'https://files.catbox.moe/pp7ncd.jpg';
    const imageBuffer = await fetch(imageURL).then(res => res.buffer());
    const media = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });

    // Lista de secciones
    const sections = [{
      title: "🌹 Menú por Categorías",
      rows: [
        { title: "📥 Menú Descargas", description: "Descarga contenido", id: `${usedPrefix}menudl` },
        { title: "🧿 Menú RPG", description: "Juega y gana exp", id: `${usedPrefix}menurpg` },
        { title: "🔍 Menú Búsquedas", description: "Busca en la red", id: `${usedPrefix}menuse` },
        { title: "👑 Menú Owner", description: "Comandos del dueño", id: `${usedPrefix}dev` },
        { title: "🎐 Menú Audios", description: "Audios divertidos", id: `${usedPrefix}menu2` },
        { title: "👤 Menú Perfil", description: "Administra tu cuenta", id: `${usedPrefix}perfildatesl` },
        { title: "👥 Menú Grupos", description: "Comandos para grupos", id: `${usedPrefix}menugp` },
        { title: "🔞 Menú +18", description: "Contenido sensible", id: `${usedPrefix}menu18` },
        { title: "❤️ Menú Logos", description: "Logos personalizados", id: `${usedPrefix}menulogos` }
      ]
    }];

    // Botones: rápidos + lista tipo flow
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
            title: '📋 Selecciona un menú:',
            sections
          })
        }
      }
    ];

    // Envío final
    await conn.sendMessage(m.chat, {
      image: media.imageMessage,
      caption,
      footer: '⏤͟͞ू⃪ 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 - 𝑩𝑶𝑻',
      buttons,
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

    await m.react('💿');

  } catch (e) {
    console.error(e);
    await m.reply(`✘ Ocurrió un error:\n${e.message}`);
    await m.react('❌');
  }
};

handler.command = ['menu1', 'menulist'];
export default handler;