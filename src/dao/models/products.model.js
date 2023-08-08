import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productCollection = 'Products';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: { type: Number, required: true },
  thumbnail: {
    type: [String],
    default: []
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: false
  }
});
mongoosePaginate.paginate.options = {
  lean: true
};

productSchema.plugin(mongoosePaginate);
mongoose.set('strictQuery', false);
const Products = mongoose.model(productCollection, productSchema);
export default Products;
