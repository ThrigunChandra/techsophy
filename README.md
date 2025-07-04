# Personalized Nutrition & Fitness Recommendation System

## 🩺 Overview

This project is a machine learning-based web application that analyzes a user's **dietary habits** and **physical activity** to provide **personalized nutrition and fitness recommendations** aimed at **preventing chronic diseases**. The backend leverages a **Random Forest Classifier** trained on a dataset from Kaggle, while the frontend is built using **React with Vite** for a fast and modern development experience.

---

## 📊 Dataset

- **Source**: [Kaggle – Health Nutrition & Activity Dataset]((https://www.kaggle.com/datasets/ziya07/diet-recommendations-dataset/data))
- **Description**: The dataset includes user attributes such as:
  - Dietary patterns (e.g., fruit/vegetable intake, junk food consumption)
  - Physical activity levels (e.g., exercise frequency, steps per day)
  - Health indicators (e.g., BMI, blood pressure, glucose level)
  - Demographic data (age, gender)
  - Disease history / risk markers

---

## 🧠 Machine Learning Model

- **Algorithm**: `RandomForestClassifier` from `sklearn`
- **Purpose**: Predict the risk of chronic conditions (e.g., obesity, diabetes, hypertension)
- **Features Used**:
  - Nutritional habits
  - Physical activity
  - Demographics
- **Target**: Risk level or disease presence
- **Evaluation**:
  - Accuracy, Precision, Recall, F1-score
  - Confusion Matrix for visualizing prediction quality

---

## 🧪 Backend (Python + Flask)

- **Dependencies**:
  - `pandas`, `scik
