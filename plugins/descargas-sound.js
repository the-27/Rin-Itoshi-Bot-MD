import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❗ Ingresa un link de SoundCloud.`, m);

  if (!/soundcloud\.com/.test(text)) return conn.reply(m.chat, `⚠️ El enlace debe ser de SoundCloud.`, m);

  try {
    const res = await fetch(`https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.data) throw '❌ No se pudo obtener el audio.';

    const { title, thumbnail, url } = json.data;

    const audioMessage = {
      audio: { url },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title,
          sourceUrl: text,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    };

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❌ Error al intentar descargar desde SoundCloud.`, m);
  }
};

handler.command = ['sounddl', 'soundclouddl'];
export default handler;