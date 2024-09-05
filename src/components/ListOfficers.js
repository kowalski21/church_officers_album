import { useOfficers } from "@/hooks/officers";
import React from "react";

const ListOfficers = () => {
  const { data, isLoading } = useOfficers({ queryKey: ["Officers"], query: { fields: "*" } });
  return <div>{data && <div>{JSON.stringify({ data })}</div>}</div>;
};

export default ListOfficers;
