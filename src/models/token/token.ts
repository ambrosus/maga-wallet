import { formatUnits } from 'ethers/lib/utils';
import { CryptoCurrencyCode, ETH_DECIMALS } from '@constants';
import { TokenUtils } from '@utils';
import { TokenDTO } from './token.dto';

export class Token {
  address: string;
  name!: string;
  isNativeCoin?: string | boolean;
  balance: {
    formattedBalance: string;
    wei: string;
    ether: number;
  };
  tokenNameFromDatabase: string;
  decimals: number;
  symbol!: CryptoCurrencyCode | string;

  private deriveNameAndSymbolFromDto(
    dto: TokenDTO,
    tokenUtils: typeof TokenUtils
  ) {
    if (dto.name && dto.symbol) {
      this.name = dto.name;
      this.balance = {
        ...dto.balance,
        formattedBalance: formatUnits(dto?.balance?.wei || 0, dto.decimals)
      };
      this.tokenNameFromDatabase =
        dto?.tokenNameFromDatabase ??
        TokenUtils.getTokenNameFromDatabase(dto.address);
      this.symbol = dto.symbol;
      this.decimals = dto.decimals;
    } else {
      const tokenDetails = tokenUtils.getTokenDetails(dto.address);
      // @ts-ignore
      const { name, symbol } = tokenDetails;

      this.name = name;
      this.balance = {
        ...dto?.balance,
        formattedBalance: formatUnits(
          dto?.balance?.wei || 0,
          dto?.decimals || ETH_DECIMALS
        )
      };
      this.tokenNameFromDatabase =
        dto?.tokenNameFromDatabase ??
        TokenUtils.getTokenNameFromDatabase(dto.address);
      this.symbol = symbol;
    }
  }

  constructor(details: TokenDTO, tokenUtils: typeof TokenUtils) {
    this.isNativeCoin = details.isNativeCoin || '';
    this.address = details.address;
    this.balance = details.balance;
    this.tokenNameFromDatabase = details.tokenNameFromDatabase;
    this.decimals = details.decimals;
    this.deriveNameAndSymbolFromDto(details, tokenUtils);
  }
}
