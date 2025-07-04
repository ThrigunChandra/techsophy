import React, { useState } from "react";

const genderOptions = ["Male", "Female", "Other"];
const diseaseTypes = ["Diabetes", "Hypertension", "Heart Disease", "None"];
const severityLevels = ["Mild", "Moderate", "Severe"];
const physicalActivityLevels = ["Low", "Moderate", "High"];

export default function HealthForm() {
  const [formData, setFormData] = useState({
    Gender: "",
    Disease_Type: "",
    Severity: "",
    Physical_Activity_Level: "",
    Age: "",
    Weight_kg: "",
    Height_cm: "",
    BMI: "",
    Daily_Caloric_Intake: "",
    Weekly_Exercise_Hours: "",
    "Cholesterol_mg/dL": "",
    "Blood_Pressure_mmHg": "",
    "Glucose_mg/dL": "",
  });

  const [result, setResult] = useState(null); // to store prediction result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Convert number fields from strings to numbers
    const payload = {
      ...formData,
      Age: Number(formData.Age),
      Weight_kg: Number(formData.Weight_kg),
      Height_cm: Number(formData.Height_cm),
      BMI: Number(formData.BMI),
      Daily_Caloric_Intake: Number(formData.Daily_Caloric_Intake),
      Weekly_Exercise_Hours: Number(formData.Weekly_Exercise_Hours),
      "Cholesterol_mg/dL": Number(formData["Cholesterol_mg/dL"]),
      "Blood_Pressure_mmHg": Number(formData["Blood_Pressure_mmHg"]),
      "Glucose_mg/dL": Number(formData["Glucose_mg/dL"]),
    };

    try {
      const response = await fetch("http://localhost:5000/predict_diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error fetching prediction: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Health Features Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Disease Type:
          <select
            name="Disease_Type"
            value={formData.Disease_Type}
            onChange={handleChange}
            required
          >
            <option value="">Select Disease Type</option>
            {diseaseTypes.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Severity:
          <select
            name="Severity"
            value={formData.Severity}
            onChange={handleChange}
            required
          >
            <option value="">Select Severity</option>
            {severityLevels.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Physical Activity Level:
          <select
            name="Physical_Activity_Level"
            value={formData.Physical_Activity_Level}
            onChange={handleChange}
            required
          >
            <option value="">Select Activity Level</option>
            {physicalActivityLevels.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <br />

        {[
          "Age",
          "Weight_kg",
          "Height_cm",
          "BMI",
          "Daily_Caloric_Intake",
          "Weekly_Exercise_Hours",
          "Cholesterol_mg/dL",
          "Blood_Pressure_mmHg",
          "Glucose_mg/dL",
        ].map((feature) => (
          <div key={feature}>
            <label>
              {feature.replace(/_/g, " ")}:
              <input
                type="number"
                step="any"
                name={feature}
                value={formData[feature]}
                onChange={handleChange}
                required
              />
            </label>
            <br />
          </div>
        ))}

        <button type="submit" style={{ marginTop: 10 }}>
          Submit
        </button>
      </form>

      {loading && <p>Loading prediction...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Prediction Result</h3>
          <p>
            <strong>Diet Class:</strong> {result.predicted_class}
          </p>
          <p>
            <strong>Recommendation:</strong> {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
