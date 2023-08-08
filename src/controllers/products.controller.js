import { productManager } from '../dao/ManagerMongo/ProductsManager.js';

const products = async (req, res) => {
  // NUEVA IMPLEMNTACION
  try {
    // PREGUNTO SI LOS PARAMETROS SON NULL, UNDEFINED
    const productByLimit = +req.query.limit || 10;
    const productByPage = +req.query.page || 1;
    const productAvailability = +req.query.stock || '';
    const productBySort = req.query.sort ?? 'asc';
    const productByCategory = req.query.category || '';

    const respuesta = await productManager.getAllProducts(productByLimit, productByPage, productAvailability, productBySort, productByCategory);
    res.status(200).json(
      respuesta

    );
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: `Error al RETORNAR LISTA de productos: ${error.reason} ${error.message}`
    });
  }
};

const productById = async (req, res) => {
  try {
    console.log(req.params.pid);
    const response = await productManager.getProductById(req.params.pid);
    return res.status(response.status).json(response.status, response.payload ? response.payload : response.message);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: `Error al procesar getProductById: ${error.reason}  ${error.message}`
    });
  }
};

export {
  products,
  productById
};
