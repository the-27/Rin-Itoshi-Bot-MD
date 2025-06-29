import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🕒');

  try {
    // Título y texto de presentación
    const titulo = '✨ Bienvenido al Menú del Bot';
    const texto = `
╭━━⬣ 𝙄𝙉𝙁𝙊 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 ⬣━━
▢ 👤 Usuario: ${conn.getName(m.sender)}
▢ 🎖️ Rango: ${global.db.data.users[m.sender]?.role || 'Sin rango'}
▢ ✨ Nivel: ${global.db.data.users[m.sender]?.level || 0}
▢ 💠 Exp: ${global.db.data.users[m.sender]?.exp || 0}
╰━━━━━━━━━━━━━━⬣
`;

    // Imagen
    const imagen = 'https://files.catbox.moe/pp7ncd.jpg';
    const imgBuffer = await (await fetch(imagen)).buffer();
    const media = await prepareWAMessageMedia({ image: imgBuffer }, { upload: conn.waUploadToServer });

    // Botones rápidos
    const buttons = [
      { buttonId: `${usedPrefix}reg`, buttonText: { displayText: '🛡️ Verificar' }, type: 1 },
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '✅ Menú Completo' }, type: 1 }
    ];

    // Secciones del botón tipo lista
    const sections = [
      {
        title: "📂 Menús por Categoría",
        rows: [
          { title: "📥 Menú Descargas", description: "Descarga contenido", id: `${usedPrefix}menudl` },
          { title: "🎐 Menú Audios", description: "Audios divertidos", id: `${usedPrefix}menu2` },
          { title: "👥 Menú Grupos", description: "Comandos para grupos", id: `${usedPrefix}menugp` },
          { title: "🔞 Menú +18", description: "Contenido para adultos", id: `${usedPrefix}menu18` },
          { title: "👑 Menú Owner", description: "Funciones exclusivas del dueño", id: `${usedPrefix}dev` },
        ]
      }
    ];

    // Enviar mensaje con imagen, botones rápidos y botón tipo lista
    await conn.sendMessage(m.chat, {
      image: media.imageMessage,
      caption: titulo + '\n\n' + texto.trim(),
      footer: '🤖 Powered by BOT',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '📂 Menús por Categoría',
              sections
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true
      }
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, '*❌ Error al mostrar el menú.*\n' + e.message, m);
  }
};

handler.command = ['menugeneral', 'menú', 'menuprincipal'];
export default handler;