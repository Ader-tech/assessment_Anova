# Task Manager - Assessment Project for Anova

A lightweight, responsive task manager built with *React* and *@hello-pangea/dnd* for drag-and-drop functionality. Tasks can be created, updated, marked as completed, and filtered based on status.


##  Live Project

Hosted on vercel: [https://github.com/Ader-tech/assessment_Anova](https://github.com/Ader-tech/assessment_Anova)


## 📦 Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm 

### Getting Started

# Clone the repository
git clone https://github.com/Ader-tech/assessment_Anova.git

# Navigate to the project directory
cd assessment_Anova

# Install dependencies
npm install

# Start the development server
npm start


                                          Architectural Decisions
React Functional Components & Hooks: The entire UI is managed through React state and effects.

CSS Modules: Scoped styles using App.module.css to avoid class name collisions and improve modularity.

Drag-and-Drop: Implemented using @hello-pangea/dnd due to compatibility with current React versions.

LocalStorage Persistence: Tasks are saved in localStorage so data persists on refresh without a backend.

Single File Structure: Kept all logic in App.jsx for simplicity and to meet assessment scope.


