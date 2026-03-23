const usuario = "silenacruz";
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

function initDarkMode() {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark');
        if (toggleBtn) toggleBtn.textContent = 'Modo ☀️';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
            toggleBtn.textContent = isDark ? 'Modo ☀️' : 'Modo 🌙';
        });
    }
}

async function obtenerDatosGithub() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('github-content');
    const avatarImg = document.getElementById('github-avatar');

    if (!avatarImg) return; 

    try {
        const respuesta = await fetch(`https://api.github.com/users/${usuario}`);
        if (!respuesta.ok) throw new Error("User not found");
        const datos = await respuesta.json();

        document.getElementById('github-name').innerText = datos.name || "Silene Cruz";
        document.getElementById('github-bio').innerText = datos.bio || "Frontend Developer";
        avatarImg.src = datos.avatar_url;

        if (loader) loader.style.display = 'none';
        if (content) content.style.display = 'block';

    } catch (error) {
        console.error("Error GitHub:", error);
        if (loader) loader.style.display = 'none';
    }
}

function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        const moveX = mouseX * 60; 
        const moveY = mouseY * 60;
        body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        body.style.backgroundPositionY = `calc(50% + ${scrollValue * 0.2}px)`;
    });
}

initDarkMode();
initParallax();
setTimeout(obtenerDatosGithub, 1500);