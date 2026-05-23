import _ from "lodash";

function isValidCoord(posX, posY, posZ) {
  return _.isNumber(posX) && _.isNumber(posY) && _.isNumber(posZ);
}

function isValidMessage(message) {
  return _.isString(message) && message.length > 0;
}

const funcs = {
  isValidCoord: isValidCoord,
  isValidMessage: isValidMessage,
};

export { funcs as default };
