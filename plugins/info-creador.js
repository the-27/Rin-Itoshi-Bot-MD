import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {

  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender;
  let name = await conn.getName(who);
  let edtr = `@${m.sender.split('@')[0]}`;
  let username = await conn.getName(m.sender);

  let numCreador = '51969214380';
  let black = '꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂';
  let imageUrl = 'https://files.catbox.moe/pp7ncd.jpg';

  // VCARD
  let list = [
    {
      displayName: `${black}`,
      vcard: `BEGIN:VCARD
      VERSION:3.0\nFN:${black}
      item1.TEL;waid=${numCreador}:${numCreador}
      item1.X-ABLabel:Número
      item2.EMAIL;type=INTERNET:blackoficial2025@gmail.com
      item2.X-ABLabel:Email
      item3.URL:https://www.instagram.com/theblack.zx
      item3.X-ABLabel:Instagram
      item4.ADR:;; Perú 🇵🇪;;;;
      item4.X-ABLabel:Región
      END:VCARD`
    }
  ];

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    },
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: '⚡ ᴄᴏɴᴛᴀᴄᴛᴏ ᴅᴇ ᴍɪ ᴄʀᴇᴀᴅᴏʀ💥',
        body: dev,
        thumbnailUrl: imageUrl,
        sourceUrl: 'https://github.com/the-27',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  let rin = `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 🌹 *C R E A D O R - 💎 - B O T*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🌱 *NOMBRE:* ${black}
┃ ⚡ *NUMERO:* ${numCreador}
┃ 💖 *LINK:* wa.me/${numCreador}
┃ 👻 *GITHUB:*
┃ https://github.com/the-27
┗━━━━━━━━━━━━━━━━━━━┛
                   ᵉⁿˡᵃᶜᵉˢ ᵘᵗⁱˡᵉˢ`
  await conn.reply(m.chat, rin.trim(), fkontak);
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;