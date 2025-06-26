import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    const tiktokRegex = /(https?:\/\/)?(www\.)?(vm\.|vt\.|tiktok\.com)\/[^\s]+/gi;
    const link = args[0] || (m.text.match(tiktokRegex) || [])[0];

    if (!link) {
        return conn.reply(m.chat, `*☃️ Por favor, ingresa o envía un enlace de TikTok.*`, m);
    }

    try {
        await conn.reply(m.chat, `*⚡⚡ Espere un momento, estoy descargando su video...*`, m);

        const tiktokData = await tiktokdl(link);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "Error: No se pudo obtener el video.", m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `╭───『 *𝙏𝙄𝙆𝙏𝙊𝙆 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝘿𝙊𝙍* 』
│⚡ 𝒂𝒒𝒖𝒊 𝒕𝒊𝒆𝒏𝒆𝒔 𝒕𝒖 𝒗𝒊𝒅𝒆𝒐 𝒖𝒘𝒖 🌪️
╰────────────⬣`, m);
        } else {
            return conn.reply(m.chat, "No se pudo descargar.", m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `Error: ${error1.message}`, m);
    }
};

handler.help = ['tiktok'].map((v) => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt', /^https?:\/\/(www\.)?(vm\.|vt\.|tiktok\.com)\//i];
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`;
    let response = await (await fetch(tikwm)).json();
    return response;
}



/*import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `*☃️ Por favor, ingresa un enlace de TikTok.*`, m);
    }

    try {
        await conn.reply(m.chat, `*🐉 Espere un momento, estoy descargando su video...*`, m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "Error: No se pudo obtener el video.", m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `╭───『 *𝙏𝙄𝙆𝙏𝙊𝙆 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝘿𝙊𝙍* 』
│⚡ 𝒂𝒒𝒖𝒊 𝒕𝒊𝒆𝒏𝒆𝒔 𝒕𝒖 𝒗𝒊𝒅𝒆𝒐 𝒖𝒘𝒖 🌪️
╰────────────⬣`, m);
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