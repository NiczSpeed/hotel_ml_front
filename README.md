# 🖥️ hotel_ml_front - User UI

## 📖 Table of Contents
1. [📌 Overview](#-overview)
2. [🔧 Technologies](#-technologies)
3. [📂 Structure of the Code](#-structure-of-the-code)
4. [📊 Diagrams](#-diagrams)

---

## 📌 Overview
The service is responsible for the user interface, built with **Vue.js**, it communicates directly with the Hotel_ML_APIGateway_Service. It allows you to create hotels, rooms, reservations, users and manage them.

## ❗ Important Information
> To launch an application using the described service, go to:
> ➡️ [Main README](https://github.com/NiczSpeed/HotelML?tab=readme-ov-file#%EF%B8%8F-how-to-run-the-entire-system)

📌 **Key Features:**
- ✅ Creating and sending forms
- ✅ Handling of JWTs
- ✅ User session management

---

## 🔧 Technologies
| Component       | Technology |
|----------------|------------|
| **Framework**  | Vue.js (Vue 3) |
| **Routing** | Vue Router |
| **Communication with the API** | Axios |
| **Authorization** | JWT |
| **Responsiveness** | boostrap-vue-next |
| **Orchestration** | Docker, Docker Compose |

---

## 📂 Structure of the Code
```plaintext
/HOTEL_ML_FRONT
│── public/                             # Public files (index.html, favicons)
│── src/
│   ├── assets/                             # Static resources (icons, styles)
│   ├── components/                         # UI components
|   |   |── AdminView.vue                       # View admin
|   |   |── CreateHotelView.vue                 # Hotel creation form
|   |   |── CreateRoomView.vue                  # Room Creation Form
|   |   |── InfoModal.vue                       # Error or success message modal
|   |   |── LoginView.vue                       # Login form
|   |   |── RegisterView.vue                    # Registration form
|   |   |── SearchFreeRoomsView.vue             # View of the main menu, searching for a room
|   |   |── UserView.vue                        # User View
│   ├── router/                             # Vue Router Configuration
│   ├── utils/                              # Distinct functions
|   |   |── authMethods.js                      # JWT token decoding method
|   |   |── axiosInterceptor.js                 # Configuration of axios interceptor
|   |   |── fetchHotelsMethods.js               # Method to retrieve hotels
│   ├── App.vue                                 # The main component of the service
│   ├── main.js                             # The service's main startup file
│── Dockerfile                          # Building and running a container
│── package.json                        # Project dependencies
```
## 📊 Diagrams

### 🏛 Class Diagrams
These diagrams illustrate the main object-oriented structure of the application, including entities, their attributes, methods, and relationships.

---

#### ✨ Main Class
This diagram illustrates main class in service

🔗 [View the main class](docs/Class/Hotel_ML_Front_Diagram_Main.svg)

---

#### 🧩 Component View Classes
This diagram illustrates component view classes in service

🔗 [View the component view classes](docs/Class/Hotel_ML_Front_Diagram_Component_Views.svg)



