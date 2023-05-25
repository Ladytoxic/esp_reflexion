const $fecha = document.getElementById('fecha');
setInterval(() => {
    const fechaActual = new Date();
    const Fecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const Hora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaLegible = fechaActual.toLocaleDateString('es-ES', Fecha) + ' ' + fechaActual.toLocaleTimeString('es-ES', Hora);
    $fecha.innerText = fechaLegible;
}, 1000);

document.addEventListener('DOMContentLoaded', Welcome);

// titulo 
function Welcome() {
    const $header = document.getElementById('welcone');
    const propText = 'e';
    $header.innerHTML = `<h1 class="welcone">Bienvenid<strong class="prop">${propText}</strong> al <br> Espacio de Reflexión TTNB+</h1>`;
    const propElements = $header.querySelectorAll('.prop');
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
    return $header;
};

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
// Datos para generar los elementos del menú
const menuData = [
    { text: 'Inicio', href: '#' },
    { text: '¿Quiénes Somos?', href: '#quienes_somos' },
    { text: '¿Cuándo se realiza?', href: '#cuando_se_realiza' },
    { text: '¿Dónde se hace?', href: '#donde_se_hace' },
    { text: 'Contacto', href: '#contacto' }
];

// Generar los elementos del menú dinámicamente
menuData.forEach(item => {
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

// articles
const container = document.querySelector('section');

// Datos de los artículos
const articlesData = [
    {
        id: 'quienes_somos',
        title: '¿Quiénes Somos?',
        content: 'Somos una iniciativa impulsada por Amazonas del Sur, la Secretaría de Extensión de la Universidad de Quilmes y el Centro Cultural La Terraza.',
        img: ['./assets/img/logo/logo-UNQ-Extension.webp', './assets/img/logo/Amazonas_del_sur.webp', './assets/img/logo/Logo-de La-Terraza.webp']
    },
    {
        id: 'cuando_se_realiza',
        title: '¿Cuándo se realiza?',
        content: 'Realizamos 2 encuentros por mes de manera presencial.\n Te invitamos a unirte a nosotres en los segundos y cuartos sábados de cada mes, de 17:00 a 19:00 horas.'
    },
    {
        id: 'donde_se_hace',
        title: '¿Dónde se hace?',
        content: 'En el centro cultural "La Terraza"\n Av. Aviación 690 (1° Piso)\n Longchamps (Frente a la estación)',
        url_map: 'https://goo.gl/maps/otkFb2aknxafechC6'
    }
];

// Generar los elementos y agregarlos al contenedor
articlesData.forEach(articleData => {
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

    container.appendChild(article);
});

// formulario
const $formulario = document.getElementById('ContactWhatsApp');

$formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const TEL = '+5491162287249';

    const nombre = $formulario.nombre.value;
    const pronombres = $formulario.Pronombres.value;
    const email = $formulario.email.value;
    const telefono = $formulario.telefono.value;
    const mensaje = $formulario.mensaje.value;

    const mensajeInicial = `Hola, Mi nombre es *${nombre}* (${pronombres}). Recientemente visité el sitio web del Espacio de Reflexión TTNB+ y estoy necesitando ponerme en contacto con ustedes.`;

    const textoCompleto = `${mensajeInicial}\n\n*Aquí está mi mensaje:*\n${mensaje}\n\n*Además, les proporciono mi información de contacto:*\nEmail: ${email}\nTeléfono: ${telefono}\n\nEspero su pronta respuesta y agradezco su atención.\nSaludos cordiales,\n${nombre}`;

    const enlaceWhatsApp = `https://wa.me/${TEL}?text=${encodeURIComponent(textoCompleto)}`;
    window.open(enlaceWhatsApp, '_blank');
});


const $textarea = document.getElementById("msg");

const initialHeigth = parseInt(getComputedStyle($textarea).getPropertyValue('height'));

$textarea.addEventListener('input', () => {
    $textarea.style.height = `${initialHeigth}px`;
    const newHeight = $textarea.scrollHeight + initialHeigth;
    $textarea.style.height = `${newHeight}px`;
});

// Obtener una referencia al botón
const goToTopBtn = document.getElementById('goToTopBtn');

// Mostrar u ocultar el botón basado en la posición de desplazamiento
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
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
