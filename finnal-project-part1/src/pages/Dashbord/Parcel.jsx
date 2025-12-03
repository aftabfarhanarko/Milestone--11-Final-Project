import React from "react";

// Modern, premium-style Parcel Card UI
// Usage: <ParcelCard parcel={parcel} />

export default function ParcelCard({ p }) {


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-xl rounded-2xl border  border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">

          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Parcel Details</h2>
              <p className="text-sm text-gray-500 mt-2">
                Tracking ID: <span className="font-semibold text-gray-700">{p._id}</span>
              </p>
            </div>

            {/* Weight */}
            <div className="px-4 py-2 bg-gray-50 border rounded-xl text-gray-700 font-medium flex items-center gap-2 text-sm">
              <span>📦 Weight:</span> {p.weight} kg
            </div>
          </div>

          {/* Sender & Receiver */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Sender */}
            <div className="bg-base-300 p-5 border border-base-300 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 bg-white border rounded-full flex items-center justify-center text-gray-600 text-xl">📤</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sender</h3>
                  <p className="text-sm text-gray-500">{p.name}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Detail label="Email" value={p.senderemail} />
                <Detail label="Contact" value={p.contact} />
                <Detail label="Region / District" value={`${p.senderRegion} / ${p.senderdistick}`} />
                <Detail label="Address" value={p.addrss} />
              </div>
            </div>

            {/* Receiver */}
            <div className="bg-base-300 p-5  rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 bg-white border rounded-full flex items-center justify-center text-indigo-600 text-xl">📥</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Receiver</h3>
                  <p className="text-sm text-gray-500">{p.recivername}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Detail label="Email" value={p.reciveremail} />
                <Detail label="Contact" value={p.recivercontact} />
                <Detail label="Region / District" value={`${p.reciverRegion} / ${p.reciverDistrick}`} />
                <Detail label="Address" value={p.reciveraddrss} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t">
            <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full capitalize">
              {p.parcelType}
            </span>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-100 transition">
                Edit
              </button>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
                Mark Delivered
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Detail Component
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-900 font-medium truncate">{value}</p>
    </div>
  );
}

