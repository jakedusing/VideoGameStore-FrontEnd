import axios from "axios";
import { useState, useEffect } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost8080/api/reports/daily-sales")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);
};

export default SalesReport;
