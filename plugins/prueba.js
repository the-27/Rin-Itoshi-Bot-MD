import fs from 'fs';
import moment from 'moment-timezone';

const handler = async (bot, chatId, name, info, responder, prefijo, nombreBot) => {
  try {
    const imagenMenu = "https://xatimg.com/image/TyANiC68n4eZ.jpg";
    const fecha = moment().tz('America/Lima').format('DD/MM/YYYY');
    const hora = moment().tz('America/Lima').format('HH:mm:ss');

    // Enviar imagen con información
    await bot.sendMessage(chatId, {
      image: { url: imagenMenu },
      caption: `
╭─❍【🌸 *${nombreBot}* 🌸】❍─╮
│👤 Usuario: *${name}*
│📅 Fecha: *${fecha}*
│⏰ Hora: *${hora}*
╰────────────────────╯
`.trim()
    }, { quoted: info });

    // Enviar menú tipo lista
    const sections = [
      {
        title: "🌟 Comandos principales",
        rows: [
          { title: "📜 Menú principal", rowId: `${prefijo}menupp` },
          { title: "🆕 Nuevos comandos", rowId: `${prefijo}menunovo` },
          { title: "👑 Menú del dueño", rowId: `${prefijo}menudono` },
          { title: "🛡 Administración", rowId: `${prefijo}menuadm` },
          { title: "💠 Premium", rowId: `${prefijo}menupremium` },
          { title: "🎉 Juegos y diversión", rowId: `${prefijo}brincadeiras` },
          { title: "🖼 Efectos visuales", rowId: `${prefijo}Efeitosimg` },
          { title: "🪙 Sistema de monedas", rowId: `${prefijo}menucoins` },
          { title: "⚔️ Mundo RPG", rowId: `${prefijo}menurpg` },
          { title: "🎨 Crear logos", rowId: `${prefijo}menulogos` },
        ]
      },
      {
        title: "💖 Apoya el proyecto",
        rows: [
          { title: "🌟 Donar por Pix", rowId: `${prefijo}doar` }
        ]
      },
      {
        title: "📢 Comunidad Fenrys",
        rows: [
          { title: "💬 Grupo oficial", rowId: `${prefijo}grupobot` },
          { title: "🤝 Alianzas", rowId: `${prefijo}parcerias` }
        ]
      }
    ];

    await bot.sendMessage(chatId, {
      text: `🔷 ${nombreBot} | Tu asistente con encanto e inteligencia 💙`,
      footer: `Selecciona una opción del menú`,
      title: "🌐 Lista de comandos",
      buttonText: "🌐 Ver comandos",
      sections
    }, { quoted: info });

  } catch (error) {
    console.error("❌ Error al mostrar el menú:", error);
    responder("❌ Ocurrió un error al mostrar el menú. Intenta más tarde.");
  }
};

handler.help = ['menulist'];
handler.tags = ['principal'];
handler.command = ['menulist', 'ayuda'];

export default handler;