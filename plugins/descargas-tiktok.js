import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `*☃️ Por favor, ingresa un enlace de TikTok.*`, m);
    }

    try {
        await conn.reply(m.chat, `*⚡ Espere un momento, estoy descargando su video...*`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "❌ Error: No se pudo obtener el video.", m);
        }

        const videoURL = tiktokData.data.play;
        const desc = tiktokData.data.title || "Sin descripción";
        const author = tiktokData.data.author?.nickname || "Desconocido";
        const likes = tiktokData.data.digg_count || 0;

        const mensaje = `
╭───『 *𝙏𝙄𝙆𝙏𝙊𝙆 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝘿𝙊𝙍* 』
│🎥 *Autor:* ${author}
│💬 *Descripción:* ${desc}
│❤️ *Likes:* ${likes.toLocaleString('es-PE')}
╰────────────⬣`;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", mensaje.trim(), m);
        } else {
            return conn.reply(m.chat, "❌ No se pudo descargar el video.", m);
        }

    } catch (error1) {
        return conn.reply(m.chat, `❌ Error: ${error1.message}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    let api = `https://www.tikwm.com/api/?url=${url}&hd=1`;
    let response = await (await fetch(api)).json();
    return response;
}



/*import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `*☃️ Por favor, ingresa un enlace de TikTok.*`, m);
    }

    try {
        await conn.reply(m.chat, `*⚡ Espere un momento, estoy descargando su video...*`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "Error: No se pudo obtener el video.", m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `╭───『 *𝙏𝙄𝙆𝙏𝙊𝙆 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝘿𝙊𝙍* 』\n│⚡ 𝒂𝒒𝒖𝒊 𝒕𝒊𝒆𝒏𝒆𝒔 𝒕𝒖 𝒗𝒊𝒅𝒆𝒐 𝒖𝒘𝒖 🌪️\n╰────────────⬣`, m);
        } else {
            return conn.reply(m.chat, "No se pudo descargar.", m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `Error: ${error1.message}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
//handler.group = true;
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`;
    let response = await (await fetch(tikwm)).json();
    return response;
}
*/