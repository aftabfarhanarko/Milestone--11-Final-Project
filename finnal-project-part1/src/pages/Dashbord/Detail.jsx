import React from 'react';

const Detail = ({ label, value, icon }) => {

  return (
    <div className="flex items-start gap-2">
      {/* Optional Icon */}
      {icon && (
        <span className="text-gray-600 mt-0.5">
          {icon}
        </span>
      )}

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-800 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}


export default Detail;