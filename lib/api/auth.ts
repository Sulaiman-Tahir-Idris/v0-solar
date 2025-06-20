// API utility functions for authentication
const BASE_URL = process.env.
BLIC_API_BASE_URL || "https://eco-solar-backend.onrender.com"


export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  refreshToken?: string | null
  createdAt: string
  accessToken?: string
  emailVerified?: boolean
}

export interface VerificationStatusResponse {
  isVerified: boolean
  user?: AuthResponse
  accessToken?: string
}

export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Registration failed")
    }
    console.log("Registration response:", response.json())

    return response.json()
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Login failed")
    }

    return response.json()
  },

  checkVerificationStatus: async (email: string): Promise<VerificationStatusResponse> => {
    const response = await fetch(`${BASE_URL}/auth/verify-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error("Failed to check verification status")
    }

    return response.json()
  },

  resendVerificationEmail: async (email: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/auth/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to resend verification email")
    }
  },

  logout: async (token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Logout failed")
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error("Token refresh failed")
    }

    return response.json()
  },
}
