import fetch from "node-fetch";

const handler = async (m, { conn, text, command }) => {
    if (!text.trim()) {
        return conn.reply(m.chat, `❗ Ingresa el nombre o enlace de SoundCloud para descargar.`, m);
    }

    try {
        let songUrl = '';
        let title = '';
        let thumbnail = '';
        let duration = '';

        // Si es un link de SoundCloud, lo usa directamente
        if (/soundcloud\.com/.test(text)) {
            songUrl = text;
        } else {
            // Buscar por nombre
            const search = await fetch(`https://api.siputzx.my.id/api/soundcloud/search?query=${encodeURIComponent(text)}`);
            const searchData = await search.json();

            if (!searchData.status || !searchData.data || searchData.data.length === 0) {
                return m.reply('❌ No se encontraron resultados para tu búsqueda.');
            }

            // Tomar el primer resultado
            songUrl = searchData.data[0].url;
        }

        // Descargar datos de la canción
        const res = await fetch(`https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(songUrl)}`);
        const json = await res.json();

        if (!json.status || !json.data) {
            throw new Error('❌ No se pudo obtener el audio.');
        }

        title = json.data.title;
        thumbnail = json.data.thumbnail;
        duration = json.data.duration;
        const audioUrl = json.data.url;

        const thumb = (await conn.getFile(thumbnail))?.data;

        const infoMessage = `╭───[ 🎧 SOUND CLOUD ]───✰
│🎵 Título: *${title}*
│⏱️ Duración: ${duration}
│🔗 Enlace: ${songUrl}
╰──────────────✰`;

        await conn.reply(m.chat, infoMessage, m);

        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: audioUrl,
                    title,
                    sourceUrl: songUrl,
                    thumbnail: thumb,
                },
            },
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        return m.reply(`❌ *Error:* ${error.message}`);
    }
};

handler.command = ['sc', 'soundcloud', 'sounddl'];
handler.help = ['soundcloud <nombre o link>'];
handler.tags = ['descargas'];

export default handler;