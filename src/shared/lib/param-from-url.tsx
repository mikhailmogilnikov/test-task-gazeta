// Достает значения параметра из юрл
export const paramFromUrl = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};
