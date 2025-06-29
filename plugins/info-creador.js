let handler = async (m, { conn, usedPrefix }) => {
  try {
    const black = 'BLACK.OFC';
    const dev = '𝙏𝙝𝙚 𝘽𝙡𝙖𝙘𝙠 - Creador Oficial';
    const imageUrl = 'https://files.catbox.moe/pp7ncd.jpg';

    const creatorNumber = '50231458537';
    const creatorName = 'BLACKOFC';
    const channelLink = 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W';

 
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${creatorName};;;
FN:${creatorName}
ORG:${black}
TITLE:Creador del Bot
TEL;type=CELL;waid=${creatorNumber}:${creatorNumber}
item1.X-ABLabel:CREADOR
X-WA-BIZ-DESCRIPTION:Contacto oficial del creador
X-WA-BIZ-NAME:${black}
END:VCARD`.trim();

    
    await conn.sendMessage(m.chat, {
      contacts: {
        displayName: creatorName,
        contacts: [{ vcard }]
      }
    }, { quoted: m });

    
    await conn.sendMessage(m.chat, {
      text: `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 🌹 *C R E A D O R - 💎 - B O T*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🌱 *NOMBRE:* ${creatorName}
┃ ⚡ *NUMERO:* ${creatorNumber}
┃ 💖 *LINK:* wa.me/${creatorNumber}
┃ 👻 *GITHUB:* https://github.com/the-27 ⭐
┗━━━━━━━━━━━━━━━━━━━┛
                   ᵉⁿˡᵃᶜᵉˢ ᵘᵗⁱˡᵉˢ`.trim(),
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: '⚡ ᴄᴏɴᴛᴀᴄᴛᴏ ᴅᴇ ᴍɪ ᴄʀᴇᴀᴅᴏʀ 💥',
          body: dev,
          thumbnailUrl: imageUrl,
          sourceUrl: 'https://github.com/the-27',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

 
    let sections = [
      {
        title: "Opciones del Creador",
        rows: [
          { title: "📞 Contactar por WhatsApp", rowId: `https://wa.me/${creatorNumber}` },
          { title: "📣 Ir al Canal Oficial", rowId: channelLink }
        ]
      }
    ];

    let listMessage = {
      text: '👑 *Creador del Bot*',
      footer: 'Selecciona una opción 👇',
      title: `${creatorName}`,
      buttonText: "📋 Ver opciones",
      sections
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al mostrar la información del creador.');
  }
};

handler.command = ['owner', 'creador', 'dueño'];
export default handler;