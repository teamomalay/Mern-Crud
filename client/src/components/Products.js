import React, { useState } from "react";
import { FormControl, InputGroup, Button,Table} from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";



const Products = () => {
  const [productName,setProductName]=useState("");
  const [productPrice,setProductPrice]=useState("");
  const [productQuantity,setProductQuantity]=useState("");
  const [productDescription,setProductDescriptionn]=useState("");
  const [inputData,setInputData]=useState([])
  const [showResults,setShowResults]=useState(false);

  const arr={productName,productPrice,productQuantity,productDescription};

  
  const saveClick= async (e)=>{
      e.preventDefault();
      setInputData([...inputData,arr]);
      // const {productName,productPrice,productQuantity,setProductDescription}=[inputData]
      const res=await fetch("/userproducts",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({productName,productPrice,productQuantity,productDescription})
      })
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Invalid Details");
        console.log("Invalid Details");
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
    <div className="float-container" style={{padding:"20px"}}>
      <div
        className="float-child text-center"
        style={{ width:"40%",float:"left",padding
        :"20px",marginTop:"90px"}}
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
            onChange={(e)=>setProductName(e.target.value)}
            value={productName}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            autoComplete="off"
            placeholder="Product Price"
            name="productPrice"
            onChange={(e)=>setProductPrice(e.target.value)}
            value={productPrice}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            placeholder="Quantity"
            name="productQuantity"
            onChange={(e)=>setProductQuantity(e.target.value)}
            value={productQuantity}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Description"
            name="productDescription"
            onChange={(e)=>setProductDescriptionn(e.target.value)}
            value={productDescription}
          />
        </InputGroup>
        <div>
          <Button onClick={saveClick} className="mt-3" variant="primary">
            Save Product
          </Button>
        </div>
      </div>

    { showResults===true? <div className="float-child text-center" style={{ width:"50%",float:"left",padding
        :"20px",marginTop:"90px",marginLeft:"120px"}}> 
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
         {
          inputData.map((product,id)=>{
             return(
               <tr key={id}>
                 <td>{id}</td>
                 <td>{product.productName}</td>
                 <td>{product.productPrice}</td>
                 <td>{product.productQuantity}</td>
                 <td>{product.productDescription}</td>
               </tr>
             )
           })
         }
       </tbody>

     </Table>
     </div> : null}
    </div>
  );
};

export default Products;
