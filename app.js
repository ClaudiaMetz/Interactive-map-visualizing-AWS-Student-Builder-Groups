// AWS communities in the Buenos Aires Metropolitan Area.
const nodesData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 1,
        name: 'UdelaCiudad (UniCABA)',
        category: 'sbg',
        typeLabel: 'Student Builder Group',
        address: 'Juan Domingo Perón 802, C1002ABC Buenos Aires City',
        description: 'The founding official AWS Student Builders chapter at UniCABA.',
        link: 'https://www.meetup.com/aws-sbg-at-university-of-the-city-of-buenos-aires/'
      },
      geometry: { type: 'Point', coordinates: [-58.37772, -34.60600] }
    },
    {
      type: 'Feature',
      properties: {
        id: 2,
        name: 'FIUBA (UBA School of Engineering)',
        category: 'sbg',
        typeLabel: 'Student Builder Group',
        address: 'Paseo Colón Avenue 850, C1063ACV Buenos Aires City',
        description: 'A student cloud computing community at the UBA School of Engineering.',
        link: 'https://aws.amazon.com/developer/community/students/'
      },
      geometry: { type: 'Point', coordinates: [-58.3687539886, -34.6177777611] }
    },
    {
      type: 'Feature',
      properties: {
        id: 3,
        name: 'UNDAV (Piñeyro Campus)',
        category: 'sbg',
        typeLabel: 'Student Builder Group',
        address: 'Mario Bravo 1460, B1868BMA Piñeyro, Avellaneda',
        description: 'A regional cloud student community in the southern suburbs of Buenos Aires.',
        link: 'https://aws.amazon.com/developer/community/students/'
      },
      geometry: { type: 'Point', coordinates: [-58.39812, -34.66853] }
    },
    {
      type: 'Feature',
      properties: {
        id: 4,
        name: 'Universidad Austral (Campus Pilar)',
        category: 'sbg',
        typeLabel: 'Student Builder Group',
        address: 'Mariano Acosta 1611, B1630FHB Pilar',
        description: 'A student cloud architecture community in the northern suburbs.',
        link: 'https://aws.amazon.com/developer/community/students/'
      },
      geometry: { type: 'Point', coordinates: [-58.859075, -34.455733] }
    },
    {
      type: 'Feature',
      properties: {
        id: 5,
        name: 'AWS User Group Buenos Aires',
        category: 'pro',
        typeLabel: 'Professional User Group',
        address: 'Buenos Aires Technology District / Parque Patricios, Buenos Aires City',
        description: 'A meetup for cloud architects, developers, and DevOps professionals.',
        link: 'https://www.meetup.com/AWS-User-Group-Buenos-Aires/'
      },
      geometry: { type: 'Point', coordinates: [-58.4063, -34.6401] }
    },
    {
      type: 'Feature',
      properties: {
        id: 6,
        name: 'National University of La Plata (UNLP)',
        category: 'sbg',
        typeLabel: 'Student Builder Group',
        address: 'Avenida 7 776, B1900TGC La Plata, Buenos Aires Province',
        description: 'A student cloud computing community at the National University of La Plata.',
        link: 'https://www.unlp.edu.ar/'
      },
      geometry: { type: 'Point', coordinates: [-57.9511217, -34.9128818] }
    }
  ]
};

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [-58.42, -34.61],
  zoom: 10.5
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');

const markers = [];
const listContainer = document.getElementById('node-list');
const filterButtons = document.querySelectorAll('.filter-btn');

function addText(parent, tagName, text, className) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function createPopup(properties) {
  const content = document.createElement('div');
  addText(content, 'h2', properties.name);

  const details = document.createElement('p');
  const type = document.createElement('strong');
  type.textContent = 'Type: ';
  details.append(type, document.createTextNode(`${properties.typeLabel}\n`));
  const addressLabel = document.createElement('strong');
  addressLabel.textContent = 'Location: ';
  details.append(addressLabel, document.createTextNode(properties.address));
  content.appendChild(details);
  addText(content, 'p', properties.description);

  const link = document.createElement('a');
  link.href = properties.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Visit community →';
  content.appendChild(link);

  return new maplibregl.Popup({ offset: 25 }).setDOMContent(content);
}

function renderMapNodes(filter = 'all') {
  markers.forEach(marker => marker.remove());
  markers.length = 0;
  listContainer.replaceChildren();

  const filteredFeatures = nodesData.features.filter(feature =>
    filter === 'all' || feature.properties.category === filter
  );

  filteredFeatures.forEach(feature => {
    const properties = feature.properties;
    const coordinates = feature.geometry.coordinates;
    const markerColor = properties.category === 'sbg' ? '#38bdf8' : '#ea580c';
    const marker = new maplibregl.Marker({ color: markerColor })
      .setLngLat(coordinates)
      .setPopup(createPopup(properties))
      .addTo(map);
    markers.push(marker);

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'node-card';
    const tagClass = properties.category === 'sbg' ? 'node-tag tag-sbg' : 'node-tag tag-pro';
    addText(card, 'span', properties.typeLabel, tagClass);
    addText(card, 'h2', properties.name);
    addText(card, 'p', properties.address);
    card.addEventListener('click', () => {
      map.flyTo({ center: coordinates, zoom: 13, essential: true });
      marker.togglePopup();
    });
    listContainer.appendChild(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    renderMapNodes(button.dataset.filter);
  });
});

map.on('load', () => {
  const bounds = new maplibregl.LngLatBounds();
  nodesData.features.forEach(feature => bounds.extend(feature.geometry.coordinates));
  map.fitBounds(bounds, { padding: 48, maxZoom: 10.5, duration: 0 });
  renderMapNodes();
});
