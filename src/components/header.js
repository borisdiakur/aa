import { throttle, debounce } from '../utils/utils'

const doc = document.documentElement
let header = document.getElementById('header')

function adjustHeaderHeight() {
	header = header || document.getElementById('header')
	const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
	if (top > 120) {
		header.classList.add('header--minimized')
	} else {
		header.classList.remove('header--minimized')
	}
}

function closeNav() {
	const menuToggleClose = document.querySelector('#menu__toggle:checked')
	if (menuToggleClose) menuToggleClose.checked = false
}

function updateHeader(event) {
	adjustHeaderHeight()
	if (event.currentTarget) closeNav()
}

window.addEventListener('scroll', throttle(updateHeader, 20))
window.addEventListener('scroll', debounce(updateHeader, 500))

window.addEventListener('click', (event) => {
	if (
		event.target.id !== 'menu__toggle' &&
		event.target.id !== 'menu__list' &&
		event.target.parentNode.id !== 'menu__list'
	) {
		closeNav()
	}

	const href = event.target.href
	const hash = href && href.split('#')[1]
	if (hash) {
		if (href.indexOf(window.location.pathname) < 0) return
		if (hash === 'top') {
			event.preventDefault()
			window.scroll({
				top: 0,
				behavior: 'smooth',
			})
			document.body.focus({ preventScroll: true })
			window.history.pushState(null, null, window.location.pathname)
			return
		}
		if (
			window.location.pathname === '/' ||
			/^\/[a-z][a-z]\/$/.test(window.location.pathname)
		) {
			if (href.indexOf(window.location.origin) === 0) {
				event.preventDefault()
				const target = document.getElementById(hash)
				window.scroll({
					top: target.offsetTop - 100,
					behavior: 'smooth',
				})
				// target.setAttribute('tabindex', '-1')
				// target.focus({preventScroll: true})
				if (window.history.pushState) {
					window.history.pushState(null, null, '#' + hash)
				}
			}
		}
	}
})

window.addEventListener('keydown', (event) => {
	const code = typeof event.keyCode === 'number' ? event.keyCode : event.which
	if (code === 27) {
		event.preventDefault()
		closeNav()
	}
})
