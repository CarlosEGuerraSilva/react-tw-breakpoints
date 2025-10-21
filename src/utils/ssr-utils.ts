/**
 * Check if the current environment is a browser.
 * @returns {boolean} True if running in a browser, false if on the server.
 */
export const isBrowser = (): boolean => typeof window !== 'undefined';

/**
 * Check if the current environment is a server.
 * @returns {boolean} True if running on the server, false if in a browser.
 */
export const isServer = (): boolean => !isBrowser();

/**
 * Execute a callback only in the browser environment.
 * @param callback The function to execute.
 * @returns The result of the callback or undefined.
 */
export const clientOnly = <T>(callback: () => T): T | undefined => {
  if (isBrowser()) {
    return callback();
  }
  return undefined;
};

/**
 * Execute a callback only in the server environment.
 * @param callback The function to execute.
 * @returns The result of the callback or undefined.
 */
export const serverOnly = <T>(callback: () => T): T | undefined => {
  if (isServer()) {
    return callback();
  }
  return undefined;
};

/**
 * Safely get a value depending on the environment.
 * @param clientValue Client value to retrieve in the browser.
 * @param serverValue Server value to retrieve on the server (optional).
 * @returns The appropriate value based on the environment or undefined.
 */
export const ssrSafe = <T>(clientValue: () => T, serverValue?: () => T): T | undefined => {
  if (isBrowser()) {
    return clientValue();
  }
  return serverValue ? serverValue() : undefined;
};
