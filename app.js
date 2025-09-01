// Application data (simulating backend API)
const API_DATA = {
  "profile": {
    "name": "Alex Johnson",
    "email": "alex.johnson@email.com",
    "education": [
      {
        "institution": "Stanford University",
        "degree": "Master of Science in Computer Science",
        "year": "2019"
      },
      {
        "institution": "UC Berkeley",
        "degree": "Bachelor of Science in Computer Science",
        "year": "2017"
      },
      {
        "institution": "Coursera",
        "degree": "Full-Stack Web Development Certificate",
        "year": "2020"
      }
    ],
    "skills": [
      "JavaScript", "React", "Node.js", "Python", "PostgreSQL", "MongoDB", 
      "Express.js", "Docker", "AWS", "Git", "TypeScript", "GraphQL"
    ],
    "projects": [
      {
        "title": "E-Commerce Platform",
        "description": "Full-stack e-commerce application with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, shopping cart, payment processing, and admin dashboard.",
        "skills": ["React", "Node.js", "PostgreSQL", "Express.js", "JavaScript"],
        "links": ["https://github.com/alexj/ecommerce", "https://ecommerce-demo.com"]
      },
      {
        "title": "Real-time Chat Application",
        "description": "WebSocket-based chat application supporting multiple rooms, private messaging, and file sharing. Built with React and Socket.io with MongoDB for message persistence.",
        "skills": ["React", "Node.js", "MongoDB", "Socket.io", "JavaScript"],
        "links": ["https://github.com/alexj/chat-app"]
      },
      {
        "title": "Data Analytics Dashboard",
        "description": "Interactive dashboard for visualizing large datasets using Python data processing pipeline and React frontend. Includes real-time data updates and customizable charts.",
        "skills": ["Python", "React", "PostgreSQL", "Docker", "TypeScript"],
        "links": ["https://github.com/alexj/analytics-dashboard", "https://analytics-demo.com"]
      },
      {
        "title": "Microservices API Gateway",
        "description": "Scalable API gateway built with Node.js and Docker for managing microservices communication. Includes authentication, rate limiting, and service discovery.",
        "skills": ["Node.js", "Docker", "Express.js", "MongoDB", "AWS"],
        "links": ["https://github.com/alexj/api-gateway"]
      },
      {
        "title": "Machine Learning Model Deployment",
        "description": "MLOps pipeline for deploying Python machine learning models to production using Docker containers and AWS infrastructure with automated testing and monitoring.",
        "skills": ["Python", "Docker", "AWS", "PostgreSQL"],
        "links": ["https://github.com/alexj/ml-deployment"]
      },
      {
        "title": "GraphQL Social Network",
        "description": "Social networking platform built with GraphQL API, React frontend, and real-time subscriptions. Features include posts, comments, likes, and user profiles.",
        "skills": ["GraphQL", "React", "Node.js", "MongoDB", "TypeScript"],
        "links": ["https://github.com/alexj/social-graphql", "https://social-demo.com"]
      }
    ],
    "work": [
      {
        "company": "Tech Innovations Inc",
        "role": "Senior Full-Stack Developer",
        "duration": "2021 - Present",
        "description": "Lead development of web applications using React, Node.js, and cloud technologies. Manage team of 4 developers and architect scalable solutions for enterprise clients."
      },
      {
        "company": "StartupX",
        "role": "Full-Stack Developer",
        "duration": "2019 - 2021",
        "description": "Developed and maintained multiple web applications using modern JavaScript frameworks. Built RESTful APIs and integrated third-party services for rapid product development."
      },
      {
        "company": "Digital Solutions Ltd",
        "role": "Junior Developer",
        "duration": "2017 - 2019", 
        "description": "Started career building responsive websites and learning modern development practices. Contributed to team projects and gained experience with databases and server-side programming."
      }
    ],
    "links": {
      "github": "https://github.com/alexjohnson",
      "linkedin": "https://linkedin.com/in/alex-johnson-dev",
      "portfolio": "https://alexjohnson.dev"
    }
  }
};

// Simulated API functions
const API = {
  // Health check
  async checkHealth() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'healthy',
          uptime: '12h 34m',
          timestamp: new Date().toISOString()
        });
      }, 100);
    });
  },

  // Get complete profile
  async getProfile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(API_DATA.profile);
      }, 200);
    });
  },

  // Get projects filtered by skill
  async getProjectsBySkill(skill) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (skill === 'all') {
          resolve(API_DATA.profile.projects);
        } else {
          const filtered = API_DATA.profile.projects.filter(project => 
            project.skills.includes(skill)
          );
          resolve(filtered);
        }
      }, 150);
    });
  },

  // Get top skills ranked by project frequency
  async getTopSkills() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const skillCounts = {};
        API_DATA.profile.projects.forEach(project => {
          project.skills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
          });
        });

        const topSkills = Object.entries(skillCounts)
          .map(([skill, count]) => ({
            name: skill,
            count: count,
            projects: API_DATA.profile.projects
              .filter(p => p.skills.includes(skill))
              .map(p => p.title)
          }))
          .sort((a, b) => b.count - a.count);

        resolve(topSkills);
      }, 200);
    });
  },

  // Search across all content
  async search(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = [];
        const lowerQuery = query.toLowerCase();

        // Search in profile info
        if (API_DATA.profile.name.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'profile',
            title: API_DATA.profile.name,
            content: `Contact: ${API_DATA.profile.email}`,
            highlight: API_DATA.profile.name
          });
        }

        // Search in skills
        API_DATA.profile.skills.forEach(skill => {
          if (skill.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: 'skill',
              title: skill,
              content: `Used in ${API_DATA.profile.projects.filter(p => p.skills.includes(skill)).length} projects`,
              highlight: skill
            });
          }
        });

        // Search in projects
        API_DATA.profile.projects.forEach(project => {
          if (project.title.toLowerCase().includes(lowerQuery) ||
              project.description.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: 'project',
              title: project.title,
              content: project.description,
              highlight: project.title,
              skills: project.skills
            });
          }
        });

        // Search in work experience
        API_DATA.profile.work.forEach(work => {
          if (work.company.toLowerCase().includes(lowerQuery) ||
              work.role.toLowerCase().includes(lowerQuery) ||
              work.description.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: 'work',
              title: `${work.role} at ${work.company}`,
              content: work.description,
              highlight: work.company
            });
          }
        });

        resolve(results);
      }, 200);
    });
  }
};

// Application state
let currentView = 'profile';
let currentSkillFilter = 'all';
let appInitialized = false;

// Utility functions
function showLoading() {
  const loading = document.getElementById('loading');
  const views = document.querySelectorAll('.view');
  loading.classList.remove('hidden');
  views.forEach(view => view.classList.add('hidden'));
}

function hideLoading() {
  const loading = document.getElementById('loading');
  loading.classList.add('hidden');
  document.getElementById(`${currentView}-view`).classList.remove('hidden');
  document.getElementById(`${currentView}-view`).classList.add('view--active');
}

function showError(message) {
  const error = document.getElementById('error');
  const views = document.querySelectorAll('.view');
  error.classList.remove('hidden');
  error.querySelector('.error__message').textContent = message;
  views.forEach(view => view.classList.add('hidden'));
}

function hideError() {
  const error = document.getElementById('error');
  error.classList.add('hidden');
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="search-result__highlight">$1</span>');
}

// Navigation system
function switchView(viewName) {
  currentView = viewName;
  
  // Update navigation
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach(item => {
    item.classList.remove('nav__item--active');
    if (item.dataset.view === viewName) {
      item.classList.add('nav__item--active');
    }
  });

  // Update views
  const views = document.querySelectorAll('.view');
  views.forEach(view => {
    view.classList.remove('view--active');
    view.classList.add('hidden');
    if (view.id === `${viewName}-view`) {
      view.classList.add('view--active');
      view.classList.remove('hidden');
    }
  });

  // Load view-specific data
  loadViewData(viewName);
}

// Load data for specific view
async function loadViewData(viewName) {
  try {
    hideError();
    
    switch (viewName) {
      case 'profile':
        await loadProfile();
        break;
      case 'projects':
        await loadProjects();
        break;
      case 'skills':
        await loadSkillsDashboard();
        break;
      case 'search':
        // Search is loaded on demand, just show the view
        hideLoading();
        break;
    }
  } catch (err) {
    console.error('Error loading view data:', err);
    showError(`Failed to load ${viewName} data: ${err.message}`);
  }
}

// Profile view functions
async function loadProfile() {
  if (!appInitialized) showLoading();
  try {
    const profile = await API.getProfile();
    renderProfile(profile);
    if (!appInitialized) hideLoading();
  } catch (err) {
    hideLoading();
    throw err;
  }
}

function renderProfile(profile) {
  // Basic info
  document.getElementById('profile-name').textContent = profile.name;
  document.getElementById('profile-email').textContent = profile.email;
  
  // Links
  document.getElementById('github-link').href = profile.links.github;
  document.getElementById('linkedin-link').href = profile.links.linkedin;
  document.getElementById('portfolio-link').href = profile.links.portfolio;

  // Education
  const educationList = document.getElementById('education-list');
  educationList.innerHTML = profile.education.map(edu => `
    <div class="education-item fade-in">
      <div class="education-item__degree">${edu.degree}</div>
      <div class="education-item__institution">${edu.institution}</div>
      <div class="education-item__year">${edu.year}</div>
    </div>
  `).join('');

  // Skills
  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = profile.skills.map(skill => `
    <span class="skill-tag skill-tag--clickable" onclick="filterProjectsBySkill('${skill}')">${skill}</span>
  `).join('');

  // Work experience
  const workList = document.getElementById('work-list');
  workList.innerHTML = profile.work.map(work => `
    <div class="work-item fade-in">
      <div class="work-item__role">${work.role}</div>
      <div class="work-item__company">${work.company}</div>
      <div class="work-item__duration">${work.duration}</div>
      <div class="work-item__description">${work.description}</div>
    </div>
  `).join('');
}

// Projects view functions
async function loadProjects() {
  showLoading();
  try {
    const projects = await API.getProjectsBySkill(currentSkillFilter);
    const profile = await API.getProfile();
    renderProjects(projects, profile.skills);
    hideLoading();
  } catch (err) {
    hideLoading();
    throw err;
  }
}

function renderProjects(projects, allSkills) {
  // Render skill filters
  const skillFilters = document.getElementById('skill-filters');
  skillFilters.innerHTML = allSkills.map(skill => `
    <button class="btn btn--secondary btn--sm filter-btn ${currentSkillFilter === skill ? 'filter-btn--active' : ''}" 
            onclick="filterProjectsBySkill('${skill}')" data-skill="${skill}">
      ${skill}
    </button>
  `).join('');

  // Update the "All" button state
  const allButton = document.querySelector('.filter-btn[data-skill="all"]');
  if (allButton) {
    if (currentSkillFilter === 'all') {
      allButton.classList.add('filter-btn--active');
    } else {
      allButton.classList.remove('filter-btn--active');
    }
  }

  // Render projects grid
  const projectsGrid = document.getElementById('projects-grid');
  projectsGrid.innerHTML = projects.map(project => `
    <div class="project-card fade-in">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__description">${project.description}</p>
      <div class="project-card__skills">
        ${project.skills.map(skill => `<span class="skill-tag" onclick="filterProjectsBySkill('${skill}')">${skill}</span>`).join('')}
      </div>
      <div class="project-card__links">
        ${project.links.map(link => `
          <a href="${link}" target="_blank" class="project-card__link">
            ${link.includes('github') ? 'GitHub' : link.includes('demo') ? 'Live Demo' : 'Link'}
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');
}

async function filterProjectsBySkill(skill) {
  currentSkillFilter = skill;
  
  // If we're on projects view, reload projects
  if (currentView === 'projects') {
    await loadProjects();
  } else {
    // Switch to projects view
    switchView('projects');
  }
}

// Skills dashboard functions
async function loadSkillsDashboard() {
  showLoading();
  try {
    const topSkills = await API.getTopSkills();
    const profile = await API.getProfile();
    renderSkillsDashboard(topSkills, profile);
    hideLoading();
  } catch (err) {
    hideLoading();
    throw err;
  }
}

function renderSkillsDashboard(topSkills, profile) {
  // Update stats
  document.getElementById('total-skills').textContent = profile.skills.length;
  document.getElementById('total-projects').textContent = profile.projects.length;

  // Render top skills
  const topSkillsContainer = document.getElementById('top-skills');
  topSkillsContainer.innerHTML = topSkills.map(skill => `
    <div class="skill-card fade-in" onclick="filterProjectsBySkill('${skill.name}')">
      <h3 class="skill-card__name">${skill.name}</h3>
      <p class="skill-card__count">Used in ${skill.count} project${skill.count > 1 ? 's' : ''}</p>
      <p class="skill-card__projects">Click to view projects</p>
    </div>
  `).join('');
}

// Search functions
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !searchBtn || !searchResults) return;

  async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.innerHTML = '<div class="no-results">Enter a search term to get started</div>';
      return;
    }

    // Show loading in search results
    searchResults.innerHTML = '<div class="loading"><div class="loading__spinner"></div><p>Searching...</p></div>';

    try {
      const results = await API.search(query);
      renderSearchResults(results, query);
    } catch (err) {
      searchResults.innerHTML = '<div class="no-results">Search failed. Please try again.</div>';
    }
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Initial empty state
  searchResults.innerHTML = '<div class="no-results">Enter a search term to get started</div>';
}

function renderSearchResults(results, query) {
  const searchResults = document.getElementById('search-results');
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found for your search</div>';
    return;
  }

  searchResults.innerHTML = results.map(result => `
    <div class="search-result fade-in">
      <div class="search-result__type">${result.type}</div>
      <h3 class="search-result__title">${highlightText(result.title, query)}</h3>
      <p class="search-result__content">${highlightText(result.content, query)}</p>
      ${result.skills ? `
        <div class="project-card__skills" style="margin-top: 12px;">
          ${result.skills.map(skill => `<span class="skill-tag" onclick="filterProjectsBySkill('${skill}')">${skill}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

// API health check
async function checkApiHealth() {
  try {
    const apiStatusText = document.getElementById('api-status-text');
    const apiStatusIndicator = document.querySelector('.status__indicator');
    
    const health = await API.checkHealth();
    apiStatusText.textContent = 'Online';
    apiStatusIndicator.classList.remove('status__indicator--error', 'status__indicator--warning');
  } catch (err) {
    const apiStatusText = document.getElementById('api-status-text');
    const apiStatusIndicator = document.querySelector('.status__indicator');
    
    apiStatusText.textContent = 'Offline';
    apiStatusIndicator.classList.add('status__indicator--error');
  }
}

// Global functions for onclick handlers
window.filterProjectsBySkill = filterProjectsBySkill;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchView(item.dataset.view);
    });
  });

  // Setup search
  setupSearch();

  // Initial load
  appInitialized = true;
  switchView('profile');

  // Check API health
  checkApiHealth();
  setInterval(checkApiHealth, 30000); // Check every 30 seconds
});