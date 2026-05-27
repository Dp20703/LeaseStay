class QueryBuilder {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery = this.mongooseQuery.find({
        $text: {
          $search: this.queryString.keyword,
        },
      });
    }

    return this;
  }

  filter() {
    const queryObj = {
      ...this.queryString,
    };

    const excludedFields = ["keyword", "search", "page", "limit", "sort"];

    excludedFields.forEach((field) => delete queryObj[field]);

    const filterQuery = {};

    /* LOCATION */

    if (queryObj.location) {
      filterQuery.location = {
        $regex: queryObj.location,

        $options: "i",
      };

      delete queryObj.location;
    }

    /* CATEGORY */

    if (queryObj.category) {
      filterQuery.category = queryObj.category;
      delete queryObj.category;
    }

    /* PROPERTY TYPE */

    if (queryObj.propertyType) {
      filterQuery.propertyType = queryObj.propertyType;

      delete queryObj.propertyType;
    }

    /* BEDROOMS */

    if (queryObj.bedrooms) {
      filterQuery.bedrooms = Number(queryObj.bedrooms);

      delete queryObj.bedrooms;
    }

    /* BATHROOMS */

    if (queryObj.bathrooms) {
      filterQuery.bathrooms = Number(queryObj.bathrooms);

      delete queryObj.bathrooms;
    }

    /* PRICE */

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

    /* AVAILABILITY */

    if (queryObj.availabilityStatus) {
      filterQuery.availabilityStatus = queryObj.availabilityStatus;

      delete queryObj.availabilityStatus;
    }

    /* STATUS */

    if (queryObj.status) {
      filterQuery.status = queryObj.status;
      delete queryObj.status;
    }

    this.mongooseQuery = this.mongooseQuery.find({
      ...queryObj,
      ...filterQuery,
    });

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.mongooseQuery = this.mongooseQuery.sort(this.queryString.sort);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  paginate(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.mongooseQuery = this.mongooseQuery.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default QueryBuilder;
