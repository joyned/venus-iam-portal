function filterByIdAndRemoveItems(array1: any[], array2: any[]): any[] {
  const idsSet = new Set(array2.map((item) => item.id));
  const filteredArray = array1.filter((item) => !idsSet.has(item.id));

  return filteredArray;
}

export { filterByIdAndRemoveItems };
