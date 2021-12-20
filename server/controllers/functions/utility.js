module.exports = {
  DBERROR: (res, err) => {
    return res.status(500).json({ message: `DB 에러 발생: ${err}` });
  },
  createRandomString: () => {
    return Math.random().toString(36).slice(2);
  },
  createRandomNumber: (len = 6) => {
    return Math.random().toFixed(len).toString().slice(2);
  },
};
