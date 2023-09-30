export type TSpiner = {
  id: string;
  memberId: string;
  codeVoucher: string;
  canExpired: boolean;
  expiredDate: Date | string | null;
  expired: boolean
}