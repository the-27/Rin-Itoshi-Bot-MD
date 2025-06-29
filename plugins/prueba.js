import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];
    const name = conn.getName(m.sender);


    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];

    const exp = global.db.data.users[m.sender]?.exp || 0;
    const level = global.db.data.users[m.sender]?.level || 0;
    const role = global.db.data.users[m.sender]?.role || 'Sin rango';

 
    const media = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    const sections = [{
      title: "✦ MENÚS DISPONIBLES ✦",
      rows: [
        { title: "📥 𝙈𝙚𝙣𝙪́ 𝙙𝙚 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨", description: "🎧 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖 𝙘𝙤𝙣𝙩𝙚𝙣𝙞𝙙𝙤 𝙙𝙚 𝙡𝙖𝙨 𝙥𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡𝙚𝙨 𝙧𝙚𝙙𝙚𝙨: 𝙔𝙤𝙪𝙏𝙪𝙗𝙚, 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠, 𝙄𝙜, 𝙚𝙩𝙘.", id: `${usedPrefix}menudl` },
        { title: "🧿 𝑴𝑬𝑵𝑼́ 𝑬𝑪𝑶𝑵𝑶𝑴𝑰́𝑨 + 𝑹𝑷𝑮 ⚔️", description: "🎮 𝘾𝙧𝙚𝙖 𝙩𝙪 𝙖𝙫𝙚𝙣𝙩𝙪𝙧𝙖, 𝙧𝙚𝙘𝙤𝙜𝙚 𝙧𝙚𝙘𝙪𝙧𝙨𝙤𝙨, 𝙜𝙖𝙣𝙖 𝙤𝙧𝙤 𝙮 𝙙𝙤𝙢𝙞𝙣𝙖 𝙚𝙡 𝙢𝙪𝙣𝙙𝙤 𝙍𝙋𝙂 ⚔️", id: `${usedPrefix}menurpg` },
        { title: "🔍 𝐌𝐄𝐍𝐔́ 𝐃𝐄 𝐁𝐔́𝐒𝐐𝐔𝐄𝐃𝐀𝐒 🌐", description: "⟡ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐞𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐞𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢𝐨́𝐧, 𝐚𝐮𝐝𝐢𝐨𝐬, 𝐯𝐢𝐝𝐞𝐨𝐬 𝐲 𝐦𝐮𝐜𝐡𝐨 𝐦𝐚́𝐬 𝐞𝐧 𝐥𝐢́𝐧𝐞𝐚 🌍", id: `${usedPrefix}menuse` },
        { title: "👑 𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹 👑", description: "𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐚𝐯𝐚𝐬𝐚𝐧𝐝𝐨 𝐩𝐚𝐫𝐚 𝐨𝐰𝐞𝐧𝐞𝐫𝐬", id: `${usedPrefix}dev` },
        { title: "🎐 𝑴𝑬𝑵𝑼 𝑨𝑼𝑫𝑰𝑶𝑺🎚️", description: "𝐌𝐞𝐧𝐮 𝐚𝐮𝐝𝐢𝐨𝐬 𝐱𝐝", id: `${usedPrefix}menu2` },
        { title: "👤 𝑴𝑬𝑵𝑼 / 𝑷𝑬𝑹𝑭𝑰𝑳", description: "🚀 𝐄𝐝𝐢𝐭𝐚 𝐭𝐮 𝐩𝐞𝐫𝐟𝐢𝐥 𝐚 𝐭𝐮 𝐠𝐮𝐬𝐭𝐨.", id: `${usedPrefix}perfildatesl` },
        { title: "👥 𝑴𝑬𝑵𝑼 𝑮𝑹𝑼𝑷𝑶𝑺", description: "𝐀𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐜𝐢𝐨𝐧 𝐝𝐞 𝐠𝐫𝐮𝐩𝐨𝐬.", id: `${usedPrefix}menugp` },
        { title: "🔞 𝑴𝑬𝑵𝑼 +18", description: "𝐜𝐨𝐧𝐭𝐞𝐧𝐢𝐝𝐨 𝐍𝐒𝐅𝐖", id: `${usedPrefix}menu18` },
        { title: "❤️ 𝑴𝑬𝑵𝑼 𝑳𝑶𝑮𝑶𝑺", description: "👾 𝑴𝑬𝑵𝑼 𝑳𝑶𝑮𝑶𝑺𝑻𝑰𝑷𝑶𝑺 🎭.", id: `${usedPrefix}menulogos` },
      ]
    }];

    const interactiveMessage = {
      header: {
        title: "🄷🄾🄻🄰",
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      body: {
        text: `｡ﾟ･ 𖥸──-ˋˏ❢ˎˊ-──𖥸 ｡ﾟ･
> ✨ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ✨
> ⚘۪۬👤 *USUARIO* : ${name}
> ⚘۪۬💠 Exp: ${exp}
> ⚘۪۬⭐ Nivel: ${level}
> ⚘۪۬🎖️ Rango: ${role}
> ┗━━━━━━━━━━━━━━━
> ╭━═┅═━──────────◈
> ┋➛  ⚙️ 𝐎𝐏𝐂𝐈𝐎𝐍𝐄𝐒: ⚙️
> ┋
> ┋⁖ฺ۟̇࣪·֗٬̤⃟⚙️ #menugp
> ┋⁖ฺ۟̇࣪·֗٬̤⃟🎨 #menulogos
> ┋⁖ฺ۟̇࣪·֗٬̤⃟💖 #dev
> ┋⁖ฺ۟̇࣪·֗٬̤⃟☃️ #menu18
> ┋⁖ฺ۟̇࣪·֗٬̤⃟💿 #menu2
> ┋⁖ฺ۟̇࣪·֗٬̤⃟🔍 #menusearch
> ┋⁖ฺ۟̇࣪·֗٬̤⃟📤 #menudl
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✨ #menurpg
> ╰━═┅═━──────────◈`
      },
      footer: {
        text: "⏤͟͞ू⃪ 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 - 𝑩𝑶𝑻 • Powered by black"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "ධ⃟🌹 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓 🐉",
              sections
            })
          }
        ],
        messageParamsJson: ""
      }
    };

    const msg = generateWAMessageFromContent(
      m.chat,
      { viewOnceMessage: { message: { interactiveMessage } } },
      { userJid: conn.user.jid, quoted: fkontak }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.reply(`✘ Ocurrió un error al enviar el menú:\n${e}`);
    await m.react('❌');
  }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1', 'menulist'];
handler.register = true;

export default handler;