import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
    if (!text.trim()) {
        return conn.reply(m.chat, `*Ingresa el nombre o enlace del video de YouTube para descargar.*`, m, rcanal);
    }

    try {
        await m.react('?'); 

        const search = await yts(text);
        if (!search.all || search.all.length === 0) {
            return m.reply('No se encontraron resultados para tu b¨²squeda.');
        }

        const videoInfo = search.all[0];
        const { title, thumbnail, url, timestamp, views, ago, author } = videoInfo;

        const infoMessage = `     Y T - P L A Y 
> ? T¨ªtulo: *${title}*
> ? Canal: ${author.name}
> ? Duracion: ${timestamp}
> ? Vistas: ${views}
> ? Publicado: ${ago}
> ? Enlace: ${url}`;

        await conn.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: infoMessage
        }, { quoted: m });

        await m.react('??'); 

        if (['play2', 'playvideo', 'ytmp4'].includes(command)) {
            const apiKey = "GataDios";
            const apiUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(url)}&type=video&quality=480p&apikey=${apiKey}`;
            const res = await fetch(apiUrl);

            if (!res.ok) {
                throw new Error(`Hubo un problema al conectar con la API. C¨®digo de estado: ${res.status}`);
            }

            const data = await res.json();
            if (!data?.data?.url) {
                throw new Error(`No se pudo obtener un enlace de descarga v¨¢lido.`);
            }

            const { url: downloadUrl } = data.data;

            await conn.sendMessage(m.chat, {
                video: { url: downloadUrl },
                caption: `Aqu¨ª tienes tu video:\n> *${title}*`,
            }, { quoted: m });
        }
    } catch (error) {
        return m.reply(`*Error:* ${error.message}`);
    }
};

handler.command = ['play2', 'ytmp4', 'playvideo'];
handler.help = ['play2 <enlace o nombre>', 'ytmp4 <enlace o nombre>'];
handler.tags = ['descargas'];

export default handler;