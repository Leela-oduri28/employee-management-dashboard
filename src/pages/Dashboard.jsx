import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeFilters from "../components/employee/EmployeeFilter";


export default function Dashboard() {
    const { employees } = useEmployees();
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const total = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const inactive = total - active;


    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const filteredEmployees = employees
        .filter((e) =>
            e.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((e) => (gender ? e.gender === gender : true))
        .filter((e) =>
            status === ""
                ? true
                : status === "active"
                    ? e.isActive
                    : !e.isActive
        );



    return (
        <div style={{ padding: 40 }}>
            <h1>Employee Dashboard</h1>

            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                <Card title="Total Employees" value={total} />
                <Card title="Active" value={active} />
                <Card title="Inactive" value={inactive} />
            </div>

            <button
                style={{ marginTop: 20 }}
                onClick={() => {
                    setEditingEmployee(null);
                    setShowForm(true);
                }}
            >
                Add Employee
            </button>

            <button
                style={{ marginLeft: 10 }}
                onClick={() => window.print()}
            >
                Print Employees
            </button>


            {showForm && (
                <EmployeeForm
                    editingEmployee={editingEmployee}
                    onClose={() => {
                        setShowForm(false);
                        setEditingEmployee(null);
                    }}
                />
            )}
            <EmployeeFilters
                search={search}
                setSearch={setSearch}
                gender={gender}
                setGender={setGender}
                status={status}
                setStatus={setStatus}
            />

            <EmployeeTable
                employees={filteredEmployees}
                onEdit={(emp) => {
                    setEditingEmployee(emp);
                    setShowForm(true);
                }}
            />

        </div>
    );
}

const Card = ({ title, value }) => (
    <div style={cardStyle}>
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

const cardStyle = {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 6,
    width: 180,
};
