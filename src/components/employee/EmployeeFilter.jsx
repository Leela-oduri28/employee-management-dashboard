export default function EmployeeFilters({
    search,
    setSearch,
    gender,
    setGender,
    status,
    setStatus,
}) {
    return (
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">All Genders</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    );
}
