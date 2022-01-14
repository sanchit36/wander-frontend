import { useCallback, useReducer } from 'react';

interface FormHookState {
  inputs: {
    [key: string]: {
      value: string;
      isValid: boolean;
    };
  };
  isValid: boolean;
}

interface INPUT_CHANGE {
  type: 'INPUT_CHANGE';
  value: string;
  inputId: string;
  isValid: boolean;
}

interface SET_DATA {
  type: 'SET_DATA';
  inputs: {
    [key: string]: {
      value: string;
      isValid: boolean;
    };
  };
  formIsValid: boolean;
}

type FormHookActions = INPUT_CHANGE | SET_DATA;

const formReducer = (state: FormHookState, action: FormHookActions) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };

    default:
      return state;
  }
};

const useForm = (
  initialInputs: FormHookState['inputs'],
  initialFormValidity: FormHookState['isValid']
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean): void => {
      dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
    },
    []
  );

  const setFormData = useCallback(
    (
      inputData: FormHookState['inputs'],
      formValidity: FormHookState['isValid']
    ) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return { formState, inputHandler, setFormData };
};

export default useForm;
