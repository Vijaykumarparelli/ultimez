import axios from "axios";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";

const AddedList = ({ state, setState }) => {
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      let res = await axios.get("https://lobster-app-ddwng.ondigitalocean.app/product/list", {
        headers: {
          api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
        },
      });
      if (res.data.status) {
        setState((prev) => ({
          ...prev,
          added_list: res.data.message,
          filter_data: res.data.message,
        }));
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Product ID",
      selector: (row) => row._id,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
    },
    {
      name: "Original Price",
      selector: (row) => row.original_price,
    },
    {
      name: "Sale Price",
      selector: (row) => row.sale_price,
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
  ];
  const onFilter = (e) => {
    setState((prev) => ({
      ...prev,
      filter: e.target.value,
      filter_data: prev.added_list.filter((eachProd) => {
        return eachProd.product_name.toLowerCase().match(e.target.value.toLowerCase());
      }),
    }));
  };

  createTheme(
    "dark_theme",
    {
      text: {
        primary: "#268bd2",
        secondary: "#1b54c4",
      },
      background: {
        default: "#141b23;",
      },
    },
    "dark"
  );
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#101339",
      },
    },
    headCells: {
      style: {
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        color: "#fff",
        opacity: "0.7",
      },
    },
  };
  return (
    <div className='list-container'>
      <div className='d-flex'>
        <h4>All Products</h4>
        <input type='text' placeholder='Search here' value={state.filter} onChange={onFilter} />
      </div>
      <DataTable
        columns={columns}
        data={state.filter_data}
        pagination
        selectableRowsHighlight
        highlightOnHover
        keyField='_id'
        pointerOnHover
        theme='dark_theme'
        customStyles={customStyles}
      />
    </div>
  );
};
export default AddedList;
