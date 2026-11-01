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

## Planned Architecture & AWS Services

The project is planned around AWS cloud infrastructure and open web standards:

- **Amazon Location Service:** Will serve vector map tiles and basemap styling through an API key.
- **Amazon S3 / Static Web Hosting:** Will host the frontend assets (`index.html`, `styles.css`, `app.js`) and the spatial dataset (`nodes.geojson`).
- **MapLibre GL JS:** Open-source WebGL client library that renders custom vector tiles and handles user interactions.
- **GeoJSON Dataset:** `nodes.geojson` stores the locations, descriptions, categories, and links separately from the map logic in `app.js`.

---

## Features

- **Interactive Vector Map:** Smooth navigation, zoom controls, and fly-to transitions centered across RMBA coordinates.
- **Category Filtering:** Filter between university chapters (Student Builder Groups) and industry communities (Professional User Groups).
- **Interactive Information Cards:** Sidebar listings that link directly to map pins and display rich popups with official group links.
- **Responsive Layout:** Clean dark-mode interface optimized for both desktop and mobile screens.

---

## Verified Regional Hubs

- **UdelaCiudad (UniCABA):** AWS Student Builder Group at University of the City of Buenos Aires (San Telmo / CABA) ([Meetup](https://www.meetup.com/es-es/aws-sbg-at-university-of-the-city-of-buenos-aires/)).
- **FIUBA (UBA):** AWS Student Builder Group at Faculty of Engineering, University of Buenos Aires (CABA) ([Meetup](https://www.meetup.com/aws-sbg-at-university-of-buenos-aires-faculty-of-engineering/)).
- **UNDAV:** AWS Student Builder Group at Universidad Nacional de Avellaneda (Piñeyro, Avellaneda) ([Meetup](https://www.meetup.com/aws-sbg-at-national-university-of-avellaneda/)).
- **Austral University:** AWS Student Builder Group at Austral University (Pilar Campus) ([Meetup](https://www.meetup.com/es-es/aws-sbg-at-universidad-austral/)).
- **National University of La Plata (UNLP):** AWS Student Builder Group at the National University of La Plata (La Plata, Buenos Aires Province) ([Meetup](https://www.meetup.com/es-es/aws-sbg-at-national-university-of-la-plata-north-campus/)).
- **AWS User Group Buenos Aires:** Citywide professional AWS community for engineers, architects, and developers. Its map marker highlights the Technology District in Buenos Aires City as a reference area; it does not represent the group's actual geographic location ([Meetup](https://www.meetup.com/aws-user-group-buenos-aires/)).

---

## Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ClaudiaMetz/Interactive-map-visualizing-AWS-Student-Builder-Groups.git
   cd Interactive-map-visualizing-AWS-Student-Builder-Groups
   ```

2. **Run a local web server** from the project directory so the app can fetch `nodes.geojson`:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.
