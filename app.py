from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')

    # Configure your email settings
    sender_email = 'yaduvikas1111@gmail.com'
    receiver_email = 'yaduvikas1111@gmail.com'  # Replace with your email
    password = 'niax tugk lxuu ufqp'  # Use an app password or environment variable in production

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = 'Contact Form Submission'

    # Create email body
    body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the email server and send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, password)
            server.send_message(msg)
        
        # Return JSON response for successful email sending
        return jsonify({'status': 'success', 'message': 'Email sent successfully'}), 200

    except Exception as e:
        print(f'Error sending email: {e}')
        # Return JSON response for failure
        return jsonify({'status': 'error', 'message': 'Failed to send email'}), 500

# Start server
if __name__ == '__main__':
    app.run(port=3000)
