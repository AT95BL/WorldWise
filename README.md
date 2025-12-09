-----

# 🌍 WorldWise: Travel the World, Track Your Cities

WorldWise is a dynamic single-page application (SPA) designed to help users track cities they have visited around the world. It provides a clean, map-centric interface where users can click on a location on the map to add a new city entry, complete with details and timestamps.

## 🚀 Features

  * **Interactive Map:** Utilizes **React Leaflet** to display a global map.
  * **Geolocation Tracking:** The map dynamically centers to a new location when a user clicks on the map, allowing for easy city input.
  * **URL Synchronization:** The map's current latitude and longitude are stored in the URL search parameters, ensuring that the map state is shared and bookmarkable.
  * **Centralized State Management:** All global data (list of visited cities, loading state) is managed efficiently using the **React Context API** and custom hooks, eliminating "prop drilling."
  * **City Management:** Users can view a list of visited cities, see details for a specific city, and manage (delete) entries.
  * **Mock Backend:** Data is served from a simple, local mock REST API using **JSON Server**.
  * **Modern Routing:** Implemented using **React Router DOM** for navigation and nested routes (e.g., `/app/cities`, `/app/countries`, `/app/form`).

-----

## 🛠️ Technology Stack

This project is built using modern JavaScript tools and libraries:

  * **Frontend:** React (Hooks: `useState`, `useEffect`, `useContext`)
  * **Build Tool:** Vite
  * **Styling:** CSS Modules (`.module.css`) for localized component styling
  * **Routing:** React Router DOM
  * **Map Library:** React Leaflet (integrated with Leaflet)
  * **Data API:** JSON Server (Mock Backend)

-----

## ⚙️ Installation and Setup

Follow these steps to get your local development environment up and running.

### 1\. Clone the Repository

```bash
git clone [YOUR-REPOSITORY-URL]
cd worldwise
```

### 2\. Install Dependencies

Install the necessary Node.js packages:

```bash
npm install
# Note: If you encounter an ERESOLVE error with react-leaflet, use:
# npm install react-leaflet@4 leaflet
```

### 3\. Start the Mock API Server

The application requires the mock backend to be running to fetch and update city data.

```bash
npm run server
```

*The mock API server will typically run on `http://localhost:8000`.*

### 4\. Start the Application

In a separate terminal window, start the React application:

```bash
npm run dev
```

*The application will typically be available at `http://localhost:5173` (or similar port).*

-----

## 📂 Project Structure (Key Files)

| File / Folder | Description |
| :--- | :--- |
| `src/App.jsx` | Main application component, handles routing and wraps the app with `CitiesProvider`. |
| `src/contexts/CitiesContext.jsx` | Defines the **Cities Context**, providing state (`cities`, `isLoading`) and actions (`getCity`, `createCity`, `deleteCity`) to the entire application. |
| `src/pages/AppLayout.jsx` | Layout for the main app, containing the sidebar and the `Map` component. |
| `src/components/Map.jsx` | Component responsible for rendering the interactive Leaflet map and handling URL parameter updates (`lat`, `lng`). |
| `data/cities.json` | The JSON file serving as the database for the mock API server. |

-----

## 🗺️ How to Use the Map Component

The core dynamic behavior is managed by hooks and a specialized component in `src/components/Map.jsx`:

1.  **URL Synchronization:** `useSearchParams` reads the `lat` and `lng` from the URL when a city is selected or when the map is clicked (handled by a future hook).
2.  **Dynamic Centering:** The custom hook component (`ChangeCenter` or similar) utilizes the `useMap()` hook from `react-leaflet` to imperatively call `map.setView()` whenever the coordinates change in the URL, ensuring the map always focuses on the selected location.
