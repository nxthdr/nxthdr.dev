import type { useAuth0 } from '@auth0/auth0-vue';

type Auth0Instance = ReturnType<typeof useAuth0>;

/**
 * API utility for making authenticated requests with automatic token refresh
 */
export class ApiClient {
  private auth0Instance: Auth0Instance;
  private audience: string;

  constructor(auth0Instance: Auth0Instance, audience: string) {
    this.auth0Instance = auth0Instance;
    this.audience = audience;
  }

  /**
   * Makes an authenticated API request with automatic token refresh on 401 errors
   * @param url - The API endpoint URL
   * @param options - Fetch options (method, headers, body, etc.)
   * @param retryCount - Internal counter for retry attempts
   * @returns The fetch response
   */
  async fetch(url: string, options: RequestInit = {}, retryCount = 0): Promise<Response> {
    try {
      // Get a fresh token
      const token = await this.auth0Instance.getAccessTokenSilently({
        authorizationParams: {
          audience: this.audience
        }
      });

      // Merge headers with authorization
      const headers = {
        'Accept': 'application/json',
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };

      // Make the request
      const response = await fetch(url, {
        ...options,
        headers
      });

      // If we get a 401 and haven't retried yet, refresh token and retry
      if (response.status === 401 && retryCount === 0) {
        console.log('Received 401, refreshing token and retrying...');

        try {
          // Force a fresh token by calling getAccessTokenSilently again
          // Auth0 SDK should handle the refresh token flow internally
          const newToken = await this.auth0Instance.getAccessTokenSilently({
            authorizationParams: {
              audience: this.audience
            },
            cacheMode: 'off' // Force a fresh token
          });

          // Retry the request with the new token
          const retryHeaders = {
            'Accept': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${newToken}`
          };

          return fetch(url, {
            ...options,
            headers: retryHeaders
          });
        } catch (refreshError) {
          // If token refresh fails (e.g., refresh token expired), sign out and redirect to home
          console.error('Token refresh failed, signing out:', refreshError);
          await this.auth0Instance.logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          });
          throw new Error('Session expired. Please sign in again.');
        }
      }

      return response;
    } catch (error) {
      // If getAccessTokenSilently fails initially (e.g., refresh token expired), sign out
      if (error instanceof Error && (
        error.message.includes('login_required') ||
        error.message.includes('consent_required')
      )) {
        console.error('Session expired, signing out:', error);
        await this.auth0Instance.logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
        throw new Error('Session expired. Please sign in again.');
      }
      throw error;
    }
  }

  /**
   * Makes a GET request with automatic token refresh
   */
  async get(url: string, options: RequestInit = {}): Promise<Response> {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  /**
   * Makes a POST request with automatic token refresh
   */
  async post(url: string, body?: any, options: RequestInit = {}): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }

  /**
   * Makes a PUT request with automatic token refresh
   */
  async put(url: string, body?: any, options: RequestInit = {}): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }

  /**
   * Makes a DELETE request with automatic token refresh
   */
  async delete(url: string, options: RequestInit = {}): Promise<Response> {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
}

/**
 * Creates an API client instance
 */
export function createApiClient(auth0Instance: Auth0Instance, audience: string): ApiClient {
  return new ApiClient(auth0Instance, audience);
}
