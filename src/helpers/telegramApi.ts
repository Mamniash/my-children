const botToken = '8161696582:AAHZxsaPggaUncruMMoG1pIjTXleCNAUWTw'
const chatId = '-1002271508122'
const threadId = 267 // ID темы "0→1 ответы на лендинг"

const TELEGRAM_URL = `https://api.telegram.org/bot${botToken}/sendMessage`

const sendTelegramMessage = async (message: string) => {
        try {
                const response = await fetch(TELEGRAM_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                                chat_id: chatId,
                                text: message,
                                message_thread_id: threadId
                        })
                })

                const data = await response.json()
                return Boolean(data?.ok)
        } catch (error) {
                console.error('Ошибка при отправке в Telegram:', error)
                return false
        }
}

const formatTimestamp = () =>
        new Date().toLocaleString('ru-RU', {
                timeZone: 'Europe/Moscow',
                hour12: false
        })

interface TrialClickPayload {
        entryPoint: string
        sessionTime: number
        url: string
        timezone?: string | null
}

interface TrialContactPayload {
        name: string
        contact: string
        notes?: string
        entryPoint: string
        sessionTime: number
        url: string
        timezone?: string | null
}

export const sendTrialClick = async ({
        entryPoint,
        sessionTime,
        url,
        timezone
}: TrialClickPayload) => {
        const message = [
                '🆓 Клик на пробную неделю',
                `📍 Источник: ${entryPoint}`,
                `⏱ На сайте: ${sessionTime} сек.`,
                timezone ? `🕰 Часовой пояс: ${timezone}` : null,
                `🌐 Страница: ${url}`,
                `🗓 МСК: ${formatTimestamp()}`
        ]
                .filter(Boolean)
                .join('\n')

        return sendTelegramMessage(message)
}

export const sendTrialContact = async ({
        name,
        contact,
        notes,
        entryPoint,
        sessionTime,
        url,
        timezone
}: TrialContactPayload) => {
        const message = [
                '🤝 Контакт для пробной недели',
                `📇 Имя: ${name || 'не указано'}`,
                `✉️ Контакт: ${contact}`,
                notes ? `🗒 Комментарий: ${notes}` : null,
                `📍 Источник: ${entryPoint}`,
                `⏱ На сайте: ${sessionTime} сек.`,
                timezone ? `🕰 Часовой пояс: ${timezone}` : null,
                `🌐 Страница: ${url}`,
                `🗓 МСК: ${formatTimestamp()}`
        ]
                .filter(Boolean)
                .join('\n')

        return sendTelegramMessage(message)
}

// Backward compatibility export (legacy signature)
export const sendToTelegram = async (
        contact: string,
        location: string,
        sessionTime: number
) => {
        const message = [
                '🔗 Запрос гайда для новых ИП!',
                `✉️ Контакт: ${contact}`,
                `📍 Город: ${location}`,
                `⏱ Время на сайте: ${sessionTime} сек.`,
                `🗓 МСК: ${formatTimestamp()}`
        ]
                .filter(Boolean)
                .join('\n')

        return sendTelegramMessage(message)
}
