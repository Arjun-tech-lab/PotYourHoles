

# 🕳️ PotYourHoles

> **A citizen-first platform that uses AI to prioritize pothole repairs — because the government didn't respond to my complaints, so I built the solution myself.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-potyourholes.vercel.app-brightgreen?style=flat-square)](https://potyourholes.vercel.app/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green?style=flat-square)](https://spring.io/)
[![React](https://img.shields.io/badge/Frontend-React.js-blue?style=flat-square)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=flat-square)](https://www.mongodb.com/)
[![MobileNet](https://img.shields.io/badge/AI-MobileNet-orange?style=flat-square)](https://keras.io/api/applications/mobilenet/)

---

## 🌍 The Real Problem Behind This Project

I live in Bengaluru. Like most people here, I've dealt with dangerous potholes for years — cracked vehicles, near-accidents, daily frustration.

I filed complaints with government authorities. Multiple times. I never got a response.

So instead of waiting, I built **PotYourHoles** — a platform that lets any citizen report a pothole, book an inspection appointment, and have that appointment **automatically prioritized by AI** based on how dangerous the pothole is. The worst potholes get fixed first.

This project started as a personal frustration. It turned into one of the most technically challenging and rewarding things I've built.

---

## 🎯 What PotYourHoles Does

### For Citizens (the public-facing app)

- 📸 **Photograph & report** — Upload a photo of any pothole near you
- 🤖 **AI severity detection** — The system instantly analyses the image and classifies the pothole as `Low`, `Medium`, or `High` severity
- 🗓️ **Book an appointment** — Schedule a time for an inspection team to visit
- 💳 **Service plans** — Browse transparent pricing for different service tiers
- 🔐 **One-click login** — Sign in with Google, no passwords needed

### For Admins (the operations dashboard)

- 📋 View all submitted appointments with full customer details
- 🔴 Appointments are **auto-sorted by AI severity** — the most dangerous potholes surface to the top of the queue
- 🔍 Live search across 10,000+ records — results appear as you type
- 📄 Server-side pagination — handles large datasets without slowing down
- 🏷️ Filter by severity, status, and date

---

## 🧠 The AI Layer — How It Works

This is the core of the project.

When a citizen uploads a photo of a pothole, it goes through an **AI inference pipeline**:

```
User uploads photo
       ↓
Spring Boot REST API receives image
       ↓
MobileNet model analyses the image
       ↓
Severity classified → Low / Medium / High
       ↓
Appointment stored with severity score
       ↓
Admin queue auto-sorted: High → Medium → Low
```

**Why this matters:** A small cosmetic crack and a wheel-swallowing crater shouldn't be treated the same. The AI ensures repair teams always tackle the most accident-prone potholes first — without anyone having to manually triage.

The model used is **MobileNet** — a lightweight, efficient convolutional neural network well-suited for image classification tasks, served through a Spring Boot REST endpoint.

---

## 🛠️ Tech Stack

| Layer | Technology | Why I chose it |
|---|---|---|
| Frontend | React.js + Tailwind CSS | Component-based UI, fast iteration |
| Backend | Spring Boot (Java) | Production-grade REST APIs, strong ecosystem |
| Database | MongoDB | Flexible schema, excellent for document-style records |
| AI Model | MobileNet | Lightweight CNN, accurate image classification |
| Auth | Google OAuth 2.0 + JWT | Industry-standard identity and access management |
| Deployment | Vercel | Fast frontend CI/CD |

---

## 📸 Screenshots

### Landing Page

<img width="849" height="451" alt="Screenshot 2026-05-08 at 1 58 31 AM" src="https://github.com/user-attachments/assets/022a374f-6cd8-443d-a81e-c4f09b2c24f4" />

### AI Severity Classification Result
<img width="851" height="425" alt="Screenshot 2026-05-08 at 2 01 00 AM" src="https://github.com/user-attachments/assets/8074ef25-e082-4360-8af9-d0600bb6a638" />

### Admin Dashboard
<img width="843" height="424" alt="Screenshot 2026-05-08 at 2 03 09 AM" src="https://github.com/user-attachments/assets/e784ea1b-5b52-4537-8b73-44b61a291f4c" />ment)*

### Services & Pricing Page
<img width="1280" height="682" alt="Screenshot 2026-05-08 at 2 05 13 AM" src="https://github.com/user-attachments/assets/e3109e09-ac38-4297-90a5-fc535e24bdb5" />


---

## 🧪 System Design — What I Learned Building This

This project was deliberately designed to teach myself **real system design concepts** — not just CRUD, but the kind of problems that appear at scale.

### 1. Server-Side Pagination
I seeded the database with **10,000+ appointment records** to simulate production load. Client-side pagination collapsed under the weight. I rebuilt it as proper server-side pagination — the API returns only the requested page, not the entire dataset. This is what every real-world app does, and now I understand exactly why.

### 2. Live Search with Indexing
Live search across 10,000+ records sounds simple. It isn't, without the right setup. I added **MongoDB indexes** on the fields most commonly queried (`severity`, `status`, `createdAt`, customer name) so searches return in milliseconds instead of seconds. Without indexing, every search was a full collection scan — painfully slow at scale.

### 3. AI Inference as a Service
Integrating the MobileNet model into the backend as a REST endpoint taught me how to think about **AI as a layer in a larger system** — not just a standalone script, but a service that receives input, processes it, and returns structured output that the rest of the application depends on.

### 4. JWT + OAuth 2.0 Authentication
I implemented the full auth flow from scratch — Google OAuth login, token exchange, JWT issuance, and validation on every protected route. No auth libraries doing the heavy lifting. Understanding this end-to-end is essential for any backend engineer.

### 5. Role-Based Access Control
Citizens and admins see completely different interfaces backed by different API permissions. I designed the role separation from the schema level upward — not bolted on afterward.

---

## 🗂️ Project Structure

```
potyourholes/
├── frontend/                   # React.js app
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level pages
│   │   ├── services/           # API call layer
│   │   └── context/            # Auth context (Google OAuth + JWT)
│
├── backend/                    # Spring Boot app
│   ├── controller/             # REST API endpoints
│   ├── service/                # Business logic
│   ├── repository/             # MongoDB data access
│   ├── model/                  # Data schemas
│   ├── security/               # JWT filter + OAuth config
│   └── ai/                     # MobileNet inference pipeline
```

---

## 🚀 Running Locally

### Prerequisites
- Java 17+
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Google OAuth credentials ([Create here](https://console.cloud.google.com/))

### Step 1 — Clone the repo
```bash
git clone https://github.com/Arjun-tech-lab/potyourholes.git
cd potyourholes
```

### Step 2 — Backend setup
```bash
cd backend
# Add your environment variables (see below)
./mvnw spring-boot:run
```

### Step 3 — Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### Step 4 — Environment variables

**Backend** (`backend/src/main/resources/application.properties`):
```properties
spring.data.mongodb.uri=your_mongodb_uri
google.client.id=your_google_client_id
google.client.secret=your_google_client_secret
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

**Frontend** (`.env`):
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Step 5 — Seed the database *(optional)*
To test pagination and search with realistic load, seed 10,000+ sample records:
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.arguments=--seed
```

---

## 🔑 Key API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/google` | Google OAuth login, returns JWT | Public |
| `POST` | `/api/appointments` | Submit a new pothole report + photo | User |
| `GET` | `/api/appointments?page=0&size=10` | Paginated appointment list | Admin |
| `GET` | `/api/appointments/search?q=query` | Live search across appointments | Admin |
| `POST` | `/api/ai/classify` | Classify pothole image → severity score | Internal |
| `GET` | `/api/services` | Fetch available service plans | Public |

---

## 🔮 What I'd Build Next

- **Real-time status updates** — WebSocket notifications when an appointment status changes
- **Geospatial heatmap** — Visualize pothole density across the city on a live map (the natural progression toward what companies like DeepMatrix build)
- **Mobile app** — React Native version for on-the-go reporting
- **Municipality API integration** — Direct pipeline to government systems when they eventually build open APIs
- **Automated escalation** — If a High severity pothole isn't addressed within 48 hours, auto-escalate and notify a supervisor

---

## 💡 Reflections

Building PotYourHoles taught me that **the best way to learn system design is to build something that breaks at scale** — then fix it properly.

Seeding 10,000 records and watching search grind to a halt, then adding indexes and watching it snap back to instant — that's a lesson no tutorial can teach. The same goes for pagination, auth, and AI integration. Every concept clicked the moment I hit the real problem it solves.

The project also reminded me that **software built from genuine frustration tends to be more thoughtfully designed** than software built for its own sake.

---

## 👤 Author

**Arjun Indavara**
CS Undergrad @ Dayananda Sagar College of Engineering, Bengaluru
Class of 2027 | CGPA 9.0

[![GitHub](https://img.shields.io/badge/GitHub-Arjun--tech--lab-black?style=flat-square&logo=github)](https://github.com/Arjun-tech-lab)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arjun--indavara-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/arjun-indavara)
[![Email](https://img.shields.io/badge/Email-arjunindavara@gmail.com-red?style=flat-square&logo=gmail)](mailto:arjunindavara@gmail.com)

---

> *"I filed complaints with the government about potholes in my area. They never responded. So I built the solution myself — and learned system design along the way."*

---

## 📄 License

MIT License — feel free to fork, improve, and build on this.
