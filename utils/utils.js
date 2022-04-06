function getNowDate() {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();

  return `${h}:${m}`;
}

module.exports = {
  getNowDate,
};
