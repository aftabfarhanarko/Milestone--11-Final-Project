import React, { use, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoIosSearch } from "react-icons/io";

const promise = fetch("warehouses.json").then((res) => res?.json());
const MapCover = () => {
  const position = [23.685, 90.3563]; //bangladeh positions
  const mapRef = useRef(null);
  const promis = use(promise);

  const handelSearch = (e) => {
    e.preventDefault();
    const locations = e.target.text.value;

    const distick = promis?.find((d) =>
      d.district.toLowerCase().includes(locations.toLowerCase())
    );

    if (distick) {
      const coord = [distick?.latitude, distick?.longitude];
      mapRef.current.flyTo(coord, 16);
    }
  };

  return (
    <div className="  bg-white p-2 md:p-6 py-5 md:py-6  rounded-xl my-20">
      <h1 className="text-3xl font-bold text-secondary my-10 px-4 md:px-0">
        We are available in 64 districts
      </h1>

      {/* Search Bar - Button sticks to the RIGHT END */}
      <div className="relative  max-w-md mb-10">
        <form
          onSubmit={handelSearch}
          className="flex items-center rounded-full border border-gray-300 bg-white px-6 py-3 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-lime-400"
        >
          {/* Icon */}
          <IoIosSearch className="h-5 w-5   font-semibold" />

          {/* Input - takes all space except button */}
          <input
            type="search"
            name="text"
            placeholder="Search here"
            className="mx-4 flex-1 bg-transparent text-base  font-semibold  outline-none"
          />

          {/* Button - ABSOLUTELY STUCK TO THE RIGHT */}
          <button
            type="submit"
            className="absolute z-2 right-0 top-1/2 -translate-y-1/2 rounded-full bg-lime-400 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 text-thried font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-secondary my-10 border-t pt-6 border-base-300">
          We deliver almost all over Bangladesh
        </h3>
      </div>
      {/* Map Continer */}
      <div className="  h-[600px] md:h-[800px]  ">
        <MapContainer
          center={position}
          zoom={7.5}
          scrollWheelZoom={false}
          className=" h-[600px] md:h-[800px] "
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {promis?.map((center) => (
            <Marker
              key={center?.district}
              position={[center?.latitude, center?.longitude]}
            >
              <Popup>
                <strong>{center?.district}</strong> <br />
                <strong>
                  {" "}
                  Services Area : {center?.covered_area?.join(", ")}
                </strong>{" "}
                <br></br>
                <strong>Status : {center?.status ? "Open" : "Off"}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapCover;
