import { observeCards } from './animations.js';
import { loadGitHubRepos } from './github.js';

document.addEventListener('DOMContentLoaded', () => {
    observeCards();
    loadGitHubRepos('biscaia021');
});
