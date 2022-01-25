const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';

export const VALIDATOR_REQUIRE = (message?: string) => ({
  type: VALIDATOR_TYPE_REQUIRE,
  message: message || 'Required',
});

export const VALIDATOR_MINLENGTH = (val: number, message?: string) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
  message: message || `Min Length ${val}`,
});

export const VALIDATOR_MAXLENGTH = (val: number, message?: string) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
  message: message || `Max Length ${val}`,
});
export const VALIDATOR_MIN = (val: number, message?: string) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
  message: message || `Min value ${val}`,
});
export const VALIDATOR_MAX = (val: number, message?: string) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
  message: message || `Max value ${val}`,
});
export const VALIDATOR_EMAIL = (message?: string) => ({
  type: VALIDATOR_TYPE_EMAIL,
  message: message || 'please provide a valid email address',
});

export type Validator = {
  type: string;
  message: string;
  val?: number;
  input?: string;
};

export const validate = (value: string, validators: Validator[]) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
      if (!isValid) return { isValid, error: validator.message };
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val!;
      if (!isValid) return { isValid, error: validator.message };
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val!;
      if (!isValid) return { isValid, error: validator.message };
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val!;
      if (!isValid) return { isValid, error: validator.message };
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val!;
      if (!isValid) return { isValid, error: validator.message };
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      if (!isValid) return { isValid, error: validator.message };
    }
  }
  return { isValid, error: '' };
};
