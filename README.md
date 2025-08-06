# 🧩 Next.js Vite Monorepo – Tic Tac Toe & Product CRUD App

This is a full-featured **Next.js App Router** project (bootstrapped with Vite) that includes **two separate apps**:

- 🎮 **Tic Tac Toe Game** – Simple 2-player game.
- 🛍️ **Product CRUD App** – Add, edit, delete, search, and filter products.

## 🛠 Tech Stack

| Feature               | Tech/Library             |
|-----------------------|--------------------------|
| Framework             | [Next.js (App Router)](https://nextjs.org/docs/app) |
| Build Tool            | [Vite](https://vitejs.dev/) via `create-next-app` (with Vite flag) |
| State Management      | [Redux Toolkit](https://redux-toolkit.js.org/) |
| Styling               | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components         | [shadcn/ui](https://ui.shadcn.com/) |
| Icons                 | [Lucide-react](https://lucide.dev/) |
| Forms                | [React Hook Form](https://react-hook-form.com/) |
| Validation            | [Zod](https://zod.dev/) |

---

## 📁 Project Structure


apps/
├── assignment1/ # Tic Tac Toe game app
│ └── page
│
├── assignment2/ # Product CRUD app
│ └── page
components
hooks
lib
packages/

tailwind.config.ts
tsconfig.json
vite.config.ts

## 🚀 Getting Started
## clone te repo
## npm install


Features
Tic Tac Toe
Classic 2-player game

Game state handled via Redux

Styled with Tailwind and Shadcn UI

Product CRUD App
Add, Edit, Delete Products

Search and filter products by name or category

Form validation using react-hook-form + zod

Reusable form components

UI feedback with shadcn components

🧪 Development Notes
App Router is used (/app directory instead of /pages)

Shared Redux store setup for scalability

shadcn/ui is installed per app – modular UI

Forms are reusable and schema-safe with zod

Uses Lucide-react for clean, modern icons




