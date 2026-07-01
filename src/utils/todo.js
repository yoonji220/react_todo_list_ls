export function sortTodo(todo) {
  return [...todo].sort((a, b) => {
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1;
    }

    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;

    return new Date(a.due) - new Date(b.due);
  });
}
