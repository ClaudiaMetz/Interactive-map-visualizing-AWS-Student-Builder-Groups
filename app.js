// Community locations are maintained separately in nodes.geojson.
let nodesData = { type: 'FeatureCollection', features: [] };

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
let activeFilter = 'all';

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
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    renderMapNodes(activeFilter);
  });
});

map.on('load', async () => {
  try {
    const response = await fetch('./nodes.geojson');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    nodesData = await response.json();
    if (nodesData.type !== 'FeatureCollection' || !Array.isArray(nodesData.features) || nodesData.features.length === 0) {
      throw new Error('The GeoJSON file does not contain a FeatureCollection with features.');
    }

    const bounds = new maplibregl.LngLatBounds();
    nodesData.features.forEach(feature => bounds.extend(feature.geometry.coordinates));
    map.fitBounds(bounds, { padding: 48, maxZoom: 10.5, duration: 0 });
    renderMapNodes(activeFilter);
  } catch (error) {
    console.error('Could not load community locations from nodes.geojson:', error);
    listContainer.textContent = 'Community locations could not be loaded.';
  }
});
