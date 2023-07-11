import React, { useState } from "react";
import { Pie } from 'react-chartjs-2';

const Home = () => {
    const [loanData, setLoanData] = useState({
        loanAmount: '',
        numberOfYears: '',
        interestRate: '',
    });
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [yearlyPayment, setYearlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const calculateEMI = () => {
        const { loanAmount, numberOfYears, interestRate } = loanData;
        const principle = parseFloat(loanAmount);
        const years = parseFloat(numberOfYears);
        const rate = parseFloat(interestRate) / 100 / 12;
        const monthlyPayment = (principle * rate * Math.pow(1 + rate, years * 12)) / (Math.pow(1 + rate, years * 12) - 1);
        setMonthlyPayment(monthlyPayment.toFixed(2));
        const yearlyPayment = monthlyPayment * 12;
        setYearlyPayment(yearlyPayment.toFixed(2));
        const totalPayment = monthlyPayment * years * 12;
        setTotalPayment(totalPayment.toFixed(2));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        calculateEMI();
    };

    const chartData = {
        labels: ['Monthly Payment', 'Yearly Payment', 'Total Payment'],
        datasets: [
            {
                label: 'Payment Breakdown',
                data: [monthlyPayment, yearlyPayment, totalPayment],
                backgroundColor: ['#0E0101', '#B72294', '#3A4B4A'],
            },
        ],
    };

    return (
        <>
            <div className="container-fluid" style={{backgroundImage: "linear-gradient(to left, #2cbf6f, #00b98a, #00b29f, #00aaab, #17a0b0, #3397a7, #438d9d, #4d8492, #4a7982, #476e73, #456365, #425858)",width:"100%",height:"100vh"}}>
                <div className="row">
                    <div className="col-md-12 d-flex mt-5">
                        <div className="col-md-6 text-center">
                            <div className="card" style={{backgroundColor:"#757B7B"}}>
                                <div className="card-body" >
                                    <h1>EMI Loan</h1>
                                    <div>
                                        <form onSubmit={handleFormSubmit} className="container">
                                            <div className="form-group">
                                                <label htmlFor="loanAmount">Loan Amount:</label>
                                                <input type="text" className="form-control" id="loanAmount" name="loanAmount" onChange={handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="numberOfYears">Number of Years:</label>
                                                <input type="text" className="form-control" id="numberOfYears" name="numberOfYears" onChange={handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="interestRate">Rate of Interest:</label>
                                                <input type="text" className="form-control" id="interestRate" name="interestRate" onChange={handleInputChange} />
                                            </div>

                                            <button type="submit" className="btn btn-danger mt-3">Calculate</button>
                                        </form>

                                        <div className="">
                                            <h2>Monthly Payment: {monthlyPayment}</h2>
                                            <h2>Yearly Payment: {yearlyPayment}</h2>
                                            <h2>Total Payment with Interest: {totalPayment}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                            {monthlyPayment > 0 && (
                                    <div className="text-center" style={{ width: "30%", height: "100%" }}>
                                        <Pie data={chartData} />
                                    </div>
                              

                            )}
                        
                        </div>
                   
                </div>

            </div>
        </>
    );
};

export default Home;
