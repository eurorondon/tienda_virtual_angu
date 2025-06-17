import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import amplifyconfig from "../aws-exports";

import {
  ProductsByDate,
  getOrder,
  getProduct,
  getUser,
  listCategories,
  listOrders,
  listProducts,
  listReviews,
  listSettings,
} from "../graphql/queries";
import {
  createCategories,
  createOrder,
  createProduct,
  createReview,
  createUser,
  deleteCategories,
  deleteProduct,
  updateProduct,
} from "../graphql/mutations";

Amplify.configure(amplifyconfig);
const client = generateClient();

export async function userFromDb({
  id,
  fullName,
  profilePicture,
  email,
  phoneNumber,
}) {
  try {
    const res = await client.graphql({
      query: createUser,
      variables: {
        input: {
          id,
          fullName,
          profilePicture,
          email,
          phoneNumber,
        },
      },
    });

    // Verifica y devuelve el resultado o un mensaje de éxito
    return res.data;
  } catch (error) {
    // Manejo de errores: registra el error y retorna un mensaje significativo
    console.error("Error creating user:", error);
    throw new Error("Failed to create user in the database");
  }
}

export async function singleUser(id) {
  const res = await client.graphql({
    query: getUser,
    variables: {
      id,
    },
  });
  return res.data.getUser;
}

export async function newProduct({
  name,
  price,
  description,
  categories,
  responseImageUrl,
  imagePublicId,
}) {
  // if (typeof price !== "number" || isNaN(price)) {
  //   console.error('Error: El valor de "price" no es un número válido.');
  //   throw new Error('Error: El valor de "price" no es un número válido.');
  // }
  const res = await client.graphql({
    query: createProduct,
    variables: {
      input: {
        name,
        price,
        description,
        categories,
        photo: {
          url: responseImageUrl,
          publicId: imagePublicId,
        },
      },
    },
  });
  return res;
}

export async function getProducts() {
  const res = await client.graphql({
    query: listProducts,
    variables: {
      filter: {
        borrador: { ne: true },
      },
    },
  });

  return res.data.listProducts.items;
}

export async function getProductsInOfert() {
  const res = await client.graphql({
    query: listProducts,
    variables: {
      limit: 1000,
      filter: { inOffer: { eq: true } },
    },
  });

  console.log(res.data.listProducts.items);

  return res.data.listProducts.items;
}

export async function getProductsBestSellers() {
  const res = await client.graphql({
    query: listProducts,
    variables: {
      limit: 1000,
      filter: { bestSellers: { eq: true } },
    },
  });

  return res.data.listProducts.items;
}

export async function actualizarRatingProducto({
  productID,
  nuevoRating,
  nuevaCantidad,
}) {
  try {
    const res = await client.graphql({
      query: updateProduct,
      variables: {
        input: {
          id: productID,
          rating: nuevoRating,
          numReviews: nuevaCantidad,
        },
      },
    });

    return res.data.updateProduct;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw new Error("No se pudo actualizar el producto");
  }
}

export async function productDetails(id) {
  const res = await client.graphql({
    query: getProduct,
    variables: {
      id,
    },
  });
  return res.data.getProduct;
}

export async function deleteProductFunction(id) {
  const res = await client.graphql({
    query: deleteProduct,
    variables: { input: { id } },
  });
  return res;
}

export async function updateProductFunction(id) {}

export async function newCategory({ categoryName, description }) {
  // if (typeof price !== "number" || isNaN(price)) {
  //   console.error('Error: El valor de "price" no es un número válido.');
  //   throw new Error('Error: El valor de "price" no es un número válido.');
  // }
  const res = await client.graphql({
    query: createCategories,
    variables: {
      input: {
        categoryName,
        description,
      },
    },
  });
  return res;
}

export async function getCategories() {
  const res = await client.graphql({
    query: listCategories,
    variables: {},
  });

  return res.data.listCategories.items;
}

export async function deleteCategory(id) {
  const res = await client.graphql({
    query: deleteCategories,
    variables: { input: { id } },
  });
  return res;
}

export async function getCategoria(id) {
  const res = await client.graphql({
    query: listCategories,
    variables: { id },
  });

  return res.data.getCategories;
}

export async function ListProductsByDate() {
  const res = await client.graphql({
    query: ProductsByDate,
    variables: {
      type: "Producto",
      sortDirection: "DESC",
      limit: 50,
      filter: {
        countInStock: { gt: 0 }, // 👈 Filtra solo productos con stock mayor a 0
      },
    },
  });

  return res.data.ProductsByDate.items;
}

export async function newOrder(orderData) {
  console.log("esto es lo que llega ", orderData.shippingAddress.address);
  try {
    const res = await client.graphql({
      query: createOrder,
      variables: {
        input: {
          idUserFilter: orderData.user.id,
          user: {
            id: orderData.user.id,
            name: orderData.user.fullName,
            email: orderData.user.email,
            phoneNumber: orderData.user.phoneNumber,
            // Otros campos de usuario si es necesario
          },
          isPaid: orderData.isPaid,
          isDelivered: false,
          totalPrice: orderData.totalPrice,
          shippingAddress: {
            address: orderData.shippingAddress.address,
            city: orderData.shippingAddress.city,
            postalCode: orderData.shippingAddress.postalCode,
            country: orderData.shippingAddress.country,
          },
          orderItems: orderData.orderItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            costo: item.costo,
            id: item.id,
            // Otros campos de OrderItem si es necesario
          })),
        },
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrders(id) {
  try {
    const res = await client.graphql({
      query: listOrders,
      variables: {
        filter: { idUserFilter: { eq: id } },
      },
    });

    // Verificar si la respuesta contiene datos y órdenes
    if (res.data && res.data.listOrders && res.data.listOrders.items) {
      return res.data.listOrders.items;
    } else {
      throw new Error("No se encontraron órdenes.");
    }
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error; // Re-lanzar el error después de registrarlo
  }
}

export async function singleOrder(id) {
  try {
    const res = await client.graphql({
      query: getOrder,
      variables: { id },
    });

    return res.data.getOrder;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllSettings() {
  const res = await client.graphql({
    query: listSettings,
    variables: {},
  });

  return res.data.listSettings.items;
}

export async function getReviews(productID) {
  const res = await client.graphql({
    query: listReviews,
    variables: {
      filter: { productID: { eq: productID } },
    },
  });

  return res.data.listReviews.items;
}

export async function newReview({ name, rating, comment, user, productID }) {
  const res = await client.graphql({
    query: createReview,
    variables: {
      input: {
        name,
        rating,
        comment,
        user,
        productID,
      },
    },
  });
  return res;
}

export async function crearReviewYActualizarProducto({
  name,
  rating,
  comment,
  user,
  productID,
}) {
  // 1. Crear la reseña
  const reviewRes = await client.graphql({
    query: createReview,
    variables: {
      input: { name, rating, comment, user, productID },
    },
  });

  // 2. Obtener el producto actual (para saber reviews existentes)
  const productoRes = await client.graphql({
    query: getProduct,
    variables: { id: productID },
  });

  const producto = productoRes.data.getProduct;

  // 3. Calcular nuevo rating y total de reviews
  const totalActual = producto.numReviews || 0;
  const ratingActual = producto.rating || 0;
  const nuevoTotal = totalActual + 1;
  const nuevoRating = (ratingActual * totalActual + rating) / nuevoTotal;

  // 4. Actualizar producto
  await client.graphql({
    query: updateProduct,
    variables: {
      input: {
        id: productID,
        rating: nuevoRating,
        numReviews: nuevoTotal,
      },
    },
  });

  return reviewRes.data.createReview;
}
