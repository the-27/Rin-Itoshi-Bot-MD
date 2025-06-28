import axios from "axios";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text || !text.includes('tiktok')) {
    return conn.reply(m.chat, '*Ingresa un enlace válido de TikTok* 🤍', m);
  }

  try {
    await m.react('⏳');

    const videoUrl = await getTiktokVideo(text);

    if (!videoUrl) throw new Error('No se pudo obtener el video.');

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: '*[ TIKTOK SIN MARCA DE AGUA ]* ✅'
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

async function getTiktokVideo(url) {
  try {
    const api = `https://tikcdn.io/download?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(api);
    if (!data || !data.video || !data.video.no_watermark) return null;
    return data.video.no_watermark;
  } catch {
    return null;
  }
}