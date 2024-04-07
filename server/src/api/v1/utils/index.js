/**
 *
 * @param {object} obj
 * @returns {object} new Object
 * @description - This method removes any undefined and null values keys from object and return new object
 */
const removerUndefinedKeysFromObj = (obj = {}) => {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.map((k) => {
    if (obj[k] && obj[k] !== false) newObj[k] = obj[k];
  });

  return newObj;
};

module.exports = {
  removerUndefinedKeysFromObj,
};
