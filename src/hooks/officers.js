import { directus } from "@/lib";
import { useQuery } from "react-query";

export const useOfficers = ({ query, queryKey, options } = {}) => {
  return useQuery({
    queryFn: async () => {
      const res = await directus.items("officers").readByQuery(query);
      //   console.log(res);
      return res;
    },
    queryKey,
    ...options,
  });
};
