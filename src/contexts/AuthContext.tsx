import { createContext, useContext, ReactNode, useState } from 'react';

type UserRole = 'admin' | 'user';

interface UserData {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
}

interface AuthContextType {
  userData: UserData | null;
  logout: () => void;
  loginAs: (role: UserRole) => void;
  loginWithGoogle: (email: string) => void;
  loginReturning: (name: string, role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const loginAs = (role: UserRole) => {
    setUserData({
      id: '1',
      name: role === 'admin' ? 'Dr. Sarah K.' : 'Nurse John D.',
      email: role === 'admin' ? 'dr.sarah.k@clinova.health' : 'john.d@clinova.health',
      role,
    });
  };

  const loginWithGoogle = (email: string) => {
    const cleanEmail = email.trim() || 'clinician@hospital.org';
    const namePart = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = namePart
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    setUserData({
      id: 'google-' + Date.now(),
      name: formattedName.toLowerCase().includes('dr') ? formattedName : `Dr. ${formattedName}`,
      email: cleanEmail,
      role: 'admin', // Default to admin so clinician can test all features
    });
  };

  const loginReturning = (name: string, role: UserRole) => {
    setUserData({
      id: 'returning-' + Date.now(),
      name,
      email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@clinova.health`,
      role,
    });
  };

  const logout = () => setUserData(null);

  return (
    <AuthContext.Provider value={{ userData, logout, loginAs, loginWithGoogle, loginReturning }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { 
      userData: null, 
      logout: () => {}, 
      loginAs: () => {},
      loginWithGoogle: () => {},
      loginReturning: () => {}
    };
  }
  return context;
}
