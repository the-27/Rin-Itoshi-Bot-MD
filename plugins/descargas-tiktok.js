import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let logorin = 'https://files.catbox.moe/dajw8b.jpg';  
    let rcanal = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U';

    if (!args[0]) {
        return conn.sendMessage(m.chat, { 
            text: "*☃️ Por favor, ingresa un enlace de TikTok.*", 
            contextInfo: { 
                externalAdReply: { 
                    title: "⚠  𝗘𝗥𝗥𝗢𝗥 𝗔𝗟 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗥  ⚠",
                    body: "By Black Clover Bot",
                    mediaType: 1, 
                    thumbnail: await (await fetch(logorin)).buffer(), 
                    sourceUrl: rcanal 
                }
            }
        });
    }

    try {
        await conn.sendMessage(m.chat, { 
            text: "*⚡ Espere un momento, estoy descargando su video.*", 
            contextInfo: { 
                externalAdReply: { 
                    title: "Descargando TikTok...",
                    body: "🦠 Espere unos segundos...",
                    mediaType: 1, 
                    thumbnail: await (await fetch(logorin)).buffer(), 
                    sourceUrl: rcanal 
                }
            }
        });

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "No se pudo descargar.", m);
        }

        const videoURL = tiktokData.data.play;

        await conn.sendFile(
            m.chat,
            videoURL,
            "tiktok.mp4",
            `╭───『 *𝙏𝙄𝙆𝙏𝙊𝙆 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝘿𝙊𝙍* 』\n│⚡ 𝒂𝒒𝒖𝒊 𝒕𝒊𝒆𝒏𝒆𝒔 𝒕𝒖 𝒗𝒊𝒅𝒆𝒐 𝒖𝒘𝒖 🌪️\n╰────────────⬣`,
            m
        );
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `Error: ${error1.message}`, m);
    }
};

handler.help = ['tiktok <link>'];
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
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