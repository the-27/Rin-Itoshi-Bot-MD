import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `❗ Ingresa el nombre o enlace del video de YouTube para descargar.`, m, rcanal);
  }

  try {
   
    await conn.sendMessage(m.chat, {
      react: { text: "⏳", key: m.key }
    });

    const loadingMsg = await conn.reply(m.chat, "🔄 Procesando tu video, espera un momento...", m);

    const search = await yts(text);
    const video = search.videos[0];

    if (!video) {
      return conn.reply(m.chat, '⚠️ No se encontró ningún resultado.', m);
    }

    const { title, url, timestamp, author, image } = video;

    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: `📽️ *Título:* ${title}\n👤 *Canal:* ${author.name}\n⏱️ *Duración:* ${timestamp}\n🔗 *Link:* ${url}`
    }, { quoted: m });

  
    const res = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
    const contentType = res.headers.get("content-type");


    if (!contentType || !contentType.includes("application/json")) {
      return conn.reply(m.chat, '❌ Error: la API no devolvió un JSON válido. Puede estar caída o fallando.', m);
    }

    const json = await res.json();

    if (!json.result || !json.result.link) {
      return conn.reply(m.chat, `❌ Error al obtener el video.\n📛 Mensaje: ${json.message || "Sin información de error"}`, m);
    }

  
    await conn.sendMessage(m.chat, {
      video: { url: json.result.link },
      caption: `🎬 *Aquí tienes tu video:* ${title}`
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      react: { text: "✅", key: m.key }
    });

    if (loadingMsg.key) {
      await conn.sendMessage(m.chat, { delete: loadingMsg.key });
    }

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Error inesperado: ${e.message}`, m);
  }
};

handler.command = ["play2"];
handler.help = ["play2", "playvideo", "ytmp4"];
handler.tags = ["downloader"];

export default handler;