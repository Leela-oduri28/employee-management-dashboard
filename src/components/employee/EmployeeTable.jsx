import { useEmployees } from "../../context/EmployeeContext";

export default function EmployeeTable({ employees, onEdit }) {
  const { deleteEmployee, updateEmployee } = useEmployees();

  const handleToggle = (emp) => {
    updateEmployee({ ...emp, isActive: !emp.isActive });
  };

  if (employees.length === 0) {
    return <p style={{ marginTop: 20 }}>No employees found.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ marginTop: 20, width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>State</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>
              {emp.image ? (
                <img src={emp.image} width="40" height="40" />
              ) : (
                "N/A"
              )}
            </td>
            <td>{emp.name}</td>
            <td>{emp.gender}</td>
            <td>{emp.dob}</td>
            <td>{emp.state}</td>
            <td>
              {emp.isActive ? "Active" : "Inactive"}
            </td>

            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>{" "}
              <button
                onClick={() => {
                  if (window.confirm("Delete employee?")) {
                    deleteEmployee(emp.id);
                  }
                }}
              >
                Delete
              </button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
