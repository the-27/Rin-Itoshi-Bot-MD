export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command) return;
  if (command === "bot") return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmdList = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmdList.includes(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat?.isBanned) {
      const avisoDesactivado = `《✦》𝑬𝒍 𝑩𝒐𝒕 *${bot}* 𝒆𝒔𝒕𝒂 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒈𝒓𝒖𝒑𝒐.\n\n> ✦ 𝑼𝒏 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓* 𝒑𝒖𝒆𝒅𝒆 𝒂𝒄𝒕𝒊𝒗𝒂𝒓𝒍𝒐 𝒄𝒐𝒏 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐:\n> » *${usedPrefix}bot on*`;
      await m.reply(avisoDesactivado);
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;

  } else {
    const name = global.db.data.users[m.sender]?.name || 'usuario';
    const comando = m.text.trim().split(' ')[0];

    await conn.sendMessage(m.chat, {
      text: `╭══════════════════╮  
║░🌛⬩ *ʜᴏʟᴀ "${name}", ʟᴇ ɪɴғᴏʀᴍᴏ*
║░🍃⬩ *ǫᴜᴇ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ* *"${comando}"* 
║░🌿⬩ *ɴᴏ ᴇxɪsᴛᴇ.*
║░☃️⬩░░░░░░░░░░░░░░░
║░🍄‍🟫⬩ *ᴘᴀʀᴀ ᴠᴇʀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ*
║░🍰⬩ *ᴄᴏᴍᴀɴᴅᴏꜱ ᴜꜱᴀ:*
║░🔥⬩ *#menu*
╰══════════════════╯`,
      footer: '⚡ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝙱𝙾𝚃 𝙼𝙳 🌟',
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: '📜 𝐕𝐄𝐑 𝐌𝐄𝐍𝐔 📜' },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m });
  }
}