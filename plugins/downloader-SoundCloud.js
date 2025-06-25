import fetch from 'node-fetch';
import axios from 'axios';

const getBuffer = async (url) => {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
  } catch (e) {
    console.error(`Error al obtener audio: ${e}`);
    return null;
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `🌷 Ingresa el nombre de la canción de *SoundCloud.*`, m, rcanal);

  await m.react('🕒');

  try {
    // Buscar la canción
    const searchRes = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();

    if (!searchJson || searchJson.length === 0) throw new Error("❌ No se encontraron resultados.");

    const { url, title } = searchJson[0];

    // Obtener el link de descarga
    const audioRes = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${encodeURIComponent(url)}`);
    const audioJson = await audioRes.json();

    if (!audioJson || !audioJson.link) throw new Error("❌ No se pudo obtener el audio.");

    const audioBuffer = await getBuffer(audioJson.link);

    if (!audioBuffer) throw new Error('❌ No se pudo descargar el audio.');

    let msg = `🎵 *${title}*\n🔗 ${url}\n\n☁️ Enviando el audio, por favor espera...`;
    await conn.reply(m.chat, msg, m);

    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${title}.mp3`,
      mimetype: 'audio/mp3',
      ptt: false,
      quoted: m
    });

    await m.react('✅');

  } catch (e) {
    console.error('Error en handler SoundCloud:', e);
    await m.react('❌');
    return conn.reply(m.chat, `❌ Error: ${e.message}`, m);
  }
};

handler.help = ['soundcloud', 'sound'];
handler.tags = ['descargas'];
handler.command = ['soundcloud', 'sound'];

export default handler;