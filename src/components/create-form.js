import axios from "axios";
import { useState } from "react";

const CreateForm = ({ setState }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    original_price: "",
    sale_price: "",
    product_type: "",
    description: "",
  });
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://lobster-app-ddwng.ondigitalocean.app/product/add_new", formData, {
        headers: {
          api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
        },
      });
      if (res.data.status) {
        setState((prev) => ({
          ...prev,
          added_list: [...prev.added_list, res.data.message],
        }));
        setFormData({
          product_name: "",
          original_price: "",
          sale_price: "",
          product_type: "",
          description: "",
        });
        return;
      }
      let msg = "";
      Object.entries(res.data.message).map(([v, k]) => {
        msg += k;
      });
      alert(msg);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <div className='form-container'>
      <h2>Create New Product</h2>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Product name' required onChange={onChange} name='product_name' value={formData.product_name} />
        <input
          type='number'
          placeholder='Original Price'
          required
          onChange={onChange}
          name='original_price'
          value={formData.original_price}
        />
        <input type='number' placeholder='Sale Price' required onChange={onChange} name='sale_price' value={formData.sale_price} />
        <input type='number' placeholder='Product Type' required onChange={onChange} name='product_type' value={formData.product_type} />
        <textarea placeholder='Description' required onChange={onChange} name='description' value={formData.description}></textarea>
        <button>Create</button>
      </form>
    </div>
  );
};
export default CreateForm;
