import { GoogleIcon } from '@components/svgs';

interface TokenLogoProps {
  token?: string;
  scale?: number;
  isNativeCoin?: boolean | string;
  address?: string;
  overrideIconVariants?: {
    amb?: 'white' | 'blue';
    eth?: 'gray' | 'blue';
  };
}

export const TokenLogo = ({
  scale = 1,
  token,
  address,
  overrideIconVariants = { amb: 'blue', eth: 'gray' }
}: TokenLogoProps) => {
  return <GoogleIcon />;
};
