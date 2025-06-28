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
    // Reacción de espera
    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key
      }
    });

    // Mensaje temporal de carga
    const loadingMsg = await conn.reply(m.chat, "🔄 Procesando tu video, espera un momento...", m, fkontak);

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

    // Petición a API principal
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

    // Reacción de éxito
    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    });

    // Eliminar mensaje de "procesando"
    if (loadingMsg.key) {
      await conn.sendMessage(m.chat, { delete: loadingMsg.key });
    }

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Error: ${e.message}`, m, fkontak);
  }
};

handler.command = ["play2"];
handler.help = ["play2", "playvideo", "ytmp4"];
handler.tags = ["downloader"];

export default handler;