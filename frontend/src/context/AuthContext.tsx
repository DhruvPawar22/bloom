import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { User } from "../types"
import client from "../api/client"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  const login = (token: string) => {
    localStorage.setItem("token", token)
    setToken(token)
  }

  useEffect(() => {
    if (token) {
      client.get("/auth/me").then(res => setUser(res.data)).catch(() => logout())
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
