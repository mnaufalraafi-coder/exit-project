import loginData from "@/src/db/mock/login.json";
import userData from "@/src/db/mock/user.json";

export interface UserSession {
  id: string;
  fullName: string;
  nickname: string;
  email: string;
  role: string;
  phone?: string;
}

const STORAGE_KEY = "exit_auth_session";

export const authService = {
  /**
   * Mock login:
   * Rule sesuai spesifikasi: email format valid + password minimal 8 karakter.
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: UserSession; error?: string }> {
    // Simulasi delay jaringan (loading state)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return {
        success: false,
        error: "Format email belum sesuai. Contoh: nama@domain.com",
      };
    }

    if (!password || password.length < 8) {
      return {
        success: false,
        error: "Email atau password belum sesuai. Periksa kembali.",
      };
    }

    // Login berhasil menggunakan data mock
    const userSession: UserSession = {
      ...loginData.user,
      email,
      phone: userData.phone,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userSession));
    }

    return { success: true, user: userSession };
  },

  /**
   * Mock register:
   */
  async register(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    agreeTerms: boolean;
  }): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!data.fullName.trim()) {
      return { success: false, error: "Nama lengkap wajib diisi." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return { success: false, error: "Format email belum sesuai." };
    }

    if (!data.phone.startsWith("+62") && !data.phone.startsWith("08")) {
      return { success: false, error: "Nomor telepon harus diawali +62 atau 08." };
    }

    if (!data.password || data.password.length < 8) {
      return { success: false, error: "Password minimal 8 karakter kombinasi huruf dan angka." };
    }

    if (!data.agreeTerms) {
      return { success: false, error: "Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi." };
    }

    const newUser: UserSession = {
      id: "u_" + Date.now(),
      fullName: data.fullName,
      nickname: data.fullName.split(" ")[0] || "Investor",
      email: data.email,
      phone: data.phone,
      role: "Investor",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    }

    return { success: true };
  },

  /**
   * Cek sesi aktif saat ini
   */
  getCurrentUser(): UserSession | null {
    if (typeof window === "undefined") return null;
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return null;
    try {
      return JSON.parse(session) as UserSession;
    } catch {
      return null;
    }
  },

  /**
   * Logout
   */
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  /**
   * Cek apakah sudah terautentikasi
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
