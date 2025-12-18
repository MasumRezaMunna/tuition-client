import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeRole = (user, newRole) => {
    Swal.fire({
      title: `Make ${user.name} a ${newRole}?`,
      text: "They will gain access to new features.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${newRole}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${user._id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: `${user.name} is now a ${newRole}.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center my-4">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <h2 className="text-xl">Total Users: {users.length}</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/hYsm3Dq/default-user.png"
                          }
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-primary">Admin</span>
                  ) : user.role === "tutor" ? (
                    <span className="badge badge-secondary">Tutor</span>
                  ) : (
                    <span className="badge badge-ghost">Student</span>
                  )}
                </td>
                <td className="space-x-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeRole(user, "admin")}
                      className="btn btn-xs btn-primary tooltip"
                      data-tip="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                  )}
                  ser.role !== 'tutor' && (
                  <button
                    onClick={() => handleMakeRole(user, "tutor")}
                    className="btn btn-xs btn-secondary tooltip"
                    data-tip="Make Tutor"
                  >
                    <FaChalkboardTeacher />
                  </button>
                  )
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-xs text-red-600 text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
