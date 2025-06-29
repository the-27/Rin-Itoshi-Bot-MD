import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🕒');

  try {
    const name = conn.getName(m.sender);
    const exp = global.db.data.users[m.sender]?.exp || 0;
    const level = global.db.data.users[m.sender]?.level || 0;
    const role = global.db.data.users[m.sender]?.role || 'Sin rango';

    const texto = `✨ *𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎* ✨\n\n👤 *Usuario:* ${name}\n💠 *Exp:* ${exp}\n⭐ *Nivel:* ${level}\n🎖️ *Rango:* ${role}`;

    const imagen = 'https://files.catbox.moe/pp7ncd.jpg';
    const buffer = await (await fetch(imagen)).buffer();
    const media = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer });

    const sections = [
      {
        title: '🔰 Opciones Rápidas',
        rows: [
          { title: '✅ Menú Completo', description: 'Ver todo el menú del bot', id: `${usedPrefix}menu` },
          { title: '🛡️ Verificar', description: 'Registrarte en el bot', id: `${usedPrefix}reg` },
        ],
      },
      {
        title: '📚 Categorías del Bot',
        rows: [
          { title: '📥 Menú Descargas', description: 'Descarga contenido multimedia', id: `${usedPrefix}menudl` },
          { title: '🧿 Menú RPG', description: 'Sistema de juego por niveles', id: `${usedPrefix}menurpg` },
          { title: '🔍 Menú Búsquedas', description: 'Buscar cosas desde WhatsApp', id: `${usedPrefix}menuse` },
          { title: '👑 Menú Owner', description: 'Comandos del dueño del bot', id: `${usedPrefix}dev` },
          { title: '🎐 Menú Audios', description: 'Audios divertidos', id: `${usedPrefix}menu2` },
          { title: '👤 Menú Perfil', description: 'Editar perfil de usuario', id: `${usedPrefix}perfildatesl` },
          { title: '👥 Menú Grupos', description: 'Comandos para administrar grupos', id: `${usedPrefix}menugp` },
          { title: '🔞 Menú +18', description: 'Contenido NSFW para adultos', id: `${usedPrefix}menu18` },
          { title: '❤️ Menú Logos', description: 'Diseñar logos personalizados', id: `${usedPrefix}menulogos` },
        ],
      },
    ];

    await conn.sendMessage(m.chat, {
      image: media.imageMessage,
      caption: texto,
      footer: '⚡ THE BLACK - BOT',
      buttons: [
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '📋 Menú Principal',
              sections: sections
            }),
          },
        },
      ],
      headerType: 1,
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error('ERROR EN MENÚ:', e);
    await conn.reply(m.chat, '❌ Ocurrió un error al mostrar el menú.', m);
    await m.react('❌');
  }
};

handler.command = ['menu1', 'menulist'];
export default handler;