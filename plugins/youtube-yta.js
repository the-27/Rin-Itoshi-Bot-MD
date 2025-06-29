/*import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`🌴 Ingresa un texto para buscar en YouTube.\n> *Ejemplo:* ${usedPrefix + command} Shakira`);

  try {
    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      return m.reply(`⚠️ No se encontraron resultados para "${text}".`);
    }

    const video = searchData.data[0];

    const downloadApi = `https://api.vreden.my.id/api/ytmp3?url=${video.url}`;
    const downloadResponse = await fetch(downloadApi);
    const downloadData = await downloadResponse.json();

    if (!downloadData?.result?.download?.url) {
      return m.reply("❌ No se pudo obtener el audio del video.");
    }
    await conn.sendMessage(m.chat, {
      audio: { url: downloadData.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar la solicitud:\n${error.message}`);
  }
};

handler.command = ['yta'];
handler.help = ['yta'];
handler.tags = ['descargas'];
handler.coin = 3;

export default handler;
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, '❌ Proporciona un enlace de YouTube.', m, rcanal);
    }

    try {
        const apiUrl = `http://de01.uniplex.xyz:5194/download_audio?url=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        console.log(result);

        if (!result || !result.file_url || !result.file_url.startsWith('http')) {
            return conn.reply(m.chat, '❌ No se pudo obtener el audio. Verifica el enlace.', m);
        }

        const audioUrl = result.file_url;

        await conn.sendMessage(
            m.chat,
            {
                audio: { url: audioUrl },
                mimetype: 'audio/mpeg',
                ptt: false,
            },
            { quoted: m }
        );

        await conn.reply(m.chat, '✅ *Audio enviado correctamente.*', m);

    } catch (error) {
        console.error('Error al descargar el audio:', error);
        conn.reply(m.chat, '❌ Error al intentar descargar o enviar el audio.', m);
    }
};

handler.command = ['yta'];
handler.help = ['yta'];
handler.tags = ['descargas'];
handler.coin = 3;

export default handler;