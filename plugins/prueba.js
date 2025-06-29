let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];
    const name = conn.getName(m.sender);

    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nitem1.TEL;waid=${userId.split("@")[0]}:${userId.split("@")[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    };

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];

    let menuText = `
*_~✦═ೋ『★』ೋ═✦~_*
⚙️ *🄾🄿🄲🄸🄾🄽🄴🅂 🄳🄸🅂🄿🄾🄽🄸🄱🄻🄴🅂:* ⚙️

🌹 *𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎* → #menu
📥 *𝐌𝐄𝐍𝐔 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒* → #menudl
🔍 *𝐌𝐄𝐍𝐔 𝐁𝐔𝐒𝐐𝐔𝐄𝐃𝐀𝐒* → #menuse    
🎮 *𝐌𝐄𝐍𝐔 𝐑𝐏𝐆 + 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀* → #menurpg
👑 *𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑* → #dev
👾 *𝐌𝐄𝐍𝐔 𝐏𝐄𝐑𝐅𝐈𝐋* → #perfildates
🌴 *𝐌𝐄𝐍𝐔 𝐀𝐔𝐃𝐈𝐎𝐒* → #menu2
🏔️ *𝐌𝐄𝐍𝐔 𝐆𝐑𝐔𝐏𝐎𝐒* → #menugp
🌸 *𝐌𝐄𝐍𝐔 𝐋𝐎𝐆𝐎𝐒* → #menulogos

📌 Usa los botones o comandos para acceder.
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: randomImage },
      caption: menuText,
      footer: "🦋 𝑺𝑯𝑨𝑫𝑶𝑾 - 𝑩𝑶𝑻 - 𝑴𝑫",
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🌹 Menu Completo" }, type: 1 },
        { buttonId: `${usedPrefix}menudl`, buttonText: { displayText: "📥 Menu Descargas" }, type: 1 },
        { buttonId: `${usedPrefix}menurpg`, buttonText: { displayText: "🎮 Menu RPG" }, type: 1 },
      ],
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: "SHADOW BOT MD",
          body: "Menú Personalizado",
          thumbnailUrl: randomImage,
          sourceUrl: "https://www.youtube.com/@shadowbot-md", // puedes personalizar este link
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: fkontak });

    await m.react('🌟');
  } catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú:\n${e}`);
    await m.react('❌');
  }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1', 'menulist'];
handler.register = true;

export default handler;