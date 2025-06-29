import yts from 'yt-search';
import fetch from 'node-fetch';
import { prepareWAMessageMedia } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, `*🔎 Por favor, ingresa un título de YouTube.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Corazón Serrano - Olvídalo Corazón`, m);

  await m.react('🕒');
  try {
    const query = args.join(" ");
    const searchResults = await searchVideos(query);
    const spotifyResults = await searchSpotify(query);

    if (!searchResults.length && !spotifyResults.length) {
      throw new Error('*✖️ No se encontraron resultados.*');
    }

    const video = searchResults[0];

    let thumbnail;
    try {
      const res = await fetch(video.miniatura);
      thumbnail = await res.buffer();
    } catch {
      const res = await fetch('https://telegra.ph/file/36f2a1bd2aaf902e4d1ff.jpg');
      thumbnail = await res.buffer();
    }

    let messageText = `\`\`\`◜YouTube - Download◞\`\`\`\n\n`;
    messageText += `*${video.titulo}*\n\n`;
    messageText += `≡ *⏳ Duración:* ${video.duracion || 'No disponible'}\n`;
    messageText += `≡ *🌴 Autor:* ${video.canal || 'Desconocido'}\n`;
    messageText += `≡ *🔗 URL:* ${video.url}`;

    // Primer mensaje con imagen y botones rápidos
    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: messageText,
      footer: '🌀 YouTube y Spotify Downloader',
      buttons: [
        {
          buttonId: `${usedPrefix}ytmp3 ${video.url}`,
          buttonText: { displayText: '🎧 Descargar MP3' },
          type: 1,
        },
        {
          buttonId: `${usedPrefix}ytmp4 ${video.url}`,
          buttonText: { displayText: '📹 Descargar MP4' },
          type: 1,
        }
      ],
      headerType: 4
    }, { quoted: m });

    // Segundo mensaje con lista interactiva
    const ytSections = searchResults.slice(1, 10).map((v, index) => ({
      title: `${index + 1}. ${v.titulo}`,
      rows: [
        {
          title: `🎶 MP3`,
          description: `Duración: ${v.duracion || 'No disponible'}`,
          id: `${usedPrefix}ytmp3 ${v.url}`
        },
        {
          title: `🎥 MP4`,
          description: `Duración: ${v.duracion || 'No disponible'}`,
          id: `${usedPrefix}ytmp4 ${v.url}`
        }
      ]
    }));

    const spotifySections = spotifyResults.map((s, index) => ({
      title: `${index + 1}. ${s.titulo}`,
      rows: [
        {
          title: `🎶 Audio`,
          description: `Duración: ${s.duracion || 'No disponible'}`,
          id: `${usedPrefix}spotify ${s.url}`
        }
      ]
    }));

    if (ytSections.length > 0 || spotifySections.length > 0) {
      await conn.sendMessage(m.chat, {
        text: '📋 Resultados alternativos:',
        footer: '🌀 Elige una opción',
        buttons: [
          ...(ytSections.length > 0 ? [{
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify({
                title: '🎬 YouTube Resultados',
                sections: ytSections
              })
            }
          }] : []),
          ...(spotifySections.length > 0 ? [{
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify({
                title: '🎵 Spotify Resultados',
                sections: spotifySections
              })
            }
          }] : [])
        ],
        headerType: 1
      }, { quoted: m });
    }

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('❌');
    conn.reply(m.chat, `*✘ Error al buscar el video:*\n${e.message}`, m);
  }
};

handler.help = ['play4 <texto>'];
handler.tags = ['dl'];
handler.command = ['play4'];
export default handler;

// 🔍 Funciones auxiliares

async function searchVideos(query) {
  try {
    const res = await yts(query);
    return res.videos.slice(0, 10).map(video => ({
      titulo: video.title,
      url: video.url,
      miniatura: video.thumbnail,
      canal: video.author.name,
      publicado: video.timestamp || 'No disponible',
      vistas: video.views || 'No disponible',
      duracion: video.duration?.timestamp || 'No disponible'
    }));
  } catch (error) {
    console.error('Error en yt-search:', error.message);
    return [];
  }
}

async function searchSpotify(query) {
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!data || !Array.isArray(data.data)) return [];
    return data.data.slice(0, 10).map(track => ({
      titulo: track.title,
      url: track.url,
      duracion: track.duration || 'No disponible'
    }));
  } catch (error) {
    console.error('Error en Spotify API:', error.message);
    return [];
  }
}