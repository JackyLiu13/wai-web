function copyEmail() {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText("westernuai@gmail.com");
  /* Alert the copied text */
  alert("Copied email to clipboard");
}

function numberAnimation() {
  const counters = document.querySelectorAll('.counter');
  const speed = 1000; // The lower the slower

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      // Lower inc to slow and higher to slow
      const inc = 1;

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = count + inc;
        // Call function every ms
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
        if (target == 423) {
          counter.innerText = target + "+";

        }
      }
    };
    updateCount();
  });
}
$(window).scroll(function() {
  var hT = $('#scroll-to').offset().top,
    hH = $('#scroll-to').outerHeight(),
    wH = $(window).height(),
    wS = $(this).scrollTop();
  if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
    numberAnimation()
  }
});

$(document).ready(function() {
  $('#myCarousel').carousel('pause');

  // Enable carousel control (left and right arrow)
  $('.carousel-control-prev').click(function() {
    $('#myCarousel').carousel('prev');
  });
  $('.carousel-control-next').click(function() {
    $('#myCarousel').carousel('next');
  });
});


// Scroll and navbar highlight changes
const sectionAll = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sectionAll.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('ul li [href*="' + sectionId + '"]').classList.add('active');
    }
    else {
      if (document.querySelector('ul li [href*="' + sectionId + '"]').classList.contains('active')) {

        document.querySelector('ul li [href*="' + sectionId + '"]').classList.remove('active');
      }
    }
  });
});


//---------------------------------






function portfolioCarousel() {
  let carousel = document.getElementById('portfolio-carousel');
  carousel.style.left = '0px'
  // carousel.style.transition = 'ease-in-out 0.5s'

  let portfolio = document.querySelector('.portfolios');
  portfolio.style.userSelect = 'none'


  // console.log(carousel.offsetWidth)

  let mouseTrait = {
    lastMouseX: null,
    mousedown: false,

    mousePosX: [],
    mousePosT: []
  }

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // touch events
  portfolio.addEventListener('touchmove', (e) => {
    // console.log(1)
    if (mouseTrait.mousedown) {

      mouseTrait.mousePosX.push(e.touches[0].clientX); if (mouseTrait.mousePosX.length > 10) { mouseTrait.mousePosX.shift() }
      mouseTrait.mousePosT.push(Date.now()); if (mouseTrait.mousePosT.length > 10) { mouseTrait.mousePosT.shift() }

      if (mouseTrait.lastMouseX !== null) {
        let x = -mouseTrait.lastMouseX + e.touches[0].clientX
        let carousel = document.getElementById('portfolio-carousel')


        carousel.style.transition = '0s'

        // console.log(x)
        // translateCarousel(carousel, x)
        carousel.style.left = `${parseInt(carousel.style.left) + x}px`
      }

      mouseTrait.lastMouseX = e.touches[0].clientX
    }

  })
  portfolio.addEventListener('touchstart', (e) => { mouseTrait.mousedown = true })
  portfolio.addEventListener('touchend', (e) => {
    mouseTrait.mousedown = false
    mouseTrait.lastMouseX = null

    let carousel = document.getElementById('portfolio-carousel')

    let x = (mouseTrait.mousePosX[mouseTrait.mousePosX.length - 1] - mouseTrait.mousePosX[0])
    let time = (mouseTrait.mousePosT[mouseTrait.mousePosT.length - 1] - mouseTrait.mousePosT[0])

    if (time !== 0) {
      carousel.style.transition = `ease-out ${time / 160}s`
      translateCarousel(carousel, x / time * 200)

      setTimeout(() => { centerCarousel(carousel) }, time / 160 * 1500)
    }


    mouseTrait.mousePosX = []
    mouseTrait.mousePosT = []
  })


  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // mouse events
  portfolio.addEventListener('mousemove', (e) => {
    if (mouseTrait.mousedown) {

      mouseTrait.mousePosX.push(e.clientX); if (mouseTrait.mousePosX.length > 10) { mouseTrait.mousePosX.shift() }
      mouseTrait.mousePosT.push(Date.now()); if (mouseTrait.mousePosT.length > 10) { mouseTrait.mousePosT.shift() }

      if (mouseTrait.lastMouseX !== null) {
        let x = -mouseTrait.lastMouseX + e.clientX
        let carousel = document.getElementById('portfolio-carousel')


        carousel.style.transition = '0s'

        // console.log(x)
        carousel.style.left = `${parseInt(carousel.style.left) + x}px`
        // translateCarousel(carousel, x)
      }

      mouseTrait.lastMouseX = e.clientX
    }

  })
  portfolio.addEventListener('mousedown', (e) => { mouseTrait.mousedown = true })
  portfolio.addEventListener('mouseup', (e) => {
    mouseTrait.mousedown = false
    mouseTrait.lastMouseX = null

    let carousel = document.getElementById('portfolio-carousel')

    let x = (mouseTrait.mousePosX[mouseTrait.mousePosX.length - 1] - mouseTrait.mousePosX[0])
    let time = (mouseTrait.mousePosT[mouseTrait.mousePosT.length - 1] - mouseTrait.mousePosT[0])

    if (time !== 0) {
      carousel.style.transition = `ease-out ${time / 160}s`
      translateCarousel(carousel, x / time * 200)

      // center carousel card after the carousel stops moving
      setTimeout(() => { centerCarousel(carousel) }, time / 160 * 1500)
    }

    mouseTrait.mousePosX = []
    mouseTrait.mousePosT = []
  })

  portfolio.addEventListener('mouseout', (e) => {
    // window.onscroll = () => {}
    document.body.style.overflow = 'auto'
  })
  portfolio.addEventListener('mouseover', (e) => {
    // console.log(-carousel.offsetWidth + window.innerWidth)
    let x = parseFloat(carousel.style.left.replace('px', ''))
    if (x < 0 && x > -carousel.offsetWidth + window.innerWidth) {
      // document.body.style.overflow = 'hidden'
    }

  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  let keydown = null
  window.addEventListener('keydown', (e) => { keydown = e.key })
  window.addEventListener('keyup', (e) => { keydown = null })

  // reset the carousel on resize
  window.addEventListener('resize', (e) => {
    let carousel = document.getElementById('portfolio-carousel')
    // translateCarousel(carousel, 0)
    // setTimeout(() => {centerCarousel(carousel)}, 1000)
    centerCarousel(carousel)
  })

  // stores when the carousel should center
  let wheelTimeout = null
  portfolio.addEventListener('wheel', (e) => {
    // console.log(e)

    carousel.style.transition = '0.2s'

    // console.log(e)

    if (keydown === 'Shift') {
      if (wheelTimeout != null) {
        clearTimeout(wheelTimeout)
      }

      let x = parseFloat(carousel.style.left.replace('px', ''))
      if (x < 0 && x > -carousel.offsetWidth + window.innerWidth) {
        // document.body.style.overflow = 'hidden'
      }

      let tranX = -(e.deltaY + e.deltaX)
      translateCarousel(carousel, tranX)

      wheelTimeout = setTimeout(() => { centerCarousel(carousel) }, 300)

    }
  })


  function translateCarousel(carousel, x) {

    let translate = (parseFloat(carousel.style.left.replace('px', '')) + x)

    if (translate > 0) {
      carousel.style.left = '0px'


    } else if (translate < -carousel.offsetWidth + window.innerWidth) {
      carousel.style.left = -carousel.offsetWidth + window.innerWidth + 'px'

    } else {
      carousel.style.left = translate + 'px'
    }

    // centerCarousel(carousel)
  }

  function centerCarousel(carousel) {
    // get the center of the portfolio section's height
    let findY = carousel.getBoundingClientRect().height / 2 + carousel.getBoundingClientRect().top

    // get the center of the viewport width
    let findX = window.innerWidth / 2

    // find all elements at the center of the viewport

    let found = false
    let displaceCheck = findX
    let increment = 0

    // stops the displaceCheck from going out of bounds
    let safetyNet = window.innerWidth

    // if the center of the screen does not have a card, displace the center of the screen to the left or right until a card is found
    while (!found) {
      displaceCheck += increment
      increment *= -1


      let elements = document.elementsFromPoint(displaceCheck, findY)
      elements.forEach(element => {
        // sort for the carousel card element

        if (element.className == 'rectangle') {
          let parent = element.parentNode

          // get parent's x position
          let parentX = parent.offsetLeft
          let parentWidth = parent.getBoundingClientRect().width / 2

          // center the carousel card
          carousel.style.left = -parentX + findX - parentWidth + 'px'
          // carousel.style.transition = 'ease-in-out 1s'
          // carousel.style.transitionTimingFunction = 'cubic-bezier(.64,0,.27,1.26)'
          carousel.style.transitionTimingFunction = 'cubic-bezier(.22,-0.01,.27,1.26)'

          found = true
        }
      })

      // console.log(displaceCheck)

      if (increment > 0) { increment += 10 }
      else { increment -= 10 }

      // console.log(displaceCheck)

      if (displaceCheck > safetyNet) {
        console.log('safety net exceeded')
        found = true
        translateCarousel(carousel, 0)
      }
    }


  }

  window.onload = () => { centerCarousel(document.getElementById('portfolio-carousel')) }
}

portfolioCarousel()

function portfolioInfo() {
  let PORTFOLIO = {
    'co-president': {
      names: {
        'Sabrina Ke': 'https://www.linkedin.com/in/sabrina-k-940227227',
        'Cindy Wen': 'https://www.linkedin.com/in/cindyxwen/?originalSubdomain=ca',
      },
      description: 'Co-presidents are responsible for steering the overall vision of Western AI and its members. Co-presidents oversee all portfolios and tie the ideals of all the VPs in respective portfolios.'
    },

    'flagship': {
      names: {
        'Sophia Ma': 'https://www.linkedin.com/in/ma-sophia/',
        'Joy Zhao': 'https://www.linkedin.com/in/joyzhao03',
      },
      description: 'The Flagship portfolio will be responsible for hosting two of the LARGEST AI events at Western this year (Sept/Oct and Jan/Feb), in addition to a few smaller-scale ones. Flagship is responsible for the creative direction and planning of AI case competitions, hackathons, workshops, and many more. Its main goal will be to plan innovative, large-scale events that cater to technical and non-technical students within the community.'
    },

    'development': {
      names: {
        'Alex Wedermann': 'https://www.linkedin.com/in/alexander-wedermann-a54a3a197/',
        'Jasdeep Singh': 'https://www.linkedin.com/in/jasdeepsingh33',
      },
      description: 'The Development Portfolio is focused on introducing all WAI members to employment in AI and tech, while broadening their knowledge of the industry. The Development Portfolio is also editing and redacting Wavelength, Western AI’s own newsletter, and the Speaker Series podcast, alongside with WAI Publications and WAI Flagship.'
    },

    'projects': {
      names: {
        'Nicole Han': 'https://www.linkedin.com/in/nicole-han-2b408919b/',
        'Taha Siddiqui': 'https://www.linkedin.com/in/t-siddiqui/',
      },
      description: 'The Projects portfolio provides opportunities for students to build and deploy Machine Learning models that will be presented to industry professionals at major conferences (i.e. CUCAI).'
    },

    'education': {
      names: {
        'Gunveer Vilkhu': 'https://ca.linkedin.com/in/gunveervilkhu',
        'Eric Wang': '',
      },
      description: ' The Education portfolio is responsible for helping to provide the Western AI community with educational resources and organizing events/workshops that will help members build their skills and knowledge in the field of Artificial Intelligence.'
    },

    'hacks': {
      names: {
        'Tasneem Almohamad': '',
      },
      description: "The Hacks portfolio is in charge of Western AI's very own varsity hackathon team, representing Western at hackathons across North America."
    },

    'design': {
      names: {
        'Ben Asokanthan': 'https://www.linkedin.com/in/benjamin-asokanthan',
        'Kevin Manka': 'https://www.linkedin.com/in/kmanka/',
      },
      description: 'The Design Portfolio is responsible for developing Western AI’s brand image and leading all creative initiatives within the club. Co-VP Design guides Western AI’s unique brand image and create innovative designs that market our goals, events, and opportunities to up to 800+ individuals.'
    },

    'communications': {
      names: {
        'Jacky Liu': 'https://www.linkedin.com/in/jacky-liu13/',
      },
      description: "The communication portfolio maintain WAI's social media and announcing updates, event opportunities to members. The communication portfolio is also responsible of responding to inquiries from students and forwarding them to appropriate portfolios."
    },

    'operations': {
      names: {
        'Marcus Wong': 'https://www.linkedin.com/in/marcus-wong-3759391a8/',
      },
      description: 'The Development Portfolio is focused on introducing members to avenues of employment in AI and tech, while broadening their knowledge of the industry. We maintain and update Wavelength, Western AI’s own newsletter, and the Speaker Series podcast'
    },

    'finance': {
      names: {
        'Sainath Petchiappan': 'https://www.linkedin.com/in/sainath-petchiappan/',
      },
      description: "WAI's financing portfolio is responsible for creating budget for the club and reporting our finances to WSC. WAI finance is also responsible of keeping track of the expenses and revenue of the club."
    },
    'publications': {
      names: {
        'Sarah Han': 'https://www.linkedin.com/in/sarahjyhan/',
      },
      description: "The Publications portfolio creates content for Western AI’s Wavelength newsletter and Speaker Series podcast in collaboration with the Development portfolio. We aim to promote and expand the reach of Western AI’s content to help students develop a stronger passion for AI and secure internships."
    }

  }

  let cards = document.querySelectorAll('#portfolio-carousel .rectangle')
  cards.forEach(card => {
    let backside = card.querySelector('.flip-card-back')
    // let backside = card.querySelector('.flip-card-front')
    let portfolio = card.id

    addInfo(backside, portfolio)
    // if(portfolio != 'co-president') {addInfo(backside, portfolio)}
  })

  function addInfo(card, id) {
    let info = PORTFOLIO[id]
    let names = Object.keys(info.names)

    let row = document.createElement('div')
    row.className = 'row'

    let col5 = document.createElement('div')
    col5.className = 'col-5'

    let container = document.createElement('div')
    container.style.opacity = 1
    container.className = 'hs-container'

    let dsTitle = document.createElement('div')
    dsTitle.className = 'ds-title'
    dsTitle.innerText = 'DESCRIPTION'

    let description = document.createElement('div')
    description.style.opacity = 0
    description.className = 'description'
    description.innerText = PORTFOLIO[id].description

    dsTitle.addEventListener('click', () => { handleDescription(container, description) })

    for (let ams = 0; ams < names.length; ams++) {
      let circle = document.createElement('div')
      circle.className = 'hs-circle'


      let headshot = document.createElement('div')
      headshot.className = 'headshot'

      let exec = document.createElement('img')
      exec.className = 'exec'

      let src = names[ams]
      src = src.replace(' ', '')
      src = src.toLowerCase()

      exec.src = `headshots/${src}.png`


      let logo = document.createElement('img')
      logo.src = 'assets/linkedin.png'
      logo.className = 'logo'

      // current name in the loop
      let current_name = names[ams]
      let nametag = document.createElement('div')
      nametag.className = 'nametag'
      nametag.innerText = current_name

      let linkedin = info.names[current_name]
      headshot.addEventListener('click', () => { setTimeout(() => { window.open(linkedin) }, 500) })
      // headshot.addEventListener('mouseover', ()=>{exec.style.opacity=0.1;logo.style.opacity=1})
      // headshot.addEventListener('mouseout', ()=>{exec.style.opacity = 1;logo.style.opacity=0})

      headshot.appendChild(exec)
      headshot.appendChild(logo)
      circle.appendChild(headshot)
      container.appendChild(circle)
      container.appendChild(nametag)

    }

    col5.appendChild(dsTitle)

    col5.appendChild(description)

    col5.appendChild(container)

    row.appendChild(col5)

    card.appendChild(row)
  }

  function handleDescription(container, description) {
    // console.log(container.style.opacity)
    if (description.style.opacity != 0) {
      container.style.opacity = 1
      description.style.opacity = 0
      // console.log('og')
    } else {
      // console.log('oj')
      container.style.opacity = 0.1
      description.style.opacity = 1
    }
  }
}

portfolioInfo()