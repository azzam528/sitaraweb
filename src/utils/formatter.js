/**
 * Parses any datetime input into a valid Date object in UTC.
 * If an ISO string without timezone offset/Z is received (e.g. from legacy backend data),
 * it safely appends 'Z' so that the browser treats it as UTC rather than local time.
 * @param {Date|string|number} dateStr
 * @returns {Date|null}
 */
export const parseUtcDate = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr instanceof Date) {
    return isNaN(dateStr.getTime()) ? null : dateStr;
  }
  let s = String(dateStr).trim();
  if (!s) return null;

  // Pure calendar date format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [year, month, day] = s.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  // ISO timestamp with time: ensure it ends with Z if timezone offset is missing
  if (s.includes('T') || s.includes(' ')) {
    const hasTimezone = s.endsWith('Z') || s.endsWith('z') || /[+-]\d{2}(:?\d{2})?$/.test(s);
    if (!hasTimezone) {
      s = s.replace(' ', 'T') + 'Z';
    }
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Format a date object or string into Indonesian format (Asia/Jakarta)
 * @param {Date|string} date 
 * @param {string} format 'short', 'long', 'full'
 * @returns {string}
 */
export const formatDate = (date, format = 'short') => {
  const d = parseUtcDate(date);
  if (!d) return '-';
  
  const options = {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
  };

  if (format === 'short') {
    options.month = 'short';
    options.year = 'numeric';
  } else if (format === 'long') {
    options.month = 'long';
    options.year = 'numeric';
  } else if (format === 'full') {
    options.weekday = 'long';
    options.month = 'long';
    options.year = 'numeric';
  } else {
    options.month = 'short';
    options.year = 'numeric';
  }
  
  return d.toLocaleDateString('id-ID', options);
};

/**
 * Format date and time in Asia/Jakarta timezone
 * @param {Date|string} date 
 * @returns {string} '12 Jan 2024, 14.30 WIB'
 */
export const formatDateTime = (date) => {
  const d = parseUtcDate(date);
  if (!d) return '-';
  return `${formatDate(d, 'short')}, ${formatTime(d)} WIB`;
};

/**
 * Format time only in Asia/Jakarta timezone
 * @param {Date|string} date 
 * @returns {string} 'HH.mm'
 */
export const formatTime = (date) => {
  const d = parseUtcDate(date);
  if (!d) return '-';
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  }).replace(':', '.');
};

/**
 * Format relative time (e.g. '2 menit yang lalu')
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  const d = parseUtcDate(date);
  if (!d) return '-';
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
  const now = new Date();
  const diffInSeconds = Math.round((d.getTime() - now.getTime()) / 1000);
  
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
