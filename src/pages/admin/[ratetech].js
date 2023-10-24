import React from "react";
import TechnicianCard from "@/components/dashboard/admindashboard/techniciansForRate";
import { useRouter } from "next/router";
import Link from "next/link";

const Rate = () => {
  const route = useRouter();
  const rateId = route.query.ratetech;

  const en_rateId = atob(rateId);

  return (
    <div>
      
      <TechnicianCard rateId={en_rateId} />
    </div>
  );
};

export default Rate;
