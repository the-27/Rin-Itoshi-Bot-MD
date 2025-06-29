import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
const exec = promisify(_exec).bind(cp);

const handler = async (m, { conn, isROwner, command, text, usedPrefix }) => {
  if (!isROwner) return;
  if (!text) return m.reply('⚠️ Ingresa un comando para ejecutar.');
  if (global.conn.user.jid !== conn.user.jid) return;

  m.reply('🚀 *Ejecutando...*');

  try {
    const { stdout, stderr } = await exec(text);
    if (stdout) m.reply(`✅ *Resultado:*\n${stdout}`);
    if (stderr) m.reply(`⚠️ *Error:*\n${stderr}`);
  } catch (e) {
    m.reply(`❌ *Excepción:*\n${e.message}`);
  }
};

handler.help = ['$']
handler.tags = ['owner']
handler.command = /^\$/; // Solo responde a comandos que empiezan con $
handler.rowner = true;

export default handler;