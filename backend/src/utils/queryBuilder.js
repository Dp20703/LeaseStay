class QueryBuilder {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({
        $text: {
          $search: this.queryString.keyword,
        },
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["keyword", "page", "limit", "sort"];

    excludedFields.forEach((field) => delete queryObj[field]);

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginate(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default QueryBuilder;
