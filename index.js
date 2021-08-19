const listItems = document.querySelectorAll('[data-ref="listItem"]')

const tls = []

listItems.forEach(($el, i) => {
    let active = false
    const $container = $el.querySelector('[data-ref="listItemContainer"]')
    const $button = $el.querySelector('button')
    const bounds = $container.getBoundingClientRect()
    
    gsap.set($container, {
        maxHeight: 0
    })

    const tl = gsap.timeline({
        paused: true,
        onStart() {
            active = !active
        },
        onReverseComplete() {
            active = !active
        }

    })

    tls.push(tl)

    tl
        .to($el, {
            backgroundColor: 'white',
        })
        .to($container, {
            maxHeight: bounds.height,
            duration: 0.25
        }, '<')
        .from($container.children, {
            opacity: 0,
            y: -10,
            stagger: 0.1,
        }, '-=0.25')

    $button.addEventListener('click', (e) => {

        window.dispatchEvent(new CustomEvent('listitem:change', {
            detail: {
                index: i
            }
        }))
        
        tls.forEach((tl, y) => {
            if (y !== i) 
                tl.reverse()

        })

        active
            ? tl.reverse()
            : tl.play()
    })
})