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
      try {
        const res = await axiosSecure.get(
  `/users/role/${encodeURIComponent(user.email)}`,
  {
    headers: {
      authorization: `Bearer ${localStorage.getItem('access-token')}`
    }
  }
);

        return res.data.role;
      } catch (error) {
        console.error("Failed to fetch role:", error);
        return null;
      }
    },
  });

  return [role, loading || roleLoading];
};

export default useRole;
