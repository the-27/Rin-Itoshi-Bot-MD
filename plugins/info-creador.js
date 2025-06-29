/*let handler = async (m, { conn, usedPrefix, isOwner }) => {
  try {
    const black = 'BLACK.OFC';
    const numCreador = '51969214380';
    const dev = '𝙏𝙝𝙚 𝘽𝙡𝙖𝙘𝙠 - Creador Oficial';
    const imageUrl = 'https://files.catbox.moe/pp7ncd.jpg';

    const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${black};;;
FN:${black}
ORG:${black}
TITLE:
item1.TEL;waid=${numCreador}:${numCreador}
item1.X-ABLabel:CREADOR
X-WA-BIZ-DESCRIPTION: contacto de mi creador
X-WA-BIZ-NAME:${black}
END:VCARD`;

    
    await conn.sendMessage(m.chat, {
      contacts: {
        displayName: 'おBlack.xyz⁩',
        contacts: [{ vcard }]
      }
    }, { quoted: m });

   
    await conn.sendMessage(m.chat, {
      text: `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 🌹 *C R E A D O R - 💎 - B O T*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🌱 *NOMBRE:* ${black}
┃ ⚡ *NUMERO:* ${numCreador}
┃ 💖 *LINK:* wa.me/${numCreador}
┃ 👻 *GITHUB:* https://github.com/the-27 ⭐
┗━━━━━━━━━━━━━━━━━━━┛
                   ᵉⁿˡᵃᶜᵉˢ ᵘᵗⁱˡᵉˢ`.trim(),
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

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al enviar el contacto.');
  }
};

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
*/
let handler = async (m, { conn, usedPrefix }) => {
  let creatorNumber = '50231458537'
  let creatorName = 'Bʀᴀʏᴀɴ xD😼🍁'
  let channelLink = 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'

  let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${creatorName};;;
FN:${creatorName}
TEL;type=CELL;type=VOICE;waid=${creatorNumber}:${creatorNumber}
END:VCARD`.trim()

  // Enviar el contacto del creador
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: creatorName,
      contacts: [{ vcard }]
    }
  }, { quoted: m })

  // Crear lista con botón hacia canal y contacto
  let sections = [
    {
      title: "Opciones del Creador",
      rows: [
        { title: "📞 Contactar por WhatsApp", rowId: `https://wa.me/${creatorNumber}` },
        { title: "📣 Ir al Canal Oficial", rowId: channelLink }
      ]
    }
  ]

  let listMessage = {
    text: '👑 *Creador del Bot*',
    footer: 'Selecciona una opción 👇',
    title: `${creatorName}`,
    buttonText: "📋 Ver opciones",
    sections
  }

  // Enviar el mensaje con lista de opciones
  await conn.sendMessage(m.chat, listMessage, { quoted: m })
}

handler.command = ['owner', 'creador', 'dueño']
export default handler