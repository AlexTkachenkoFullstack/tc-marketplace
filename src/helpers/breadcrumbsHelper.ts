export function capitalizeLetter(word: string, index = 0) {
  return word.charAt(index).toUpperCase();
}

export const formatProductName = (productPath: string[]) => {
  return productPath
    .map((el) => {
      let element = '';

      if (el === 'iphone') {
        element = el.charAt(0) + capitalizeLetter(el, 1) + el.slice(2);
      } else if (el.includes('gb')) {
        element = el.toUpperCase();
      } else {
        element = capitalizeLetter(el) + el.slice(1);
      }

      return element;
    })
    .join(' ');
};
