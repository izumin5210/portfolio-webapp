const fontSizeBase = 16;
/** @see https://ics.media/entry/200317/ */
const fontFamilyBase = '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif';
const fontFamilyNormal = `Lato, ${fontFamilyBase}`;
const fontFamilyHead = `Poppins, ${fontFamilyBase}`;

export const heading1 = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 6}px`,
  lineHeight: 1.167,
};

export const heading2 = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 3.75}px`,
  lineHeight: 1.2,
};

export const heading3 = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 3}px`,
  lineHeight: 1.167,
};

export const heading4 = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 2.125}px`,
  lineHeight: 1.235,
};

export const heading5 = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 1.5}px`,
  lineHeight: 1.334,
};

export const heading6 = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 1.25}px`,
  lineHeight: 1.6,
};

export const body1 = {
  fontFamily: fontFamilyNormal,
  fontSize: `${fontSizeBase}px`,
  lineHeight: 1.5,
};

export const body2 = {
  fontFamily: fontFamilyNormal,
  fontSize: `${fontSizeBase * 0.875}px`,
  lineHeight: 1.43,
};

export const caption = {
  fontFamily: fontFamilyHead,
  fontSize: `${fontSizeBase * 0.75}px`,
  lineHeight: 1.66,
};
