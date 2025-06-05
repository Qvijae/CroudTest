import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'investor' | 'startup';

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  switchUserType: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('investor');

  const switchUserType = () => {
    setUserType(prev => prev === 'investor' ? 'startup' : 'investor');
  };

  return (
    <UserContext.Provider value={{ userType, setUserType, switchUserType }}>
      {children}
    </UserContext.Provider>
  );
};