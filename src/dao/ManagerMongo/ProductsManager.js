import ProductModel from '../models/products.model.js';

class ProductsManager {
  // constructor() {

  // }

  async getAllProducts(limit, page, stock, sort, category) {
    try {
      let productFilter = {};
      if (category) {
        productFilter = { category };
      }
      if (stock) {
        productFilter = { ...productFilter, stock };
      }
      // ORDENO POR DES SOLO SI ASI VIENE POR PARAMETRO CASO CONTRARIO ORDENO POR LO QUE SEA ASC
      let optionsPrice = {};
      if (sort === 'desc') {
        optionsPrice = { price: -1 };
      } else {
        optionsPrice = { price: 1 };
      }

      const optionsLimit = {
        limit,
        page,
        sort
      };
      const productAll = await ProductModel.paginate(productFilter, optionsLimit);

      const payload = productAll.docs;
      const totalPages = productAll.totalPages;
      const prevPage = productAll.prevPage;
      const nextPage = productAll.nextPage;
      // const page = productAll.page;
      const hasPrevPage = productAll.hasPrevPage;
      const hasNextPage = productAll.hasNextPage;
      const prevLink = hasPrevPage
        ? `/api/product?page=${prevPage}&limit${limit}`
        : '';
      const nextLink = hasNextPage
        ? `/api/product?page=${nextPage}&limit${limit}`
        : '';

      return {
        status: 'success',
        payload,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(pid) {
    try {
      const productByID = await ProductModel.findById(pid).lean().exec();
      console.log(pid);
      if (!productByID) {
        return {
          code: 404,
          status: 'error',
          message: `Not Found: No se encontro prudcto con el id ${pid}`
        };
      }
      return {
        code: 200,
        status: 'succses',
        payload: productByID
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const productManager = new ProductsManager();
