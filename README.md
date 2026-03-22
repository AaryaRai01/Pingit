# 💬Pingit — Serverless Chat Application

Pingit is a real-time, serverless chat application built using **React (frontend)** and **AWS cloud services (backend)**. It demonstrates a modern, scalable architecture with no dedicated server management.

<img width="1030" height="732" alt="UI" src="https://github.com/user-attachments/assets/8b2e48c7-f9f4-45e3-b4e9-b39887b9d0e6" />


---

## 🌐 Live Demo

👉 https://pingit-msg.vercel.app

---

## 🧠 Project Overview

Pingit enables users to communicate in real-time through a lightweight and scalable chat interface. The application leverages AWS serverless services to ensure high availability, low latency, and cost efficiency.

---

## 🏗️ Architecture

```
Frontend (React) → API Gateway → AWS Lambda → Database (DynamoDB)
```

* **Frontend**: React (hosted on AWS S3)
* **Backend**: AWS Lambda (serverless functions)
* **API Layer**: API Gateway
* **Database**: DynamoDB (NoSQL)
* **Hosting**: S3 Static Website Hosting

---

## ⚙️ Features

* 💬 Real-time messaging
* ⚡ Serverless architecture (no backend server management)
* 🌐 Publicly accessible web app
* 🔄 Scalable and event-driven system
* ☁️ Fully deployed on AWS cloud

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5 / CSS3
* JavaScript (ES6+)

### Backend (AWS)

* AWS Lambda
* API Gateway
* DynamoDB
* S3 (Static Hosting)

---

## 📂 Project Structure

```
Pingit/
  ├── src/
  ├── public/
  ├── package.json
```

---

## 🚀 Getting Started (Local Setup)

1. Clone the repository:

```bash
git clone https://github.com/AaryaRai01/Pingit.git
cd Pingit
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm start
```

4. Open in browser:

```
http://localhost:3000
```

---

## 🔐 Configuration

Make sure to replace API endpoints with your deployed AWS endpoints:

```js
REACT_APP_API_URL=your_api_gateway_url
```

---

## 📈 Future Improvements

* 🔐 User authentication (AWS Cognito)
* 📡 WebSocket-based real-time messaging
* 📱 Mobile responsiveness improvements
* 🌍 Custom domain integration
* 🎨 UI/UX enhancements

---

## 👨‍💻 Author

**Aarya Rai**
GitHub: https://github.com/AaryaRai01

---

## ⭐ Acknowledgements

This project was built as part of a hands-on exploration of **serverless architecture and cloud-native application development**.

---

## 📄 License

This project is open-source and available under the MIT License.
