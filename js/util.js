const debounce = (callback, timeout) => {
  let timeoutId;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, timeout);
  };
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {isEscEvent, debounce};
