# 💰 Meeting Costs Calculator

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator&metric=bugs)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator)

## 📢 What's This?

Welcome to **Meeting Costs Calculator**, a side project designed to help visualize the financial impact of meetings. Ever sat in a meeting and thought, *is this worth the cost?* Now, you can track how much time (and money) is spent in real-time.

## ✨ Features

- Add attendees along with their salaries.
- Choose different pay structures (hourly, monthly, etc.).
- Automatically calculate the total meeting cost.
- Option to hide salary details for privacy.
- Clean and intuitive UI with dark mode support.

## 🚀 How to Use

1. **Add Attendees**: Click the **Add user** button and input their details.
2. **Enter Salary Details**: Choose pay iteration and amount.
3. **Set Work Hours**: Adjust weekly hours for accuracy.
4. **Track Costs**: Watch the meeting expenses increase in real-time.

## 🛠 Tech Stack

- **Frontend:** Next.js / TypeScript
- **Styling:** Tailwind CSS / Shadcn/ui

## 🔧 Installation

### Prerequisites

- Node.js & npm installed

### Setup Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/meeting-costs-calculator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd meeting-costs-calculator
   ```

3. Ensure you're using the correct Node.js version:

   ```bash
   nvm use
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## 🔗 Backend Repository

A backend for this project is in development and can be found here:
[Meeting Costs Calculator API](https://github.com/whaagmans/meeting-costs-calculator-api)

## 🔮 Future Features

Here are some planned features that will be implemented in future updates:

- Integration with the backend for persistent data storage.
- Dark mode toggle for improved accessibility.
- User-created meeting rooms with sharable links (passwords optional).
- Attendees can add their own salary information to keep it private.
- Real-time updates through WebSockets to reflect changes instantly.
- Ability to pause and continue meetings persistently, with room data saved in the database.

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature-name`.
3. **Make your changes**.
4. **Push to your branch**: `git push origin feature-name`.
5. **Submit a pull request**.

## 📜 License

This project is under the MIT License, meaning you can use it freely.

---

🚀 **Try it out and start tracking your meeting costs!**
