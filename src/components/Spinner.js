import React from 'react'
import loading from './loading.gif';
const Spinner = () => {
    return (
        <div className="flex align-center justify-center">
            <img className="w-1/4" src={loading}></img>
        </div>
    )
}

export default Spinner

