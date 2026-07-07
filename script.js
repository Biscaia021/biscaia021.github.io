
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer para as animações de fade-in dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const observeCards = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            // Adiciona um pequeno atraso para efeito de cascata
            card.style.transitionDelay = `${(index % 10) * 0.1}s`;
            observer.observe(card);
        });
    };

  
    observeCards();

    
    const githubUsername = 'biscaia021';
    const grid = document.getElementById('projects-grid');

    if (grid) {
        
        const cacheKey = `github_repos_${githubUsername}`;
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
            console.log("Estado colapsado via Cache Quântico (Memoization).");
            renderRepos(JSON.parse(cachedData));
        } else {
            fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
                .then(response => response.json())
                .then(repos => {
                    sessionStorage.setItem(cacheKey, JSON.stringify(repos));
                    renderRepos(repos);
                })
                .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));
        }
        
        function renderRepos(repos) {
            grid.innerHTML = ''; // Limpa estado base
            
     
            const fragment = document.createDocumentFragment();

            const ignoredRepos = ['pokedex', 'https-Biscaia021.github.io'];

            repos.forEach(repo => {
  
                if (repo.fork || ignoredRepos.includes(repo.name)) return;

                const article = document.createElement('article');
                article.className = 'card';
                
                const description = repo.description ? repo.description : 'Repositório no GitHub sem descrição.';
                const language = repo.language ? `<span style="color: var(--accent-color); font-size: 0.85rem; display: block; margin-bottom: 10px;">#${repo.language}</span>` : '';

                article.innerHTML = `
                    <div class="card-img" style="background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" style="width: 50px; opacity: 0.7; filter: invert(1);">
                    </div>
                    <h3>${repo.name}</h3>
                    ${language}
                    <p>${description}</p>
                    <div style="margin-top: auto; padding-top: 15px;">
                        <a href="${repo.html_url}" target="_blank" class="btn">Ver no GitHub</a>
                    </div>
                `;
                
                fragment.appendChild(article);
            });
            
            grid.appendChild(fragment);
            observeCards();
        }
    }
});
