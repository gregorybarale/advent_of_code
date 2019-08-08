parseRawRule = rawRules => ({
  pattern: /^([#|\.]{5}) => (#|.)$/gm.exec(rawRules)[1],
  replacement: /^([#|\.]{5}) => (#|.)$/gm.exec(rawRules)[2]
});

module.exports = {
  parseRawRule
};
