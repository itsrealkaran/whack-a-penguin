import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';

// Stacks configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

interface StacksContextType {
  userSession: UserSession;
  userData: any;
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  network: any;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

export const useStacks = () => {
  const context = useContext(StacksContext);
  if (context === undefined) {
    throw new Error('useStacks must be used within a StacksProvider');
  }
  return context;
};

interface StacksProviderProps {
  children: React.ReactNode;
}

export const StacksProvider: React.FC<StacksProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const network = STACKS_TESTNET;

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsConnected(true);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setIsConnected(true);
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Whack-a-Penguin',
        icon: '/favicon.ico',
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData();
        setUserData(userData);
        setIsConnected(true);
        window.location.reload();
      },
      onCancel: () => {
        console.log('User cancelled wallet connection');
      },
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
    setIsConnected(false);
    window.location.reload();
  };

  const value = {
    userSession,
    userData,
    isConnected,
    connectWallet,
    disconnectWallet,
    network,
  };

  return (
    <StacksContext.Provider value={value}>
      {children}
    </StacksContext.Provider>
  );
};
