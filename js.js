const propertyPriceInput = document.getElementById('propertyPrice');
const initialPaymentInput = document.getElementById('initialPayment');
const creditTermInput = document.getElementById('creditTerm');
const calculateBtn = document.getElementById('calculateBtn');
const interestRateOutput = document.getElementById('interestRate');
const monthlyPaymentOutput = document.getElementById('monthlyPayment');
const loanAmountOutput = document.getElementById('loanAmount');
const taxDeductionOutput = document.getElementById('taxDeduction');
const requiredIncomeOutput = document.getElementById('requiredIncome');



calculateBtn.addEventListener('click', calculateMortgage);

function calculateMortgage() {
  const propertyPrice = parseFloat(propertyPriceInput.value);
  const initialPayment = parseFloat(initialPaymentInput.value);
  const creditTerm = parseInt(creditTermInput.value);

  // Input validation
  if (isNaN(propertyPrice) || propertyPrice < 400000 || propertyPrice > 100000000) {
    alert('Стоимость недвижимости должна быть от 400 000 до 100 000 000 рублей.');
    return;
  }
  if (isNaN(initialPayment) || initialPayment < 200000 || initialPayment >= propertyPrice) {
    alert('Первоначальный взнос должен быть от 200 000 и не выше стоимость недвижимости.');
    return;
  }
  if (isNaN(creditTerm) || creditTerm < 1 || creditTerm > 30) {
    alert('Срок кредита должен быть от 1 до 30 лет.');
    return;
  }
  

  // Расчет процентной ставки
  let interestRate;
  const downPaymentRatio = initialPayment / propertyPrice;
  if (downPaymentRatio < 0.2) {
    interestRate = 18.591 + (0.2 - downPaymentRatio) * (22.504 - 18.591);
  } else {
    interestRate = 18.3;
  }

  // Расчет суммы кредита
  const loanAmount = propertyPrice - initialPayment;
  
  // Расчет месячного платежа
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = creditTerm * 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Расчет налогового вычета (максимум 3 млн. рублей)
  const taxDeduction = Math.min(initialPayment, 3000000);

  // Расчет необходимого дохода (исходя из платежа с запасом 20%)
  const requiredIncome = monthlyPayment * 1.2;

  // Отображение результатов
  interestRateOutput.textContent = `${interestRate.toFixed(2)}%`;
  monthlyPaymentOutput.textContent = `${monthlyPayment.toFixed(2)} ₽`;
  loanAmountOutput.textContent = `${loanAmount.toFixed(2)} ₽`;
  taxDeductionOutput.textContent = `${taxDeduction.toFixed(2)} ₽`;
  requiredIncomeOutput.textContent = `${requiredIncome.toFixed(2)} ₽`;
}
