import React from "react";
import menu from "../../../assets/reviewQuote.png";
import { SiTarget } from "react-icons/si";

const ReviewCard = ({ data }) => {
  const {
    userName,
    user_photoURL,
    ratings,
    review,
    user_email,
    pick_up_email,
    delivery_email,
    parcel_id,
    date,
  } = data;
  return (
    <div
      className="
        max-w-xl w-full 
        bg-white/80 backdrop-blur-xl
        border border-gray-100 
        shadow-[0_10px_30px_rgba(0,0,0,0.07)]
        rounded-3xl p-7 
        transition-all duration-300 
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)]
        hover:scale-[1.02]
      "
    >
      {/* Top Section: Profile + Rating */}
      <div className="flex justify-between items-start">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src={user_photoURL}
            alt={userName}
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-500">{user_email}</p>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-lg ${
                  index < Math.floor(ratings)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-700 text-sm font-medium">{ratings}</span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed mt-4 text-[15px]">{review}</p>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 my-5"></div>

      {/* Extra Information Box */}
      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm">
        <Info label="Pickup Email" value={pick_up_email} />
        <Info label="Delivery Email" value={delivery_email} />
        <Info label="Parcel ID" value={parcel_id} />
        <Info label="Date" value={new Date(date).toLocaleDateString()} />
      </div>
    </div>
  );
};

function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-700 mb-1.5">
      <span className="font-semibold text-gray-900">{label}:</span>{" "}
      <span className="text-gray-600">{value}</span>
    </p>
  );
}

export default ReviewCard;
