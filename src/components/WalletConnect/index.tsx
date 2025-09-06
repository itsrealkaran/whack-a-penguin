import React from 'react';
import { useStacks } from '@/contexts/StacksContext';
import Button from '../Button';
import { WalletContainer, WalletInfo, AddressText } from './styles';

const WalletConnect: React.FC = () => {
  const { isConnected, userData, connectWallet, disconnectWallet } = useStacks();

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && userData) {
    return (
      <WalletContainer>
        <WalletInfo>
          <span>Connected</span>
          <AddressText>{formatAddress(userData.profile.stxAddress.testnet)}</AddressText>
        </WalletInfo>
        <Button onClick={disconnectWallet}>
          <span>Disconnect</span>
        </Button>
      </WalletContainer>
    );
  }

  return (
    <WalletContainer>
      <Button onClick={connectWallet}>
        <span>Connect Wallet</span>
      </Button>
    </WalletContainer>
  );
};

export default WalletConnect;
