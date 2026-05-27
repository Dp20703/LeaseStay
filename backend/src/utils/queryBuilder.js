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

    const excludedFields = ["keyword", "search", "page", "limit", "sort"];

    excludedFields.forEach((field) => delete queryObj[field]);

    const filterQuery = {};

    if (queryObj.location) {
      filterQuery.location = {
        $regex: queryObj.location,
        $options: "i",
      };
      delete queryObj.location;
    }

    if (queryObj.category) {
      filterQuery.category = queryObj.category;
      delete queryObj.category;
    }

    if (queryObj.propertyType) {
      filterQuery.propertyType = queryObj.propertyType;
      delete queryObj.propertyType;
    }

    if (queryObj.bedrooms) {
      filterQuery.bedrooms = Number(queryObj.bedrooms);
      delete queryObj.bedrooms;
    }

    if (queryObj.bathrooms) {
      filterQuery.bathrooms = Number(queryObj.bathrooms);
      delete queryObj.bathrooms;
    }

    if (queryObj.minPrice || queryObj.maxPrice) {
      filterQuery.price = {};

      if (queryObj.minPrice) {
        filterQuery.price.$gte = Number(queryObj.minPrice);
      }

      if (queryObj.maxPrice) {
        filterQuery.price.$lte = Number(queryObj.maxPrice);
      }

      delete queryObj.minPrice;
      delete queryObj.maxPrice;
    }

    this.query = this.query.find({
      ...queryObj,
      ...filterQuery,
    });

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
