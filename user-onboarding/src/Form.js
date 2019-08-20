import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import Onboarded from './Onboarded'

const Forms = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className="animal-form">
            <h1>Sign Up</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}


                <Field component="select" className="food-select" name="role">
                    <option>Please Choose a Career Field</option>
                    <option value="Front End Developer">Front End Developer</option>
                    <option value="Back End Developer">Back End Developer</option>
                    <option value="UX">UX</option>
                </Field>


                <label className="checkbox-container">
                    Click To Agree to Terms of Service
                <Field type="checkbox" name="terms" checked={values.terms} />
                    <span className="checkmark" />
                </label>
                {touched.terms && errors.terms && (
                    <p className="error">{errors.terms}</p>
                )}

                <button type="submit">Submit!</button>
            </Form>
            <p>On Boarded Users:</p>
            {users.map(users => (
                <Onboarded key={users.id} data={users} />
            ))}
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, terms, role }) {
        return {
            role: role || '',
            terms: terms || false,
            name: name || '',
            email: email || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Username Required'),
        email: Yup.string().required('Email Required'),
        password: Yup.string().required('Password Required'),
        terms: Yup.bool().oneOf([true], 'Accept Or Die')
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                console.log(res)
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
        resetForm()

    }
})(Forms); // currying functions in Javascript

export default FormikForm;