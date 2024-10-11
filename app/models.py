from app import db, login_manager
from flask_login import UserMixin
from datetime import datetime

# User loader for flask-login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    
    # Relationship with Mood and UserActivity
    moods = db.relationship('Mood', backref='user', lazy=True)
    activities = db.relationship('UserActivity', backref='user', lazy=True)  # New relationship for UserActivity

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

# Mood model
class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.String(30), nullable=False)
    date = db.Column(db.Date, nullable=False)
    
    # Foreign key to User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Mood('{self.mood}', '{self.date}')"

# UserActivity model
class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    # Foreign key to User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Link to User model
    
    activities = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer)
    effectiveness = db.Column(db.String(50))
    mood = db.Column(db.String(50))
    notes = db.Column(db.Text)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<UserActivity {self.activities} | Duration: {self.duration} mins | Mood: {self.mood} | Effectiveness: {self.effectiveness}>'
    
  