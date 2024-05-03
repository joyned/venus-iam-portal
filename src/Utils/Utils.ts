function filterByIdAndRemoveItems(array1: any[], array2: any[]): any[] {
  const idsSet = new Set(array2.map((item) => item.id));
  const filteredArray = array1.filter((item) => !idsSet.has(item.id));

  return filteredArray;
}

function urltoFile(dataUrl: string) {
  const base64Data = dataUrl.split(',')[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  return new File([blob], 'image.png', { type: 'image/png' });
}

export { filterByIdAndRemoveItems, urltoFile };
