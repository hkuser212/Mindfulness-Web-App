from app import create_app
import joblib
app = create_app()
if __name__ == '__main__':
    app.run(debug=True)

loaded_pipeline = joblib.load('model/mindfulness_model2.pkl')