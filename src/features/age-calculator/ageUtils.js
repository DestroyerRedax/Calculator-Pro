export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const getDaysInMonth = (m, y) => new Date(y, m, 0).getDate();
export const calculateAge = (bDate) => {
  const today = new Date(); const birth = new Date(bDate);
  let y = today.getFullYear() - birth.getFullYear();
  let m = today.getMonth() - birth.getMonth();
  let d = today.getDate() - birth.getDate();
  if (d < 0) { m--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  return { y, m, d };
};
