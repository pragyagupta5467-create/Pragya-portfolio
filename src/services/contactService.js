import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_7bcriqr';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_erm9dtt';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'EhKzaXyN8Uuj6e8UI';

/**
 * Sends contact form payload via EmailJS client-side SDK
 * @param {Object} formData - { name, email, message }
 * @returns {Promise<Object>}
 */
export async function sendContactMessage(formData) {
  const templateParams = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    reply_to: formData.email,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status !== 200 && response.text !== 'OK') {
      throw new Error('Unable to send your message. Please try again later.');
    }

    return {
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('EmailJS error:', error);
    // User-friendly error message, hiding technical details (Requirement 7)
    throw new Error('Unable to send your message. Please try again later.');
  }
}
