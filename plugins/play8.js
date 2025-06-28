import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
    try {
        if (!text.trim()) {
            return conn.reply(m.chat, `⚡ Por favor, ingresa el nombre de la música a descargar. Ejemplo: *.${command} Albirroja Te amo de verdad - Talento del barrio*`, m);
        }

        let ytSearchResults = await yts(text);
        let ytVideo = ytSearchResults.all?.[0] || ytSearchResults.videos?.[0];

        if (!ytVideo) {
            await m.react('❌');
            return conn.reply(m.chat, '🛑 No se encontraron resultados para tu búsqueda.', m);
        }

        const { title, url, views, timestamp, ago, thumbnail, author } = ytVideo;

        const infoMessage = `╭─⬣「⚡  *𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 ☃️*  ⭐」⬣
│ ≡🌴 *Título:* ${title || 'Desconocido'}
│ ≡🥥 *Canal:* ${(author?.name) || "Desconocido"}
│ ≡📅 *Publicado:* ${ago || 'No disponible'}
│ ≡🐉 *Vistas:* ${formatViews(views)}
│ ≡🌲 *Duración:* ${timestamp || 'No disponible'}
│ ≡🦠 *Link:* ${url || 'No disponible'}
╰──⬣`;

        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: infoMessage
        }, { quoted: m });

        await m.react('⏳'); 

        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(url)}`);
        let json;

        try {
            json = await res.json();
        } catch (e) {
            throw new Error('❌ La API devolvió una respuesta inválida.');
        }

        const audioUrl = json?.result?.download?.url;

        if (!audioUrl) {
            throw new Error('❌ No se pudo obtener el enlace de descarga del audio.');
        }

        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: true // .
        }, { quoted: m });

        await m.react('✅');

    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, `⚠️ Ocurrió un error:\n\n${error.message}`, m);
    }
};

handler.command = ['play', 'playaudio', 'ytmp3'];
handler.customPrefix = null;
handler.help = ['play <texto>'];
handler.tags = ['descargas'];

export default handler;

function formatViews(views) {
    if (!views) return "No disponible";
    if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
    return views.toString();
}