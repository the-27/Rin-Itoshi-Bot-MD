import fetch from 'node-fetch';

let handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `❗ Ingresa un nombre o link de SoundCloud.`, m);

  let url = '';
  let title = '';
  let thumbnail = '';

  try {
    if (!/soundcloud\.com/.test(text)) {
      const search = await fetch(`https://api.siputzx.my.id/api/soundcloud/search?query=${encodeURIComponent(text)}`);
      const searchData = await search.json();

      if (!searchData.status || !searchData.data || searchData.data.length === 0)
        throw '❌ No se encontró ninguna canción con ese nombre.';

      url = searchData.data[0].url;
    } else {
      url = text;
    }

    const res = await fetch(`https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    if (!json.status || !json.data) throw '❌ No se pudo obtener el audio.';

    title = json.data.title;
    thumbnail = json.data.thumbnail;
    const audioUrl = json.data.url;

    const audioMessage = {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: audioUrl,
          title,
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    };

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❌ Error al intentar obtener el audio de SoundCloud.`, m);
  }
};

handler.command = ['sound', 'soundclouddl'];
export default handler;