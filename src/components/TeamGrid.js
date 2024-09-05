/* This example requires Tailwind CSS v2.0+ */
import Officer from "./Officer";
import { useOfficers } from "@/hooks/officers";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { Inter, Lexend } from "next/font/google";
const inter = Lexend({ subsets: ["latin"] });
export default function Example() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({ fields: "*" });
  const { data, isLoading } = useOfficers({
    queryKey: ["Officers", query],
    query: query,
    options: { keepPreviousData: true },
  });

  useEffect(() => {
    let payload = {};
    if (search) {
      payload = { ...query, search };
    } else {
      payload = { fields: "*" };
    }
    setQuery(payload);
  }, [search]);
  return (
    <div className={`bg-white ${inter.className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl underline">SK BAIDOO OFFICERS - 2024</h2>
            <input
              type="text"
              name="username"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="username"
              placeholder="Search by Officers Name"
              className="flex-1 focus:ring-gray-500 focus:border-gray-600 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
            />
            <p className="text-md text-gray-700">
              This is an internal tool to help us collect the officers information, Kindly upload officers image if you
              have them
            </p>
          </div>
          {isLoading && (
            <div className="flex justify-center">
              <Loader className="animate-spin" />
            </div>
          )}

          <ul
            role="list"
            className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
          >
            {/* {people.map((person) => (
              <Officer person={person} />
            ))} */}

            {data?.data.map((person) => {
              return <Officer person={person} key={person.id} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
