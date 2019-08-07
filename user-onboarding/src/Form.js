import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


const Forms = ({ errors, touched, values, handleSubmit, status }) => {
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

                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <label className="checkbox-container">
                    Click To Agree to Terms of Service
                <Field type="checkbox" name="terms" checked={values.terms} />
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit!</button>
            </Form>
            {users.map(users => (
                <p key={users.id}>{users.name}</p>
            ))}

        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
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
        terms: Yup.boolean().oneOf([true])
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                console.log(res)
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }
})(Forms); // currying functions in Javascript

export default FormikForm;