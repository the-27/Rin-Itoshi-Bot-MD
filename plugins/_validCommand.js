export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const conn = global.conn || {};
  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true;
      }
    }
    return false;
  };

  if (!command || command === "bot") return;

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat.isBanned) {
      const avisoDesactivado = `《✦》𝑬𝒍 𝑩𝒐𝒕 *${bot}* 𝒆𝒔𝒕𝒂 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒈𝒓𝒖𝒑𝒐.\n\n> ✦ 𝑼𝒏 *𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒓* 𝒑𝒖𝒆𝒅𝒆 𝒂𝒄𝒕𝒊𝒗𝒂𝒓𝒍𝒐 𝒄𝒐𝒏 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐:\n> » *${usedPrefix}bot on*`;
      await m.reply(avisoDesactivado);
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;
  } else {
    const comando = m.text.trim().split(' ')[0];
    await conn.sendMessage(m.chat, {
      text: `*${emoji} El comando ↷*\n⇉🍃《 *${comando}* 》\n↬🍄‍🟫 *No existe.*\n⌦ 🔥 *Para ver la lista de comandos usa:*\n> 🍰 *#𝗺𝗲𝗻𝘂*`,
      footer: '⚡ 𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸 𝙱𝙾𝚃 𝙼𝙳 🌟',
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: '📜 𝐌𝐄𝐍𝐔 📜' },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m });
  }
}