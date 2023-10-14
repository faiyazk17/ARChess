import React from 'react';
import './contact.css';
import { Navbar } from '../../navbar';

const Contact = () => {

    return (
        <div className="contact">
            <Navbar/>
            <div className='contact-main'>
                <div>
                    <h1 className='contact-us'>
                        Contact Us
                    </h1>

                    <div className='contact-info1'>
                        <p>
                            Faiyaz Kazi <br /> github <br /> email@gmail.com
                        </p>
                        <p>
                            Kiarash Mikrkamandari <br /> github <br /> email@gmail.com
                        </p>
                    </div>
                    <div className='contact-info2'>
                        <p>
                            Sidhardh Varma <br /> github <br /> email@gmail.com
                        </p>
                        <p>
                            Sreecharan Billakanti <br /> github <br /> email@gmail.com
                        </p>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Contact;
