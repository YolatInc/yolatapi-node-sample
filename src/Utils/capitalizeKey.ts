export const capitalizeKeys = (obj: any) => {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const newKey = capitalizeFirstLetter(key);
      result[newKey] = obj[key];
    }
  }
  return result;
};

function capitalizeFirstLetter(str: any) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
