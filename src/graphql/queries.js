/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      name
      rating
      comment
      user
      productID
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        rating
        comment
        user
        productID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const reviewsByProductID = /* GraphQL */ `
  query ReviewsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        rating
        comment
        user
        productID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      photo {
        url
        publicId
        __typename
      }
      categories
      mainCategory
      sizes {
        value
        stock
        __typename
      }
      color
      description
      reviews {
        items {
          id
          name
          rating
          comment
          user
          productID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      rating
      numReviews
      costo
      price
      priceMayor
      countInStock
      createdAt
      type
      updatedAt
      inOffer
      discountPercentage
      bestSellers
      borrador
      status
      __typename
    }
  }
`;

export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        photo {
          url
          publicId
          __typename
        }
        categories
        mainCategory
        sizes {
          value
          stock
          __typename
        }
        color
        description
        rating
        numReviews
        costo
        price
        priceMayor
        countInStock
        createdAt
        type
        updatedAt
        inOffer
        discountPercentage
        bestSellers
        borrador
        status
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const ProductsByDate = /* GraphQL */ `
  query ProductsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ProductsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        categories
        mainCategory
        sizes {
          value
          stock
          __typename
        }
        color
        description
        photo {
          url
          publicId
          __typename
        }
        rating
        numReviews
        costo
        price
        priceMayor
        countInStock
        createdAt
        type
        updatedAt
        inOffer
        discountPercentage
        bestSellers
        borrador
        status
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const ProductsByCategory = /* GraphQL */ `
  query ProductsByCategory(
    $mainCategory: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ProductsByCategory(
      mainCategory: $mainCategory
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        categories
        mainCategory
        sizes {
          value
          stock
          __typename
        }
        color
        description
        photo {
          url
          publicId
          __typename
        }
        rating
        numReviews
        costo
        price
        priceMayor
        countInStock
        createdAt
        type
        updatedAt
        inOffer
        discountPercentage
        bestSellers
        borrador
        status
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getCategories = /* GraphQL */ `
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
      id
      categoryName
      showInCarousel
      bgColor
      photo {
        url
        publicId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        categoryName
        showInCarousel
        bgColor
        photo {
          url
          publicId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      fullName
      profilePicture
      email
      phoneNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fullName
        profilePicture
        email
        phoneNumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      idUserFilter
      user {
        id
        name
        email
        phoneNumber
        __typename
      }
      orderItems {
        name
        costo
        qty
        image
        price
        id
        __typename
      }
      shippingAddress {
        address
        city
        postalCode
        country
        __typename
      }
      paymentMethod
      paymentResult {
        id
        status
        updateTime
        emailAddress
        __typename
      }
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      paidAt
      isDelivered
      deliveredAt
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idUserFilter
        user {
          id
          name
          email
          phoneNumber
          __typename
        }
        orderItems {
          name
          costo
          qty
          image
          price
          id
          __typename
        }
        shippingAddress {
          address
          city
          postalCode
          country
          __typename
        }
        paymentMethod
        paymentResult {
          id
          status
          updateTime
          emailAddress
          __typename
        }
        taxPrice
        shippingPrice
        totalPrice
        isPaid
        paidAt
        isDelivered
        deliveredAt
        type
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getSettings = /* GraphQL */ `
  query GetSettings($id: ID!) {
    getSettings(id: $id) {
      id
      storeName
      logoImage {
        url
        publicId
        __typename
      }
      coverImage {
        url
        publicId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listSettings = /* GraphQL */ `
  query ListSettings(
    $filter: ModelSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeName
        logoImage {
          url
          publicId
          __typename
        }
        coverImage {
          url
          publicId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const OrdersByDate = /* GraphQL */ `
  query OrdersByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idUserFilter
        user {
          id
          name
          email
          phoneNumber
          __typename
        }
        orderItems {
          name
          costo
          qty
          image
          price
          id
          __typename
        }
        shippingAddress {
          address
          city
          postalCode
          country
          __typename
        }
        paymentMethod
        paymentResult {
          id
          status
          updateTime
          emailAddress
          __typename
        }
        taxPrice
        shippingPrice
        totalPrice
        isPaid
        paidAt
        isDelivered
        deliveredAt
        type
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
