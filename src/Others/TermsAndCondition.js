import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
    return (
        <div>
            <h1>Here is our terms and conditions </h1>
            <p>Go back to: <Link to='/register' >Register</Link> </p>
        </div>
    );
};

export default TermsAndCondition;