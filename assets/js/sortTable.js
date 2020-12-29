function sortTable(table, column, asc) {
  const dirModifier = asc ? 1 : -1;
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll('tr'));

  /* Sort each row */
  const sortedRows = rows.sort((a, b) => {
    const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    const aColTextToNumber = Number(aColText.replace(/\,|\.|\s/g, ''));
    const bColTextToNumber = Number(bColText.replace(/\,|\.|\s/g, ''));
    const isNumber = /^\d+$/;
    if (isNumber.test(aColTextToNumber) && isNumber.test(bColTextToNumber)) {
      return aColTextToNumber > bColTextToNumber ? (1 * dirModifier) : (-1 * dirModifier);
    } else {
      return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    }
  });

  /* Remove all existing tr from table */
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  /* ReAdd newSorted rows */
  tbody.append(...sortedRows);

  /* Remember colunm is currently sorted */
  table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc);
}

function clickSort() {
  document.querySelectorAll('table th:not(:first-child)').forEach(headerCell => {
    headerCell.addEventListener("click", () => {
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
      const currentIsAscending = headerCell.classList.contains("th-sort-asc");

      sortTable(tableElement, headerIndex, !currentIsAscending);
    });
  });
}

export default clickSort;

