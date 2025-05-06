import { useState } from "react";

const useEmiCalculator = () => {
  const [emi, setEmi] = useState(0);
  const [amortization, setAmortization] = useState([]);

  const calculateEmi = ({ principal, interestRate, loanTerm }) => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(loanTerm * 12); // Convert years to months
    const R = annualRate / 12 / 100;

    const emiVal = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    setEmi(emiVal.toFixed(2));

    const schedule = [];
    let balance = P;

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principalPayment = emiVal - interest;
      balance -= principalPayment;

      schedule.push({
        month: i,
        principal: principalPayment.toFixed(2),
        interest: interest.toFixed(2),
        balance: Math.abs(balance).toFixed(2),
      });
    }

    setAmortization(schedule);
  };

  return { emi, amortization, calculateEmi };
};

export default useEmiCalculator;
