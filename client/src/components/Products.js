import React, { useEffect, useState } from "react";
import { FormControl, InputGroup, Button,Table} from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";



const Products = () => {

  const history=useHistory()

  const [ProductName,setProductName]=useState("");
  const [ProductPrice,setProductPrice]=useState("");
  const [ProductQuantity,setProductQuantity]=useState("");
  const [ProductDescription,setProductDescriptionn]=useState("");
  const [inputData,setInputData]=useState([])
  const [showResults,setShowResults]=useState(false);


  useEffect(()=>{
    callProductsPage()
  },[])

  const callProductsPage= async ()=>{
        try{
          const res=await fetch("/products",{
            method:"GET",
            headers:{
              "Accept":"application/json",
              "Content-Type" :"application/json"
            },
            credentials:"include",
          })

          const data=await res.json();
          console.log(data.products);
          setInputData(data.products)
         
         
             if (!res.status === 200) {
               const error = new Error(res.error);
               throw error;
             }
        }catch(err){
          console.log(err);
          history.push("/login");
        }
  }

  
  const saveClick= async (e)=>{
      e.preventDefault();
      let dataToSent = {
        ProductName,
        ProductPrice,
        ProductQuantity,
        ProductDescription,
      };
      console.log("dataToSent", dataToSent);
      const res = await fetch("/userproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName,
          ProductPrice,
          ProductQuantity,
          ProductDescription,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Please Fill The Fields Properly");
        console.log("Please Fill The Fields Properly");
      } else {
        window.alert(" Product Added Successfully");
        console.log("Product Added Successfully");
      }
      setProductName("")
      setProductPrice("")
      setProductQuantity("")
      setProductDescriptionn("");
      setShowResults(true)
  }

  return (
    <div className="float-container" style={{ padding: "20px" }}>
      <div
        className="float-child text-center"
        style={{
          width: "40%",
          float: "left",
          padding: "20px",
          marginTop: "90px",
        }}
      >
        <h3
          className="mb-4"
          style={{
            color: "teal",
            textShadow: "3px 3px 5px #2c2c2c",
            textDecoration: "underline",
          }}
        >
          Enter Your Product Details
        </h3>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            autoComplete="off"
            placeholder="Product Name"
            name="productName"
            onChange={(e) => setProductName(e.target.value)}
            value={ProductName}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            autoComplete="off"
            placeholder="Product Price"
            name="productPrice"
            onChange={(e) => setProductPrice(e.target.value)}
            value={ProductPrice}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            placeholder="Quantity"
            name="productQuantity"
            onChange={(e) => setProductQuantity(e.target.value)}
            value={ProductQuantity}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Description"
            name="productDescription"
            onChange={(e) => setProductDescriptionn(e.target.value)}
            value={ProductDescription}
          />
        </InputGroup>
        <div>
          <Button onClick={saveClick} className="mt-3" variant="primary">
            Save Product
          </Button>
        </div>
      </div>

      {showResults === true ? (
        <div
          className="float-child text-center"
          style={{
            width: "50%",
            float: "left",
            padding: "20px",
            marginTop: "90px",
            marginLeft: "120px",
          }}
        >
          

          <h3
            className="mb-4"
            style={{
              color: "teal",
              textShadow: "3px 3px 5px #2c2c2c",
              textDecoration: "underline",
            }}
          >
            Your Products
          </h3>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {inputData.map((Product, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{Product.ProductName}</td>
                    <td>{Product.ProductPrice}</td>
                    <td>{Product.ProductQuantity}</td>
                    <td>{Product.ProductDescription}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
