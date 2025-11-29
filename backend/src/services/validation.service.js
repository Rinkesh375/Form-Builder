export function validateSubmissionAgainstSchema(schema, payload) {
  const errors = {};

  if (!schema || !Array.isArray(schema.fields)) {
    return { isValid: true, errors: {} };
  }

  for (const field of schema.fields) {
    const {
      name,
      type,
      label,
      required,
      options,
      validations = {}
    } = field;

    const fieldLabel = label || name;
    const value = payload[name];

    // Handle "required"
    if (required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        errors[name] = `${fieldLabel} is required`;
        continue; // skip other validations
      }
    }

    // Skip further checks if value is not provided and not required
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }

    // Type-specific validation
    switch (type) {
      case 'text':
      case 'textarea': {
        const str = String(value);
        const { minLength, maxLength, regex } = validations;

        if (minLength !== undefined && str.length < minLength) {
          errors[name] = `${fieldLabel} must be at least ${minLength} characters`;
        } else if (maxLength !== undefined && str.length > maxLength) {
          errors[name] = `${fieldLabel} must be at most ${maxLength} characters`;
        }

        if (!errors[name] && regex) {
          const pattern = new RegExp(regex);
          if (!pattern.test(str)) {
            errors[name] = `${fieldLabel} is invalid`;
          }
        }
        break;
      }

      case 'number': {
        const num = Number(value);
        if (!Number.isFinite(num)) {
          errors[name] = `${fieldLabel} must be a valid number`;
          break;
        }

        const { min, max } = validations;
        if (min !== undefined && num < min) {
          errors[name] = `${fieldLabel} must be at least ${min}`;
        } else if (max !== undefined && num > max) {
          errors[name] = `${fieldLabel} must be at most ${max}`;
        }

        break;
      }

      case 'select': {
        if (options && !options.includes(value)) {
          errors[name] = `${fieldLabel} must be one of: ${options.join(', ')}`;
        }
        break;
      }

      case 'multi-select': {
        if (!Array.isArray(value)) {
          errors[name] = `${fieldLabel} must be an array`;
          break;
        }

        if (options) {
          const invalidOption = value.find((v) => !options.includes(v));
          if (invalidOption) {
            errors[name] = `${fieldLabel} has invalid selection: ${invalidOption}`;
            break;
          }
        }

        const { minSelected, maxSelected } = validations;
        if (minSelected !== undefined && value.length < minSelected) {
          errors[name] = `Select at least ${minSelected} ${fieldLabel}`;
        } else if (maxSelected !== undefined && value.length > maxSelected) {
          errors[name] = `Select at most ${maxSelected} ${fieldLabel}`;
        }

        break;
      }

      case 'date': {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors[name] = `${fieldLabel} must be a valid date`;
          break;
        }

        const { minDate } = validations;
        if (minDate) {
          const min = new Date(minDate);
          if (date.getTime() < min.getTime()) {
            errors[name] = `${fieldLabel} cannot be before ${minDate}`;
          }
        }

        break;
      }

      case 'switch': {
        // Accept boolean or "true"/"false" etc.
        const boolValue =
          typeof value === 'boolean'
            ? value
            : value === 'true' || value === '1';

        // If required, ensure it exists (already checked) – usually no extra.
        payload[name] = boolValue; // normalize
        break;
      }

      default:
        // Unknown type -> ignore for now
        break;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
