import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import { toast } from "sonner";

const Payment = () => {
  const { parcelId } = useParams();

  const axiosSecoir = useAxiosSecoir();

  const { isLoading, data } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const result = await axiosSecoir.get(`parcel/${parcelId}`);
      return result.data.result;
    },
  });

  const handelPayment = async () => {
    try {
      const paymentInfo = {
        totalCost: data.totalCost,
        parcelid: data._id,
        senderemail: data.senderemail,
        percilname: data.percilname,
      };

      const postPayment = await axiosSecoir.post("/checkout", paymentInfo);
      // Redirect to Stripe Checkout
      window.location.href = postPayment.data.url;
      toast.success("Payment Successfully ")
    } catch (error) {
      toast.warning(error?.code);
    }
  };

  if (isLoading) {
    return <Loding></Loding>;
  }

  // console.log(data);

  return (
    <div>
      <h1>
        Payment Payment ${data.totalCost} name : {data.percilname}{" "}
      </h1>
      <button onClick={handelPayment} className="btn btn-primary text-black">
        Payment
      </button>
    </div>
  );
};

export default Payment;
