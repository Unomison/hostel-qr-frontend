# QR-Based Hostel Entry-Exit Attendance System

A full-stack MERN application for managing hostel student attendance using dynamic QR codes.

## Live Demo
[([https://hostel-qr-frontend.vercel.app](https://hostel-qr-frontend.vercel.app/))](https://hostel-qr-frontend.vercel.app/login)

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Student | utka230101079@iiitmanipur.ac.in | Utkarsh@hb613 |
| Guard | guard@hostel.com | guard123456 |
| Admin | admin@hostel.com | admin123456 |

## Features
- Students generate time-expiring QR codes (30-second refresh)
- Guards scan QR via phone camera — no app install needed
- Student photo verification after every scan
- 5-layer anti-proxy system prevents attendance fraud
- Real-time IN/OUT status tracking
- Admin dashboard with analytics, guard management, and audit logs

## Anti-Proxy Security Layers
1. QR tokens expire every 30 seconds
2. One-time use — token invalidated immediately after scan
3. 2-minute cooldown between consecutive scans
4. Guard visually verifies student photo on their screen
5. Device fingerprint logged for every scan

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs |
| File Storage | Cloudinary |
| QR | qrcode.react, html5-qrcode |
| Deployment | Vercel (frontend), Render (backend) |

## System Architecture
Student Phone → generates QR (30s expiry)
Guard Phone   → scans QR → sees student photo → confirms
Backend       → validates token → updates status → logs audit trail
Admin Panel   → views stats, manages guards, reviews logs
## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Student registration with photo |
| POST | /api/auth/login | Login for all 3 roles |
| POST | /api/qr/generate | Generate new QR token |
| POST | /api/scan/process | Process QR scan with anti-proxy checks |
| GET | /api/guard/outside-list | Students currently outside |
| GET | /api/admin/stats | Dashboard statistics |

## Local Setup
```bash
# Backend
cd backend
npm install
# Create .env with MONGODB_URI, JWT_SECRET, CLOUDINARY keys
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Screenshots
<img width="738" height="1600" alt="a110" src="https://github.com/user-attachments/assets/71a8c73a-b074-4e4b-8b45-24fcde3ac64a" />
<img width="1282" height="538" alt="a111" src="https://github.com/user-attachments/assets/972880d8-aa58-4646-92c1-13cdd96f419b" />
<img width="1177" height="996" alt="image" src="https://github.com/user-attachments/assets/70294eea-ff68-4e0f-9e85-667fe4b7f96b" />
<img width="1182" height="1198" alt="image" src="https://github.com/user-attachments/assets/6517083e-0ed7-4409-8ffd-01d414af3726" />
<img width="1182" height="1198" alt="image" src="https://github.com/user-attachments/assets/03e72985-53eb-4771-93b0-6d80b8e1d86a" />



