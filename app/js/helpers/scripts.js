export const convertToArabicNumbers = (num, dir) => {
  if (dir == "rtl") {
    let indianNumbers = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    let chars = num.split("");
    for (let i = 0; i < chars.length; i++) {
      if (/\d/.test(chars[i])) {
        chars[i] = indianNumbers[chars[i]];
      }
    }
    return chars.join("");
  } else {
    var ar = "٠١٢٣٤٥٦٧٨٩".split("");
    var en = "0123456789".split("");
    num = num.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (x) => en[ar.indexOf(x)]);
    num = num.replace(/[^\d]/g, "");
    return num;
  }
};

export const getFontFamily = (lang, bold = false) => {
  if (bold) return { fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins-Bold" };
  else return { fontFamily: lang == "ar" ? "Amiri" : "Poppins" };
};
