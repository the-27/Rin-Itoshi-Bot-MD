import fetch from "node-fetch";
import yts from "yt-search";
import { ytv, yta } from "./_ytdl.js";

const limit = 100;

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de un video o una URL de YouTube.");

  try {
    await conn.sendMessage(m.chat, { react: { text: "🌱", key: m.key } });

    const res = await yts(text);
    if (!res?.all?.length) return m.reply("No se encontraron resultados para tu búsqueda.");

    const video = res.all[0];
    const cap = `╭─⬣「⚡  *𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 ☃️*  ⭐」⬣
│ ≡🌴 *Título:* ${video.title}
│ ≡🥥 *Autor:* ${video.author.name}
│ ≡📅 *Publicado:* ${video.ago}
│ ≡🐉 *Vistas:* ${video.views}
│ ≡🌲 *Duración:* ${video.duration.timestamp}
│ ≡🦠 *Link:* ${video.url}
╰──⬣
*🐾 ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ ᴍᴅ あ*`;

    const thumbBuffer = await fetch(video.thumbnail).then(res => res.buffer());
    await conn.sendFile(m.chat, thumbBuffer, "image.jpg", cap, m);

    if (command === "play") {
      try {
        const api = await yta(video.url);
        await conn.sendFile(m.chat, api.result.download, api.result.title, "", m);
        await conn.sendMessage(m.chat, { react: { text: "✔️", key: m.key } });
      } catch (error) {
        return m.reply("❌ Error al descargar audio: " + error.message);
      }
    } else if (command === "play2" || command === "playvid") {
      try {
        const api = await ytv(video.url);
        const response = await fetch(api.url);
        const sizeMB = parseInt(response.headers.get("content-length") || "0") / (1024 * 1024);
        const asDocument = sizeMB >= limit;

        await conn.sendFile(m.chat, api.url, api.title, "", m, null, {
          asDocument,
          mimetype: "video/mp4"
        });

        await conn.sendMessage(m.chat, { react: { text: "✔️", key: m.key } });
      } catch (error) {
        return m.reply("❌ Error al descargar video: " + error.message);
      }
    }
  } catch (e) {
    console.error(e);
    return m.reply("❌ Error interno: " + e.message);
  }
};

handler.help = ["play", "play2"];
handler.tags = ["download"];
handler.command = ["play", "play2", "playvid"];

export default handler;