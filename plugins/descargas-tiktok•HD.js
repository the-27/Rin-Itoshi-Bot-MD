import axios from "axios";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text || !text.includes('tiktok')) {
    return conn.reply(m.chat, '❤️ *Ingresa un enlace válido de TikTok* 🤍', m);
  }

  try {
    await m.react('⏳');

    const videoUrl = await getTiktokVideoHD(text);

    if (!videoUrl) throw new Error('No se pudo obtener el video.');

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: '*[ TIKTOK SIN MARCA DE AGUA - HD ]* ✅'
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('❌');
    conn.reply(m.chat, '*Ocurrió un error al procesar el video 😢*', m);
  }
};

handler.help = ['tiktokhd <url>'];
handler.tags = ['descargas'];
handler.command = ['tiktokhd', 'th'];

export default handler;

// ─────────────────────────────────────

async function getTiktokVideoHD(url) {
  try {
    const { data } = await axios.get(`https://www.tikwm.com/api/`, {
      params: { url },
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!data || !data.data || !data.data.play) return null;

    return data.data.play; 
  } catch (e) {
    console.error('Error en getTiktokVideoHD:', e);
    return null;
  }
}