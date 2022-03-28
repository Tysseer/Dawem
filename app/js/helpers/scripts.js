export const convertToArabicNumbers = (num, dir) => {
  if (dir == 'rtl') {
    let arabicNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let chars = num.split('');
    for (let i = 0; i < chars.length; i++) {
      if (/\d/.test(chars[i])) {
        chars[i] = arabicNumbers[chars[i]];
      }
    }
    return chars.join('');
  } else {
    return num;
  }
};

export const getFontFamily = (lang) => ({
  fontFamily: lang == 'ar' ? 'Amiri_Bold' : 'Poppins',
});
