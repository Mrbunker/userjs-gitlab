export const debounce = (func: Function, delay: number = 500) => {
  let timerId: number | null = null;

  return () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(func, delay ?? 500);
  };
};

export const getUserName = () => {
  const userDom = document.querySelector<HTMLAnchorElement>(
    ".header-user-dropdown-toggle"
  );
  if (!userDom) {
    return "";
  }
  const parts = userDom.href.split("/");
  return parts[parts.length - 1];
};
