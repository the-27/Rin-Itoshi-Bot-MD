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
    await conn.react(m.chat, '⏳', m.key);

    const search = await yts(text);
    const video = search.videos[0];

    if (!video) {
      return conn.reply(m.chat, '⚠️ No se encontró el video.', m, fkontak);
    }

    const { title, url, timestamp, author, image } = video;

    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: `📽️ *Título:* ${title}\n👤 *Canal:* ${author.name}\n⏱️ *Duración:* ${timestamp}\n🔗 *Link:* ${url}`
    }, { quoted: fkontak });

    const res = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=TuApiKeyLolhuman&url=${url}`);
    const json = await res.json();

    if (!json.result || !json.result.link) {
      return conn.reply(m.chat, '❌ Error al obtener el video.', m, fkontak);
    }

    await conn.sendMessage(m.chat, {
      video: { url: json.result.link },
      caption: `🎬 *Aquí tienes tu video:* ${title}`
    }, { quoted: fkontak });

    await conn.react(m.chat, '✅', m.key);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Ocurrió un error al procesar tu solicitud.', m, fkontak);
  }
};

handler.command = ["play2"]
handler.help = ["play2", "playvideo", "ytmp4"];
handler.tags = ["downloader"];
export default handler;