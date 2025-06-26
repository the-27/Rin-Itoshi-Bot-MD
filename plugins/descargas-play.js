 import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, `*🌹 Por favor, ingresa el nombre o link de la música a descargar.*`, m, fake)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = await yts(videoIdMatch ? `https://youtu.be/${videoIdMatch[1]}` : text)

    let ytVideo = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1])
      : search.videos[0]

    if (!ytVideo) return m.reply('✧ No se encontraron resultados para tu búsqueda.')

    let { title, thumbnail, timestamp, views, ago, url, author } = ytVideo
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'
    const infoMessage = `╭─⬣「⚡  *𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 ☃️*  ⭐」⬣
│ ≡🌴 *Título:* ${title}
│ ≡🥥 *Canal:* ${canal}
│ ≡🐉 *Vistas:* ${vistas}
│ ≡🌲 *Duración:* ${timestamp}
│ ≡🥞 *Publicado:* ${ago}
│ ≡🦠 *Link:* ${url}
╰──⬣
*🐾 ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ ᴍᴅ あ*`

    const thumb = (await conn.getFile(thumbnail))?.data
    const externalInfo = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: canal,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, externalInfo)

    if (command === 'play' || command === 'ytmp3' || command === 'playaudio') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const result = api?.data?.dl
        if (!result) throw '⚠ El enlace de audio no se generó correctamente.'
        await conn.sendMessage(m.chat, {
          audio: { url: result },
          fileName: `${api.data.title || 'audio'}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. Puede que el archivo sea muy pesado o hubo un error al generar el enlace.', m)
      }

    } else if (command === 'play2' || command === 'ytmp4' || command === 'mp4') {
      try {
        const res = await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`)
        const json = await res.json()
        await conn.sendFile(m.chat, json.data.dl, `${json.data.title}.mp4`, title, m)
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el video. Puede que el archivo sea muy pesado o hubo un error en el enlace.', m)
      }

    } else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m)
    }

  } catch (err) {
    console.error(err)
    return m.reply(`⚠︎ Ocurrió un error:\n${err}`)
  }
}

handler.command = handler.help = ['play', 'ytmp3', 'play2', 'ytmp4', 'playaudio', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (!views) return 'No disponible'
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`
  return views.toString()
}