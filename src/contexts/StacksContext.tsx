import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect, disconnect, isConnected as checkIsConnected, getLocalStorage } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';

interface StacksContextType {
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
    // Check if user is already connected on page load
    const checkConnection = () => {
      try {
        if (checkIsConnected()) {
          const data = getLocalStorage();
          if (data && data.addresses && data.addresses.stx && data.addresses.stx.length > 0) {
            const stxAddress = data.addresses.stx[0].address;
            const userData = {
              profile: {
                stxAddress: {
                  testnet: stxAddress,
                  mainnet: stxAddress,
                }
              }
            };
            setUserData(userData);
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      await connect();
      console.log('Connection successful');
      
      // Get the user data from local storage after connection
      const data = getLocalStorage();
      if (data && data.addresses && data.addresses.stx && data.addresses.stx.length > 0) {
        const stxAddress = data.addresses.stx[0].address;
        const userData = {
          profile: {
            stxAddress: {
              testnet: stxAddress,
              mainnet: stxAddress,
            }
          }
        };
        setUserData(userData);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setUserData(null);
    setIsConnected(false);
  };

  const value = {
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
