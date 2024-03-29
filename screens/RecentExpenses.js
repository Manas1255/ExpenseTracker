import { useContext, useEffect, useState } from "react";
import { Text } from "react-native"
import { getEnforcing } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/ExpensesOutput/UI/ErrorOverlay";
import LoadingOverlay from "../components/ExpensesOutput/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";

function RecentExpenses(){
   const [isFetching, setIsFetching] = useState(true);
   const [error, setError] = useState();
   const expensesCtx = useContext(ExpensesContext);


   useEffect(()=>{
      async function getExpenses(){
        setIsFetching(true); 
        try{
         const expenses= await fetchExpense();
         expensesCtx.setExpenses(expenses);
        }
        catch(error){
         setError('Could not fetch expenses!');
        }
        setIsFetching(false);
        
      }
      getExpenses();
   }, []);

   function errorHandler(){
      setError(null);
   }

   if (error && !isFetching){
      return <ErrorOverlay message={error} onConfirm={errorHandler}></ErrorOverlay>
   }
   
   if (isFetching){
      return <LoadingOverlay></LoadingOverlay>
   }

   const recentExpenses = expensesCtx.expenses.filter((expense)=> {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);

      return (expense.date >= date7DaysAgo) && (expense.date <= today);
   })

   return  <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallBackText="No expenses registered for the last 7 days"></ExpensesOutput>
}

export default RecentExpenses;