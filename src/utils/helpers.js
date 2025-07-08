export const sortData = (data, key, direction) => {
  if (!key || !direction) return [...data];
  
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterData = (data, searchTerm) => {
  if (!searchTerm) return data;
  
  const lowerSearch = searchTerm.toLowerCase();
  return data.filter(item => 
    item.name.toLowerCase().includes(lowerSearch) ||
    item.email.toLowerCase().includes(lowerSearch) ||
    item.body.toLowerCase().includes(lowerSearch)
  );
};

export const paginateData = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
};