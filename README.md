# MediMinder 🩺💊  
**Your AI-powered medicine reminder & side-effect tracker**

MediMinder is a smart web application designed to help users (especially elders) manage their daily medications. It reminds users to take their medicines, tracks missed doses, analyzes side-effect reports, and automatically alerts caregivers if serious symptoms are detected.

---

## 🌟 Features

- 📅 **Smart Medicine Reminders** – Get timely notifications for every dose  
- 🔄 **Adherence Tracker** – Automatically calculate and visualize missed doses  
- 🤖 **AI-Powered Chat** – Report side effects and get basic advice through a chatbot  
- 🚨 **Caregiver Alerts** – Automatically notify trusted contacts via WhatsApp/SMS if serious side effects are reported  
- 📱 **Elder-Friendly UI** – Simple, clean design optimized for accessibility and mobile use  

---

## 🚀 Tech Stack

- **Frontend:** Vue.js  
- **Backend:** Django (Python)  
- **Notifications:** Firebase  
- **AI/ML:** OpenAI / Anthropic (LLM-based conversational bot + classification)  
- **Messaging API:** Twilio / WhatsApp Business API  
- **Database:** PostgreSQL / Firebase Realtime DB  

---

## 🧠 How It Works

1. Users register and log in securely.  
2. They input prescriptions (medicine name, dosage, time, start/end date).  
3. Firebase schedules reminders for each dose.  
4. Missed doses are logged and scored using a predictive model.  
5. Users can chat with an AI bot to report how they’re feeling.  
6. If any critical symptoms (e.g., dizziness, vomiting, chest pain) are reported, the system alerts a caregiver via SMS or WhatsApp.

---

### 🏷️ Hackathon Info

This project was built as part of the **[World’s Largest Hackathon](https://worldslargesthackathon.devpost.com/)** powered by [**Bolt.new**](https://bolt.new).

---

### 🚀 Powered By

* **Built with [Bolt.new](https://bolt.new)** — the AI-powered platform that brings ideas to life, code-free.
* Participating in the **[One-Shot Competition](https://worldslargesthackathon.devpost.com/)** under the **World’s Largest Hackathon** initiative.

---

### 🎯 Badge Compliance

The live version of this app includes the **Bolt.new Badge**, clearly displayed and hyperlinked as required.
✅ Badge visible on homepage
✅ Hyperlinked to [https://bolt.new/](https://bolt.new/)
✅ Responsive across devices
✅ Used recommended styling (white/black/text-only based on background)

For official badge assets & usage, refer to:
👉 [Badge Guidelines](https://worldslargesthackathon.devpost.com/details/badgeguidelines)
👉 [Badge Asset Folder (Google Drive)](https://drive.google.com/drive/folders/1iNALInxyPJl7IHP5iywUKqsdumCrWIA0)

---

### 🤝 Sponsors & Tech Used

Special thanks to the following technologies and platforms used in or supporting this build:

* **Bolt.new**
* **Firebase** – for real-time notifications
* **Django + Vue.js** – core stack for backend/frontend
* **Supabase**, **Netlify**, **Reddit**, **Tavus**, and other official partners

Sponsor assets are used in accordance with [provided brand guidelines](https://worldslargesthackathon.devpost.com/).

---

## 🧪 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/fuutech1/medi-minder.git
cd medi-minder
```

### 2. Setup to Install packages

```bash
npm install
```

### 3. Setup to Run the Web App

```bash
npm run dev
```

### 5. Environment Variables

Update the `.env.example` file for your Supabase and Gemini API key credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 📸 Screenshots

> 

---

## 🎯 Use Cases

- Elderly patients needing medication assistance  
- Busy professionals tracking their long-term prescriptions  
- Family caregivers supporting remote health monitoring  
- Clinics and NGOs supporting rural or aging populations  

---

## 🛠️ Future Plans

- 🔊 Add voice input for reporting side effects  
- 🗣️ Add regional language support (Hindi, Tamil, Bengali, etc.)  
- 🧑‍⚕️ Sync prescriptions with doctors via health dashboards  
- 📈 Use ML to forecast health risks based on medicine adherence  

---

## 🙌 Contributors

- **Aadil Latif** – [@aadillatif](https://github.com/aadillatif) – 3rd year B.Tech CSE  
- **Pratap Yadav** – [@fuutech1](https://github.com/fuutech1) – 3rd year B.Tech CSE

---

## 📄 License

MIT License.  
Feel free to fork, contribute, or suggest new features!

---

## 🔗 Links

- 🔥 Live Demo: [Check Here](https://dulcet-cassata-4fbdc2.netlify.app/)

---

> “Health is not just medical—it’s about peace of mind. MediMinder aims to deliver that through tech.”
