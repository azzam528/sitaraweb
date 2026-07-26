/**
 * Format a date object or string into Indonesian format
 * @param {Date|string} date 
 * @param {string} format 'short', 'long', 'full'
 * @returns {string}
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '-';
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  } else if (format === 'long') {
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  } else if (format === 'full') {
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  }
  return d.toLocaleDateString('id-ID');
};

/**
 * Format date and time
 * @param {Date|string} date 
 * @returns {string} '12 Jan 2024 14:30'
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} ${timeStr}`;
};

/**
 * Format time only
 * @param {Date|string} date 
 * @returns {string} 'HH:mm'
 */
export const formatTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format relative time (e.g. '2 menit yang lalu')
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.round((d - now) / 1000);
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.round(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.round(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour');
  }
  
  const diffInDays = Math.round(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, 'day');
  }
  
  const diffInMonths = Math.round(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, 'month');
  }
  
  const diffInYears = Math.round(diffInDays / 365);
  return rtf.format(diffInYears, 'year');
};

/**
 * Format number with thousand separator
 * @param {number} number 
 * @returns {string}
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '-';
  return new Intl.NumberFormat('id-ID').format(number);
};

/**
 * Format value to percentage
 * @param {number} value 
 * @param {number} decimals 
 * @returns {string}
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format Indonesian phone number
 * @param {string} phone 
 * @returns {string}
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '-';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4,5})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Capitalize first letter of string
 * @param {string} string 
 * @returns {string}
 */
export const capitalizeFirst = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Truncate text with ellipsis
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
