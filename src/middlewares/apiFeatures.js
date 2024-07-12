const apiFeatures = {
  paginate:
    (pageSize = 3) =>
    (req, res, next) => {
      let { page, limit } = req.query;

      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      const skip = (page - 1) * limit;

      req.pagination = { limit, skip };
      next();
    },

  sortCategoriesByName: () => (req, res, next) => {
    req.sort = { name: 1 };
    next();
  },
};
export default apiFeatures;
