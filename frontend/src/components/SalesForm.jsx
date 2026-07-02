import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function SalesForm({ fetchSales }) {
  const [companies, setCompanies] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  const [companyId, setCompanyId] = useState("");
  const [ledgerId, setLedgerId] = useState("");
  const [stockItemId, setStockItemId] = useState("");

  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await apiClient.get("/company");
      setCompanies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCompanyData = async (id) => {
    setCompanyId(id);

    try {
      const ledgerRes = await apiClient.get(
        `/ledger?companyId=${id}`
      );

      setLedgers(ledgerRes.data);

      const stockRes = await apiClient.get(
        `/stock?companyId=${id}`
      );

      setStockItems(stockRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const amount =
    Number(quantity || 0) * Number(rate || 0);

  const saveSales = async () => {
    if (
      !companyId ||
      !ledgerId ||
      !stockItemId ||
      !quantity ||
      !rate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiClient.post("/sales/create", {
        companyId,
        ledgerId,
        stockItemId,
        quantity,
        rate,
      });

      alert("Sales Voucher Saved");

      setLedgerId("");
      setStockItemId("");
      setQuantity("");
      setRate("");

      fetchSales(companyId);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed");
      }
    }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>Create Sales Voucher</h2>

      <select
        value={companyId}
        onChange={(e) =>
          loadCompanyData(e.target.value)
        }
      >
        <option value="">Select Company</option>

        {companies.map((company) => (
          <option
            key={company.id}
            value={company.id}
          >
            {company.companyName}
          </option>
        ))}
      </select>

      <br /><br />

      <select
        value={ledgerId}
        onChange={(e) =>
          setLedgerId(e.target.value)
        }
      >
        <option value="">Select Customer</option>

        {ledgers.map((ledger) => (
          <option
            key={ledger.id}
            value={ledger.id}
          >
            {ledger.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select
        value={stockItemId}
        onChange={(e) =>
          setStockItemId(e.target.value)
        }
      >
        <option value="">Select Stock Item</option>

        {stockItems.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.itemName}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Rate"
        value={rate}
        onChange={(e) =>
          setRate(e.target.value)
        }
      />

      <br /><br />

      <h3>Amount : ₹ {amount}</h3>

      <button onClick={saveSales}>
        Save Sales
      </button>
    </div>
  );
}

export default SalesForm;