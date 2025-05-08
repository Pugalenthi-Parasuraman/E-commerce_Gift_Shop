import { Fragment, useEffect, useState } from "react";
import Sidebar from "./SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productAction";
import { clearError, clearProductUpdated } from "../../Slices/productSlice";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [duplicatePrice, setDuplicatePrice] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Personalized Gifts",
    "Birth days",
    "Anniversary",
    "Valentine's Day",
    "Christmas snow",
    "Gifts for Him",
    "Wedding Day",
    "Diwali Spark",
    "Gifts for Her",
    "Children Gifts",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch(navigate);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("duplicatePrice", duplicatePrice);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductUpdated()),
      });
      setImages([]);
      return;
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch, productId]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setDuplicatePrice(product.duplicatePrice);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);
      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Fragment>
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Update Product
            </h1>
            <form onSubmit={submitHandler} className="space-y-4">
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="DuplicatePrice"
                value={duplicatePrice}
                onChange={(e) => setDuplicatePrice(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <textarea
                className="w-full border rounded-md p-2"
                rows="4"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <select
                className="w-full border rounded-md p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Seller Name"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
              <input
                type="file"
                multiple
                className="w-full border rounded-md p-2"
                onChange={onImagesChange}
              />
              {imagesPreview.length > 0 && (
                <button
                  type="button"
                  className="mt-2 flex items-center gap-2"
                  onClick={clearImagesHandler}
                >
                  <p className="text-xs font-semibold font-inter">
                    Delete Images
                  </p>
                  <FaTrashAlt className="text-red-500 " />
                </button>
              )}
              <div className="flex gap-2 mt-2">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Preview"
                    className="w-16 h-16 object-cover border rounded-md"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
