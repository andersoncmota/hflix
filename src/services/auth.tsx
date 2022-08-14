export const login = () => {
  window.localStorage.setItem('auth', 'true')
}

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    let auth = window.localStorage.getItem('myuser')
    let conditions = auth !== null && auth != 'false'

    if (conditions) {
      return true
    }
    return false
  }
}

export const isAuthenticatedSet = () => {
  if (typeof window !== 'undefined') {
    let auth: any = window.localStorage.getItem('myuser')
    let token = window.localStorage.getItem('token')
    let conditions = auth !== null && auth != 'false'

    if (conditions) {
      // Convert the string to an object
      auth = JSON.parse(auth)
      return {
        signed: true,
        user: auth,
        token: token,
      }
    }
    return {
      signed: false,
      user: null,
      token: null,
    }
  }
}

export const logout = () => {
  if (
    localStorage.getItem('myuser') != null &&
    localStorage.getItem('myuser') != 'false'
  ) {
    localStorage.removeItem('myuser')
    localStorage.removeItem('token')
  }
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('token')
  }
}
