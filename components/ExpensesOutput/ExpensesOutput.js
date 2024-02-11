import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({expenses, expensesPeriod, fallBackText}){
    
    let content = <Text style={styles.infoText}>{fallBackText}</Text>

    if (expenses.length > 0){
        content = <ExpensesList expenses={expenses}></ExpensesList>; 
    }

    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}></ExpensesSummary>
            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary700,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0
    },
    infoText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});