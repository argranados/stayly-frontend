import { signIn, signOut, signUp, confirmSignUp, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'

export const authService = {

  login: async (email, password) => {
    const result = await signIn({ username: email, password })
    return result
  },

  logout: async () => {
    await signOut()
  },

  register: async (email, password, name) => {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: { email, name }
      }
    })
    return result
  },

  confirmEmail: async (email, code) => {
    const result = await confirmSignUp({
      username: email,
      confirmationCode: code
    })
    return result
  },

  getCurrentUser: async () => {
    try {
      const user = await getCurrentUser()
      return user
    } catch {
      return null
    }
  },

  getSession: async () => {
    try {
      const session = await fetchAuthSession()
      const payload = session.tokens?.idToken?.payload
      return {
        token: session.tokens?.idToken?.toString(),
        groups: payload?.['cognito:groups'] ?? [],
        name: payload?.name ?? payload?.email,
        email: payload?.email,
      }
    } catch {
      return null
    }
  }

}