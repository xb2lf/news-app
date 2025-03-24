/*
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-03-23 18:07:41
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-23 18:07:55
 * @Description: 
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};