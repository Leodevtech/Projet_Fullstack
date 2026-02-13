import { createContext, useState, useEffect, type ReactNode, useMemo, useCallback } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface DecodedUser extends JwtPayload {
  id: number,
  email: string,
  role: string,
}

interface AuthContextType {
  user: DecodedUser | null;
  setUser: React.Dispatch<React.SetStateAction<DecodedUser | null>>
  logout: () => void,
  loading: boolean
}

const AuthContext: React.Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode
}

//Provider pour la gestion de token
const AuthProvider = ({ children } : AuthProviderProps) => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const token = localStorage.getItem(`token`);

    //récupération des infos de l'utilisateur à partir de son token
    const userAuth = () => {
      if (token) {
        try {
          const decoded = jwtDecode<DecodedUser>(token);
          console.log(decoded);
          setUser(decoded);
      } catch (error) {
        localStorage.removeItem(`token`);
        console.error(error);  
      }
    }
    
      setLoading(false);
    }
    userAuth()
  }, [])
  
  //déconnection de l'utilisateur
  const logout = useCallback(() => {
    localStorage.removeItem(`token`);
    setUser(null);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    logout,
    loading
  }), [user, logout, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider}