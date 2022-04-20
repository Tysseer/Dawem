import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");
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
const size_1 = height / 24;
const size_2 = height / 30;
const size_3 = height / 34;
const size_4 = height / 36;
const size_5 = height / 38;
const size_6 = height / 40;
const size_7 = height / 42;
const size_8 = height / 44;
const size_9 = height / 56;
const size_10 = height / 58;

const lineH_1 = height / 12;
const lineH_2 = height / 15;
const lineH_3 = height / 18;
const lineH_4 = height / 20;
const lineH_5 = height / 22;
const lineH_6 = height / 26;
const lineH_7 = height / 32;

export const getFontFamily = (lang, bold = false) => {
  if (bold) return { fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins-Bold" };
  else return { fontFamily: lang == "ar" ? "Amiri" : "Poppins" };
};
export const getFontBasicStyle = (lang, bold = false) => {
  if (bold)
    return {
      fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      fontSize: lang == "ar" ? size_4 : size_7,
      lineHeight: lang == "ar" ? lineH_3 : lineH_5,
    };
  else
    return {
      fontFamily: lang == "ar" ? "Amiri" : "Poppins",
      fontSize: lang == "ar" ? size_5 : size_7,
      lineHeight: lang == "ar" ? lineH_3 : lineH_4,
    };
};
export const getTitleFontBasicStyle = (lang) => {
  return {
    fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
    fontSize: lang == "ar" ? size_1 : size_2,
    lineHeight: lang == "ar" ? lineH_1 : lineH_2,
  };
};
export const getSubTitleFontBasicStyle = (lang) => {
  return {
    fontFamily: lang == "ar" ? "Amiri" : "Poppins",
    fontSize: lang == "ar" ? size_4 : size_6,
    lineHeight: lang == "ar" ? lineH_3 : lineH_4,
  };
};
export const getSideTitleFontBasicStyle = (lang, bIsBold = true) => {
  if (bIsBold) {
    return {
      fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
      fontSize: lang == "ar" ? size_6 : size_7,
      lineHeight: lang == "ar" ? lineH_4 : lineH_5,
    };
  } else {
    return {
      fontFamily: lang == "ar" ? "Amiri" : "Poppins",
      fontSize: lang == "ar" ? size_6 : size_7,
      lineHeight: lang == "ar" ? lineH_4 : lineH_5,
    };
  }
};
export const getContentFontBasicStyle = (lang) => {
  return {
    fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins",
    fontSize: lang == "ar" ? size_6 : size_8,
    lineHeight: lang == "ar" ? lineH_5 : lineH_7,
  };
};
export const getFootNoteFontBasicStyle = (lang) => {
  return {
    fontFamily: lang == "ar" ? "Amiri_Bold" : "Poppins-Bold",
    fontSize: lang == "ar" ? size_10 : size_9,
    lineHeight: lang == "ar" ? lineH_6 : lineH_6,
  };
};
export const getLargeContentFontBasicStyle = (lang) => {
  return {
    fontFamily: lang == "ar" ? "Amiri" : "Poppins",
    fontSize: lang == "ar" ? size_3 : size_6,
    lineHeight: lang == "ar" ? lineH_3 : lineH_4,
  };
};
