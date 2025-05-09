import { ethers } from 'ethers';
import { createAMBProvider } from '../rpc-provider';

// Return these once we have a viem provider
// const getBalanceOfAddress = async (address: string) => {
//   try {
//     const publicClient = createRpcProvider();
//     const balance = await publicClient.getBalance({
//       address: address as Address
//     });
//     return { wei: balance, ether: formatEther(balance) };
//   } catch (error) {
//     throw error;
//   }
// };

// export { getBalanceOfAddress };

const getBalanceOfAddress = async (address: string) => {
  const provider = createAMBProvider();
  const balance = await provider.getBalance(address);
  return { wei: balance, ether: ethers.utils.formatEther(balance) };
};

export { getBalanceOfAddress };
