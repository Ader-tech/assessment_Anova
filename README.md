# Task Manager - Assessment Project for Anova

A lightweight, responsive task manager built with *React* and *@hello-pangea/dnd* for drag-and-drop functionality. Tasks can be created, updated, marked as completed, and filtered based on status.


##  Live Project

Hosted on vercel: [https://github.com/Ader-tech/assessment_Anova](https://assessment-anova.vercel.app/)


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


                                                          Trade-offs
No Backend: Limits data persistence to the user's browser only (not sharable across devices).

Single Component Approach: While easy to follow, it can become harder to maintain with scaling. Modularization would be a future improvement.

LocalStorage: Easy and fast, but not secure or scalable for multi-user applications.

@hello-pangea/dnd: Used instead of the deprecated react-beautiful-dnd for compatibility with modern React.

                                                                  Features
Add, edit, delete tasks

Mark tasks as completed or revert to pending

Filter tasks by:

All

Pending

Completed

Overdue

Drag and drop to reorder tasks (pending only)

Modal form for task input

Responsive and accessible UI

Error messages for validation


                                                                Future Enhancements
Split code into modular components (e.g., TaskList, TaskForm, FilterBar)

Add backend integration (e.g. Firebase, Supabase)

Introduce unit tests and integration testing

Enable user authentication and sync

Add reminders or due-date notifications
