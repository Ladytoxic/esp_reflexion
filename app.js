//fecha y hora legible
const $fecha = document.getElementById('fecha');
setInterval(() => {
    const fechaActual = new Date();
    const Fecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const Hora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaLegible = fechaActual.toLocaleDateString('es-ES', Fecha) + ' ' + fechaActual.toLocaleTimeString('es-ES', Hora);
    $fecha.innerText = fechaLegible;
}, 1000);

// navbar 
const menuButton = document.getElementById("menu");
const menuList = document.querySelector("nav ul");

menuButton.addEventListener("click", function () {
    menuList.classList.toggle("no-visible");
    if (menuList.classList.contains("no-visible")) {
        menuButton.innerHTML = '<i class="ai-text-align-justified"></i>';
    } else {
        menuButton.innerHTML = '<i class="ai-cross"></i>';
    }
});
//Esta función genera los enlaces a las secciónes de la paginas en el navbar
function generateMenu(data) {
    const articlesData = data.map(article => {
        return {
            text: article.title,
            href: `#${article.id}`
        };
    });

    articlesData.unshift({
        text: 'Inicio',
        href: '#'
    });

    articlesData.push({
        text: 'Contacto',
        href: '#contacto'
    });
    //Genera los enlaces extraidos de los articulos que provienen de la API
    articlesData.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        listItem.appendChild(link);
        menuList.appendChild(listItem);
    });

    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetId === "") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (targetElement) {
                const targetOffset = targetElement.offsetTop - 90;
                window.scrollTo({ top: targetOffset, behavior: 'smooth' });
            }

            menuList.classList.add("no-visible");
            menuButton.innerHTML = '<i class="ai-text-align-justified"></i>';
        });
    });
}

//Genera el perfil
function generarHeader(data) {
    // Obtener una referencia al contenedor donde se insertarán los elementos generados
    const profile = document.getElementById('profile');

    // Generar los elementos HTML dinámicamente
    const bannerImg = document.createElement('img');
    bannerImg.classList.add('banner');
    bannerImg.src = data.banner;
    bannerImg.alt = 'Banner de ' + `${data.titulo}`;
    bannerImg.title = 'banner de perfil ' + `${data.titulo}`;
    profile.appendChild(bannerImg);

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('avatar');
    avatarImg.src = data.img;
    avatarImg.alt = 'foro de perfil ' + `${data.titulo}`;
    avatarImg.title = 'Foto de perfil ' + `${data.titulo}`;
    profile.appendChild(avatarImg);

    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user_info');

    const welcomeHeading = document.createElement('h1');
    welcomeHeading.id = 'welcone';
    welcomeHeading.textContent = data.titulo;
    userInfoDiv.appendChild(welcomeHeading);

    const locationSpan = document.createElement('span');
    locationSpan.innerHTML = `<i class="ai-location"></i>${data.subtitulo}`;
    userInfoDiv.appendChild(locationSpan);

    const infoList = document.createElement('ul');
    infoList.classList.add('fade-in');

    const descriptionItem = document.createElement('li');
    descriptionItem.innerHTML = `<p>${data.descripcion}</p>`;
    infoList.appendChild(descriptionItem);

    const redesItem = document.createElement('li');
    redesItem.classList.add('redes');
    const redesBoxDiv = document.createElement('div');
    redesBoxDiv.classList.add('redes_box');
    redesBoxDiv.innerHTML = `
    <a href="${data.facebook}" target="_blank" aria-label="Link de Facebook"><i class="ai-facebook-fill"></i></a>
    <a href="${data.instagram}" target="_blank" aria-label="Link de Instagram"><i class="ai-instagram-fill"></i></a>`;

    redesItem.appendChild(redesBoxDiv);
    infoList.appendChild(redesItem);

    userInfoDiv.appendChild(infoList);
    profile.appendChild(userInfoDiv);
    Welcome(data.titulo);
}

// titulo 
function Welcome(titulo) {
    const $h1 = document.getElementById('welcone');
    const propText = 'e';
    $h1.innerHTML = `<h1 id="welcone">Bienvenid<strong class="prop">${propText}</strong> al <br> ${titulo}</h1>`;
    const propElements = $h1.querySelectorAll('.prop');
    let index = 0;
    function changePropText() {
        let texts = ['a', '@', 'x', 'o', 'e', '*'];
        if (index >= texts.length) {
            index = 0;
        }
        for (let i = 0; i < propElements.length; i++) {
            propElements[i].textContent = texts[index];
        }
        index++;
    }
    setInterval(changePropText, 1000);
    return $h1;
};

//Sección Articulos
function generarArticulos(data) {
    const section = document.querySelector('section');
    data.forEach(articleData => {
        const article = document.createElement('article');
        article.id = articleData.id;

        const title = document.createElement('h2');
        title.textContent = articleData.title;

        const content = document.createElement('p');
        const lines = articleData.content.split('\n');

        lines.forEach(line => {
            content.appendChild(document.createTextNode(line));
            content.appendChild(document.createElement('br'));
        });

        article.appendChild(title);
        article.appendChild(content);

        if (articleData.img) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('box_img');

            articleData.img.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                imageDiv.appendChild(img);
            });

            article.appendChild(imageDiv);
        }

        if (articleData.url_map) {
            const mapLink = document.createElement('a');
            mapLink.innerHTML = `<a href="${articleData.url_map}" target="_blank">(Abrir mapa)</a>`;
            article.appendChild(mapLink);
        }

        section.appendChild(article);
    });
}

const URL_API = './assets/Profile.json';
let dataContact;
let dataTitulo;
const $loader = document.getElementById('loader');

// Consumo de la API
fetch(URL_API)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        generateMenu(data.articles);
        generarHeader(data);
        generarArticulos(data.articles);
        dataTitulo = data.titulo;
        dataContact = data.contacto.telefono;
        setTimeout(() => {
            $loader.style.opacity = 0;
            $loader.classList.add('hidden');
        }, 2000);
    })
    .catch(error => {
        // Manejo de errores
        console.error(error);
        $loader.innerHTML = `<h2 class="error">${error}</h2>`
    });

// formulario
const $formulario = document.getElementById('ContactWhatsApp');

$formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const TEL = dataContact;

    const nombre = $formulario.nombre.value;
    const pronombres = $formulario.Pronombres.value;
    const email = $formulario.email.value;
    const telefono = $formulario.telefono.value;
    const mensaje = $formulario.mensaje.value;

    const mensajeInicial = `Hola, Mi nombre es *${nombre}* (${pronombres}). Recientemente visité el sitio web del ${dataTitulo} y estoy necesitando ponerme en contacto con ustedes.`;

    const textoCompleto = `${mensajeInicial}\n\n*Aquí está mi mensaje:*\n${mensaje}\n\n*Además, les proporciono mi información de contacto:*\nEmail: ${email}\nTeléfono: ${telefono}\n\nEspero su pronta respuesta y agradezco su atención.\nSaludos cordiales,\n${nombre}`;

    const enlaceWhatsApp = `https://wa.me/+${TEL}?text=${encodeURIComponent(textoCompleto)}`;
    window.open(enlaceWhatsApp, '_blank');
});

const $textarea = document.getElementById("msg");

const initialHeigth = parseInt(getComputedStyle($textarea).getPropertyValue('height'));

$textarea.addEventListener('input', () => {
    $textarea.style.height = `${initialHeigth}px`;
    const newHeight = $textarea.scrollHeight + initialHeigth;
    $textarea.style.height = `${newHeight}px`;
});

//Botón volver arriba
const goToTopBtn = document.getElementById('goToTopBtn');

// Mostrar u ocultar el botón basado en la posición de desplazamiento
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        goToTopBtn.style.display = 'block';
    } else {
        goToTopBtn.style.display = 'none';
    }
});

// Hacer que el botón lleve al usuario hacia arriba cuando se hace clic
goToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Cambio de titulo al Abandonar la pagina
let tituloPrev = document.title;
window.addEventListener('blur', () => {
    tituloPrev = document.title
    document.title = '¡No te vayas! ¡Vuelve! 😱'
});
window.addEventListener('focus', () => {
    document.title = tituloPrev
});