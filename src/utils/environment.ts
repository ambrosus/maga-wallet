import { Config } from '@constants';

export const environment = Config.ENV === 'testnet' ? 'testnet' : 'prod';
