type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormAction =
| { type: 'UPDATE_FIELD'; field: string; value: string }
| { type: 'RESET' };

export const initialState: FormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function formReducer (state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
