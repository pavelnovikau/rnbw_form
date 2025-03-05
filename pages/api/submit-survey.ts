import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Установка API ключа SendGrid
// Примечание: Необходимо настроить переменную окружения SENDGRID_API_KEY
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Адрес администратора, на который будут отправляться результаты опроса
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Проверяем метод запроса
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // Преобразуем данные в отформатированный JSON
    const jsonData = JSON.stringify(data, null, 2);
    
    // Преобразуем данные в Markdown формат
    const markdownData = convertToMarkdown(data);
    
    // Проверяем, настроен ли SendGrid
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured. Email delivery skipped.');
      
      // В случае отсутствия конфигурации, записываем данные в лог и возвращаем успешный ответ
      console.log('Survey submission:', data);
      return res.status(200).json({ 
        success: true, 
        message: 'Survey data received (email delivery skipped due to missing API key)' 
      });
    }
    
    // Подготовка email с результатами опроса
    const msg = {
      to: ADMIN_EMAIL,
      from: 'no-reply@rnbw.app', // Этот email должен быть верифицирован в SendGrid
      subject: `Новый ответ на опрос RNBW от ${data.name || 'анонимного пользователя'}`,
      text: `Получен новый ответ на опрос.\n\n${markdownData}`,
      html: `
        <h1>Новый ответ на опрос RNBW</h1>
        <p>Получен новый ответ на опрос от ${data.name || 'анонимного пользователя'}.</p>
        <h2>Данные в формате Markdown:</h2>
        <pre style="background-color:#f5f5f5;padding:15px;border-radius:5px;white-space:pre-wrap;">${markdownData}</pre>
        <h2>Данные в формате JSON:</h2>
        <pre style="background-color:#f5f5f5;padding:15px;border-radius:5px;white-space:pre-wrap;">${jsonData}</pre>
      `,
      attachments: [
        {
          content: Buffer.from(jsonData).toString('base64'),
          filename: 'survey-data.json',
          type: 'application/json',
          disposition: 'attachment',
        },
        {
          content: Buffer.from(markdownData).toString('base64'),
          filename: 'survey-data.md',
          type: 'text/markdown',
          disposition: 'attachment',
        },
      ],
    };

    // Отправка email
    await sgMail.send(msg);
    
    // Возвращаем успешный ответ
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting survey:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Функция для преобразования данных опроса в Markdown формат
function convertToMarkdown(data: any): string {
  const { submittedAt, ...formData } = data;
  
  let markdown = `# Результаты опроса RNBW\n\n`;
  
  // Добавляем дату и время отправки, если есть
  if (submittedAt) {
    markdown += `**Отправлено:** ${new Date(submittedAt).toLocaleString()}\n\n`;
  }
  
  // Добавляем имя, если есть
  if (formData.name) {
    markdown += `**Имя:** ${formData.name}\n\n`;
  }
  
  // Добавляем email, если есть
  if (formData.email) {
    markdown += `**Email:** ${formData.email}\n\n`;
  }
  
  // Добавляем основную информацию об ответах
  markdown += `## Ответы\n\n`;
  
  // Перебираем все поля формы, кроме имени и email, которые уже добавлены
  Object.entries(formData)
    .filter(([key]) => key !== 'name' && key !== 'email')
    .forEach(([key, value]) => {
      // Преобразуем ключ в более читаемый формат (например, "product_rating" -> "Product Rating")
      const formattedKey = key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Обрабатываем разные типы значений
      let formattedValue = '';
      
      if (Array.isArray(value)) {
        // Если это массив (например, чекбоксы), выводим каждый элемент как пункт списка
        formattedValue = value.length > 0
          ? '\n' + value.map(item => `  - ${item}`).join('\n')
          : '(Не выбрано)';
      } else if (typeof value === 'boolean') {
        // Если это булево значение
        formattedValue = value ? 'Да' : 'Нет';
      } else if (value === '' || value === null || value === undefined) {
        // Если поле пустое
        formattedValue = '(Не заполнено)';
      } else {
        // Для всех остальных типов данных
        formattedValue = String(value);
      }
      
      markdown += `### ${formattedKey}\n${formattedValue}\n\n`;
    });
  
  return markdown;
} 