import {
  formatDate,
  formatDateTime,
  formatTime,
  formatRelativeTime,
  formatNumber,
  formatPercentage,
  formatPhoneNumber,
  capitalizeFirst,
  truncateText
} from '../utils/formatter';

export function useFormatter() {
  return {
    formatDate,
    formatDateTime,
    formatTime,
    formatRelativeTime,
    formatNumber,
    formatPercentage,
    formatPhoneNumber,
    capitalizeFirst,
    truncateText
  };
}
