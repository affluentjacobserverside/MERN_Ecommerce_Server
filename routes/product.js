import express from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';
import { addCategory, addProductImage, createProduct, deleteCategory, deleteProduct, deleteProductImage, getAdminProducts, getAllCategories, getAllProducts, getProductsDetails, updateProduct } from '../controllers/product.js';


const router = express.Router();
// get all product
router.get('/all', getAllProducts)
// admin routes
router.get('/admin', isAuthenticated, isAdmin, getAdminProducts);



// get product details & chaining the update product route
router.route('/single/:id')
.get(getProductsDetails)
.put(isAuthenticated, isAdmin, updateProduct)
.delete(isAuthenticated, isAdmin,  deleteProduct);

// create new product
router.post('/new', isAuthenticated, isAdmin,  singleUpload, createProduct)
// add images and delete images
router.route('/images/:id')
.post(isAuthenticated, isAdmin, singleUpload, addProductImage)
.delete(isAuthenticated, isAdmin, deleteProductImage);
// add category
router.post('/category', isAuthenticated, isAdmin, addCategory)
// get all category
router.get('/categories', getAllCategories);
// delete category
router.delete('/category/:id', isAuthenticated, isAdmin, deleteCategory);

//http://localhost:5000/api/product

export default router;
