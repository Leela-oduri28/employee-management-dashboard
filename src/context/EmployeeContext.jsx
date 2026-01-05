import { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState(() => {
        const stored = localStorage.getItem("employees");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const addEmployee = (employee) => {
        setEmployees((prev) => [...prev, employee]);
    };

    const updateEmployee = (updated) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === updated.id ? updated : emp))
        );
    };

    const deleteEmployee = (id) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    return (
        <EmployeeContext.Provider
            value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeeContext);
