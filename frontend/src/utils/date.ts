export const formatDateTime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleDateString();
};
