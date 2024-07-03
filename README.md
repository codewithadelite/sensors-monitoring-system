# Sensors Monitoring System

<p>
    <a href="https://geneteraai.com" target="_blank">
      <img
        src="https://i.postimg.cc/7P9rhgXs/sms-g-img.jpg"
        alt="SMS Screen"
        width="100%"
      />
    </a>
</p>


It is a system that visualizes data collected from sensors like temperature, water-tank, humidity in real-time using WEBSOCKET and published over MQTT.

## Features

- Realtime dashboard

## Repository Structure

- `frontend`: Contains the Next.js application for the frontend.
- `sms`: Contains the Django application for the backend.

## Installation

### Frontend (Next.js)

To get the frontend part of the Sensors Monitoring System up and running, follow these steps:

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the required dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

The frontend application should now be running on `http://localhost:3000`.

### Backend (Django)

To get the backend part of the Sensors Monitoring System up and running, follow these steps:

1. Navigate to the sms directory:
    ```sh
    cd sms
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:

    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```
5. Run the migrations:
    ```sh
    python manage.py migrate
    ```
6. Start the Django development server:
    ```sh
    python manage.py runserver
    ```

The backend application should now be running on `http://localhost:8000`.

## Usage

Once both the frontend and backend servers are up and running, you can access the realtime dashboard by navigating to `http://localhost:3000` in your web browser. The dashboard will display the real-time data from the connected sensors.

## Configuration

Make sure to configure your MQTT broker and WebSocket server settings in the configuration files of both the frontend and backend applications before starting the servers.

## Contribution Guidelines

We welcome contributions to the Sensors Monitoring System! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Developed by Adelite Niyonshuti Shema. [https://niyonshuti.org/](https://niyonshuti.org/)
