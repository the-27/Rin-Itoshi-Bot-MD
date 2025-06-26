import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';

let handler = async (m, { conn, command, usedPrefix, args, text, isOwner }) => {
  const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);
  const isCommand3 = /^(bots|sockets|socket)$/i.test(command);

 /* const emoji = '🌿';
  const emoji2 = '🚫';
  const emoji3 = '✅';
  const botname = global.botname || 'Bot';
  const dev = global.author || 'Desarrollador';
  const avatar = 'https://telegra.ph/file/77d36fdfd3e4f5d71eb64.jpg';
  const jadi = 'jadibot';
*/
  async function reportError(e) {
    await m.reply(`${emoji} Ocurrió un error.`);
    console.error(e);
  }

  switch (true) {
  
    case isCommand1: {
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let uniqid = `${who.split`@`[0]}`;
      const ruta = `./${jadi}/${uniqid}`;

      if (!fs.existsSync(ruta)) {
        await conn.sendMessage(m.chat, {
          text: `${emoji} Usted no tiene una sesión.\nCree una con:\n${usedPrefix + command}\n\nO use una *(ID)* existente:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\``
        }, { quoted: m });
        return;
      }

      if (global.conn.user.jid !== conn.user.jid) {
        return conn.sendMessage(m.chat, {
          text: `${emoji2} Use este comando solo en el *Bot principal*.\n\nhttps://wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`
        }, { quoted: m });
      }

      await conn.sendMessage(m.chat, { text: `${emoji} Tu sesión como *Sub-Bot* ha sido eliminada.` }, { quoted: m });

      try {
        await fs.rm(ruta, { recursive: true, force: true });
        await conn.sendMessage(m.chat, { text: `${emoji3} Se cerró sesión y se eliminó la carpeta.` }, { quoted: m });
      } catch (e) {
        reportError(e);
      }
      break;
    }

    case isCommand2: {
      if (global.conn.user.jid == conn.user.jid) {
        await conn.reply(m.chat, `${emoji} Si no es *Sub-Bot* comuníquese con el *Bot principal* para ser agregado.`, m);
      } else {
        await conn.reply(m.chat, `${emoji} ${botname} desactivado.`, m);
        conn.ws.close();
      }
      break;
    }

    case isCommand3: {
      const users = [...new Set(global.conns.filter(conn => conn.user && conn.ws && conn.ws.readyState !== ws.CLOSED))];

      function convertirMsADiasHorasMinutosSegundos(ms) {
        let segundos = Math.floor(ms / 1000);
        let minutos = Math.floor(segundos / 60);
        let horas = Math.floor(minutos / 60);
        let días = Math.floor(horas / 24);
        segundos %= 60;
        minutos %= 60;
        horas %= 24;
        let resultado = "";
        if (días) resultado += `${días} días, `;
        if (horas) resultado += `${horas} horas, `;
        if (minutos) resultado += `${minutos} minutos, `;
        if (segundos) resultado += `${segundos} segundos`;
        return resultado.trim();
      }

      const replyList = users.map((v, i) => `
⬣───[ *SUB - BOT: « #${i + 1} »* ]───⬣
🧃 *Usuario* : ${v.user?.name || '𝐒𝐔𝐁 𝐁𝐎𝐓 ☘︎'}
🔗 *Enlace* : wa.me/${(v.user?.jid || '').replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
🪇 *Online* : ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
╰❍━━━━━━━━━━✦━━━━━━━━━━❍╯
      `).join('\n\n');

      const totalUsers = users.length;
      const replyMessage = totalUsers === 0
        ? `No hay Sub-Bots disponibles en este momento.`
        : `╭═━⬣ 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 ✦ 𝐉𝐀𝐃𝐈𝐁𝐎𝐓 🌹
┃ sᥙᑲᑲ᥆𝗍s ᥲᥴ𝗍і᥎᥆s: *${totalUsers}*
╰═━━━━━━━━━━━━━━━━⬣\n\n${replyList}`.trim();

      await conn.sendMessage(m.chat, {
        text: replyMessage,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: '✧★᭄ꦿ᭄ꦿ𝐒𝐔𝐁𝐁𝐎𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 ★᭄ꦿ᭄ꦿ✧',
            body: dev,
            thumbnailUrl: avatar,
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      break;
    }
  }
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket'];

export default handler;