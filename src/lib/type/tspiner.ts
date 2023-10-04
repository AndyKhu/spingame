export type TSpiner = {
  id: string;
  memberId: string;
  codeVoucher: string;
  canExpired: boolean;
  expiredDate: Date | string | null;
  used: boolean;
  price: string | null;
}

export type TSpinerOption = {
  id: string;
  option: string;
  color: string;
  probability: number;
  forceWin: boolean;
}