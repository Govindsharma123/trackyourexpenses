import React, { useState, useEffect } from "react";
import "./expenseList.css";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faLightbulb,
  faFilm,
  faCar,
  faUtensils,
  faTv,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import AddExpenseModal from "./AddExpense";
import { getExpenseList } from "../../services/HomeServices/HomeServices";
import { CiEdit } from "react-icons/ci";

const ExpenseList = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  // const [showModal, setShowModal] = useState(false);

  const uid = localStorage.getItem("uid");
  const year = dayjs().format("YYYY");
  const month = dayjs().format("MMM");
  const date = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);

      try {
        const expenseList = await getExpenseList(uid);
        // console.log('expense List: ', expenseList)
        props.setExpenses(expenseList);
      } catch (error) {
        console.log("error in fetching expense list", error);
        props.setExpenses([]); // Ensure empty array in case of error
      }
      setLoading(false);
    };
    fetchExpenses();
  }, []);

  // Function to assign icons based on expense type
  const getIconForType = (category) => {
    switch (category.toLowerCase()) {
      case "groceries":
        return faShoppingCart;
      case "utilities":
        return faLightbulb;
      case "entertainment":
        return faFilm;
      case "transportation":
        return faCar;
      case "dining out":
        return faUtensils;
      case "subscriptions":
        return faTv;
      case "rent":
        return faHome;
      default:
        return faShoppingCart; // Default icon
    }
  };

  // Calculate total expenses
  let totalExpenses = props.expenses?.reduce(
    (acc, expense) => acc + parseFloat(expense.amount) || 0,
    0
  );
  totalExpenses =
    typeof totalExpenses === "number"
      ? totalExpenses
      : parseFloat(totalExpenses) || 0;

  const getTotalAmountColor = () => {
    if (totalExpenses < 500) return "#81ecec"; // Pastel teal
    if (totalExpenses < 1000) return "#ffeaa7"; // Pastel yellow
    return "#fab1a0"; // Pastel peach
  };

    // Handle edit
    const handleEdit = (expense) => {
      console.log(expense)
      props.setExpenseToEdit(expense); // Pass the selected expense to modal
      props.setShowModal(true); // Open modal
    };

  return (
    <div className="expense-page">
      {/* Total Expense Section */}
      <header className="total-expense">
        <div className="total-expense-card">
          <h2>Total Expenses</h2>
          <p className="total-amount" style={{ color: getTotalAmountColor() }}>
            {" "}
            ₹ {Number(totalExpenses).toFixed(2)}
          </p>
        </div>
      </header>

      {/* Expense List Section */}
      <section className="expense-list">
        <h3>Recent Expenses</h3>
        <div className="expense-items">
          {loading ? (
            <p>Loading...</p>
          ) : props.expenses.length === 0 ? (
            <p>No expenses available</p>
          ) : (
            props.expenses.map((expense) => (
              <div className="expense-card" key={expense.id}>
                <div className="expense-icon">
                  <FontAwesomeIcon icon={getIconForType(expense.detail)} />
                </div>
                <div className="expense-info">
                  <div className="expense-date">
                    {dayjs(expense.date).format("DD MMM YYYY")}
                  </div>
                  <div>
                  <CiEdit onClick={()=>handleEdit(expense)} style={{cursor:'pointer'}}/>
                  </div>
                  <div className="expense-type">{expense.detail}</div>
                  <div className="expense-amount">₹ {expense.amount}</div>
                  <div className="expense-category"> {expense.category}</div>
                  <div className="expense-mode">{expense.modeOfExpense}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
{/* 
      {showModal && (
        <AddExpenseModal 
          expenseToEdit={selectedExpense}
          setShowModal={setShowModal}
          setExpenses={setExpenses}
        />
      )} */}
    </div>
  );
};

export default ExpenseList;
