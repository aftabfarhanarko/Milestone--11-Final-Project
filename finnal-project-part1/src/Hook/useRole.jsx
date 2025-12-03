import useAuth from "./useAuth";
import useAxiosSecoir from "./useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecoir = useAxiosSecoir();
  const { data:role = "user", isLoading:roleLoding } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const data = await axiosSecoir.get(`users/${user?.email}/role`)
      return data.data.role;
    },
  });
  
  return { roleLoding, role };
};

export default useRole;
