export const formatDateTime = (date?: Date | string) => {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleDateString();
};
