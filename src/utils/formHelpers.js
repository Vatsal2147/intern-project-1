/**
 * Password and confirm-password must stay in sync.
 * Returns the list of field names that should be revalidated together.
 */
export function getLinkedValidationFields(changedField) {
  if (changedField === 'password' || changedField === 'confirmPassword') {
    return ['password', 'confirmPassword'];
  }
  return [changedField];
}

/** Marks every field as touched — used after a failed submit attempt. */
export function createAllTouchedState(fieldNames) {
  return Object.fromEntries(fieldNames.map((name) => [name, true]));
}
