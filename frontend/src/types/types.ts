import { UserAccountData } from "./user";

export interface Address {
  street?: string;
  apartment?: string;
  city: string;
  country: string;
  postcode: string;
}


export interface InitialUserState {
  user: UserAccountData | null;
  isLoading: boolean;
}
