# Project Spec: Product Profit Tracker Web App

## 1. Project Overview
Build a static web application to track product profits (Buy Price vs Sell Price). The application must be deployable to GitHub Pages (Static hosting).

## 2. Core Requirements
1.  **Deployment**: Must work on GitHub Pages (Client-side routing/logic only).
2.  **Authentication**: Simple "Account/Password" login gate.
    *   *Implementation*: Client-side verification against hardcoded credentials or user-set credentials in LocalStorage.
    *   *Note*: Not cryptographically secure, but sufficient for personal privacy on a static site.
3.  **Data Persistence**:
    *   Data must be saved and retrieved after page refresh.
    *   *Implementation*: Use browser `localStorage`.
4.  **Functional Features**:
    *   Input Interface: Fields for Product Name, Buy Price, Sell Price.
    *   Automatic Calculation: Calculate `Profit` (Sell - Buy) and `Margin` (%).
    *   List View: Display history of added products.

## 3. Technology Stack
-   **Framework**: React (via Vite).
-   **Styling**: Vanilla CSS with CSS Variables (Theme: Dark Glassmorphism).
-   **State Management**: React `useState` + `useEffect`.
-   **Icons**: `lucide-react`.

## 4. UI/UX Design Guidelines
-   **Theme**: Modern Dark Mode with "Glass" effects (Blur + Translucency).
-   **Colors**: Deep Blue/Black background (`#0B0E14`), Violet Accents (`#6366F1`).
-   **Interactions**: Smooth fade-in animations, hover glowing effects.

## 5. Data Schema (JSON)
```json
// stored in localStorage key 'profit_tracker_data'
[
  {
    "id": "timestamp_string",
    "name": "Product A",
    "buyPrice": 100.00,
    "sellPrice": 150.00,
    "profit": 50.00,
    "createdAt": "ISO_Date_String"
  }
]
```

## 6. Implementation Steps
1.  **Setup**: Initialize Vite React project.
2.  **CSS**: Define CSS variables for glassmorphism in `index.css`.
3.  **Auth Module**: Create `Login` component that checks credentials.
4.  **Logic**: Create storage helper (`storage.js`) to wrap `localStorage` API.
5.  **Dashboard**: Create main view with Form and Table.
6.  **Deploy**: Configure `gh-pages` script.
