import fetch from 'node-fetch';

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌲';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn);
    throw false;
  }

  const pesan = args.length ? args.join(' ') : 'Sin mensaje';
  const mj = `°◦⃝📑 *𝙼𝙴𝙽𝚂𝙰𝙹𝙴:*\n│ ${pesan}`;
  const groupName = await conn.getName(m.chat);

  const teksLines = [
    `╭══〔 🦠 𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 💫 〕══╮`,
    `│ 🥥 𝑀𝐸𝑁𝐶𝐼𝑂𝑁 𝐺𝐸𝑁𝐸𝑅𝐴𝐿 🥞`,
    `│ 🧃 *𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂*: ${participants.length}`,
    `│ 🍁 *𝙶𝚁𝚄𝙿𝙾*: ${groupName}`,
    `├─╰➤ ${mj}`,
  ];

  for (const mem of participants) {
    teksLines.push(`│🥥 ${customEmoji} @${mem.id.split('@')[0]}`);
  }

  teksLines.push(`╰──────────────༓`);
  const teks = teksLines.join('\n');

  const quotedMessage = (typeof fkontak !== 'undefined' && fkontak) ? fkontak : m;

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map(p => p.id),
    contextInfo: {
      mentionedJid: participants.map(p => p.id),
      externalAdReply: {
        title: '✧ 𝐈𝐍𝐕𝐎𝐂𝐀𝐍𝐃𝐎 𝐀 𝐓𝐎𝐃𝐎𝐒ꦿ✧',
        body: '🌴 ʙᴏᴛ ᴅᴇ ᴛʜᴇ_ʙʟᴀᴄᴋ ⚡🐉',
        thumbnailUrl: logo,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: quotedMessage });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar'];
handler.admin = true;
handler.group = true;

export default handler;


/*import fetch from 'node-fetch';

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌲';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn);
    throw false;
  }

  const pesan = args.length ? args.join(' ') : 'Sin mensaje';
  const mj = `°◦⃝📑 *𝙼𝙴𝙽𝚂𝙰𝙹𝙴:*\n│ ${pesan}`;
  const groupName = await conn.getName(m.chat);

  const teksLines = [
    `╭══〔 🦠 𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 💫 〕══╮`,
    `│ 🥥 𝑀𝐸𝑁𝐶𝐼𝑂𝑁 𝐺𝐸𝑁𝐸𝑅𝐴𝐿 🥞`,
    `│ 🧃 *𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂*: ${participants.length}`,
    `│ 🍁 *𝙶𝚁𝚄𝙿𝙾*: ${groupName}`,
    `├─╰➤ ${mj}`,
    `╰═══════⬣`
  ];

  for (const mem of participants) {
    teksLines.push(`│🥥 ${customEmoji} @${mem.id.split('@')[0]}`);
  }

  teksLines.push(`╰──────────────༓`);

  const teks = teksLines.join('\n');

  await conn.sendMessage(m.chat, {
    text: teks + fkontak,
    mentions: participants.map(p => p.id),
    contextInfo: {
      mentionedJid: participants.map(p => p.id),
      externalAdReply: {
        title: '✧ 𝐈𝐍𝐕𝐎𝐂𝐀𝐍𝐃𝐎 𝐀 𝐓𝐎𝐃𝐎𝐒ꦿ✧',
        body: 'ʙᴏᴛ ᴅᴇ ᴛʜᴇ_ʙʟᴀᴄᴋ',
        thumbnailUrl: logo,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar'];
handler.admin = true;
handler.group = true;

export default handler;
*/