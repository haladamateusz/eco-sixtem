import { Manufacturer } from './manufacturer.interface';

export interface WalletManufacturer extends Manufacturer {
  revenue: number;
  listingShortName: string;
}
