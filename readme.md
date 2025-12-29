
# Key Club Website

This is the website for the Henry M. Jackson High School Key Club. Key Club is an international student-led volunteering organization, and this is the website for the chapter at the Henry M. Jackson High School. Its purpose is to highlight our club and be helpful to our members and officers via various tools featured on the website.
## My Role

I served as the Webmaster for my high school’s Key Club and led this project end-to-end from March 2025 to March 2026 (one officer term). I was responsible for system design, implementation, deployment, and maintenance. During the design phase, I collaborated with the club’s Editors to align the site’s visual design with the club’s identity, while independently making architectural and infrastructure decisions.
## Technical Stack

- Frontend - SvelteKit for the frontend and used the Node adapter, taking the Server Side Rendering approach instead of the Single Page App approach to improve SEO.
- Backend - SQLite for persistence due to its simplicity, low overhead, and suitability for the project’s scale.
- API - FastAPI for its performance, simplicity, and explicit control over request handling and authentication logic.
- Hosting - Self-hosted on a Linux home server using Docker Compose, with NGINX as a reverse proxy and Certbot for TLS.
- Auth - Implemented JWT-based auth with refresh token rotation; later began migrating toward session-based auth before the club transitioned to a third-party management system.
## What I Learned

Being my biggest project thus far, I learned a lot of things working on it.
- Google APIs - I learned to use Python to access the Google Docs, Sheets, and Calendar APIs for reading and writing to and from Google Docs and Sheets (for automatic event attendance and logging), and for fetching upcoming events from the Google Calendar (for automated event reminders on the club Discord).
- Discord.py - I learned to use the Discord.py library to run the Discord bot for the club Discord. I used it in tandem with the website API to create commands that let users check their volunteer hours, class ranks, and to send automated reminders for upcoming events that need members.
- JWT - I implemented a simple, but crude version of JWT authentication. I used the simple-jwt Python package to implement it, with refresh token rotation and endpoints for getting user info, refreshing the access token, and logging in and out.
- Nginx - Since this is the second website I was hosting, I had to rework how I host websites on my home server. I created an overhead proxy that handles TLS and forwards requests to the per-website reverse proxy, that way I can host my portfolio website and this website on one machine.
- Deployment - I learned to use Docker and Docker compose to effectively containerize this website and host it on my home server.
## What I'd Improve

If the club were to continue using this site as its primary management tool, I would redesign the authentication system entirely, moving to session-based auth for simplicity and maintainability. From a UX perspective, I would also add clearer loading and error states (e.g., when volunteer hours are being fetched or fail to load) to improve feedback and usability.
