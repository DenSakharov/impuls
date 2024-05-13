import React from 'react'
interface JWT {
  token: string,
  setToken: Function,
}
export const JWToken = React.createContext<JWT>({} as JWT);