const SAVE_DELAY_MS = 1200;

/**
 * Simulates a network request to persist settings.
 * Use email "error@example.com" to trigger a server error for testing.
 */
export async function saveSettings(payload) {
  await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY_MS));

  if (payload.email.toLowerCase() === 'error@example.com') {
    throw new Error('Unable to save settings. Please try again later.');
  }

  return payload;
}
