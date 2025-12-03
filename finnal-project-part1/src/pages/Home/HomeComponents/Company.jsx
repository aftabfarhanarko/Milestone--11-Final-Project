import React from "react";
import one from "../../../assets/brands/amazon.png";
import one2 from "../../../assets/brands/amazon_vector.png";
import one3 from "../../../assets/brands/casio.png";
import one4 from "../../../assets/brands/moonstar.png";
import one5 from "../../../assets/brands/randstad.png";
import one6 from "../../../assets/brands/star.png";
import one7 from "../../../assets/brands/start_people.png";
import Marquee from "react-fast-marquee";



const Company = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary text-center">
        We've helped thousands of sales teams
      </h1>

      <div>
        <Marquee
          className="flex items-center  mt-15 "
          speed={80}
          gradient={false} // Remove fade
          pauseOnHover={true} // Optional
          loop={0}
        >
          {/* <img src={one}></img> */}
          <img src={one2} className="ml-9 h-5.5"></img>
          <img src={one3} className="ml-9 h-5.5"></img>
          <img src={one4} className="ml-9 h-5.5"></img>
          <img src={one5} className="ml-9 h-5.5"></img>
          <img src={one6} className="ml-9 h-5.5"></img>
          <img src={one7} className="ml-9 h-5.5"></img>
        </Marquee>
      </div>



    </div>
  );
};

export default Company;
