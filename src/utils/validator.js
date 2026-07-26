export const required = (value) => {
  const isValid = value !== null && value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
  return {
    valid: isValid,
    message: isValid ? '' : 'Field ini wajib diisi'
  };
};

export const email = (value) => {
  if (!value) return { valid: true, message: '' }; // let required() handle empty check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  return {
    valid: isValid,
    message: isValid ? '' : 'Format email tidak valid'
  };
};

export const minLength = (value, min) => {
  if (!value) return { valid: true, message: '' };
  const isValid = String(value).length >= min;
  return {
    valid: isValid,
    message: isValid ? '' : `Minimal ${min} karakter`
  };
};

export const maxLength = (value, max) => {
  if (!value) return { valid: true, message: '' };
  const isValid = String(value).length <= max;
  return {
    valid: isValid,
    message: isValid ? '' : `Maksimal ${max} karakter`
  };
};

export const phone = (value) => {
  if (!value) return { valid: true, message: '' };
  const phoneRegex = /^08[0-9]{8,11}$/;
  const isValid = phoneRegex.test(value);
  return {
    valid: isValid,
    message: isValid ? '' : 'Format nomor telepon tidak valid (contoh: 08123456789)'
  };
};

export const nik = (value) => {
  if (!value) return { valid: true, message: '' };
  const isValid = /^\d{16}$/.test(value);
  return {
    valid: isValid,
    message: isValid ? '' : 'NIK harus 16 digit angka'
  };
};

export const password = (value) => {
  if (!value) return { valid: true, message: '' };
  const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
  return {
    valid: isValid,
    message: isValid ? '' : 'Password minimal 8 karakter, mengandung huruf dan angka'
  };
};

export const confirmPassword = (value, password) => {
  const isValid = value === password;
  return {
    valid: isValid,
    message: isValid ? '' : 'Password tidak cocok'
  };
};

/**
 * Validates a set of fields against rules
 * @param {Object} fields - e.g. { email: 'test@test.com', password: '123' }
 * @param {Object} rules - e.g. { email: [(v) => required(v), (v) => email(v)] }
 * @returns {Object} { valid: boolean, errors: { email: 'Error msg' } }
 */
export const validateForm = (fields, rules) => {
  let isFormValid = true;
  const errors = {};

  for (const field in rules) {
    errors[field] = '';
    const fieldRules = rules[field];
    const value = fields[field];

    for (const rule of fieldRules) {
      const result = rule(value);
      if (!result.valid) {
        errors[field] = result.message;
        isFormValid = false;
        break; // Stop checking other rules for this field if one fails
      }
    }
  }

  return { valid: isFormValid, errors };
};
