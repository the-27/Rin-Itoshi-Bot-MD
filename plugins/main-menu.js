let handler = async (m, { conn, usedPrefix }) => {
  try {
    const zona = 'America/Lima';
    const fecha = new Date().toLocaleDateString('es-PE', {
      timeZone: zona,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const hora = new Date().toLocaleTimeString('es-PE', {
      timeZone: zona,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const name = await conn.getName(m.sender);
    const numero = m.sender.replace(/[^0-9]/g, '');

    let img = 'https://files.catbox.moe/rs834j.jpg';
    let menu = `
 ｡ﾟ･ 𖥸──-ˋˏ❢ˎˊ-──𖥸 ｡ﾟ･
> ⚘۪۬『 𝙄𝙉𝙁𝙊 - 𝙐𝙎𝙀𝙍 』
> ⚘۪۬👤 *USUARIO* : ${name}
> ⚘۪۬🔗 *NÚMERO* : wa.me/${numero}
> ⚘۪۬🗓️ *FECHA* : ${fecha}
> ⚘۪۬⏰ *HORA* : ${hora}
> ⚘۪۬📊 *ESTADO* : 🟢 ONLINE
> ╰┉◆┉┉┉┉┉◆✿◆┉┉┉┉┉◆۪
> ╭━═┅═━──────────◈
> ┋➛  ⚙️ 𝐎𝐏𝐂𝐈𝐎𝐍𝐄𝐒: ⚙️
> ┋
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menugp
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menulogos
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #dev
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menu18
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menu2
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menusearch
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menudl
> ┋⁖ฺ۟̇࣪·֗٬̤⃟✦ #menurpg
> ╰━═┅═━──────────◈    
`;

    const buttons = [
      { buttonId: `${usedPrefix}status`, buttonText: { displayText: '📊 ESTADO' }, type: 1 },
      { buttonId: `${usedPrefix}allmenu`, buttonText: { displayText: '🎋 MENU COMPLETO' }, type: 1 },
      { buttonId: `${usedPrefix}verificar black.18`, buttonText: { displayText: '🐦‍🔥 AUTO VERIFICAR' }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: menu.trim(),
      footer: '✦⃟⛧ 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 𝑩𝑶𝑻 𝑴𝑫          🐉 ℙᎾᏇℰℛℰⅅ ℬᎽ Tℋℰ•ℬℒᎯℂᏦ ⚽',
      buttons: buttons,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply(`✘ Ocurrió un error al enviar el menú:\n${e}`);
    await m.react('✖️');
  }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help'];
export default handler;