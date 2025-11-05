// src/lib/auth/tokenService.js

/**
 * Token Service
 * Handles JWT token storage and retrieval
 */

const TOKEN_KEY = 'healthcare_access_token'
const REFRESH_TOKEN_KEY = 'healthcare_refresh_token'
const USER_KEY = 'healthcare_user'

class TokenService {
  // Get access token
  getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

  // Get user data
  getUser() {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  }

  // Set tokens and user data
  setTokens(accessToken, refreshToken, user) {
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }
  }

  // Remove all tokens and user data
  removeTokens() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAccessToken()
  }
}

export default new TokenService()