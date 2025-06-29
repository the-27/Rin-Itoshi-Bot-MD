let handler = async (m, { conn }) => {
  const black = 'BLACK.OFC';
  const imageUrl = 'https://files.catbox.moe/pp7ncd.jpg';
  const creatorNumber = '51969214380';
  const creatorName = '𝙏𝙝𝙚 𝘽𝙡𝙖𝙘𝙠 - Creador Oficial';
  const github = 'https://github.com/the-27';

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
    image: { url: imageUrl },
    caption: `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 🌹 *C R E A D O R - 💎 - B O T*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🌱 *NOMBRE:* ${creatorName}
┃ ⚡ *NÚMERO:* ${creatorNumber}
┃ 💖 *LINK:* wa.me/${creatorNumber}
┃ 👻 *GITHUB:* ${github}
┗━━━━━━━━━━━━━━━━━━━┛
                    ᵉⁿˡᵃᶜᵉˢ ᵘᵗⁱˡᵉˢ`,
    contextInfo: {
      externalAdReply: {
        title: '⚡ Contacto del Creador',
        body: dev,
        thumbnailUrl: imageUrl,
        sourceUrl: github,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  }, { quoted: m });
};

handler.command = ['owner', 'creador', 'dueño'];
export default handler;