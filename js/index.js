const eventsStore = [
  {
    title: 'INFJ Personality Type - Coffee Shop Meet & Greet',
    description: 'Being an INFJ',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3',
    type: 'offline',
    attendees: 99,
    category: 'Hobbies and Passions',
    distance: 50,
  },

  {
    title:
      'NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience',
    description: 'New York AI Users',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    image:
      'https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3',
    type: 'offline',
    attendees: 43,
    category: 'Technology',
    distance: 25,
  },

  {
    title: 'Book 40+ Appointments Per Month Using AI and Automation',
    description: 'New Jersey Business Network',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    image:
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3',
    type: 'online',
    category: 'Technology',
    distance: 10,
  },

  {
    title: 'Dump writing group weekly meetup',
    description: 'Dump writing group',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    image:
      'https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3',
    type: 'online',
    attendees: 77,
    category: 'Business',
    distance: 100,
  },

  {
    title: 'Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community',
    description: 'Over 40s, 50s, 60s Singles Chat, Meet & Dating Community',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    image:
      'https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3',
    type: 'online',
    attendees: 140,
    category: 'Social Activities',
    distance: 75,
  },

  {
    title: 'All Nations - Manhattan Missions Church Bible Study',
    description: 'Manhattan Bible Study Meetup Group',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    image:
      'https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3',
    type: 'offline',
    category: 'Health and Wellbeing',
    distance: 15,
  },
];
const typeFilter = document.querySelector('.typeFilter');
const distanceFilter = document.querySelector('.distanceFilter');
const categoryFilter = document.querySelector('.categoryFilter');
const dateFilter = document.querySelector('.dateFilter');

const typeFilterMobile = document.querySelector('.typeFilter-mobile');
const distanceFilterMobile = document.querySelector('.distanceFilter-mobile');
const categoryFilterMobile = document.querySelector('.categoryFilter-mobile');
const dateFilterMobile = document.querySelector('.dateFilter-mobile');

function formatDate(date) {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });
}

function renderEventCard(event) {
  return `
    <article class="event-card">
      <div class="event-card-left">
        <img
          class="event-card-img"
          src="${event.image}"
          alt="${event.title}"
        >
      </div>

      <div class="event-card-descr">
        <time class="event-card-time">
          ${formatDate(event.date)}
        </time>

        <h3 class="event-card-title">
          ${event.title}
        </h3>

        <p class="event-card-category">
          ${event.category} (${event.distance})
        </p>
      </div>
    </article>
  `;
}

// первоначальная отрисовка
document.querySelector('.events__list').innerHTML = eventsStore
  .map(renderEventCard)
  .join('');

function filterEvents() {
  const isMobile = window.innerWidth <= 644;

  const selectedType = isMobile
    ? typeFilterMobile?.value || 'all'
    : typeFilter?.value || 'all';

  const selectedDistance = isMobile
    ? distanceFilterMobile?.value || 'all'
    : distanceFilter?.value || 'all';

  const selectedCategory = isMobile
    ? categoryFilterMobile?.value || 'all'
    : categoryFilter?.value || 'all';

  const selectedDate = isMobile
    ? dateFilterMobile?.value || 'all'
    : dateFilter?.value || 'all';

  const today = new Date();

  const filteredEvents = eventsStore.filter((event) => {
    const matchType = selectedType === 'all' || event.type === selectedType;

    const matchDistance =
      selectedDistance === 'all' || event.distance <= Number(selectedDistance);

    const matchCategory =
      selectedCategory === 'all' || event.category === selectedCategory;

    let matchDate = true;

    if (selectedDate !== 'all') {
      const eventDate = new Date(event.date);

      switch (selectedDate) {
        case 'Today':
          matchDate = eventDate.toDateString() === today.toDateString();
          break;

        case 'Tomorrow': {
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          matchDate = eventDate.toDateString() === tomorrow.toDateString();
          break;
        }

        case 'This week': {
          const weekEnd = new Date(today);
          weekEnd.setDate(today.getDate() + 7);

          matchDate = eventDate >= today && eventDate <= weekEnd;
          break;
        }

        case 'Next week': {
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(today.getDate() + 7);

          const nextWeekEnd = new Date(today);
          nextWeekEnd.setDate(today.getDate() + 14);

          matchDate = eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
          break;
        }
      }
    }

    return matchType && matchDistance && matchCategory && matchDate;
  });

  document.querySelector('.events__list').innerHTML = filteredEvents
    .map(renderEventCard)
    .join('');
}

// Desktop
typeFilter?.addEventListener('change', filterEvents);
distanceFilter?.addEventListener('change', filterEvents);
categoryFilter?.addEventListener('change', filterEvents);
dateFilter?.addEventListener('change', filterEvents);

// Mobile
typeFilterMobile?.addEventListener('change', filterEvents);
distanceFilterMobile?.addEventListener('change', filterEvents);
categoryFilterMobile?.addEventListener('change', filterEvents);
dateFilterMobile?.addEventListener('change', filterEvents);
