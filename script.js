const repositories = document.querySelector(".cards")

function getApiGithub() {
  fetch("https://api.github.com/users/kauatiezzi/repos").then(async (res) => {
    if (!res.ok) {
      throw new Error(res.status)
    }

    let data = await res.json()
    data.map((item) => {
      let project = document.createElement("div")

      project.innerHTML = `
            <div class="card">
              <h3 class="title">${item.name.toUpperCase()}</h3>
              <span class="date-create">${Intl.DateTimeFormat("pt-BR").format(
                new Date(item.created_at)
              )}</span>
              <Br>
              <span class="language"><span class="circle"></span>${
                item.language
              }</span>
              <p class="project-description">${item.description}</p>
              <div>
                <a class="button" id="button-projects" href="${
                  item.html_url
                }" target="_blank">Repositório</a>
                <a class="button" href="${
                  item.homepage
                }" target="_blank">Site do Projeto</a>
              </div>
            </div>
      `

      repositories.appendChild(project)
    })
  })
}
getApiGithub()

/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector("#header nav")
const toggle = document.querySelectorAll("nav .toggle")

for (const element of toggle) {
  element.addEventListener("click", function () {
    nav.classList.toggle("show")
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll("nav ul li a")

for (const link of links) {
  link.addEventListener("click", function () {
    nav.classList.remove("show")
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector("#header")
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add("scroll")
  } else {
    // menor que a altura do header
    header.classList.remove("scroll")
  }
}

/* Testimonials carousel slider swiper */
const swiper = new swiper(".swiper-container", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true,
    },
  },
})

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 700,
  reset: true,
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector(".back-to-top")

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
}

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll("main section[id]")
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector("nav ul li a[href*=" + sectionId + "]")
        .classList.add("active")
    } else {
      document
        .querySelector("nav ul li a[href*=" + sectionId + "]")
        .classList.remove("active")
    }
  }
}

/* When Scroll */
window.addEventListener("scroll", function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
