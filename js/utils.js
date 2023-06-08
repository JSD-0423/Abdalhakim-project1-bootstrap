export const debounce = (func, timeout = 300) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const fetchApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return `Somthing goes wrong with fetch: ${error.message}`;
  }
};
