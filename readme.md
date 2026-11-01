# RMBA Cloud Map 📍

Interactive web visualizer mapping AWS tech communities and Student Builder Groups across the Buenos Aires Metropolitan Region (RMBA), Argentina.

Built for the **AWS Builder Center Weekend Challenge: Map It**.

---

## Overview

The AWS technical ecosystem in Buenos Aires is rapidly expanding, yet information about regional groups is often fragmented across separate platforms.

**RMBA Cloud Map** provides an interactive directory that bridges student initiatives and professional networks across the City of Buenos Aires (CABA), the Greater Buenos Aires metro area, and the Capital Region:

- **Student Builder Groups (University Hubs):** Academic chapters fostering hands-on cloud skills, workshops, and student projects.
- **Professional User Groups:** Established communities connecting cloud architects, DevOps engineers, and industry builders.

---

## Architecture & AWS Services

This project relies on AWS cloud infrastructure and open web standards:

- **Amazon Location Service:** Serves vector map tiles and basemap styling with low latency via an authenticated API Key.
- **Amazon S3 / Static Web Hosting:** Stores the frontend assets (`index.html`, `styles.css`, `app.js`) and structured spatial data with zero server maintenance overhead.
- **MapLibre GL JS:** Open-source WebGL client library that renders custom vector tiles and handles user interactions.
- **GeoJSON Dataset:** Structured coordinate collection containing verified locations, descriptions, tags, and official community links.

---

## Features

- **Interactive Vector Map:** Smooth navigation, zoom controls, and fly-to transitions centered across RMBA coordinates.
- **Category Filtering:** Filter between university chapters (Student Builder Groups) and industry communities (Professional User Groups).
- **Interactive Information Cards:** Sidebar listings that link directly to map pins and display rich popups with official group links.
- **Responsive Layout:** Clean dark-mode interface optimized for both desktop and mobile screens.

---

## Verified Regional Hubs

- **UdelaCiudad (UniCABA):** AWS Student Builder Group at University of the City of Buenos Aires (San Telmo / CABA).
- **FIUBA (UBA):** AWS Student Builder Group at Faculty of Engineering, University of Buenos Aires (CABA).
- **UNDAV:** AWS Student Builder Group at Universidad Nacional de Avellaneda (Piñeyro, Avellaneda).
- **Universidad Austral:** AWS Student Builder Group at Austral University (Pilar Campus).
- **AWS User Group Buenos Aires:** Regional industry community for engineers, architects, and developers (Parque Patricios Tech District / CABA).

---

## Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/rmba-cloud-map.git](https://github.com/YOUR_USERNAME/rmba-cloud-map.git)
   cd rmba-cloud-map
   ```
