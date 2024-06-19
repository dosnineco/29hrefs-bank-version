
import { useState } from 'react';
import { Formik, Form, Field  } from 'formik';
import styles from './../../comp/styles/Calculator.module.css';
                                                                                                                                                                                                                                                
const FloridaCalculator = () => {
  const [result, setResult] = useState(null);

  const calculateTax = (values) => {
    const federalTaxRate = 0.1; 
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
    <div className={styles.formContainer }>
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
          <Form className={styles.formContainer }>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <Field  className={styles.input}  id="firstName" name="firstName" type="text" />

            <label className={styles.label}  htmlFor="lastName">Last Name</label>
            <Field className={styles.input} id="lastName" name="lastName" type="text" />

            <label className={styles.label}   htmlFor="payRate">Pay Rate ($)</label>
            <Field className={styles.input} id="payRate" name="payRate" type="number" step="0.01" />

            <label  className={styles.label}  htmlFor="hoursWorked">Hours Worked</label>
            <Field className={styles.input} id="hoursWorked" name="hoursWorked" type="number" />

            <label  className={styles.label}  htmlFor="payDate">Pay Date</label>
            <Field className={styles.input} id="payDate" name="payDate" type="date" />

            <label  className={styles.label}  htmlFor="paySchedule">Pay Schedule</label>
            <Field className={styles.input} id="paySchedule" name="paySchedule" as="select">
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Monthly">Monthly</option>
            </Field>

            <label className={styles.label}   htmlFor="bonus">Bonus ($)</label>
            <Field className={styles.input} id="bonus" name="bonus" type="number" step="0.01" />

            <label className={styles.label}   htmlFor="commission">Commission ($)</label>
            <Field className={styles.input} id="commission" name="commission" type="number" step="0.01" />

            <label className={styles.label}   htmlFor="filingStatus">Filing Status</label>
            <Field className={styles.input} id="filingStatus" name="filingStatus" as="select">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </Field> 

            <label  className={styles.label}  htmlFor="allowances">Allowances</label>
            <Field className={styles.input} id="allowances" name="allowances" type="number" />

            <label  className={styles.label}  htmlFor="additionalWithholding">Additional Withholding ($)</label>
            <Field className={styles.input} id="additionalWithholding" name="additionalWithholding" type="number" step="0.01" />

            <button  className={styles.button}   type="submit">Calculate</button>
          </Form>
        )}
      </Formik>

      {result && (
        <div className={styles.successMessag}>
          <h2 className={styles.h2} >Results</h2>
          <ul>
            <li> <strong>Gross Pay:</strong> ${result.grossPay.toFixed(2)}</li>
            <li><strong>Federal Tax:</strong> ${result.federalTax.toFixed(2)}</li>
            <li><strong>Net Pay:</strong> ${result.netPay.toFixed(2)}</li>
          </ul>

        </div>
      )}
    </div>
  );
};

const Texas = () => {
  return(
    <div>
      </FloridaCalculator>
    </div>
  )
};

export default Texas;
