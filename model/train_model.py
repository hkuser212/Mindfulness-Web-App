import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib
# Load the dataset
file_path = "model/mindfulness.csv"  # Ensure this path is correct
df = pd.read_csv(file_path)

# Print dataset information and check for missing values
print(df.info())
print("Missing values per column:\n", df.isnull().sum())  # Show how many missing values are in each column

# Strip whitespace from column names
df.columns = df.columns.str.strip()

# Encode categorical variables into dummy/indicator variables
df_encoded = pd.get_dummies(df, drop_first=True)

# Print available columns after encoding
print("Available columns in the DataFrame after encoding:")
print(df_encoded.columns.tolist())

# Define target variable
target_variable = "What specific types of meditation you like to perform based on your needs and mood  ?_Mantra meditation"

# Check if the target variable exists in the DataFrame
if target_variable in df_encoded.columns:
    y = df_encoded[target_variable]

    # Automatically select features based on prefixes of original features
    prefixes = [
        'How do you feel right now?', 
        'How stressed have you been in the past week?',
        'How often do you engage in physical activity?', 
        'How would you rate your sleep quality in the past week?',
        'How would you describe your diet?',
        'How often do you engage in mindfulness activities?',
        'What mindfulness activities do you prefer?',
        'On average, how long do you spend on mindfulness activities per session?',
        'How effective do you find your preferred mindfulness activities?',
        'After engaging in mindfulness activities, how much does your mood improve?',
        'Do you have a history of mental health issues such as anxiety, depression, etc.?',
        'What are your common stress triggers?',
        'What are your main goals for practicing mindfulness?',
    
    ]

    # Generate feature list based on prefixes
    available_features = [col for col in df_encoded.columns if any(col.startswith(prefix.strip()) for prefix in prefixes)]
    
    # Drop the target variable from the features
    X = df_encoded[available_features]
else:
    raise KeyError(f"Target variable '{target_variable}' not found in DataFrame columns.")

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest classifier

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


# Evaluate the model
y_pred = model.predict(X_test)
print("Accuracy:", model.score(X_test, y_test))
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))


# Save the trained model
joblib.dump(model, 'model/mindfulness_model.pkl')