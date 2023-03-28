import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios"
import FilterChart from "./FilterChart";
import { Link } from "react-router-dom";
const Chart = () => {
    const [data,setData] = useState([])
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    };


    const handleFileUpload = () => {
      const formData = new FormData();
      formData.append('file', file);
      axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        getData()
      }).catch(error => {
        console.log(error);
      });
    };


const getData = async()=>{
    await axios.get("http://localhost:5000/data").then(res=>{setData(res.data);console.log(res.data)},err=>{console.log(err)})

}


    useEffect(()=>{
        getData()
        
    },[])
  const options = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '100%px',
        columnHeight:"152px",
        endingShape: 'rounded'
      }},
       fill: {
            colors: ['#a45386']
          },
    series: [
      {
        name: "Quantity",
        data: data.map(dt=>dt.Quantity),
      },
    ],
    xaxis: {
      name: "Item_Total",

      categories: data.map(dt=>dt.Item_Total),
    },
  };

  return (
    <React.Fragment>
    <div className="d-flex mt-5 justify-content-center">
    <input className="form-control w-25" type="file" onChange={handleFileChange} />
    <button className="btn ms-2 btn-success" onClick={handleFileUpload}>Upload</button>
    </div>
    <div className="d-flex justify-content-end me-5" >
    <Link className="border border-danger border-2 p-3" to="/filter">Go To Filter Chart Page ↗️</Link>
    </div>
    <hr/>
    <div className="mt-1 pt-2 p-5">
    <h3>Quantity In Total Item  :</h3><p>Only show 70 of 89521 Records</p>
      <ApexCharts options={options} series={options.series} width={"99%"}  type="bar" height={350} />
    </div>
<hr/>
    <div className="px-5 ">
    <table class="table w-100 table-striped table-responsive x-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product_Description</th>
      <th scope="col">Product_ID</th>
      <th scope="col">Order_No</th>
      <th scope="col">Customer_ID</th>
      <th scope="col">Quantity</th>
      <th scope="col">Item_Total</th>

    </tr>
  </thead>
  <tbody>
  {data.map((dt,i)=>(<React.Fragment>
    <tr>
      <td>{i+1}</td>

      <td>{dt.Product_Description}</td>
      <td>{dt.Product_ID}</td>
      <td>{dt.Order_No}</td>
      <td>{dt.Customer_ID}</td>
      <td>{dt.Quantity}</td>
      <td>{dt.Item_Total}</td>

      </tr>
      </React.Fragment>
      
      ))}
    
  </tbody>
</table>
    </div>

    </React.Fragment>
  );
};

export default Chart;
