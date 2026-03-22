const usuario = "silenacruz"; 
const boton = document.getElementById('magic-button');

if (localStorage.getItem('modo') === 'oscuro') {
    document.body.classList.add('dark');
}

boton.onclick = () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('modo', 'oscuro');
    } else {
        localStorage.setItem('modo', 'claro');
    }
};

async function obtenerDatosGithub() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('github-content');

    try {
        const respuesta = await fetch(`https://api.github.com/users/${usuario}`);
        
        if (!respuesta.ok) throw new Error("User not found");

        const datos = await respuesta.json();

        document.getElementById('github-name').innerText = datos.name || "Usuario de GitHub";
        document.getElementById('github-bio').innerText = datos.bio || "Full Stack Developer en proceso 🚀";
        document.getElementById('github-avatar').src = datos.avatar_url;

        loader.style.display = 'none';
        content.style.display = 'block';

        console.log("Datos cargados con exito ");
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('github-bio').innerText = "Error al conectar con GitHub";
    }
}

setTimeout(obtenerDatosGithub, 1500);