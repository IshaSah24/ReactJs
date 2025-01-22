import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "550px",
        margin: "auto",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "150px",
        backgroundColor: "#f4f4f9",
      }}
    >
      <h1 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
        Password Generator
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          value={password}
          style={{
            outline: "none",
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Copy Password
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px", fontSize: "14px" }}>Length:</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            style={{ width: "100px" }}
            onChange={(e) => setLength(e.target.value)}
          />
          <span style={{ fontSize: "14px" }}>{length}</span>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              style={{ marginRight: "5px" }}
            />
            <label style={{ fontSize: "14px" }}>Numbers</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              style={{ marginRight: "5px" }}
            />
            <label style={{ fontSize: "14px" }}>Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
