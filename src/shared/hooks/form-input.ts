import { useReducer } from 'react';
import { validate, Validator } from '../utils/validators';

interface State {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}
interface CHANGE {
  type: 'CHANGE';
  val: string;
  validators: Validator[];
}

interface TOUCH {
  type: 'TOUCH';
}

type Action = CHANGE | TOUCH;

const inputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val!, action.validators!),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const useFormInput = (initialValue?: string, initialValid?: boolean) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false,
  });

  return { inputState, dispatch };
};

export default useFormInput;
