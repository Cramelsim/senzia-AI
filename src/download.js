// Triggers a browser download for text content generated on the client.
export const downloadFile = (filename, content, mime = 'text/plain') => {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const csvCell = (value) => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

// rows: array of objects; columns: [{ key, label }]
export const toCsv = (rows, columns) =>
  [columns.map((c) => csvCell(c.label)).join(',')]
    .concat(rows.map((row) => columns.map((c) => csvCell(row[c.key])).join(',')))
    .join('\n');

export const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
