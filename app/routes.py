from app import db, bcrypt
from flask import Blueprint,render_template, url_for, flash, redirect, request
from app.models import User, Mood, UserActivity
from flask_login import login_user, current_user, logout_user, login_required
from datetime import datetime
routes = Blueprint('routes', __name__)
import joblib
import numpy as np
model = joblib.load('model/mindfulness_model.pkl')
@routes.route('/')
def home():
    return render_template('home2.html')

@routes.route('/about')
def about():
    return render_template('About.html')

@routes.route('/dashboard', methods=['GET'], endpoint='dashboard')
@login_required
def dashboard():
    last_mood = Mood.query.filter_by(user_id=current_user.id).order_by(Mood.date.desc()).first()
    last_activity = UserActivity.query.filter_by(user_id=current_user.id).order_by(UserActivity.date_created.desc()).first()
    
    # Check if either mood or activity data is missing
    if not last_mood or not last_activity:
        flash('No mood or activity data available for recommendations.', 'warning')
        return redirect(url_for('routes.dashboard'))  # Redirect to dashboard if no data

    # Prepare the features for prediction
    mood_encoded = encode_mood(last_mood.mood)  # Function to encode mood
    activity_encoded = encode_activity(last_activity.activities)  # Function to encode activities
    duration = last_activity.duration or 0  # Default to 0 if duration is None
    effectiveness = effectiveness_map(last_activity.effectiveness) or 0  # Default to 0 if effectiveness is None
    input_features=[0]*75
    input_features[0] = mood_encoded  # Mood
    input_features[1] = activity_encoded  # Activity
    input_features[2] = duration  # Duration
    input_features[3] = effectiveness 

# Create the input array in the format your model expects
    input_features = [input_features]  # Wrap in a list to make it a 2D array

# Make a prediction
    recommendations = model.predict(input_features)  # Pass the 2D array to predict
    recommendations_text = process_recommendations(recommendations)  # Process the output to a readable format

# Render the dashboard with mood, activity, and recommendations
    return render_template('dashboard.html', recommendations=recommendations_text)
    

def encode_mood(mood):
    mood_map = {'Happy': 0, 'Sad': 1, 'Stressed': 2, 'Angry': 3, 'Anxious': 4}
    return mood_map[mood]
def encode_activity(activity):
    activity_map = {'Meditation': 0, 'Yoga': 1, 'Walking': 2, 'Breathing Exercises': 3, 'Reading': 4}
    return activity_map[activity]
def effectiveness_map(effectiveness):
    effectiveness_map = {'Very Effective': 0, 'Somewhat Effective': 1, 'Not Effective': 2}
    return effectiveness_map[effectiveness]

def process_recommendations(recommendations):
    if recommendations[0] == 0:
        return "Meditation"
    elif recommendations[0] == 1:
        return "Yoga"
    elif recommendations[0] == 2:
        return "Walking"
    elif recommendations[0] == 3:
        return "Breathing Exercises"
    elif recommendations[0] == 4:
        return "Reading"
    else:
        return "Error"

@routes.route('/blogs')
def blogs():
    return render_template('blogs.html')

@routes.route("/signup", methods=['GET', 'POST'])
def signup():
 if current_user.is_authenticated:
     return redirect(url_for('routes.dashboard'))
 if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check if the email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email is already registered. Please log in or use a different email.', 'danger')
            return redirect(url_for('routes.signup'))

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=hashed_password)

        db.session.add(user)
        db.session.commit()

        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('routes.signin'))  # Redirect to the signin page after signup

 return render_template('signup.html')

@routes.route("/signin", methods=['GET', 'POST'])
def signin():
    if current_user.is_authenticated:
        return redirect(url_for('routes.dashboard'))
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        remember = True if request.form.get('remember') else False

        user = User.query.filter_by(email=email).first()

        # Check if the user exists and the password matches
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user, remember=True)
            flash('You are now logged in', 'success')
            return redirect(url_for('routes.mood'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
            return redirect(url_for('routes.signin'))  # Stay on sign-in page after failure

    # Render the sign-in page
    return render_template('signin.html')

@routes.route("/signout")
def signout():
    logout_user()
    return redirect(url_for('routes.signin'))

@routes.route("/mood", methods=['GET', 'POST'])
@login_required
def mood():
    if request.method == 'POST':
        mood = request.form['mood']
        user_id = current_user.id
        new_mood = Mood(mood=mood,date=datetime.now(), user_id=current_user.id)

        db.session.add(new_mood)
        db.session.commit()
        flash('Your mood has been recorded!', 'success')
        return redirect(url_for('routes.activity'))
    return render_template('mood.html')

@routes.route("/tryforfree")
def tryforfree():
    return render_template('tryforfree.html')
@routes.route("/meditate")
def meditate():
    return render_template('meditate.html')
@routes.route("/activity", methods=['GET', 'POST'])
@login_required
def activity():
    if request.method == 'POST':
        activities = request.form['activities']
        duration = request.form['duration']
        effectiveness = request.form['effectiveness']
        mood = request.form['mood']
        notes = request.form['notes']
        user_id = current_user.id
        new_activity = UserActivity(activities=activities, duration=duration, effectiveness=effectiveness, mood=mood, notes=notes, user_id=current_user.id)

        db.session.add(new_activity)
        db.session.commit()
        flash('Your activity has been recorded!', 'success')
        return redirect(url_for('routes.dashboard'))

    return render_template('activity.html')


