import React from 'react'
import myImage from "../assets/pic.jpg"
import { useNavigate } from 'react-router-dom'


const AboutUs = () => {
    const navigate=useNavigate();
  return (
    <>
     <section className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 text-center">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">Building Stronger Communities through Collaboration and Empowerment</h2>
                        <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">At PotYourHoles, we believe that safe roads make better communities. Our mission is to provide an easy-to-use platform for citizens to report potholes and get them repaired quickly, ensuring smoother, safer journeys for everyone.

Using cutting-edge technology, we connect local authorities with real-time reports and data insights, helping them prioritize repairs efficiently. Whether it’s tracking problem areas, monitoring repair progress, or simply making your daily commute safer, PotYourHoles is committed to transforming how roads are maintained.

We’re passionate about creating smarter cities and happier citizens—one pothole at a time.</p>
                    </div>
                    <button   onClick={()=> navigate("/Booking")} className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6" >Get Started</span>
                    </button>
                </div>
                <img src={myImage}alt="About Us"className="mx-auto lg:mx-0 rounded-3xl object-cover max-w-full h-auto shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out"
/>

            </div>
        </div>
    </section>
                                            
    </>
  )
}

export default AboutUs