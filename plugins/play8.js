import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

const MAX_SIZE_MB = 100;

const handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text.trim()) {
    return conn.reply(m.chat, `*⚡⚡ Por favor, ingresa el nombre de la música a descargar.*`, m);
  }

  try {
    const search = await yts(text);
    if (!search.all.length) {
      return m.reply('✧ No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const canal = author.name || 'Desconocido';
    const vistas = formatViews(views);

    const infoMessage = `╭─⬣「⚡  *𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 ☃️*  ⭐」⬣
│ ≡🌴 *Título:* ${title}
│ ≡🥥 *Canal:* ${canal}
│ ≡📅 *Publicado:* ${ago}
│ ≡🐉 *Vistas:* ${vistas}
│ ≡🌲 *Duración:* ${timestamp}
│ ≡🦠 *Link:* ${url}
╰─────────────────────⬣`;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: 'Descargador YouTube',
          body: 'Bot WhatsApp',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: await (await fetch(thumbnail)).buffer(),
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    let api, result, fileSizeMB;
    const tipo = (command === 'mp3' || command === 'play') ? 'audio' : 'video';

    api = await fetchAPI(url, tipo);
    result = api?.download || api?.data?.url;

    if (!result) throw new Error('⚠️ No se pudo obtener el enlace de descarga.');

    fileSizeMB = await getFileSize(result);

    const fileName = `${sanitizeFileName(api.title || api.data?.filename)}.${tipo === 'audio' ? 'mp3' : 'mp4'}`;
    const mimetype = tipo === 'audio' ? 'audio/mpeg' : 'video/mp4';

    if (fileSizeMB > MAX_SIZE_MB) {
      await conn.sendMessage(m.chat, {
        document: { url: result },
        fileName,
        mimetype
      }, { quoted: m });
    } else {
      const messagePayload = {
        fileName,
        mimetype
      };

      if (tipo === 'audio') {
        messagePayload.audio = { url: result };
      } else {
        messagePayload.video = { url: result };
        messagePayload.caption = title;
      }

      await conn.sendMessage(m.chat, messagePayload, { quoted: m });
    }

  } catch (error) {
    console.error(error);
    return m.reply(`❌ *Error:* ${error.message}`);
  }
};


const fetchAPI = async (url, type) => {
  const endpoints = {
    audio: `https://api.neoxr.eu/api/youtube?url=${url}&type=audio&quality=128kbps&apikey=Paimon`,
    video: `https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=720p&apikey=Paimon`,
  };

  const res = await fetch(endpoints[type]);
  const data = await res.json();

  
  if (typeof data !== 'object' || data?.status === false || !data?.data?.url) {
    throw new Error('⚠️ Enlace inválido o archivo no disponible.');
  }

  return data;
};

const getFileSize = async (url) => {
  try {
    const response = await axios.head(url);
    const sizeInBytes = response.headers['content-length'] || 0;
    return parseFloat((sizeInBytes / (1024 * 1024)).toFixed(2));
  } catch {
    return 0;
  }
};

const sanitizeFileName = (name) => {
  return name.replace(/[\\/:*?"<>|]/g, '').slice(0, 60);
};

function formatViews(views) {
  if (!views) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}

handler.command = handler.help = ['play', 'mp3', 'play2', 'mp4'];
handler.tags = ['descargas'];
handler.group = true;

export default handler;