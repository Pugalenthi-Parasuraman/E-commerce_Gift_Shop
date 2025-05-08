import { Fragment, useEffect, useState } from "react";
import Sidebar from "./SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productAction";
import { clearError, clearProductCreated } from "../../Slices/productSlice";
import { toast } from "react-toastify";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duplicatePrice, setDuplicatePrice] = useState("");
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
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
  const dispatch = useDispatch();

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
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    const priceNum = parseFloat(price);
    const duplicatePriceNum = parseFloat(duplicatePrice);

    if (
      !isNaN(priceNum) &&
      !isNaN(duplicatePriceNum) &&
      duplicatePriceNum > 0
    ) {
      const discountCalc =
        ((duplicatePriceNum - priceNum) / duplicatePriceNum) * 100;
      setAutoDiscount(Math.round(discountCalc));
    } else {
      setAutoDiscount(0);
    }

    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
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
  }, [isProductCreated, error, dispatch, navigate, price, duplicatePrice]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Fragment>
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              New Product
            </h1>
            <form
              onSubmit={submitHandler}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Duplicate Price
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setDuplicatePrice(e.target.value)}
                  value={duplicatePrice}
                />
              </div>

              {autoDiscount > 0 && (
                <div className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded w-fit">
                  {autoDiscount}% OFF
                </div>
              )}

              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border rounded-md p-2"
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Seller Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Images</label>
                <input
                  type="file"
                  multiple
                  className="w-full border rounded-md p-2"
                  onChange={onImagesChange}
                />
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default NewProduct;
