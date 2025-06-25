/*import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import pathModule, { join } from 'path' 
import ws from 'ws';

let handler = async (m, { conn, command, usedPrefix, args, text, isOwner }) => {
  let imagenurl = 'https://files.catbox.moe/1ips7f.jpg'
  const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
  const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
  const isCommand3 = /^(bots|sockets|socket)$/i.test(command)  


  async function reportError(e) {
    await m.reply(`🐁 ¡ups! ocurrió un error inesperado.`)
    console.log(e)
  }

  switch (true) {
    case isCommand1:
      try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let uniqid = `${who.split`@`[0]}`
        const sessionPath = `./${jadi}/${uniqid}`

        if (!fs.existsSync(sessionPath)) {
          await conn.sendMessage(m.chat, { 
            text: `🔥 No se detectó ninguna sesión activa 🔍\n\nUsa: *${usedPrefix + command}*\nO con ID:\n*${usedPrefix + command} (ID)*` 
          }, { quoted: m })
          return
        }

        if (global.conn.user.jid !== conn.user.jid) {
          return conn.sendMessage(m.chat, {
            text: `⭐ Este comando solo se puede usar desde el bot *principal* 🦠\n\nLink: https://wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`
          }, { quoted: m }) 
        } else {
          await conn.sendMessage(m.chat, { 
            text: `¡sub-bot desconectado exitosamente! 💤` 
          }, { quoted: m })
        }

        await fs.rm(sessionPath, { recursive: true, force: true })
        await conn.sendMessage(m.chat, { text : `🗑️ Sesión eliminada correctamente.` }, { quoted: m })
      } catch (e) {
        reportError(e)
      }
      break

    case isCommand2:
      if (global.conn.user.jid == conn.user.jid) {
        conn.reply(m.chat, `💥 Este comando solo puede usarlo un *sub-bot*`, m)
      } else {
        await conn.reply(m.chat, `🐉 rin itoshi se ha *desactivado temporalmente* ⚠️`, m)
        conn.ws.close()
      }  
      break

    case isCommand3:
      try {
        const users = [...new Set([...global.conns.filter((c) => c.user && c.ws?.socket?.readyState !== ws.CLOSED)])];

        function convertirMsADiasHorasMinutosSegundos(ms) {
          var segundos = Math.floor(ms / 1000);
          var minutos = Math.floor(segundos / 60);
          var horas = Math.floor(minutos / 60);
          var días = Math.floor(horas / 24);
          segundos %= 60;
          minutos %= 60;
          horas %= 24;
          var resultado = "";
          if (días !== 0) resultado += días + "D ";
          if (horas !== 0) resultado += horas + "H ";
          if (minutos !== 0) resultado += minutos + "M ";
          if (segundos !== 0) resultado += segundos + "S";
          return resultado.trim();
        }

        const message = users.map((v, i) => 
` 
⬣───[ *SUB - BOT: « #${i + 1} »* ]───⬣
⁖ฺ۟̇࣪·֗٬̤⃟🧃 usuario : ${v.user.name || '𝐒𝐔𝐁 𝐁𝐎𝐓 ☘︎'}
⁖ฺ۟̇࣪·֗٬̤⃟🔗 Enlace : wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
⁖ฺ۟̇࣪·֗٬̤⃟🪇 online : ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
╰❍━━━━━━━✦୨୧✦━━━━━━━❍╯`).join('\n\n');

        const responseMessage = `╭═━⬣ ⚡ 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 𝐉𝐀𝐃𝐈𝐁𝐎𝐓 🌹
┃ 🌴 sᴜʙʙᴏᴛs ᴀᴄᴛɪᴠᴏs: *${users.length}*
╰═━━━━━━━━━━━━━━━━⬣\n\n${message || '⚽ No hay sub-bots conectados actualmente.'}`.trim();

        await conn.sendMessage(m.chat, {
          text: responseMessage,
          contextInfo: {
            externalAdReply: {
              title: '⚡ 𝐒𝐔𝐁-𝐁𝐎𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 🔥',
              body: '🦠 𝐑𝐈𝐍•- ⃝𝐈𝐓𝐎𝐒𝐇𝐈 𝐁𝐎𝐓 𝐌𝐃𝄟 ⚡',
              mediaUrl: imagenurl,
              mediaType: 1,
              renderLargerThumbnail: true,
              thumbnailUrl: imagenurl
            },
            mentionedJid: conn.parseMention(responseMessage)
          }
        }, { quoted: fkontak })
      break
  }
}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler


*/

import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import pathModule, { join } from 'path' 
import ws from 'ws';

let handler = async (m, { conn, command, usedPrefix, args, text, isOwner }) => {
  let imagenurl = 'https://files.catbox.moe/1ips7f.jpg'
  const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
  const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
  const isCommand3 = /^(bots|sockets|socket)$/i.test(command)  

  async function reportError(e) {
    await m.reply(`🐁 ¡ups! ocurrió un error inesperado.`)
    console.log(e)
  }

  switch (true) {
    case isCommand1:
      try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let uniqid = `${who.split`@`[0]}`
        const sessionPath = `./${jadi}/${uniqid}`

        if (!fs.existsSync(sessionPath)) {
          await conn.sendMessage(m.chat, { 
            text: `🔥 No se detectó ninguna sesión activa 🔍\n\nUsa: *${usedPrefix + command}*\nO con ID:\n*${usedPrefix + command} (ID)*` 
          }, { quoted: m })
          return
        }

        if (global.conn.user.jid !== conn.user.jid) {
          return conn.sendMessage(m.chat, {
            text: `⭐ Este comando solo se puede usar desde el bot *principal* 🦠\n\nLink: https://wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`
          }, { quoted: m }) 
        } else {
          await conn.sendMessage(m.chat, { 
            text: `¡sub-bot desconectado exitosamente! 💤` 
          }, { quoted: m })
        }

        await fs.rm(sessionPath, { recursive: true, force: true })
        await conn.sendMessage(m.chat, { text : `🗑️ Sesión eliminada correctamente.` }, { quoted: m })
      } catch (e) {
        reportError(e)
      }
      break

    case isCommand2:
      if (global.conn.user.jid == conn.user.jid) {
        conn.reply(m.chat, `💥 Este comando solo puede usarlo un *sub-bot*`, m)
      } else {
        await conn.reply(m.chat, `🐉 rin itoshi se ha *desactivado temporalmente* ⚠️`, m)
        conn.ws.close()
      }  
      break

    case isCommand3:
      try {
        const users = [...new Set([...global.conns.filter((c) => c.user && c.ws?.socket?.readyState !== ws.CLOSED)])];

        function convertirMsADiasHorasMinutosSegundos(ms) {
          var segundos = Math.floor(ms / 1000);
          var minutos = Math.floor(segundos / 60);
          var horas = Math.floor(minutos / 60);
          var días = Math.floor(horas / 24);
          segundos %= 60;
          minutos %= 60;
          horas %= 24;
          var resultado = "";
          if (días !== 0) resultado += días + "D ";
          if (horas !== 0) resultado += horas + "H ";
          if (minutos !== 0) resultado += minutos + "M ";
          if (segundos !== 0) resultado += segundos + "S";
          return resultado.trim();
        }

        const message = users.map((v, i) => 
` 
⬣───[ *SUB - BOT: « #${i + 1} »* ]───⬣
⁖ฺ۟̇࣪·֗٬̤⃟🧃 usuario : ${v.user.name || '𝐒𝐔𝐁 𝐁𝐎𝐓 ☘︎'}
⁖ฺ۟̇࣪·֗٬̤⃟🔗 Enlace : wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
⁖ฺ۟̇࣪·֗٬̤⃟🪇 online : ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
╰❍━━━━━━━✦୨୧✦━━━━━━━❍╯`).join('\n\n');

        const responseMessage = `╭═━⬣ ⚡ 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 𝐉𝐀𝐃𝐈𝐁𝐎𝐓 🌹
┃ 🌴 sᴜʙʙᴏᴛs ᴀᴄᴛɪᴠᴏs: *${users.length}*
╰═━━━━━━━━━━━━━━━━⬣\n\n${message || '⚽ No hay sub-bots conectados actualmente.'}`.trim();

        await conn.sendMessage(m.chat, {
          text: responseMessage,
          contextInfo: {
            externalAdReply: {
              title: '⚡ 𝐒𝐔𝐁-𝐁𝐎𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 🔥',
              body: '🦠 𝐑𝐈𝐍•- ⃝𝐈𝐓𝐎𝐒𝐇𝐈 𝐁𝐎𝐓 𝐌𝐃𝄟 ⚡',
              mediaUrl: imagenurl,
              mediaType: 1,
              renderLargerThumbnail: true,
              thumbnailUrl: imagenurl
            },
            mentionedJid: conn.parseMention(responseMessage)
          }
        }, { quoted: fkontak })
      } catch (e) {
        reportError(e)
      }
      break
  }
}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler