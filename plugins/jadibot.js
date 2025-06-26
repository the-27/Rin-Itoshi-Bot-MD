import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';
import fetch from 'node-fetch';

// VARIABLES
let emoji = '🌹', emoji2 = '🤖', emoji3 = '✅', botname = 'Bot'
let imagenurl = 'https://files.catbox.moe/1ips7f.jpg'
let msm = '❌ Error:'
//let jadi = 'jadibot'


let cachedThumbnail = null
fetch(imagenurl)
  .then(res => res.buffer())
  .then(buffer => cachedThumbnail = buffer)
  .catch(err => console.error('[❌ ERROR AL DESCARGAR IMAGEN]:', err))

let handler = async (m, { conn, command, usedPrefix, args, text, isOwner }) => {
  const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)
  const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)
  const isCommand3 = /^(bots|sockets|socket)$/i.test(command)

  function reportError(e) {
    m.reply(`${msm} Ocurrió un error.`)
    console.log(e)
  }

  switch (true) {
    case isCommand1:
      let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
      let uniqid = `${who.split`@`[0]}`
      let userPath = `./${jadi}/${uniqid}`

      if (!fs.existsSync(userPath)) {
        return conn.sendMessage(m.chat, { text: `${emoji} Usted no tiene una sesión...` }, { quoted: m })
      }

      if (global.conn.user.jid !== conn.user.jid) {
        return conn.sendMessage(m.chat, {
          text: `${emoji2} Use este comando al *Bot* principal.\n\nhttps://wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`
        }, { quoted: m })
      }

      await conn.sendMessage(m.chat, { text: `${emoji} Tu sesión como *Sub-Bot* se ha eliminado` }, { quoted: m })

      try {
        await fs.rmdir(userPath, { recursive: true, force: true })
        await conn.sendMessage(m.chat, { text: `${emoji3} Ha cerrado sesión y borrado todo rastro.` }, { quoted: m })
      } catch (e) {
        reportError(e)
      }
      break

    case isCommand2:
      if (global.conn.user.jid === conn.user.jid) {
        conn.reply(m.chat, `${emoji} Si no es *Sub-Bot*...`, m)
      } else {
        await conn.reply(m.chat, `${emoji} ${botname} desactivada.`, m)
        conn.ws.close()
      }
      break

    case isCommand3:
      const users = [...new Set(global.conns.filter(c => c.user && c.ws?.socket?.readyState !== ws.CLOSED))]
      const formatUptime = ms => {
        let d = Math.floor(ms / (24 * 60 * 60 * 1000))
        let h = Math.floor(ms / (60 * 60 * 1000)) % 24
        let m_ = Math.floor(ms / (60 * 1000)) % 60
        let s = Math.floor(ms / 1000) % 60
        return `${d}D ${h}H ${m_}M ${s}S`
      }

      let listado = users.map((v, i) => `
⬣───[ *SUB - BOT: « #${i + 1} »* ]───⬣
🧃 *usuario* : ${v.user?.name || '𝐒𝐔𝐁 𝐁𝐎𝐓 ☘︎'}
🔗 *Enlace* : wa.me/${(v.user?.jid || '').replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
🪇 *online* : ${v.uptime ? formatUptime(Date.now() - v.uptime) : 'Desconocido'}
╰❍━━━━━━━━━━✦━━━━━━━━━━❍╯`).join('\n\n')

      let responseMessage = `╭═━⬣ ⚡ 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 ✦ 𝐉𝐀𝐃𝐈𝐁𝐎𝐓 🌹
┃ ⭐ sᥙᑲᑲ᥆𝗍s ᥲᥴ𝗍і᥎᥆s: *${users.length}*
╰═━━━━━━━━━━━━━━━━⬣

${listado || '🐉 No hay sub-bots conectados actualmente.'}`

      await conn.sendMessage(m.chat, {
        text: responseMessage,
        contextInfo: {
          mentionedJid: conn.parseMention(responseMessage),
          externalAdReply: {
            title: '⚡ 𝐒𝐔𝐁-𝐁𝐎𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒 🔥',
            body: '🦠 𝐑𝐈𝐍•- ⃝𝐈𝐓𝐎𝐒𝐇𝐈 𝐁𝐎𝐓 𝐌𝐃𝄟 ⚡',
            mediaUrl: imagenurl,
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: cachedThumbnail,
            sourceUrl: imagenurl
          }
        }
      }, { quoted: m })
      break
  }
}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler