import React, { useState } from "react";
// import Home from "../components/Home";
import ExpenseList from "../components/Expense/ExpenseList";
import AddExpenseModal from "../components/Expense/AddExpense";
// import Logout from "../components/Logout/Logout";
import Sidebar from "../components/Navbar/Sidebar";
import dayjs from "dayjs";

const HomePage = () => {
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [modeOfExpense, setModeOfExpense] = useState("");
  const [expenseToEdit, setExpenseToEdit] = useState(null); // For passing expense to modal

  const handleAddExpenseClick = () => {
    setExpenseToEdit(null); // Reset for new entry
    setDate(dayjs().format("DD/MM/YYYY"))
    setShowModal(true); // Open modal for adding a new expense
  };

  return (
    <>
      {showModal && (
        <AddExpenseModal
          date={date}
          setDate={setDate}
          detail={detail}
          setDetail={setDetail}
          amount={amount}
          setAmount={setAmount}
          modeOfExpense={modeOfExpense}
          setModeOfExpense={setModeOfExpense}
          expenses={expenses}
          setExpenses={setExpenses}
          showModal={showModal}
          setShowModal={setShowModal}
          expenseToEdit={expenseToEdit}
          setExpenseToEdit={setExpenseToEdit}
          // addExpense={handleAddExpense}
        />
      )}
      {console.log(date)}
      {console.log(dayjs().format('DD/MM/YYYY'))}

      <ExpenseList
        expenses={expenses}
        setExpenses={setExpenses}
        showModal={showModal}
        setShowModal={setShowModal}
        expenseToEdit={expenseToEdit}
        setExpenseToEdit={setExpenseToEdit}
      />

      <button className="add-expense-btn" onClick={handleAddExpenseClick}>
        + Add Expense
      </button>
    </>
  );
};

export default HomePage;
