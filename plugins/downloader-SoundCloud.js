// codigo creador por yo
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `*🌹 Ingresa el texto de la canción que quieras buscar en SoundCloud*`, m, rcanal);

  try {
    let apiSearch = await fetch(`https://api.siputzx.my.id/api/s/soundcloud?query=${encodeURIComponent(text)}`);
    let jsonSearch = await apiSearch.json();

    if (!jsonSearch.data || jsonSearch.data.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron resultados para *${text}*`, m);
    }

    let { permalink_url: link } = jsonSearch.data[0];

    let apiDL = await fetch(`https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(link)}`);
    let jsonDL = await apiDL.json();

    let { title, duration, thumbnail, url: audioUrl } = jsonDL.data;

    function formatDuration(ms) {
      let totalSeconds = Math.floor(ms / 1000);
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const infoMessage = `╭─⬣「🎵 *SOUNDCLOUD* 」⬣
│ ≡✨ *Título:* ${title}
│ ≡⏱️ *Duración:* ${formatDuration(duration)}
│ ≡🔗 *Enlace:* ${link}
╰──⬣`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: infoMessage
    }, { quoted: m });
    
    const thumbBuffer = await (await fetch(thumbnail)).buffer();

    let audioMessage = {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: audioUrl,
          title: title,
          sourceUrl: link,
          thumbnail: thumbBuffer
        }
      }
    };

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '❌ Ocurrió un error al intentar descargar el audio.', m);
  }
};

handler.help = ['soundcloud', 'sound'];
handler.tags = ['descargas'];
handler.command = ['soundcloud', 'sound'];

export default handler;