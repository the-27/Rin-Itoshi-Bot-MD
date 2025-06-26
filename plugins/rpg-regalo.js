const handler = async (m, { conn }) => {

    // Milisegundos en 10 días o 10 días en milisegundos como sea xdd
    const tenDaysInMillis = 864000000; 
    let time = global.db.data.users[m.sender].lastclaim + tenDaysInMillis;

    // Una Verificación Ya Que No Funcionó La Mrd xD
    if (new Date().getTime() - global.db.data.users[m.sender].lastclaim < tenDaysInMillis) {
        return conn.reply(m.chat, `*Ya Has Reclamado El Regalo De ShadowBot ⚔️, Vuelve En ${msToTime(time - new Date().getTime())}*`, m);
    }

    const user = global.db.data.users[m.sender];
    
    conn.sendMessage(m.chat, {text: `☕ *@${m.sender.split('@')[0]} Rin Itoshi Te Ha Regalado:*\n> 💵 500 ${moneda}\n> 💶 1000 Experiencia\n> 🪙 20 Tokens`, mentions: [m.sender]}, {quoted: fkontak});

    user.joincount += 20;
    user.coin += 500;
    user.exp += 1000;

    user.lastclaim = new Date().getTime();
};

handler.help = ['regalo'];
handler.tags = ['rpg'];
handler.command = ['regalo', 'regalosrin'];
handler.fail = null;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((duration % (1000 * 60)) / 1000);

    days = (days < 10) ? '0' + days : days;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return days + ' Días ' + hours + ' Horas ' + minutes + ' Minutos';
}