export default function formatDate(date) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDDayInfo(due) {
  if (!due) return { text: "", className: "" };

  const today = new Date();
  const dueDate = new Date(due);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays > 3) {
    return { text: `D-${diffDays}`, className: "" };
  }

  if (diffDays > 0) {
    return { text: `D-${diffDays}`, className: "due-soon" };
  }

  if (diffDays === 0) {
    return { text: "D-Day", className: "due-today" };
  }

  return { text: `D+${Math.abs(diffDays)}`, className: "due-over" };
}