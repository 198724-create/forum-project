import { useMemo, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

const appStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
  color: "#e5e7eb",
  fontFamily: "system-ui, sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
};

const navStyle = {
  display: "flex",
  gap: "1.25rem",
  marginBottom: "1.75rem",
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#93c5fd" : "#e5e7eb",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1rem",
});

const cardStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  borderRadius: "14px",
  padding: "2rem",
  maxWidth: "720px",
  width: "100%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
};

const badgeRow = {
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
  marginTop: "1rem",
};

const badge = {
  background: "#1d4ed8",
  padding: "0.45rem 0.8rem",
  borderRadius: "999px",
  fontSize: "0.85rem",
};

function Home() {
  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Final Project Overview</h2>

      <p style={{ fontSize: "1.05rem", lineHeight: 1.55, marginBottom: "1rem" }}>
        This application demonstrates a multi-view React client using React Router.
        It includes a Todos view with full CRUD-style interactions in component state,
        and a Contact view implemented as a controlled form.
      </p>

      <div style={badgeRow}>
        <span style={badge}>React + Vite</span>
        <span style={badge}>React Router</span>
        <span style={badge}>State updates render immediately</span>
        <span style={badge}>Forms + validation-ready</span>
      </div>

      <p style={{ marginTop: "1.25rem", opacity: 0.9 }}>
        Use the navigation links above to view the Todos and Contact requirements.
      </p>
    </div>
  );
}

function Todos() {
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), text: "Review rubric requirements", completed: true },
    { id: crypto.randomUUID(), text: "Finalize Todos view behavior", completed: false },
    { id: crypto.randomUUID(), text: "Finalize Contact controlled form", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all | completed | incomplete

  const visibleTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "incomplete") return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  function addTodo(e) {
    e.preventDefault();
    const text = newTodo.trim();
    if (!text) return;

    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false },
      ...prev,
    ]);
    setNewTodo("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>📝 Todos</h2>

      <form onSubmit={addTodo} style={{ display: "flex", gap: "0.75rem" }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task…"
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.25)",
            color: "#e5e7eb",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            background: "#93c5fd",
          }}
        >
          Add
        </button>
      </form>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        {["all", "completed", "incomplete"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              background:
                filter === f ? "rgba(147,197,253,0.25)" : "rgba(0,0,0,0.2)",
              color: "#e5e7eb",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {f === "all" ? "All" : f === "completed" ? "Completed" : "Incomplete"}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.25rem" }}>
        {visibleTodos.length === 0 ? (
          <li style={{ opacity: 0.85 }}>No todos in this view.</li>
        ) : (
          visibleTodos.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                borderRadius: "12px",
                background: "rgba(0,0,0,0.2)",
                marginBottom: "0.75rem",
              }}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
                style={{ transform: "scale(1.2)" }}
              />

              <span
                style={{
                  flex: 1,
                  textDecoration: t.completed ? "line-through" : "none",
                  opacity: t.completed ? 0.75 : 1,
                }}
              >
                {t.text}
              </span>

              <button
                onClick={() => removeTodo(t.id)}
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  background: "rgba(239,68,68,0.9)",
                  color: "white",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
  });

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    alert("Form submitted (demo). Check the console for values.");
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.25)",
    color: "#e5e7eb",
    outline: "none",
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>📬 Contact</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.9rem" }}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={updateField}
          placeholder="First name"
          style={inputStyle}
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={updateField}
          placeholder="Last name"
          style={inputStyle}
        />
        <input
          name="email"
          value={form.email}
          onChange={updateField}
          placeholder="Email"
          type="email"
          style={inputStyle}
        />
        <textarea
          name="comments"
          value={form.comments}
          onChange={updateField}
          placeholder="Comments"
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.8rem 1rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 800,
            background: "#93c5fd",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div style={appStyle}>
      <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>🚀 Final Project</h1>

      <nav style={navStyle}>
        <NavLink to="/home" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/todos" style={linkStyle}>
          Todos
        </NavLink>
        <NavLink to="/contact" style={linkStyle}>
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h2>404 – Page Not Found</h2>} />
      </Routes>
    </div>
  );
}
