let handler = async (m, { conn, usedPrefix }) => {
  let creatorNumber = '51969214380'
  let creatorName = '⚡ THE BLACK 🍁'
  let github = 'https://github.com/the-27'
  let imageUrl = 'https://files.catbox.moe/embijg.jpg'

  let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${creatorName};;;
FN:${creatorName}
TEL;type=CELL;type=VOICE;waid=${creatorNumber}:${creatorNumber}
END:VCARD`.trim()

 
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: creatorName,
      contacts: [{ vcard }]
    }
  }, { quoted: m })
  
  let text = `┏━━━━━━━━━━━━━━━━━━━┓
┃ 🌹 *C R E A D O R - 💎 - B O T*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🌱 *NOMBRE:* ${creatorName}
┃ ⚡ *NÚMERO:* +${creatorNumber}
┃ 💖 *LINK:* wa.me/${creatorNumber}
┃ 👻 *GITHUB:* ${github}
┗━━━━━━━━━━━━━━━━━━━┛
                    ᵉⁿˡᵃᶜᵉˢ ᵘᵗⁱˡᵉˢ`;

  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption: text,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: 'Información del creador',
        body: creatorName,
        thumbnailUrl: imageUrl,
        sourceUrl: github,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;