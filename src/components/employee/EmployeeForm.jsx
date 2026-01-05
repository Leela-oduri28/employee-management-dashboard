
import { useEffect, useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";

const STATES = ["Telangana", "Karnataka", "Maharashtra", "Tamil Nadu"];

export default function EmployeeForm({ editingEmployee, onClose }) {
    const { addEmployee, updateEmployee } = useEmployees();

    const [form, setForm] = useState({
        id: null,
        name: "",
        gender: "",
        dob: "",
        state: "",
        isActive: "",
        image: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (editingEmployee) {
            setForm(editingEmployee);
        }
    }, [editingEmployee]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.gender || !form.state) {
            setError("Please fill all required fields");
            return;
        }

        if (editingEmployee) {
            updateEmployee(form);
        } else {
            addEmployee({ ...form, id: Date.now() });
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
            />

            <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>

            <input type="date" name="dob" value={form.dob} onChange={handleChange} />

            <select name="state" value={form.state} onChange={handleChange}>
                <option value="">Select State</option>
                {STATES.map((s) => (
                    <option key={s}>{s}</option>
                ))}
            </select>

            <label>
                <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                />
                Active
            </label>

            <input type="file" accept="image/*" onChange={handleImage} />

            {form.image && (
                <img src={form.image} alt="preview" width="80" height="80" />
            )}

            <div>
                <button type="submit">
                    {editingEmployee ? "Update" : "Add"}
                </button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    border: "1px solid #ddd",
    padding: 20,
    marginTop: 20,
    width: 300,
};
