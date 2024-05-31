#!/usr/bin/env node
// OOP MyBank Project
import inquirer from "inquirer";
import chalk from "chalk";
// Bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Withdraw money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`));
        }
        else {
            console.log(chalk.red("Insufficient balance"));
        }
    }
    // Deposit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.green(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`));
    }
    // Check balance
    checkBalance() {
        console.log(chalk.blue(`Current balance: $${this.balance}`));
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(2001, 1500),
    new BankAccount(2002, 2500),
    new BankAccount(2003, 3500),
    new BankAccount(2004, 4000),
    new BankAccount(2005, 5000),
    new BankAccount(2006, 6000)
];
// Create customers
const customers = [
    new Customer("Bilal", "Shaheen", "Male", 26, 3101234567, accounts[0]),
    new Customer("Rizwan", "Ahmed", "Male", 30, 3157654321, accounts[1]),
    new Customer("Sara", "Ali", "Female", 28, 3209876543, accounts[2]),
    new Customer("Ayesha", "Khan", "Female", 25, 3105678901, accounts[3]),
    new Customer("Hassan", "Butt", "Male", 35, 3132345678, accounts[4]),
    new Customer("Fatima", "Zahid", "Female", 32, 3113456789, accounts[5])
];
// Function to interact with bank account
async function service() {
    while (true) {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.yellow(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            const result = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: [
                        "Deposit", "Withdraw", "Check Balance", "Exit"
                    ]
                }
            ]);
            switch (result.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.magenta("Exiting Bank Program..."));
                    console.log(chalk.cyan("\nThank you for using our bank services"));
                    return;
            }
        }
        else {
            console.log(chalk.red("Invalid account number. Please try again."));
        }
    }
}
service();
