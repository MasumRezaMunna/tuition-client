import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isLoading: roleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return [role, loading || roleLoading];
};

export default useRole;
