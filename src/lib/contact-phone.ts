export const contactPhoneMaxLength = 30;

export function isContactPhoneValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return phone.length <= contactPhoneMaxLength && digits.length >= 8 && digits.length <= 15 &&
    /^\+?(?:[0-9 .-]|\([0-9]+\))+$/.test(phone);
}
