# Backend Language Selector using FFS-PSI-AROMAN

This project helps select the best programming language for back-end web development using expert feedback and a fuzzy MCDM method.

It includes:

- A Python backend (`app.py`)
- A React frontend

## Requirements (For Windows Users)

You need to install:

1. **Python**

   - Download: [https://www.python.org/downloads/](https://www.python.org/downloads/)
   - During installation, check **"Add Python to PATH"**

2. **Node.js**
   - Download: [https://nodejs.org/en/download](https://nodejs.org/en/download)

## How to Run the Project

### 1st Method:

Run the `run_project.bat` file

### 2nd Method (if the first fails):

---

### Step 1: Run the Python Backend

1. Open **Command Prompt**
2. Navigate to the backend folder:

   ```sh
   cd path\to\project\backend
   ```

3. Install Python libraries:

   ```sh
   pip install -r requirements.txt
   ```

4. Start the backend:

   ```sh
   python app.py
   ```

   → The backend will run on [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

---

### Step 2: Run the React Frontend

1. Open **another Command Prompt**
2. Navigate to the frontend folder:

   ```sh
   cd path\to\project\frontend
   ```

3. Install packages:

   ```sh
   npm install --force
   ```

4. Start the frontend:

   ```sh
   npm run dev
   ```

   → Open your browser and go to [http://localhost:5173/](http://localhost:5173/)

---

## Notes

- Keep both backend and frontend running at the same time.
- If something breaks, close and reopen the Command Prompt and try again.
