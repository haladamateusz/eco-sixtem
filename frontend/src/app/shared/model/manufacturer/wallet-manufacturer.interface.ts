import { Manufacturer } from './manufacturer.interface';

export interface WalletManufacturer extends Manufacturer {
  revenue: number;
  environmental: number;
  social: number;
  governance: number;
  listingShortName: string;
}
