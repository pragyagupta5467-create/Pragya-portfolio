import nodemailer from 'nodemailer';

/**
 * Creates and returns a Nodemailer transporter instance based on environment variables
 */
function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️ Warning: EMAIL_USER or EMAIL_PASS is not configured in .env environment variables.');
  }

  // Gmail SMTP Transport default (supports custom host/port if specified in .env)
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '465', 10);
  const secure = process.env.EMAIL_SECURE !== 'false';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Prevent hanging requests with socket timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Builds the HTML template for contact notification email
 */
function generateHtmlTemplate({ name, email, subject, message, dateStr }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact Message</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      margin: 0;
      padding: 24px;
      line-height: 1.6;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    .header {
      background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%);
      padding: 24px 32px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: #ddd6fe;
    }
    .content {
      padding: 28px 32px;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .meta-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #334155;
      font-size: 14px;
    }
    .meta-table td.label {
      font-weight: 600;
      color: #a78bfa;
      width: 120px;
    }
    .meta-table td.value {
      color: #f1f5f9;
    }
    .message-box {
      background-color: #0f172a;
      border: 1px solid #334155;
      border-left: 4px solid #8b5cf6;
      border-radius: 8px;
      padding: 20px;
      margin-top: 16px;
      font-size: 15px;
      color: #e2e8f0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .footer {
      background-color: #0f172a;
      padding: 16px 32px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #1e293b;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      background-color: #2e1065;
      color: #c4b5fd;
      border: 1px solid #5b21b6;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>📬 New Portfolio Contact Message</h1>
      <p>Someone reached out through your AI Portfolio</p>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr>
          <td class="label">Visitor Name</td>
          <td class="value"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td class="label">Visitor Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #c4b5fd; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Subject</td>
          <td class="value">${subject}</td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value"><span class="badge">${dateStr}</span></td>
        </tr>
      </table>

      <div style="font-weight: 600; color: #a78bfa; font-size: 14px; margin-top: 8px;">Message Content:</div>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      💡 <em>Tip: You can hit <strong>Reply</strong> directly in your email client to respond to ${name}.</em>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Builds the plain text fallback version of the email
 */
function generateTextTemplate({ name, email, subject, message, dateStr }) {
  return `
NEW PORTFOLIO CONTACT MESSAGE
====================================

Visitor Name : ${name}
Visitor Email: ${email}
Subject      : ${subject}
Date/Time    : ${dateStr}

MESSAGE CONTENT:
------------------------------------
${message}

------------------------------------
To reply to this inquiry, hit "Reply" in your email software or write directly to ${email}.
  `.trim();
}

/**
 * Sends contact email via Nodemailer
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<Object>}
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const user = (process.env.EMAIL_USER && !process.env.EMAIL_USER.includes('your-email'))
    ? process.env.EMAIL_USER
    : 'pragyagupta146565@gmail.com';

  const receiver = (process.env.RECEIVER_EMAIL && !process.env.RECEIVER_EMAIL.includes('your-email'))
    ? process.env.RECEIVER_EMAIL
    : 'pragyagupta146565@gmail.com';

  const pass = process.env.EMAIL_PASS;

  if (!pass || pass.includes('your-app-password') || pass.includes('your-16-character-app-password')) {
    console.error('❌ Contact Form Error: EMAIL_PASS is not configured in .env with a valid Gmail App Password.');
    throw new Error('Email service requires EMAIL_PASS in .env to be set with a Gmail App Password.');
  }


  const transporter = createTransporter();
  const dateStr = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata' // Default portfolio timezone context
  });

  const htmlContent = generateHtmlTemplate({ name, email, subject, message, dateStr });
  const textContent = generateTextTemplate({ name, email, subject, message, dateStr });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${user}>`,
    to: receiver,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio Contact] ${subject}`,
    html: htmlContent,
    text: textContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Contact email sent successfully. Message ID:', info.messageId);
  return info;
}
