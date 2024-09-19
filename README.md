# Autoscriber Application

Autoscriber is a full-stack application that allows users to record audio, save it in chunks, and play back previous recordings. It utilizes a Vue.js frontend, a Node.js backend with GraphQL, a PostgreSQL database, and MinIO for object storage.

## **Features**

- Record audio in WAV format.
- Save audio in chunks for efficient upload and storage.
- Play back full recordings or individual chunks.
- View a list of previous recordings.

## **Architecture**

- **Frontend:** Vue.js with Vuetify for UI components.
- **Backend:** Node.js, GraphQL with Apollo Server, MikroORM for database interactions.
- **Database:** PostgreSQL.
- **Object Storage:** MinIO (S3-compatible storage).

## **Prerequisites**

- Docker and Docker Compose installed on your machine.

## **Setup Instructions**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/clarknoah/autoscriber.git
   cd autoscriber
   ```

2. **Environment Variables:**

* The necessary environment variables are already configured in the docker-compose.yml file and server .env file.
* Ensure the following variables are set in server/.env if running outside Docker:


```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/autoscriber
OBJECT_STORE_URL=127.0.0.1
OBJECT_STORE_PORT=9000
OBJECT_STORE_ACCESS_KEY=minioadmin
OBJECT_STORE_SECRET_KEY=minioadmin
OBJECT_STORE_BUCKET=autoscriber
```


3. **Build and Run with Docker Compose:**

```bash
docker-compose up --build
```

* This command builds the Docker images and starts all services: client, server, postgres, and minio.
* The client will be accessible at http://localhost:8080.
* The server GraphQL playground (if enabled) at http://localhost:4000/graphql.
* MinIO console accessible at http://localhost:9001 (username/password: minioadmin).


4. **Access the Application:**

* Navigate to http://localhost:8080 in your browser.
* Start recording audio, save recordings, and view them in the "Previous Recordings" page.


## **Development Notes**

### Frontend

**Install Dependencies**
```bash
cd client
yarn install
```
* Run the development server:

```bash
yarn serve
```

### Backend Development:


**Install Dependencies**

```bash
cd server
yarn install
```

Run the development server:

```bash
yarn dev
```
Running Migrations:

Navigate to the server directory and run:
```bash
yarn migration:create
```
---

## **Task 6: Code Improvements for Interview Purposes**

**Areas of Improvement:**

1. **Error Handling:**

   - **Consistent Error Responses:** Ensure that all API endpoints return errors in a consistent format.
   - **Logging:** Enhance logging to include more contextual information.

2. **Code Organization:**

   - **Separate Concerns:** Split large files into smaller, more focused modules.
   - **Comments and Documentation:** Add JSDoc comments to functions and classes for better understanding.

3. **Security Enhancements:**

   - **Authentication and Authorization:** Implement user authentication to prevent unauthorized access.
   - **Input Validation:** Use validation libraries to sanitize and validate all incoming data.

4. **Performance Optimization:**

   - **Chunk Uploads:** Optimize chunk size and upload frequency to balance performance and resource usage.
   - **Database Indexing:** Ensure that database queries are optimized with proper indexing.

5. **Scalability Considerations:**

   - **Microservices Architecture:** Consider splitting services into separate microservices for better scalability.
   - **Load Balancing:** Implement load balancing strategies if expecting high traffic.

6. **Testing:**

   - **Unit Tests:** Write unit tests for critical components to ensure reliability.
   - **Integration Tests:** Test interactions between different parts of the application.

7. **Code Quality Tools:**

   - **Linting and Formatting:** Use ESLint and Prettier consistently across the project.
   - **TypeScript Strict Mode:** Enable stricter TypeScript settings for better type safety.

8. **Documentation:**

   - **API Documentation:** Use tools like Swagger or GraphQL introspection to document APIs.
   - **README Enhancements:** Provide more detailed setup instructions and FAQs.

9. **Use of Environment Variables:**

   - **Centralized Configuration:** Manage environment variables and configuration settings in a centralized module.
   - **Secrets Management:** Avoid hardcoding secrets; use a secure secrets management system.

10. **Docker Optimization:**

    - **Multi-stage Builds:** Optimize Docker images using multi-stage builds to reduce image size.
    - **Health Checks:** Ensure all services have proper health checks defined.

**By addressing these areas, the codebase will not only be more robust and maintainable but will also showcase best practices, which is beneficial for interview purposes.**

---

I hope this comprehensive guide helps you complete your assignment successfully. If you have any questions or need further clarification on any of the steps, feel free to ask!