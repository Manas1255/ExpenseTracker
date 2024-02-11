import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../ExpensesOutput/UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit,submitButtonLabel, defaultValues}){

    const [inputs, setInputs] = useState({
        amount:{value: defaultValues ? defaultValues.amount.toString() : '',
    isValid: true},

        date: {value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true},
        description: {value: defaultValues ? defaultValues.description : '', isValid: true
    }
    });



    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputs((curInputs)=>{
            return {
                ...curInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            };
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount >0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length >0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid){
           // Alert.alert('Invalid Input');
           setInputs((curInputs)=>{
            return{
                amount:{value: curInputs.amount.value, isValid: amountIsValid},
                date:{value: curInputs.date.value, isValid: dateIsValid},
                description:{value: curInputs.description.value, isValid: descriptionIsValid}
            };
           })
            return;
        }

        
        onSubmit(expenseData);
    }
    
    const formIsValid = (!inputs.amount.isValid || !inputs.description.isValid || !inputs.date.isValid);

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
            <Input style={styles.rowInput} invalid={inputs.amount.isValid} label="Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value,
                
            }}></Input>
            <Input invalid={inputs.date.isValid} style={styles.rowInput} label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }}></Input>
            </View>
            <Input invalid={inputs.description.isValid} label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value
            }}></Input>
            {formIsValid && <Text style={styles.errorText}>Invalid inputs</Text>}

            <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel} >Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            
         </View>
        </View>
    );

}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:40
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowInput:{
        flex:1
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
     },
     button:{
        minWidth: 120,
        marginHorizontal:8
     }
});