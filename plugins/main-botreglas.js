let handler = async (m, { conn, usedPrefix, command }) => {
  // Asegúrate de definir estas variables correctamente o importar desde donde las tengas
  const rcanal = {
    externalAdReply: {
      title: 'Canal oficial del bot',
      body: 'Únete para más actualizaciones',
      thumbnailUrl: 'https://telegra.ph/file/1a2b3c4d5e.jpg',
      mediaType: 1,
      mediaUrl: 'https://t.me/CanalOficialBot', 
      sourceUrl: 'https://t.me/CanalOficialBot',
    },
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: 'Canal oficial del bot',
        body: 'Únete para más actualizaciones',
        previewType: 'PHOTO',
        thumbnailUrl: logo,
        sourceUrl: 'https://t.me/CanalOficialBot',
      }
    }
  };

  let black = `
┏━━━━━━━━━━━━━━━━━━━⬣
┃ ⚽ 𝗥𝗘𝗦𝗣𝗘𝗧𝗔 𝗟𝗔𝗦 𝗥𝗘𝗚𝗟𝗔𝗦 🍬
┗━━━━━━━━━━━━━━━━━━━⬣
> ╭─⋄
> │• 𝔑𝔬 𝔩𝔩𝔞𝔪𝔞𝔯 𝔞𝔩 𝔟𝔬𝔱.
> │• 𝔑𝔬 𝔥𝔞𝔠𝔢𝔯𝔩𝔢 𝔰𝔭𝔞𝔪 𝔞𝔩 𝔟𝔬𝔱.
> │• 𝔓𝔢𝔯𝔡𝔦𝔯 𝔭𝔢𝔯𝔪𝔦𝔰𝔬 𝔭𝔞𝔯𝔞 𝔞ñ𝔞𝔡𝔦𝔯 𝔢𝔩 𝔟𝔬𝔱 𝔞 𝔲𝔫 𝔤𝔯𝔲𝔭𝔬.
> │• ℭ𝔬𝔫𝔱𝔞𝔠𝔱𝔞 𝔞𝔩 𝔠𝔯𝔢𝔞𝔡𝔬𝔯 𝔰𝔦 𝔢𝔰 𝔫𝔢𝔠𝔢𝔰𝔞𝔯𝔦𝔬.
> │• 𝔘𝔰𝔞 𝔢𝔩 𝔟𝔬𝔱 𝔡𝔢 𝔣𝔬𝔯𝔪𝔞 𝔞𝔭𝔯𝔬𝔭𝔦𝔞𝔡𝔞.
> ╰─⋄

━━━━━━━━━━━━━━━━━━━━
│📚  \`N O T A\`
╰─◇◈◇◈◇◈◇◈◇◈⋄
\`\`\`Si rompe alguna de las reglas del bot, puede ser baneado y bloqueado del bot.\`\`\`
━━━━━━━━━━━━━━━━━━━━
│⚽  \`I N F O\`
╰─◇◈◇◈◇◈◇◈◇◈⋄
\`\`\`Si te gusta el bot, tambien puedes ir al repositorio y dejar una 🌟.\`\`\`
━━━━━━━━━━━━━━━━━━━━

> ${md}
> ${textbot}
`.trim();

  await conn.sendFile(m.chat, catalogo, 'isagi.mp4', black, fkontak, rcanal);
};

handler.help = ['botreglas'];
handler.tags = ['main'];
handler.command = ['botreglas', 'reglasdelbot', 'reglasbot', 'reglas'];
handler.register = true;
handler.coin = 4;

export default handler;