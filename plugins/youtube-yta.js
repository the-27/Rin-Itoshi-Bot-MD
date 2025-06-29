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

const handler = async (m, { conn, text, command }) => {
    if (!text) {
        return conn.reply(m.chat, '❌ Por favor proporciona un enlace válido de YouTube.', m);
    }

    try {
        // Nueva API local para obtener el audio
        const apiUrl = `http://de01.uniplex.xyz:5194/download_audio?url=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        // Validaciones de respuesta de la API
        if (!result || !result.file_url) {
            return conn.reply(m.chat, '❌ No se pudo descargar el audio. Verifica el enlace e intenta nuevamente.', m);
        }

        const audioUrl = result.file_url;
        const caption = `✅ *Audio descargado correctamente.*`;

        // Enviar el audio al usuario
        await conn.sendMessage(
            m.chat,
            {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4',
                ptt: false, // Cambia a `true` si deseas enviar como nota de voz
            },
            { quoted: m }
        );

        // Enviar mensaje de confirmación
        await conn.reply(m.chat, caption, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Ocurrió un error al intentar descargar el audio.', m);
    }
};

handler.command = ['yta'];
handler.help = ['yta'];
handler.tags = ['descargas'];
handler.coin = 3;

export default handler;
