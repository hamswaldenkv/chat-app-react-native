/* eslint-disable no-undef */
export function capitalizeWord(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}

export function truncateString(str, limit) {
  if (str.length > limit) {
    return str.slice(0, limit) + '...';
  } else {
    return str;
  }
}

export function removeLineBreaks(str) {
  return str.replace(/(\r\n|\n|\r)/gm, '');
}

export function classificationAgeText(key) {
  let parts = {};
  parts['all'] = '+ 3 ans';
  parts['12'] = '+ 12 ans';
  parts['16'] = '+ 16 ans';

  return parts[`${key}`];
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isNullOrEmpty(myStr) {
  try {
    if (myStr == null || myStr == undefined) return null;
    return myStr === null || myStr.trim() === '';
  } catch (error) {
    return true;
  }
}

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function slugify(text = 'hello world') {
  return text.trim().replace(/\W+/g, '-').toLowerCase();
}