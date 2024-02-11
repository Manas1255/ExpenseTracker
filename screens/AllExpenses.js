import { useContext } from "react";
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses(){
   const expensesCtx = useContext(ExpensesContext);
   return  <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallBackText="No expenses found!"></ExpensesOutput>
}

export default AllExpenses;