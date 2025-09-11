export const sendToTelegram = async (
        contact: string,
        location: string,
        sessionTime: number
) => {
	const botToken = '8161696582:AAHZxsaPggaUncruMMoG1pIjTXleCNAUWTw'
	const chatId = '-1002271508122'
        const threadId = 267 // ID темы "0→1 ответы на лендинг"

	// Формирование сообщения для Telegram
        const message = `
🔗 Запрос гайда для новых ИП!
✉️ Контакт: ${contact}
📍 Город: ${location}
⏱ Время на сайте: ${sessionTime} сек.
  `.trim()

	const url = `https://api.telegram.org/bot${botToken}/sendMessage`

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: message,
				message_thread_id: threadId
			})
		})

		const data = await response.json()
		return data.ok
	} catch (error) {
		console.error('Ошибка при отправке в Telegram:', error)
		return false
	}
}
