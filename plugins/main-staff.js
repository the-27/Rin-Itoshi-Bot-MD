let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `  ︵ٜ⊹۬︵߭ꥈ‌⏜ׄ︵‌୨ ꥇ⭐߭ ୧‌︵۬߭⏜ꥇ‌︵⊹︵
    ꥇ𝐄ٜ۬߭𝐐ׄꥇ‌𝐔ᨘ࣪𝐈ꥈ𝐏࣭߭𝐎..𝐃𝐄..𝐀𝐘𝐔𝐃𝐀𝐍𝐓𝐄𝐒.il
  ⏝۬‌ꥇ︶ꥇ⊹۬︶‌⏝۬︶ᨘ⊹߭︶ׅꥇ⏝߭︶۬⊹ꥈ︶⏝
          .⬪  ࣪   🏜️(*ℝ𝕀ℕ 𝕀𝕋𝕆𝕊ℍ𝕀 𝕄𝔻*) 

╭──────────────╮
✰ *Dueño:* ${creador}
✦ *Bot:* ${botname}
⚘ *Versión:* ${vs}
❖ *Libreria:* ${libreria} ${baileys}
╰──────────────╯

❍ *Creador:*
╭━✧━─━─━═◇═━─━─━✦━╮
│┏ᰔᩚ 𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉
│┣🜸 *Rol:* *Creador*
│┣⍰ *Numero:* wa.me/qr/5B6AGA5YNOUZI1
│┗✧ *GitHub:* https://github.com/the-27
╰━✧━─━─━═◇═━─━─━✦━╯

❒ *Colaboradores:*

no ay
`
await conn.sendFile(m.chat, img, 'staff.jpg', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
