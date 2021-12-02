module.exports = {
  DBERROR: (res, err) => {
    return res.status(500).json({ message: `DB 에러 발생: ${err}` });
  },
};
