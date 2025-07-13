const shortid = require("shortid");

const generateShortCode = () => {
  return shortid.generate().slice(0, 6); 
};

module.exports = generateShortCode;
