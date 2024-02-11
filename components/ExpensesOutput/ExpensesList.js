import { Text,FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData){
    return(
        <ExpenseItem {...itemData.item}></ExpenseItem>
    );

}

function ExpensesList({expenses}){
    return (
        <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item)=> item.id} ></FlatList>
    );
}

export default ExpensesList;