/**
 * File navigation.js.
 */

 /*--------------------------------------------------------------
 ## Navigation Menu
 ** Handles toggling the navigation menu for small screens and enables TAB key
 ** navigation support for dropdown menus.
 --------------------------------------------------------------*/

( function() {
	var html, container, button, menu, links, i, len;

	html = document.getElementsByTagName( 'html' )[0];

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	function closeMenu() {
		html.className = html.className.replace( ' menu-open', '' );
		container.className = container.className.replace( ' toggled', '' );
		button.setAttribute( 'aria-expanded', 'false' );
		menu.setAttribute( 'aria-expanded', 'false' );
	}

	function openMenu() {
		html.className += ' menu-open';
		container.className += ' toggled';
		button.setAttribute( 'aria-expanded', 'true' );
		menu.setAttribute( 'aria-expanded', 'true' );
	}

	// toggle menu open/close with button
	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			closeMenu();
		} else {
			openMenu();
		}
	};

	// close menu using ESC key
	document.onkeydown = function(evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
			isEscape = (evt.key === "Escape" || evt.key === "Esc");
		} else {
			isEscape = (evt.keyCode === 27);
		}
		if (isEscape) {
			closeMenu();
		}
	};

	// close menu if you click outside it
	document.addEventListener("click", function(evt) {
		targetElement = evt.target;  // clicked element

		do {
			if (targetElement == container) {
				return;
			}
			targetElement = targetElement.parentNode;
		} while (targetElement);

		closeMenu();
	});

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

} )();

/*--------------------------------------------------------------
# Dark Mode toggle
--------------------------------------------------------------*/

jQuery(document).ready( function($) {

	$( 'html' ).toggleClass( localStorage.toggled );

	$( '.toggle-mode' ).click( function() {

		if ( localStorage.toggled != 'dark' ) {
			$( 'html' ).toggleClass( 'dark', true );
			localStorage.toggled = 'dark';
		} else {
			$( 'html' ).toggleClass( 'dark', false );
			localStorage.toggled = '';
		}
	});

	if ( $(' html' ).hasClass( 'dark' ) ) {
		$( '.toggle-mode' ).prop( 'aria-checked', true );
	} else {
		$( '.toggle-mode' ).prop( 'aria-checked', false );
	}

} );
