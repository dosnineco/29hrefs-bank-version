import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './styles/Calculator.module.css';

const Calculator = ({tax}) => {
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const steps = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'payRate', label: 'Pay Rate ($)', type: 'number', step: '0.01' },
    { name: 'hoursWorked', label: 'Hours Worked', type: 'number' },
    { name: 'payDate', label: 'Pay Date', type: 'date' },
    { name: 'paySchedule', label: 'Pay Schedule', type: 'select', options: ['Weekly', 'Biweekly', 'Monthly'] },
    { name: 'bonus', label: 'Bonus ($)', type: 'number', step: '0.01' },
    { name: 'commission', label: 'Commission ($)', type: 'number', step: '0.01' },
    { name: 'filingStatus', label: 'Filing Status', type: 'select', options: ['Single', 'Married'] },
    { name: 'allowances', label: 'Allowances', type: 'number' },
    { name: 'additionalWithholding', label: 'Additional Withholding ($)', type: 'number', step: '0.01' },
  ];

  const calculateTax = (values) => {
    const federalTaxRate = tax; 
    const grossPay = values.payRate * values.hoursWorked;
    const federalTax = grossPay * federalTaxRate;
    const netPay = grossPay - federalTax;

    setResult({
      grossPay,
      federalTax,
      netPay,
    });
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          payRate: 0,
          hoursWorked: 0,
          payDate: '',
          paySchedule: 'Weekly',
          bonus: 0,
          commission: 0,
          filingStatus: 'Single',
          allowances: 0,
          additionalWithholding: 0,
        }}
        onSubmit={calculateTax}
      >
        {({ values }) => (
          <Form className={styles.form}>
            {step < steps.length && (
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor={steps[step].name}>{steps[step].label}</label>
                {steps[step].type === 'select' ? (
                  <Field className={styles.input} id={steps[step].name} name={steps[step].name} as="select">
                    {steps[step].options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Field>
                ) : (
                  <Field className={styles.input} id={steps[step].name} name={steps[step].name} type={steps[step].type} step={steps[step].step} />
                )}
                <button className={styles.button} type="button" onClick={() => setStep(step + 1)}>Next</button>
              </div>
            )}
            {step === steps.length && (
              <button className={styles.button} type="submit">Calculate</button>
            )}
          </Form>
        )}
      </Formik>

      {result && (
        <div className={styles.resultContainer}>
          <h2 className={styles.h2}>Results</h2>
          <ul>
            <li><strong>Gross Pay:</strong> ${result.grossPay.toFixed(2)}</li>
            <li><strong>Federal Tax:</strong> ${result.federalTax.toFixed(2)}</li>
            <li><strong>Net Pay:</strong> ${result.netPay.toFixed(2)}</li>
          </ul>
        </div>
      )}

      <button className={styles.toggleButton} onClick={() => setStep(0)}>
        {step < steps.length ? 'Retract Form' : 'Expand Form'}
      </button>
    </div>
  );
};

export default Calculator;
