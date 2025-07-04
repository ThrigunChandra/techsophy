# lig/api.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load('Model103.joblib')

def predict_diet_for_new_user(new_user_dict):
    new_user_df = pd.DataFrame([new_user_dict])
    predicted_class = model.predict(new_user_df)[0]
    diet_recommendations = {
        'Balanced': "Eat a mix of carbs, proteins, fats; plenty of fruits and vegetables.",
        'Low_Carb': "Reduce carb intake; focus on proteins, healthy fats, leafy greens.",
        'Low_Sodium': "Limit salt intake; avoid processed foods; consume fresh fruits and veggies."
    }
    return predicted_class, diet_recommendations.get(predicted_class, "No recommendation available.")

@app.route('/predict_diet', methods=['POST'])
def predict_diet():
    data = request.json
    predicted_class, recommendation = predict_diet_for_new_user(data)
    return jsonify({
        'predicted_class': predicted_class,
        'recommendation': recommendation
    })

if __name__ == '__main__':
    app.run(debug=True)
