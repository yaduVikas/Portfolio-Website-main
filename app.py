from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "yaduvikas1111@gmail.com"  # Your email address
EMAIL_PASSWORD = "niax tugk lxuu ufqp"  # App password if using Gmail

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Extract form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone', 'Not Provided')
        message = request.form.get('message')

        # Create email content
        subject = "New Contact Form Submission"
        body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}"
        
        # Configure SMTP
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Send the email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        return jsonify({"message": "Email sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)
