/**
 * Declarative field config drives rendering — avoids repeating
 * FormField + input markup for every field in the form.
 */
export const PROFILE_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'new-password',
    hint: 'Must be at least 8 characters.',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    autoComplete: 'new-password',
    required: true,
  },
];
