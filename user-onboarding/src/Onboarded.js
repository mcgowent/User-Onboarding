import React from 'react'

const Onboarded = ({ data }) => {
    return (
        <div className="userCard">
            <span><p>
                Name: {data.name}{" | "}
                Email: {data.email}{" | "}
                Role: {data.role}</p></span>
        </div>
    )
}

export default Onboarded