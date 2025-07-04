import joblib
import pandas as pd

model = joblib.load('Model103.joblib')

def predict_diet_for_new_user(new_user_dict):
    """
    new_user_dict: dict with keys = feature names
    Returns predicted diet class and recommendation text
    """
    new_user_df = pd.DataFrame([new_user_dict])  # create DataFrame with one row
    
    # Load pipeline if needed (optional if you keep model in memory)
    # model = joblib.load('diet_rf_pipeline.joblib')
    
    predicted_class = model.predict(new_user_df)[0]
    
    diet_recommendations = {
        'Balanced': "Eat a mix of carbs, proteins, fats; plenty of fruits and vegetables.",
        'Low_Carb': "Reduce carb intake; focus on proteins, healthy fats, leafy greens.",
        'Low_Sodium': "Limit salt intake; avoid processed foods; consume fresh fruits and veggies."
    }
    
    return predicted_class, diet_recommendations.get(predicted_class, "No recommendation available.")

# Example usage:
new_user = {
    'Age': 35,
    'Gender': 'Male',
    'Weight_kg': 75,
    'Height_cm': 180,
    'BMI': 23.15,
    'Disease_Type': 'None',
    'Severity': 'Mild',
    'Physical_Activity_Level': 'Moderate',
    "Cholesterol_mg/dL": 173.3,
    "Blood_Pressure_mmHg": 133,
    "Glucose_mg/dL": 116.3,
    'Daily_Caloric_Intake': 2200,
    'Weekly_Exercise_Hours': 4
}

predicted_class, recommendation = predict_diet_for_new_user(new_user)
print(f"Predicted diet class: {predicted_class}")
print(f"Diet recommendation: {recommendation}")