# Artha - FinTechAI

Artha is a financial intelligence platform for the gig economy, merchants, and freelancers. It provides tailored tools for inventory management, invoicing, expense tracking, and more.

## Project Structure

This project follows a monorepo-style structure:

- **`frontend/`**: Next.js 15 application (App Router).
  - **`src/features/`**: Domain logic for Gig, Merchants, and Freelancers.
- **`backend/`**: Django REST Framework API.
  - **`scripts/`**: Utility scripts for verification and management.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Frontend Config
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### 2. Backend Config
Navigate to the backend directory, set up your virtual environment, and run the server:

```bash
cd backend
# Create virtual env (if not exists)
python -m venv venv
# Activate (Windows)
.\venv\Scripts\activate
# Install deps
pip install -r requirements.txt
# Run server
python manage.py runserver
```
The API will be available at [http://localhost:8000](http://localhost:8000).

## Key Features
- **Merchants**: Voice inventory, WhatsApp billing, Smart Khata.
- **Gig Workers**: Income tracking across platforms, daily goals.
- **Freelancers**: Global invoicing, time tracking, expense swiping.
