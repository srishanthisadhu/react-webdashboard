# ReactJS Application with Vite.js

This is a ReactJS application bootstrapped using [Vite.js](https://vitejs.dev/). Vite is a fast frontend build tool that provides a development server with hot module replacement and a simple, efficient build process.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (LTS version recommended).
- **npm** (Node Package Manager)

## Getting Started

Follow the instructions below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/srishanthisadhu/react-webdashboard.git
```

### 2. Navigate to the Project Directory
```bash
cd react-webdashboard
```

### 3. Install Dependencies
Install the project dependencies using npm:
```
npm install
```

### 4. Start the Development Server
Start the Vite development server to run the application locally:
```
npm run dev
```

### 5. Access the Application
After running the development server, open your browser and navigate to:
``` bash
#Using localhost
http://localhost:5173

#Using Host IP Address
http://<host-ip-address>:5173
```

## Deployment
To deploy the application, build the project and serve the files from the dist directory:

Build the project:
```
npm run build
```
Serve the dist directory using a static file server, such as serve:

```
npx serve dist
```
