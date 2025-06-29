import moment from 'moment-timezone';

const handler = async (bot, chatId, name, info, responder, prefijo, nombreBot) => {
  try {
    // Fecha y hora de Perú
    const fecha = moment().tz('America/Lima').format('DD/MM/YYYY');
    const hora = moment().tz('America/Lima').format('HH:mm:ss');

    // Imagen que se mostrará en el menú
    const urlImagen = 'https://xatimg.com/image/TyANiC68n4eZ.jpg';

    // Mensaje con imagen y datos
    await bot.sendMessage(chatId, {
      image: { url: urlImagen },
      caption: `
╭───〔 🌸 *rin* 🌸 〕───╮
│👤 *Usuario:* ${name}
│📅 *Fecha:* ${fecha}
│⏰ *Hora:* ${hora}
╰────────────────────────╯
`.trim()
    }, { quoted: info });

    // Secciones del menú
    const sections = [
      {
        title: "📋 Menú Principal",
        rows: [
          { title: "🧾 Ver comandos", rowId: `${prefijo}menu` },
          { title: "🆕 Novedades", rowId: `${prefijo}nuevos` },
          { title: "👑 Dueño", rowId: `${prefijo}owner` },
        ]
      },
      {
        title: "🎮 Diversión y juegos",
        rows: [
          { title: "🤣 Chistes", rowId: `${prefijo}chiste` },
          { title: "🎲 Adivina", rowId: `${prefijo}adivina` },
        ]
      },
      {
        title: "📢 Comunidad",
        rows: [
          { title: "📌 Grupo oficial", rowId: `${prefijo}grupo` },
          { title: "🌐 Web del bot", rowId: `${prefijo}web` },
        ]
      }
    ];

    // Enviar el menú tipo lista
    await bot.sendMessage(chatId, {
      text: `🌐 Bienvenido al menú de *${nombreBot}*`,
      footer: "Selecciona una opción del listado",
      title: "📖 Lista de comandos",
      buttonText: "📂 Abrir menú",
      sections
    }, { quoted: info });

  } catch (e) {
    console.error("Error al enviar el menú:", e);
    responder("❌ Ocurrió un error mostrando el menú. Intenta más tarde.");
  }
};

handler.help = ['menu'];
handler.tags = ['principal'];
handler.command = ['menu', 'menulist', 'ayuda'];

export default handler;