import { createContext, useContext, ReactNode, useState } from 'react';

type UserRole = 'admin' | 'user';

interface UserData {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  userData: UserData | null;
  logout: () => void;
  loginAs: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const loginAs = (role: UserRole) => {
    setUserData({
      id: '1',
      name: role === 'admin' ? 'Dr. Sarah K.' : 'Nurse John D.',
      role,
    });
  };

  const logout = () => setUserData(null);

  return (
    <AuthContext.Provider value={{ userData, logout, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { userData: null, logout: () => {}, loginAs: () => {} };
  }
  return context;
}
