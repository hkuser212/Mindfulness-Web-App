from app import db, bcrypt
from flask import Blueprint,render_template, url_for, flash, redirect, request,jsonify
from app.models import User, Mood, UserActivity
from flask_login import login_user, current_user, logout_user, login_required
from datetime import datetime
import joblib
import numpy as np
import pandas as pd
from collections import Counter
routes = Blueprint('routes', __name__)

@routes.route('/')
def home():
    return render_template('home2.html')

@routes.route('/about')
def about():
    return render_template('About.html')

@routes.route('/dashboard')
@login_required
def dashboard():
    recommendation = request.args.get('recommendation')

    user_id = current_user.id
    activties = UserActivity.query.filter_by(user_id=user_id).all()
    moods = Mood.query.filter_by(user_id=user_id).all()

    activity_data = {}
    for activity in activties:
        activity_name = activity.activities
        duration = activity.duration
        activity_data[activity_name] = activity_data.get(activity_name, 0) + duration

    mood_counts = Counter(mood.mood for mood in moods)
    mood_labels = list(mood_counts.keys())
    mood_values = list(mood_counts.values())



    return render_template('dashboard.html', recommendation=recommendation,activity_data=activity_data, mood_labels=mood_labels, mood_values=mood_values)

       
#



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

        try:
            # Load the model
            loaded_pipeline = joblib.load('model/mindfulness_model2.pkl')

            # Prepare input data
            input_data = pd.DataFrame({
                'How do you feel right now?': [mood],
                'What mindfulness activities do you prefer?': [activities],
                'How effective do you find your preferred mindfulness activities?': [effectiveness],
                'On average, how long do you spend on mindfulness activities per session?': [duration],
                'After engaging in mindfulness activities, how much does your mood improve?': [mood]  # Adjust as needed
            })
            prediction = loaded_pipeline.predict(input_data)[0]

            # Map mood predictions to specific activities
            mood_to_activity = {
                'Happy': 'Please Explore our mindfulness contents.',
                'Sad': 'Try Deep Breathing, meditating or journaling your thoughts.',
                'Very happy': 'Practice deep breathing exercises or do yoga.',
                'Very sad': 'Listen to soothing music or read a book.',
                'neutral': 'Engage in physical exercise or try our mindfulness contents.',
                
            }

            # Get recommendation based on the mapped activities
            recommendation = mood_to_activity.get(prediction, "Engage in some mindfulness practice.")  # Default message if mood not found
            
            flash(f'Your activity has been recorded! Here is a recommendation based on your input: {recommendation}', 'success')
            return redirect(url_for('routes.dashboard', recommendation=recommendation))

        except Exception as e:
            flash(f'An error occurred during prediction: {str(e)}', 'danger')
            return redirect(url_for('routes.activity'))

    # For GET request, render the activity form
    return render_template('activity.html')


@routes.route("/tryforfree")
def tryforfree():
    return render_template('tryforfree.html')
@routes.route("/meditate")
def meditate():
    return render_template('meditate.html')


