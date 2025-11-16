export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

export const formatCPF = (value: string): string => {
  const v = value.replace(/\D/g, '');
  return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\D/g, '');
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 6);
  }
  return v;
};
