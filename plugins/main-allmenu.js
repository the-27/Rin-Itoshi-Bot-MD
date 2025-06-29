let handler = async (m, { conn, args }) => {  
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender  
    let userData = global.db.data.users[userId] || {};  
    let exp = userData.exp || 0;  
    let coin = userData.coin || 0;  
    let level = userData.level || 0;  
    let role = userData.role || 'Sin Rango';  
      
    let name = await conn.getName(userId);  
    let _uptime = process.uptime() * 1000;  
    let uptime = clockString(_uptime);  
    let totalreg = Object.keys(global.db.data.users).length;  
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;  
      
    let med = '⁖ฺ۟̇࣪·֗٬̤⃟✦';  
    let imgUrl = 'https://files.catbox.moe/y5b41f.jpg';  
    
    let txt = `⚡ 𝒉𝒐𝒍𝒂 @${userId.split('@')[0]}, 𝒃𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝒂𝒍 𝒎𝒆𝒏𝒖 𝒅𝒆 ${bot}¡ 
     
╭═〔 🌹 𝙄𝙉𝙁𝙊 - 𝘽𝙊𝙏 🌴 〕═╮  
┃- 🍡 *ᴍᴏᴅᴏ*: 𝙿𝚁𝙸𝚅𝙰𝙳𝙾  
┃- 🥧 *ᴛɪᴘᴏ ʙᴏᴛ*: ${(conn.user.jid == global.conn.user.jid ? '`ᴏғɪᴄɪᴀʟ 🅞`' : '`sᴜʙ - ʙᴏᴛ 🅢`')}  
┃- 🔩 *ʙᴀɪʟᴇʏs:* Multi Device  
┃- 🍟 *ᴜsᴜᴀʀɪᴏs ʀᴇɢɪsᴛʀᴀᴅᴏs*: ${totalreg}  
┃- 🪀 *ᴄᴏᴍᴀɴᴅᴏs ᴄᴀʀɢᴀᴅᴏs*: ${totalCommands}  
┃- ⏱ *ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ*: ${uptime}  
┃- 🧃 *ᴏᴡɴᴇʀ*: ↡↡↡↯↯  
┃-﹙wa.me/qr/5B6AGA5YNOUZI1  
╰════════════════════╯  
    
╭═〔 🦠 𝑰𝒏𝒇𝒐 - 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 💫 〕═╮  
┃- 👤 *ᴄʟɪɴᴛᴇ:* ${name}  
┃- ⚡ *ᴇxᴘᴇʀɪᴇɴᴄɪᴀ:* ${exp}  
┃- 📊 *ɴɪᴠᴇʟ:* ${level}  
┃- 🧮 *ᴄᴏɪɴs:* ${coin}  
┃- 🧬 *ʀᴀɴɢᴏ:* ${role}  
╰════════════════════╯
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎

ꪶ𝆺𝆭𝆹𝅥ᜓ᮫߭݊🌹 ʟɪsᴛa ᴅe ᴄᴏᴍaɴᴅos 🍃݊߭𝆺𝅥𝆹𝆭ꫂ
─҉͙͙͙͙͙͙͙͙͙͙͛-♡--^┄┅┉┅┄⧫◊┄┄┉┅┄^--♡-──҉͙͙͙͙͙͙͙͙͙͙͛
*✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧*
> ᥴrᥱᥲ ᥙᥒ *sᥙᑲ-ᑲ᥆𝗍* ᥴ᥆ᥒ 𝗍ᥙ ᥒúmᥱr᥆ ᥙ𝗍іᥣіzᥲᥒძ᥆ *#qr* o *#code*
ׅׄ︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ׄ.ׅ︶ٜٜׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ٜׄׄ߭⏝ׅׄ.︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭

╭──⬣
│┏───┈ 
│┆ 🏔️ 𝙄𝙉𝙁𝙊❕
│└───────────────┈
│ ${med} .menu
│ ${med} .uptime
│ ${med} .script
│ ${med} .staff
│ ${med} .creador
│ ${med} .grupos
│ ${med} .estado
│ ${med} .infobot
│ ${med} .sug
│ ${med} .ping
│ ${med} .reportar *<text>*
│ ${med} .reglas
│ ${med} .speed
│ ${med} .sistema
│ ${med} .usuarios
│ ${med} .ds
│ ${med} .funciones
│ ${med} .editautoresponder
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🌹 𝙈𝙀𝙉𝙐𝙎 - 𝘽𝙊𝙏 📋
│└───────────────┈ 
│ ${med} .dev - *Menu owner*
│ ${med} .menuse - *Menu search*
│ ${med} .menudl - *Menu descargas*
│ ${med} .menulogos - *logos*
│ ${med} .menu18 - *Menu hot*
│ ${med} .menugp - *Menu grupo*
│ ${med} .menu2 - *Menu audios*
│ ${med} .menurpg - *Menu economia*
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🔎 𝙎𝙀𝘼𝙍𝘾𝙃 🔍
│└───────────────┈
│ ${med} .animeinfo
│ ${med} .animesearch
│ ${med} .cuevana
│ ${med} .githubsearch
│ ${med} .searchhentai
│ ${med} .google *<búsqueda>*
│ ${med} .imagen *<query>*
│ ${med} .infoanime
│ ${med} .githubstalk *<query>*
│ ${med} .soundcloudsearch *<txt>*
│ ${med} .pinterest
│ ${med} .pornhubsearch
│ ${med} .spotifysearch *<texto>*
│ ${med} .ytsearch2 *<text>*
│ ${med} .npmjs
│ ${med} .gnula
│ ${med} .apksearch
│ ${med} .wikis
│ ${med} .tiktoksearch *<txt>*
│ ${med} .tweetposts
│ ${med} .xnxxs
│ ${med} .xvsearch
│ ${med} .yts
│ ${med} .fdroidsearch <término>
│ ${med} .happymodsearch *<búsqueda>*
│ ${med} .cinecalidadsearch *<búsqueda>*
│ ${med} .yahoosearch *<búsqueda>*
│ ${med} .movie <término>
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ ⚙️ 𝙎𝙐𝘽 - 𝘽𝙊𝙏𝙎 🤖
│└───────────────┈
│ ${med} .qr
│ ${med} .code
│ ${med} .token
│ ${med} .sockets
│ ${med} .deletesesion
│ ${med} .pausarai
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🎉 𝙁 𝙐 𝙉 🎊
│└───────────────┈
│ ${med} .gay <@tag> | <nombre> 
│ ${med} .lesbiana <@tag> | <nombre> 
│ ${med} .pajero <@tag> | <nombre> 
│ ${med} .pajera <@tag> | <nombre> 
│ ${med} .puto <@tag> | <nombre> 
│ ${med} .puta <@tag> | <nombre> 
│ ${med} .manco <@tag> | <nombre> 
│ ${med} .manca <@tag> | <nombre> 
│ ${med} .rata <@tag> | <nombre>
│ ${med} .prostituta <@tag> | <nombre> 
│ ${med} .amigorandom
│ ${med} .jalamela
│ ${med} .simi
│ ${med} .chiste
│ ${med} .consejo
│ ${med} .doxear *<mension>*
│ ${med} .facto
│ ${med} .reto
│ ${med} .verdad
│ ${med} .prostituto *<@tag> | <nombre>*
│ ${med} .formarpareja
│ ${med} .formarpareja5
│ ${med} .frase
│ ${med} .huevo *@user*
│ ${med} .chupalo *<mencion>*
│ ${med} .aplauso *<mencion>*
│ ${med} .marron *<mencion>*
│ ${med} .suicidar
│ ${med} .iqtest <mencion>*
│ ${med} .meme
│ ${med} .morse
│ ${med} .nombreninja *<texto>*
│ ${med} .paja
│ ${med} .personalidad *<mencion>*
│ ${med} .pregunta 
│ ${med} .piropo 
│ ${med} .zodiac *2002 02 25*
│ ${med} .ship 
│ ${med} .sorte 
│ ${med} .top *[texto]*
│ ${med} .formartrio *<mencion>*
│ ${med} .tt 
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🎮 𝙂𝘼𝙈𝙀 🕹️
│└───────────────┈
│ ${med} .ahorcado
│ ${med} .delxo
│ ${med} .genio *<pregunta>*
│ ${med} .math *<mode>*
│ ${med} .ppt 
│ ${med} .pvp
│ ${med} .sopa
│ ${med} .acertijo
│ ${med} .ttt
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🧧 𝘼𝙉𝙄𝙈𝙀 🎐
│└───────────────┈
│ ${med} .angry/enojado @tag
│ ${med} .bath/bañarse @tag
│ ${med} .bite/morder @tag
│ ${med} .bleh/lengua @tag
│ ${med} .blush/sonrojarse @tag
│ ${med} .bored/aburrido @tag
│ ${med} .nights/noches
│ ${med} .dias/days
│ ${med} .coffe/cafe @tag
│ ${med} .cry/llorar @tag
│ ${med} .cuddle/acurrucarse @tag
│ ${med} .dance/bailar @tag
│ ${med} .drunk/borracho @tag
│ ${med} .eat/comer @tag
│ ${med} .messi
│ ${med} .cr7
│ ${med} .facepalm/palmada @tag
│ ${med} .happy/feliz @tag
│ ${med} .hello/hola @tag
│ ${med} .hug/abrazar @tag
│ ${med} .kill/matar @tag
│ ${med} .kiss2/besar2 @tag
│ ${med} .kiss/besar @tag
│ ${med} .laugh/reirse @tag
│ ${med} .lick/lamer @tag
│ ${med} .love2/enamorada @tag
│ ${med} .patt/acariciar @tag
│ ${med} .poke/picar @tag
│ ${med} .pout/pucheros @tag
│ ${med} .ppcouple
│ ${med} .preg/embarazar @tag
│ ${med} .punch/golpear @tag
│ ${med} .run/correr @tag
│ ${med} .sad/triste @tag
│ ${med} .scared/asustada @tag
│ ${med} .seduce/seducir @tag
│ ${med} .shy/timida @tag
│ ${med} .slap/bofetada @tag
│ ${med} .sleep/dormir @tag
│ ${med} .smoke/fumar @tag
│ ${med} .think/pensando @tag
│ ${med} .undress/encuerar @tag
│ ${med} .waifu
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🎑 𝙋𝙀𝙍𝙁𝙄𝙇 🎟️
│└───────────────
│ ${med} .reg
│ ${med} .unreg
│ ${med} .profile
│ ${med} .marry *[mension / etiquetar]*
│ ${med} .divorce
│ ${med} .setgenre *<text>*
│ ${med} .delgenre
│ ${med} .setbirth *<text>*
│ ${med} .delbirth
│ ${med} .setdesc *<text>*
│ ${med} .deldesc
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 📥 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 📤
│└───────────────┈
│ ${med} .animedl
│ ${med} .fb
│ ${med} .sound
│ ${med} .gitclone *<url git>*
│ ${med} .gdrive
│ ${med} .ig
│ ${med} .mediafire *<url>*
│ ${med} .mega
│ ${med} .apk *<nombre>*
│ ${med} .pinvid *<link>*
│ ${med} .apk2 *<busqueda>*
│ ${med} .npmdl
│ ${med} .tt2
│ ${med} .kwaidl
│ ${med} .likee *<url>*
│ ${med} .aplay2 • applemusic2
│ ${med} .capcut *<url>*
│ ${med} .play
│ ${med} .play2
│ ${med} .ytmp3doc
│ ${med} .ytmp4doc
│ ${med} .yta
│ ${med} .ytv
│ ${med} .mp3
│ ${med} .tiktokrandom
│ ${med} .spotify
│ ${med} .tiktokhd
│ ${med} .tiktoktrends
│ ${med} .snapchat *<link>*
│ ${med} .terabox
│ ${med} .tiktok *<url>*
│ ${med} .tiktokmp3 *<url>*
│ ${med} .tiktokimg <url>
│ ${med} .twitter <url>
│ ${med} .xvideosdl
│ ${med} .xnxxdl
│ ${med} .pindl
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 👻 𝙎𝙏𝘼𝙇𝙆 🌴
│└───────────────┈
│ ${med} .tiktokstalk *<usuario>*
│ ${med} .kwaistalk *<usuario>*
│ ${med} .telegramstalk *<nombre_usuario>*
│ ${med} .youtubestalk *<nombre de usuario>*
│ ${med} .instagramstalk *<usuario>*
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 👑 𝙋𝙍𝙀𝙈𝙄𝙐𝙈 🦠
│└───────────────┈
│ ${med} .comprarpremium
│ ${med} .premium
│ ${med} .vip
│ ${med} .spamwa <number>|<mesage>|<no of messages>
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🌐 𝙍𝙋𝙂 🥇
│└───────────────┈
│ ${med} .aventura
│ ${med} .baltop
│ ${med} .bank / bal
│ ${med} .cazar 
│ ${med} .codigo *<cantida de coins>*
│ ${med} .canjear *<código>*
│ ${med} .cartera
│ ${med} .apostar *<cantidad>*
│ ${med} .cf
│ ${med} .cofre
│ ${med} .crimen
│ ${med} .daily
│ ${med} .depositar 
│ ${med} .explorar
│ ${med} .gremio
│ ${med} .regalo
│ ${med} .halloween
│ ${med} .heal
│ ${med} .inventario 
│ ${med} .mensual
│ ${med} .mazmorra
│ ${med} .minar
│ ${med} .navidad
│ ${med} .retirar
│ ${med} .robar
│ ${med} .robarxp
│ ${med} .ruleta *<cantidad> <color>*
│ ${med} .buyall
│ ${med} .buy
│ ${med} .protituirse
│ ${med} .work
│ ${med} .pay / transfer 
│ ${med} .semanal
│ ${med} .levelup
│ ${med} .lvl @user
│ ${med} .slot *<apuesta>*
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🌸 𝙂𝘼𝘾𝙃𝘼 🌲
│└───────────────┈
│ ${med} .rw
│ ${med} .reclamar 
│ ${med} .harem
│ ${med} .waifuimage
│ ${med} .charinfo
│ ${med} .topwaifus *[pagina]*
│ ${med} .regalar *<nombre del personaje> @usuario*
│ ${med} .vote *<personaje>*
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🌿 𝙎𝙏𝙄𝘾𝙆𝙀𝙍𝙎 🍓
│└───────────────┈
│ ${med} .sticker *<img>*
│ ${med} .sticker *<url>*
│ ${med} .setmeta
│ ${med} .delmeta
│ ${med} .bratvid *<texto>*
│ ${med} .pfp *@user*
│ ${med} .qc
│ ${med} .toimg *(reply)*
│ ${med} .brat
│ ${med} .bratvid *<texto>*
│ ${med} .emojimix  *<emoji+emoji>*
│ ${med} .wm *<packname>|<author>*
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🔧 𝙏𝙊𝙊𝙇𝙎 🛠️
│└───────────────┈
│ ${med} .letra *<texto>*
│ ${med} .fake
│ ${med} .hd
│ ${med} .detectar
│ ${med} .clima *<ciudad/país>*
│ ${med} .join
│ ${med} .nuevafotochannel
│ ${med} .nosilenciarcanal
│ ${med} .silenciarcanal
│ ${med} .noseguircanal
│ ${med} .seguircanal 
│ ${med} .avisoschannel 
│ ${med} .resiviravisos 
│ ${med} .inspect 
│ ${med} .inspeccionar 
│ ${med} .eliminarfotochannel 
│ ${med} .reactioneschannel 
│ ${med} .reaccioneschannel 
│ ${med} .nuevonombrecanal 
│ ${med} .nuevadescchannel
│ ${med} .setavatar
│ ${med} .setbanner
│ ${med} .seticono
│ ${med} .setmoneda
│ ${med} .setname nombre1/nombre2
│ ${med} .cal *<ecuacion>*
│ ${med} .horario
│ ${med} .read
│ ${med} .traducir <idoma>
│ ${med} .say
│ ${med} .whatmusic <audio/video>
│ ${med} .paisinfo
│ ${med} .ssweb
│ ${med} .tamaño *<cantidad>*
│ ${med} .document *<audio/video>*
│ ${med} .translate
│ ${med} .up
│ ${med} .enhance
│ ${med} .wikipedia
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ ⚙️ 𝙂𝙍𝙐𝙋𝙊𝙎 ⚙️
│└───────────────┈
│ ${med} .admins
│ ${med} .agregar
│ ${med} .advertencia <@user>
│ ${med} .delwarn
│ ${med} .grupo abrir / cerrar
│ ${med} .group open / close
│ ${med} .delete
│ ${med} .demote <@user>
│ ${med} .promote <@user>
│ ${med} .encuesta <text|text2>
│ ${med} .kickfantasmas
│ ${med} .gpbanner
│ ${med} .gpdesc
│ ${med} .gpname
│ ${med} .hidetag
│ ${med} .infogrupo
│ ${med} .kick <@user>
│ ${med} .kicknum
│ ${med} .listonline
│ ${med} .link
│ ${med} .listadv
│ ${med} .mute
│ ${med} .unmute
│ ${med} .config
│ ${med} .restablecer
│ ${med} .setbye
│ ${med} .setwelcome
│ ${med} .testwelcome
│ ${med} .setemoji <emoji>
│ ${med} .invocar *<mensaje opcional>*
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ ⚙️ 𝙀𝙉𝘼𝘽𝙇𝙀│𝘿𝙄𝙎𝘼𝘽𝙇𝙀 🧠
│└───────────────┈
│ ${med} .on
│ ${med} .off
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🔞 𝙉𝙎𝙁𝙒 🔞
│└───────────────┈
│ ${med} .sixnine/69 @tag
│ ${med} .anal/culiar @tag
│ ${med} .blowjob/mamada @tag
│ ${med} .boobjob/rusa @tag
│ ${med} .cum/leche @tag
│ ${med} .fap/paja @tag
│ ${med} .follar @tag
│ ${med} .fuck/coger @tag
│ ${med} .footjob/pies @tag
│ ${med} .fuck2/coger2 @tag
│ ${med} .grabboobs/agarrartetas @tag
│ ${med} .grop/manosear @tag
│ ${med} .penetrar @user
│ ${med} .lickpussy/coño @tag
│ ${med} .r34 <tag>
│ ${med} .sexo/sex @tag
│ ${med} .spank/nalgada @tag
│ ${med} .suckboobs/chupartetas @tag
│ ${med} .violar/perra @tag
│ ${med} .lesbianas/tijeras @tag
│ ${med} .pack
│ ${med} .tetas
│ ${med} .undress/encuerar
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 👤 𝙊𝙒𝙉𝙀𝙍 👑
│└───────────────┈
│ ${med} .addcoins *<@user>*
│ ${med} .addowner / delowner
│ ${med} .addprem [@user] <days>
│ ${med} .añadirxp
│ ${med} .copia
│ ${med} .autoadmin
│ ${med} .banuser <@tag> <razón>
│ ${med} .banlist
│ ${med} .bcgc
│ ${med} .block / unblock
│ ${med} .blocklist
│ ${med} .chetar *@user* / *<número>*
│ ${med} .cleartmp
│ ${med} .creargc
│ ${med} .deletefile
│ ${med} .delprem <@user>
│ ${med} .deschetar *@user* / *<número>*
│ ${med} .dsowner
│ ${med} =>
│ ${med} >
│ ${med} $
│ ${med} .fetch
│ ${med} .getplugin
│ ${med} .grouplist
│ ${med} .salir
│ ${med} .let
│ ${med} .prefix [prefix]
│ ${med} .quitarcoin *<@user>* / all
│ ${med} .quitarxp *<@user>*
│ ${med} .resetprefix
│ ${med} .restablecerdatos
│ ${med} .restart / reiniciar
│ ${med} .reunion
│ ${med} .savefile <ruta/nombre>
│ ${med} .saveplugin
│ ${med} .setcmd *<texto>*
│ ${med} .delcmd
│ ${med} .listcmd
│ ${med} .setimage
│ ${med} .setstatus <teks>
│ ${med} .spam2
│ ${med} .unbanuser <@tag>
│ ${med} .ip <alamat ip>
│ ${med} .update / fix
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ ⚽ 𝙄𝘼 - 𝘼𝙄 📚
│└───────────────┈
│ ${med} .dalle
│ ${med} .demo *<texto>*
│ ${med} .flux *<texto>*
│ ${med} .gemini
│ ${med} .ia
│ ${med} .llama
╰────────────────────╯

╭──⬣
│┏───┈ 
│┆ 🧩 𝙏𝙍𝘼𝙉𝙎𝙁𝙊𝙍𝙈𝘼𝘿𝙊𝙍🏔️
│└───────────────┈
│ ${med} .tourl <imagen>
│ ${med} .catbox
│ ${med} .tourl3
│ ${med} .togifaud
│ ${med} .tomp3
│ ${med} .tovideo
│ ${med} .tts <lang> <teks>
│ ${med} .tts2
╰────────────────────╯

© ${textbot}`.trim();  
    
    let imgBuffer = await fetch(imgUrl).then(res => res.buffer());  

    await conn.sendMessage(m.chat, {   
        text: txt,  
        image: imgBuffer,  
        contextInfo: {  
            mentionedJid: [m.sender, userId],  
            isForwarded: true,  
            forwardedNewsletterMessageInfo: {  
                newsletterJid: '120363401008003732@newsletter',  
                newsletterName: '⚡ 𝙍𝙄𝙉 𝙄𝙏𝙊𝙎𝙃𝙄 𝘽𝙊𝙏 | 𝘾𝙃𝘼𝙉𝙉𝙀𝙇 ⚽',  
                serverMessageId: -1,  
            },  
            forwardingScore: 999,  
            externalAdReply: {  
                title: botname,  
                body: textbot,  
                thumbnailUrl: imgUrl,  
                sourceUrl: redes,  
                mediaType: 1,  
                showAdAttribution: true,  
                renderLargerThumbnail: true,  
            },  
        },  
    }, { quoted: m });  
}  
  
handler.help = ['menu'];  
handler.tags = ['main'];  
handler.command = ['allmenú', 'allmenu', 'menucompleto'];
  
export default handler;  

function clockString(ms) {  
    let seconds = Math.floor((ms / 1000) % 60);  
    let minutes = Math.floor((ms / (1000 * 60)) % 60);  
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);  
    return `${hours}h ${minutes}m ${seconds}s`;  
}