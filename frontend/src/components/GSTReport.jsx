import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function GSTReport() {
  const [gst, setGST] = useState({
    purchaseAmount: 0,
    salesAmount: 0,
    inputGST: 0,
    outputGST: 0,
    gstPayable: 0,
  });

  useEffect(() => {
    fetchGSTReport();
  }, []);

  const fetchGSTReport = async () => {
    try {
      const response = await apiClient.get("/reports/gst");
      setGST(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>🧾 GST Report</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <tbody>
          <tr>
            <td>Total Purchase</td>
            <td>₹ {gst.purchaseAmount}</td>
          </tr>

          <tr>
            <td>Total Sales</td>
            <td>₹ {gst.salesAmount}</td>
          </tr>

          <tr>
            <td>Input GST (18%)</td>
            <td>₹ {gst.inputGST}</td>
          </tr>

          <tr>
            <td>Output GST (18%)</td>
            <td>₹ {gst.outputGST}</td>
          </tr>

          <tr>
            <td>
              <strong>GST Payable</strong>
            </td>
            <td>
              <strong>₹ {gst.gstPayable}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GSTReport;