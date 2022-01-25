import React, { useCallback, useReducer } from 'react';
import { validate, Validator } from '../utils/validators';

export interface InputValue {
  value: any;
  isValid: boolean;
  validators?: Validator[];
  isTouched?: boolean;
}

type State = {
  inputs: {
    [key: string]: InputValue;
  };
  errors: { [key: string]: string };
  isFormValid: boolean;
};

type Action =
  | {
      type: 'CHANGE';
      payload: {
        id: string;
        value: any;
      };
    }
  | { type: 'VALIDATE' }
  | { type: 'RESET'; payload: { inputs: { [key: string]: InputValue } } }
  | { type: 'TOUCH'; payload: { id: string; value: any } };

type reducer = (state: State, action: Action) => State;

const formReducer: reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      const { payload } = action;
      let formIsValid = true;
      const input = state.inputs[payload.id];
      let isValid = true;
      let error = '';
      if (input.validators) {
        const validators = validate(payload.value, input.validators);
        isValid = validators.isValid;
        error = validators.error;
      }
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === payload.id) {
          formIsValid = formIsValid && isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [payload.id]: {
            ...state.inputs[payload.id],
            value: payload.value,
            isValid,
            validators: input.validators,
          },
        },
        errors: {
          ...state.errors,
          [payload.id]: error,
        },
        isFormValid: formIsValid,
      };
    }

    case 'VALIDATE': {
      let formIsValid = true;
      let errors: { [key: string]: any } = {};
      for (const inputId in state.inputs) {
        const input = state.inputs[inputId];
        let isValid = true;
        let error = '';
        if (input.validators) {
          const validators = validate(input.value, input.validators);
          isValid = validators.isValid;
          error = validators.error;
        }
        errors[inputId] = error;
        formIsValid = formIsValid && isValid;
      }
      return { ...state, errors, isFormValid: formIsValid };
    }

    case 'TOUCH': {
      const { payload } = action;
      let formIsValid = true;
      const input = state.inputs[payload.id];
      let isValid = true;
      let error = '';
      if (input.validators) {
        const validators = validate(payload.value, input.validators);
        isValid = validators.isValid;
        error = validators.error;
      }
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === payload.id) {
          formIsValid = formIsValid && isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [payload.id]: {
            ...state.inputs[payload.id],
            isTouched: true,
            value: payload.value,
            isValid,
            validators: input.validators,
          },
        },
        errors: {
          ...state.errors,
          [payload.id]: error,
        },
        isFormValid: formIsValid,
      };
    }

    case 'RESET': {
      const { payload } = action;
      return {
        ...state,
        inputs: payload.inputs,
      };
    }

    default:
      return state;
  }
};

const useForm = (
  initalValues: State['inputs'],
  isFormValid: State['isFormValid']
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initalValues,
    errors: {},
    isFormValid: isFormValid,
  });

  const inputHandler = useCallback((id: string, value: any) => {
    dispatch({
      type: 'CHANGE',
      payload: {
        id,
        value,
      },
    });
  }, []);

  const inputChangeHandler = useCallback((event: React.ChangeEvent) => {
    dispatch({
      type: 'CHANGE',
      payload: {
        id: event.target.id,
        value: (event.target as HTMLInputElement).value,
      },
    });
  }, []);

  const inputBlurHandler = useCallback((event: React.FocusEvent) => {
    dispatch({
      type: 'TOUCH',
      payload: {
        id: event.target.id,
        value: (event.target as HTMLInputElement).value,
      },
    });
  }, []);

  const resetForm = useCallback((inputs: { [key: string]: InputValue }) => {
    dispatch({
      type: 'RESET',
      payload: {
        inputs,
      },
    });
  }, []);

  const validateInputs = useCallback(() => {
    dispatch({ type: 'VALIDATE' });
  }, []);

  return {
    formState,
    inputHandler,
    inputBlurHandler,
    inputChangeHandler,
    validate: validateInputs,
    resetForm,
  };
};

export default useForm;
