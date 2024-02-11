import { createContext, useReducer } from "react";



export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
    setExpenses: (expenses)=> {}
});

function expensesReducer(state, action){
    switch (action.type){
        case 'ADD':
            //const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex((expense)=> {expense.id === action.payload.id});
            const updateableExpense = state[updateableExpenseIndex];
            const updatedItem = {...updateableExpense, ...action.payload.id};
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex]= updatedItem;
            return updatedExpenses;
            case 'DELETE':
                return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }

}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer,[]);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});

    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
        setExpenses: setExpenses
    };


    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;