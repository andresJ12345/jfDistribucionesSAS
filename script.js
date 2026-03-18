// Navegación Mobile
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animación del menú hamburguesa
  const spans = hamburger.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Cerrar menú al hacer click en un enlace
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Navegación suave
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }

    // Actualizar enlace activo
    navLinks.forEach((l) => l.classList.remove("active"))
    link.classList.add("active")
  })
})

// Scroll spy para el menú
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Flip Cards - Efecto al hacer click
const flipCards = document.querySelectorAll(".flip-card")

flipCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped")
  })
})

// Botones de descarga de catálogo
const downloadButtons = document.querySelectorAll(".btn-download")

downloadButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation() // Evitar que se active el flip
    const cardTitle = button.closest(".flip-card-back").querySelector("h3").textContent
    if (cardTitle=="GAS" ||cardTitle=="ACUEDUCTO Y ALCANTARILLADO") {
        // Lógica para descargar el PDF correspondiente
        let pdfFile = null;
        if (cardTitle === "GAS") {
          pdfFile = "pdf/BROCHUREJFGAS2025.pdf";
        } else if (cardTitle === "ACUEDUCTO Y ALCANTARILLADO") {
          pdfFile = "pdf/BROCHUREJFACUEDUCTOS.pdf";
        }
        if (pdfFile) {
          window.open(pdfFile, '_blank'); // Abrir el PDF en una nueva ventana/pestaña
          return; // Evita mostrar el alert si se descarga
        }
    }

    // Alerta personalizada para catálogos no disponibles
    mostrarAlertaBonita(`Próximamente estará disponible el catálogo de: <b>${cardTitle}</b>`, 3000);

    // Ejemplo de descarga de archivo (deberás tener los PDFs en tu servidor)
    // window.location.href = 'ruta/al/catalogo.pdf';
  })
})

// Función para mostrar una alerta bonita
function mostrarAlertaBonita(mensaje, duracion = 3000) {
  let alerta = document.createElement('div');
  alerta.innerHTML = mensaje;
  alerta.style.position = 'fixed';
  alerta.style.top = '30px';
  alerta.style.left = '50%';
  alerta.style.transform = 'translateX(-50%)';
  alerta.style.background = 'rgba(40, 167, 69, 0.95)';
  alerta.style.color = '#fff';
  alerta.style.padding = '16px 32px';
  alerta.style.borderRadius = '8px';
  alerta.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
  alerta.style.fontSize = '1.1rem';
  alerta.style.zIndex = '9999';
  alerta.style.fontWeight = 'bold';
  alerta.style.textAlign = 'center';
  document.body.appendChild(alerta);
  setTimeout(() => {
    alerta.style.transition = 'opacity 0.5s';
    alerta.style.opacity = '0';
    setTimeout(() => document.body.removeChild(alerta), 500);
  }, duracion);
}

// Formulario de contacto
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value.trim()
  const telefono = document.getElementById("telefono").value.trim()
  const correo = document.getElementById("correo").value.trim()
  const ciudad = document.getElementById("ciudad").value.trim()
  const descripcion = document.getElementById("descripcion").value.trim()

  // Validar que todos los campos estén llenos
  if (!nombre || !telefono || !correo || !ciudad || !descripcion) {
    mostrarAlertaBonita("Por favor, completa todos los campos del formulario.", 3000)
    return
  }

  // Número de WhatsApp de destino (cambiar por el número real, formato internacional sin +)
  const numeroWhatsApp = "573134213381" // Ejemplo: 573001234567 para Colombia

  // Crear el mensaje
  const mensaje = `Hola, me llamo ${nombre}.\nTeléfono: ${telefono}\nCorreo: ${correo}\nCiudad: ${ciudad}\nMensaje: ${descripcion}`

  // Codificar el mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje)

  // Crear la URL de WhatsApp
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`

  // Abrir WhatsApp en una nueva pestaña
  window.open(urlWhatsApp, '_blank')

  // Limpiar el formulario
  contactForm.reset()
})

// Validación del formulario en tiempo real
const inputs = contactForm.querySelectorAll("input, textarea")

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.style.borderColor = "#ff4444"
    } else {
      input.style.borderColor = "#FFD700"
    }
  })

  input.addEventListener("focus", () => {
    input.style.borderColor = "#FFD700"
  })
})

// Animación de entrada al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animación a las tarjetas del catálogo
flipCards.forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(50px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})
