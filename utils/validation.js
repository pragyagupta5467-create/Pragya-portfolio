/**
 * Validation and sanitization utilities for the Contact API
 */

// Email regex pattern following standard RFC email format
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Sanitizes input string to prevent HTML/XSS injection
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Checks if a string contains email header injection characters (\r or \n)
 * @param {string} str 
 * @returns {boolean}
 */
function hasHeaderInjection(str) {
  return /[\r\n]/.test(str);
}

/**
 * Validates and sanitizes contact form submission input
 * @param {Object} input - { name, email, subject, message }
 * @returns {Object} { isValid, errors, sanitized }
 */
export function validateContactInput(input = {}) {
  const errors = [];
  const { name = '', email = '', subject = '', message = '' } = input;

  // Type checks
  if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
    return {
      isValid: false,
      errors: ['Invalid input data types. All fields must be strings.'],
      sanitized: null
    };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  // Field presence validation
  if (!trimmedName) {
    errors.push('Name is required.');
  } else if (trimmedName.length > 100) {
    errors.push('Name must not exceed 100 characters.');
  } else if (hasHeaderInjection(trimmedName)) {
    errors.push('Invalid name format.');
  }

  if (!trimmedEmail) {
    errors.push('Email address is required.');
  } else if (trimmedEmail.length > 255) {
    errors.push('Email address must not exceed 255 characters.');
  } else if (hasHeaderInjection(trimmedEmail) || !EMAIL_REGEX.test(trimmedEmail)) {
    errors.push('Please provide a valid email address.');
  }

  if (!trimmedSubject) {
    errors.push('Subject is required.');
  } else if (trimmedSubject.length > 200) {
    errors.push('Subject must not exceed 200 characters.');
  } else if (hasHeaderInjection(trimmedSubject)) {
    errors.push('Invalid subject format.');
  }

  if (!trimmedMessage) {
    errors.push('Message cannot be empty.');
  } else if (trimmedMessage.length < 10) {
    errors.push('Message must be at least 10 characters long.');
  } else if (trimmedMessage.length > 5000) {
    errors.push('Message length must not exceed 5000 characters.');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      sanitized: null
    };
  }

  // Return clean, sanitized inputs
  return {
    isValid: true,
    errors: [],
    sanitized: {
      name: sanitizeString(trimmedName),
      email: trimmedEmail, // already validated against email regex and header injection
      subject: sanitizeString(trimmedSubject),
      message: sanitizeString(trimmedMessage)
    }
  };
}
