import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ApexCharts from "react-apexcharts";

function FilterChart(props) {
    const [filterData,setfilterData] = useState([])
    const [order,setOrder] = useState([])
    const [selctedNo,setSelectNo] = useState([])


    const getFilterData = async()=>{
        await axios.get(`http://localhost:5000/filterData?orderNo=${selctedNo}`).then(res=>{setfilterData(res.data)},err=>{console.log(err)})
      
      }

      const getOrder = async()=>{
        await axios.get("http://localhost:5000/ordernumber").then(res=>{setOrder(res.data)},err=>{console.log(err)})
      
      }

      useEffect(()=>{
        getOrder()
    },[])
    useEffect(()=>{
        getFilterData()
    },[selctedNo])


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
            colors: ['#F44336']
          },
        series: [
          {
            name: "Quantity",
            data: filterData.map(dt=>dt.Quantity),
          },
        ],
        xaxis: {
          name: "Item_Total",
    
          categories: filterData.map(dt=>dt.Item_Total),
        },
      };
    
    return (
        <div>
        <div className="mt-1 p-5">
        <h3>Filter Data by Order Number </h3>
        <select onChange={(e)=>{setSelectNo(e.target.value)}} class="form-select w-25" aria-label="Default select example">
      <option selected>select orderNo and filter</option>
      {order.map(dt=>(

          <option value={dt}>{dt}</option>
      ))}
    </select>
          <ApexCharts options={options} series={options.series} width={"99%"}  type="bar" height={350} />
        </div>
        </div>
    );
}

export default FilterChart;