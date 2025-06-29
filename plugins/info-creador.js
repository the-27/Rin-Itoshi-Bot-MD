let handler = async (m, { conn }) => {
  try {
    const black = 'BLACK.OFC';
    const dev = '𝙏𝙝𝙚 𝘽𝙡𝙖𝙘𝙠 - Creador Oficial';
    const imageUrl = 'https://files.catbox.moe/pp7ncd.jpg';
    const creatorNumber = '50231458537';
    const creatorName = 'BLACKOFC';
    const channelLink = 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W';
    const github = 'https://github.com/the-27';
    const waLink = `https://wa.me/${creatorNumber}`;

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

    // Enviar contacto
    await conn.sendMessage(m.chat, {
      contacts: {
        displayName: creatorName,
        contacts: [{ vcard }]
      }
    }, { quoted: m });

    // Enviar mensaje con imagen y botones mixtos (respuesta rápida + URL)
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `
┏━━━━━━━━━━━━━━━━━━━┓
┃ 🌹 *C R E A D O R - 💎 - B O T*
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🌱 *NOMBRE:* ${creatorName}
┃ ⚡ *NUMERO:* ${creatorNumber}
┃ 💖 *LINK:* wa.me/${creatorNumber}
┃ 👻 *GITHUB:* ${github}
┗━━━━━━━━━━━━━━━━━━━┛
                   ᵉⁿˡᵃᶜᵉˢ ᵘᵗⁱˡᵉˢ`,
      footer: 'Selecciona una opción 👇',
      templateButtons: [
        { index: 1, urlButton: { displayText: '📞 Contactar por WhatsApp', url: waLink } },
        { index: 2, urlButton: { displayText: '📣 Canal Oficial', url: channelLink } },
        { index: 3, urlButton: { displayText: '👾 GitHub', url: github } },
        { index: 4, quickReplyButton: { displayText: '📜 Ver Menú', id: '.menu' } },
        { index: 5, quickReplyButton: { displayText: '💰 Donar al Creador', id: '.donar' } }
      ],
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: '⚡ Contacto del Creador',
          body: dev,
          thumbnailUrl: imageUrl,
          sourceUrl: github,
          showAdAttribution: true,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al mostrar la información del creador.');
  }
};

handler.command = ['owner', 'creador', 'dueño'];
export default handler;