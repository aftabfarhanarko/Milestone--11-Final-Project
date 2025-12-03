import React from 'react';
import error from '../assets/error.png'
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className=' min-h-[80vh] flex justify-center items-center'>
            <div className='text-center'>
                <img src={error}></img>
                <Link to='/'><button className='btn  px-7 font-semibold text-lg py-2 rounded-xl hover:outline-none bg-primary'>Home</button></Link>
            </div>
        </div>
    );
};

export default Error;