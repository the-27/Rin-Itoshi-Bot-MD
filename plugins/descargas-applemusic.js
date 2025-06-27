const apikey = "Tesina"; // Consigue tu API key en https://api.lyrax.net
import fetch from "node-fetch";

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    throw `☃️ Ingresa un texto o URL para descargar. Ejemplo:\n\n${usedPrefix}applemusic Del Rio - Ed Maverick\n${usedPrefix}appledl <url>`;
  }

  try {
    if (['applemusic', 'applem'].includes(command)) {
      const searchRes = await fetch(`https://api.lyrax.net/api/search/apples?text=${encodeURIComponent(text)}&apikey=${apikey}`);
      const api = await searchRes.json();

      if (!api?.data || !api.data[0]?.song) {
        throw `❌ No se encontró resultado para: *${text}*`;
      }

      const songUrl = api.data[0].song;
      const dlRes = await fetch(`https://api.lyrax.net/api/dl/appledl?url=${encodeURIComponent(songUrl)}&apikey=${apikey}`);
      const dl = await dlRes.json();

      const meta = dl?.metadata || {};
      const {
        datePublished = 'No disponible',
        description = 'Sin descripción',
        title = 'Sin título',
        image,
        inAlbum = {},
        song = songUrl
      } = { ...meta, ...api.data[0] };

      const albumName = inAlbum.name || 'Desconocido';
      const albumUrl = inAlbum.url || 'No disponible';

      const info = `
⪩ AppleMusic - Download ⪨

𖦹 🌱 Título : ${title}
𖦹 🗃️ Descripción : ${description}
𖦹 🔽 Publicado : ${datePublished}
𖦹 🔗 URL : ${song}

𖦹 📦 Álbum : ${albumName}
𖦹 ☄️ Link : ${albumUrl}
      `.trim();

      await conn.sendFile(m.chat, image, `${title}.jpg`, info, m);
      await conn.sendMessage(m.chat, {
        audio: { url: dl.download },
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } else if (['applemdl', 'appledl'].includes(command)) {
      const dlRes = await fetch(`https://api.lyrax.net/api/dl/appledl?url=${encodeURIComponent(text)}&apikey=${apikey}`);
      const dl = await dlRes.json();

      if (!dl?.download) throw '❌ No se pudo obtener el audio. Verifica el enlace.';

      await conn.sendMessage(m.chat, {
        audio: { url: dl.download },
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } else {
      throw `🌷 Comando no reconocido.`;
    }

  } catch (e) {
    console.error(e);
    return m.reply(`❌ Ocurrió un error:\n${e.message || e}`);
  }
};

handler.help = ['applemusic <texto>', 'appledl <url>'];
handler.command = ['applemusic', 'applem', 'applemdl', 'appledl'];
handler.tags = ['descargas'];

export default handler;