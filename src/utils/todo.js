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

export function getTodoStats(todo) {
  const total = todo.length;
  const completed = todo.filter(item => item.checked).length;
  const remain = total - completed;

  return {
    total,
    completed,
    remain,
  };
}
