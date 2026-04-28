# Blog API

## Description

The backend API for a JAMstack blog platform with two separate frontends: an admin dashboard for authors to write and edit posts, and a public client for readers. This server handles authentication, post management, and serves data to both clients via REST.

* Admin frontend: [blog-api-admin](https://github.com/jayyzzeezzy/blog-api-admin)
* Reader frontend: [blog-api-client](https://github.com/jayyzzeezzy/blog-api-client)

Built with Node.js, Express, PostgreSQL, and Prisma ORM.

## Features

* JAMstack architecture with decoupled API and clients
* JWT-based authentication for admin routes
* Role-based access control (admin vs. public endpoints)
* RESTful API design
* MVC pattern with separated controllers and routes
* Prisma ORM for type-safe database access
* Configurable database connection (local or hosted)
* Public read endpoints and protected write endpoints

## Installation

1. **Fork the Repository**

   * Follow the documentation on GitHub to [fork this repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
   * You should also have a local clone of the forked repository after following the tutorial.
2. **Move to the cloned directory**

   `cd blog-api`
3. **Install Dependencies**

   `npm install`
4. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```shell
   PORT=3000
   LOCAL_DB="postgresql://USER:PASSWORD@localhost:5432/blog_api"
   THIRD_PARTY_DB=""
   SESSION_SECRET="your-session-secret"
   SESSION_CODE="your-session-code"
   PRIVATE_KEY="your-private-key"
   ```

   Use `LOCAL_DB` for local development. Set `THIRD_PARTY_DB` when deploying to a hosted Postgres provider like Railway or Render.
5. **Run database migrations**

   `npx prisma migrate dev`
6. **Start the server**

   `node app.js`
7. **Verify the API is running**

   The API will be available at the port you set in `.env` (e.g., <http://localhost:3000>).

## Contribute

* Issue Tracker: github.com/jayyzzeezzy/blog-api/issues
* Source Code: github.com/jayyzzeezzy/blog-api.git

## Support

Let me know if you encounter any issues.  
Email me at: [jam9es@gmail.com](mailto:jam9es@gmail.com)

## License

The project is licensed under the [MIT license](./LICENSE.md).
