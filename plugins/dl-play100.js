import fetch from "node-fetch";
import yts from 'yt-search';

const fkontak = {
  "key": {
    "participants": "0@s.whatsapp.net",
    "remoteJid": "status@broadcast",
    "fromMe": false,
    "id": "Halo"
  },
  "message": {
    "contactMessage": {
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:YouTube Bot\nitem1.TEL;waid=519999999999:+51 999 999 999\nitem1.X-ABLabel:Mobile\nEND:VCARD`
    }
  }
};

const handler = async (m, { conn, text, command }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `❗ Ingresa el nombre o enlace del video de YouTube para descargar.`, m, fkontak);
  }

  try {
    if (m.key) await conn.react(m.chat, '⏳', m.key);

    const search = await yts(text);
    const video = search.videos.length > 0 ? search.videos[0] : null;

    if (!video) {
      return conn.reply(m.chat, '⚠️ No se encontró ningún resultado.', m, fkontak);
    }

    const { title, url, timestamp, author, image } = video;

    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: `📽️ *Título:* ${title}\n👤 *Canal:* ${author.name}\n⏱️ *Duración:* ${timestamp}\n🔗 *Link:* ${url}`
    }, { quoted: fkontak });

    const res = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return conn.reply(m.chat, '❌ La API no devolvió una respuesta válida.', m, fkontak);
    }

    const json = await res.json();

    if (!json.result || !json.result.link) {
      return conn.reply(m.chat, '❌ Error al obtener el video.', m, fkontak);
    }

    await conn.sendMessage(m.chat, {
      video: { url: json.result.link },
      caption: `🎬 *Aquí tienes tu video:* ${title}`
    }, { quoted: fkontak });

    if (m.key) await conn.react(m.chat, '✅', m.key);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Error: ${e.message}`, m, fkontak); // Útil para debug
  }
};

handler.command = ["play2"];
handler.help = ["play2", "playvideo", "ytmp4"];
handler.tags = ["downloader"];

export default handler;