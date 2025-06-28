import axios from "axios"

let handler = async (m, { conn, args }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => global.icon)

  try {

    let match = args?.[0]?.match(/\d+\-\d+@g.us/)
    let id = match ? match[0] : m.chat

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item?.key?.participant)
      .filter((value, index, self) => value && self.indexOf(value) === index)

    const participantesOrdenados = participantesUnicos
      .sort((a, b) => a.split("@")[0].localeCompare(b.split("@")[0]))

    const listaEnLinea =
      participantesOrdenados
        .map((k) => `*●* @${k.split("@")[0]}`)
        .join("\n") || "✧ No hay usuarios en línea en este momento."

    await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: `*❤️ Lista de usuarios en línea:*\n\n${listaEnLinea}`,
        contextInfo: { mentionedJid: participantesOrdenados },
      },
      { quoted: m }
    )

    await m.react("✅")
  } catch (error) {
    await m.reply(`⚠︎ Ocurrió un error: ${error.message}`)
  }
}

handler.help = ["listonline"]
handler.tags = ["owner"]
handler.command = ["listonline", "online", "linea", "enlinea"]
handler.group = true

export default handler