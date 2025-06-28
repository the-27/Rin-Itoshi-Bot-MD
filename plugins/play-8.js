import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
    try {
        if (!text.trim()) {
            return conn.reply(m.chat, `? Por favor, ingresa el nombre de la m¨²sica a descargar. Ejemplo: *.${command} Albirroja Te amo de verdad - Talento del barrio*`, m, fkontak);
        }

        let ytSearchResults = await yts(text);
        let ytVideo = ytSearchResults.all?.[0] || ytSearchResults.videos?.[0];

        if (!ytVideo) {
            await m.react('?');
            return conn.reply(m.chat, '? No se encontraron resultados para tu b¨²squeda.', m, fkontak);
        }

        const { title, url, views, timestamp, ago, thumbnail, author } = ytVideo;

        const infoMessage = `¨q©¤?¡¸?  *??? ?????? ??*  ?¡¹?
©¦ ¡Ô? *T¨ªtulo:* ${title || 'Desconocido'}
©¦ ¡Ô? *Canal:* ${(author?.name) || "Desconocido"}
©¦ ¡Ô? *Publicado:* ${ago || 'No disponible'}
©¦ ¡Ô? *Vistas:* ${formatViews(views)}
©¦ ¡Ô? *Duraci¨®n:* ${timestamp || 'No disponible'}
©¦ ¡Ô? *Link:* ${url || 'No disponible'}
¨t©¤©¤?`;

        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: infoMessage
        }, { quoted: fkontak });

        try {
            const apiResponse = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
            const apiData = await apiResponse.json();
            const videoUrl = apiData?.result?.download?.url;

            if (!videoUrl) throw new Error('El enlace de video no se gener¨® correctamente.');

            await conn.sendMessage(m.chat, {
                video: { url: videoUrl },
                caption: `? *${title}*`,
                mimetype: 'video/mp4'
            }, { quoted: fkontak });

            await m.react('?');
        } catch (error) {
            await m.react('?');
            return conn.reply(m.chat, 'No se pudo enviar el video. Intenta nuevamente.', m, fkontak);
        }

    } catch (error) {
        await m.react('?');
        return conn.reply(m.chat, `Ocurri¨® un error: ${error.message}`, m, fkontak);
    }
};

handler.command = ['play2', 'playvideo', 'ytmp4'];
handler.tags = ['descargas'];
handler.help = ['play2 <texto>'];

export default handler;

const fkontak = {
  key: {
    participants: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
    fromMe: false,
    id: 'Halo'
  },
  message: {
    contactMessage: {
      displayName: '??? ??????',
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Rin;Itoshi;;;\nFN:Rin Itoshi\nitem1.TEL;waid=51969214380:51969214380\nitem1.X-ABLabel:M¨®vil\nEND:VCARD`
    }
  }
};

function formatViews(views) {
    if (!views) return "No disponible";
    if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
    return views.toString();
}