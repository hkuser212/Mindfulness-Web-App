import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Load the dataset
file_path = "model/mindfulness.csv"  # Ensure this path is correct
df = pd.read_csv(file_path)

# Strip whitespace from column names
df.columns = df.columns.str.strip()

# Drop unwanted columns if they exist
unwanted_columns = ["Your Name ?", "Your Age ?", "Timestamp"]
df.drop(columns=[col for col in unwanted_columns if col in df.columns], inplace=True)

# Fill null values
df.fillna('Unknown', inplace=True)

print("Columns after stripping:", df.columns)

# Select categorical columns
categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
print("Categorical Columns Detected:", categorical_columns)

# Define feature and target columns
feature_columns = [
    'How do you feel right now?', 
    'What mindfulness activities do you prefer?',
    'How effective do you find your preferred mindfulness activities?',
    'On average, how long do you spend on mindfulness activities per session?', 
    'After engaging in mindfulness activities, how much does your mood improve?'
]

# Check if feature columns exist in the DataFrame
for col in feature_columns:
    if col not in df.columns:
        print(f"Warning: {col} not found in DataFrame.")

# Separate features and target variable
X = df[feature_columns]  # Features
y = df['How do you feel right now?']  # Target

print("Columns in X (features):", X.columns)
print("Unique values in target variable:", y.unique())

# Filter valid categorical columns
valid_categorical_columns = [col for col in categorical_columns if col in X.columns]
print("Valid Categorical Columns for Encoding:", valid_categorical_columns)

# Check if there are any valid categorical columns for encoding
if not valid_categorical_columns:
    print("No valid categorical columns found for encoding. Please check your data.")

# Create preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), valid_categorical_columns)
    ],
    remainder='passthrough'  # Keep other columns as is
)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

print("Shape of X_train:", X_train.shape)
print("Shape of X_test:", X_test.shape)

#train model 

model = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print(classification_report(y_test, y_pred))

joblib.dump(model, 'model/mindfulness_model2.pkl')# Define hyperparameters for tuning
param_grid = {
    'classifier__n_estimators': [100, 200, 300],
    'classifier__max_depth': [None, 5, 10],
    'classifier__min_samples_split': [2, 5, 10],
    'classifier__min_samples_leaf': [1, 5, 10]
}

# Perform grid search with cross-validation
from sklearn.model_selection import GridSearchCV
grid_search = GridSearchCV(model, param_grid, cv=5, scoring='f1_macro')
grid_search.fit(X_train, y_train)

# Get the best model and its parameters
best_model = grid_search.best_estimator_
best_params = grid_search.best_params_

# Train the best model on the entire training set
best_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = best_model.predict(X_test)

# Evaluate the model
print(classification_report(y_test, y_pred))
print("Best Parameters:", best_params)
print("Best Score:", grid_search.best_score_)

# Save the best model
joblib.dump(best_model, 'model/mindfulness_model2.pkl')