/* =====================================================
   AÏCHATA DEMBÉLÉ
   SCRIPT.JS
   PANIER + WHATSAPP + ANIMATIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       1. PRELOADER
    ================================================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 700);

    });


    /* =================================================
       2. MENU MOBILE
    ================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            menuToggle.classList.toggle("active");
            nav.classList.toggle("open");

        });


        nav.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                nav.classList.remove("open");

            });

        });

    }


    /* =================================================
       3. HEADER AU SCROLL
    ================================================= */

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =================================================
       4. RETOUR EN HAUT
    ================================================= */

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", updateBackToTop);

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =================================================
       5. PANIER
    ================================================= */

    let cart = [];


    const cartPanel =
        document.getElementById("cartPanel");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartClose =
        document.getElementById("cartClose");

    const cartFloating =
        document.getElementById("cartFloating");

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkoutButton =
        document.getElementById("checkoutButton");

    const ctaCartButton =
        document.getElementById("ctaCartButton");


    /* =================================================
       OUVRIR LE PANIER
    ================================================= */

    function openCart() {

        if (!cartPanel || !cartOverlay) return;

        cartPanel.classList.add("active");

        cartOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =================================================
       FERMER LE PANIER
    ================================================= */

    function closeCart() {

        if (!cartPanel || !cartOverlay) return;

        cartPanel.classList.remove("active");

        cartOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (cartFloating) {

        cartFloating.addEventListener(
            "click",
            openCart
        );

    }


    if (cartClose) {

        cartClose.addEventListener(
            "click",
            closeCart
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCart
        );

    }


    /* =================================================
       ÉCHAP POUR FERMER
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeCart();

        }

    });


    /* =================================================
       6. AJOUTER AU PANIER
    ================================================= */

    const addButtons =
        document.querySelectorAll(".add-to-cart");


    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            if (!name || !price) return;


            const existingProduct =
                cart.find(
                    product => product.name === name
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            updateCart();

            animateCartButton(button);

            openCart();

        });

    });


    /* =================================================
       ANIMATION BOUTON AJOUT
    ================================================= */

    function animateCartButton(button) {

        const originalHTML =
            button.innerHTML;


        button.innerHTML =
            `<i class="fa-solid fa-check"></i>
             <span>Ajouté !</span>`;


        button.style.background =
            "var(--green)";


        setTimeout(() => {

            button.innerHTML =
                originalHTML;

            button.style.background =
                "";

        }, 900);

    }


    /* =================================================
       7. AFFICHER LE PANIER
    ================================================= */

    function updateCart() {

        if (!cartItems) return;


        /* ---------------------------------------------
           PANIER VIDE
        --------------------------------------------- */

        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-basket-shopping"></i>

                    <h4>
                        Votre panier est vide
                    </h4>

                    <p>
                        Ajoutez une pâte d'arachide
                        pour commencer votre commande.
                    </p>

                </div>

            `;

        } else {

            cartItems.innerHTML = "";


            cart.forEach((product, index) => {

                const item =
                    document.createElement("div");


                item.className =
                    "cart-item";


                const image =
                    getProductImage(product.name);


                item.innerHTML = `

                    <div class="cart-item-image">

                        <img
                            src="${image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <span class="cart-item-price">

                            ${formatPrice(product.price)}
                            FCFA / unité

                        </span>


                        <div class="cart-item-controls">

                            <button
                                class="quantity-btn decrease"
                                data-index="${index}"
                                aria-label="Diminuer">

                                <i class="fa-solid fa-minus"></i>

                            </button>


                            <span class="quantity-value">

                                ${product.quantity}

                            </span>


                            <button
                                class="quantity-btn increase"
                                data-index="${index}"
                                aria-label="Augmenter">

                                <i class="fa-solid fa-plus"></i>

                            </button>

                        </div>

                    </div>


                    <div class="cart-item-total">

                        <strong>

                            ${formatPrice(
                                product.price *
                                product.quantity
                            )}
                            FCFA

                        </strong>


                        <button
                            class="remove-item"
                            data-index="${index}"
                            aria-label="Supprimer">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                `;


                cartItems.appendChild(item);

            });

        }


        updateCartCount();

        updateCartTotal();

        updateCheckoutButton();

        attachCartActions();

    }


    /* =================================================
       8. IMAGE PRODUIT
    ================================================= */

    function getProductImage(name) {

        if (name === "Gros Seau") {

            return "images/gros-seau.jpeg";

        }


        if (name === "Seau Moyen") {

            return "images/seau-moyen.jpeg";

        }


        if (name === "Petit Format") {

            return "images/petit-format.jpeg";

        }


        return "images/gros-seau.jpeg";

    }


    /* =================================================
       9. FORMAT PRIX
    ================================================= */

    function formatPrice(price) {

        return Number(price).toLocaleString("fr-FR");

    }


    /* =================================================
       10. COMPTEUR
    ================================================= */

    function updateCartCount() {

        if (!cartCount) return;


        const totalQuantity =
            cart.reduce(
                (total, product) =>
                    total + product.quantity,
                0
            );


        cartCount.textContent =
            totalQuantity;


        if (cartFloating) {

            if (totalQuantity > 0) {

                cartFloating.classList.add(
                    "has-items"
                );

            } else {

                cartFloating.classList.remove(
                    "has-items"
                );

            }

        }

    }


    /* =================================================
       11. TOTAL
    ================================================= */

    function updateCartTotal() {

        if (!cartTotal) return;


        const total =
            cart.reduce(

                (sum, product) => {

                    return sum +
                        product.price *
                        product.quantity;

                },

                0

            );


        cartTotal.textContent =
            `${formatPrice(total)} FCFA`;

    }


    /* =================================================
       12. BOUTON CHECKOUT
    ================================================= */

    function updateCheckoutButton() {

        if (!checkoutButton) return;


        checkoutButton.disabled =
            cart.length === 0;

    }


    /* =================================================
       13. ACTIONS DU PANIER
    ================================================= */

    function attachCartActions() {


        /* ---------------------------------------------
           DIMINUER
        --------------------------------------------- */

        document
            .querySelectorAll(".decrease")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (
                            cart[index] &&
                            cart[index].quantity > 1
                        ) {

                            cart[index].quantity--;

                        } else {

                            cart.splice(index, 1);

                        }


                        updateCart();

                    }
                );

            });



        /* ---------------------------------------------
           AUGMENTER
        --------------------------------------------- */

        document
            .querySelectorAll(".increase")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (cart[index]) {

                            cart[index].quantity++;

                        }


                        updateCart();

                    }
                );

            });



        /* ---------------------------------------------
           SUPPRIMER
        --------------------------------------------- */

        document
            .querySelectorAll(".remove-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart.splice(index, 1);


                        updateCart();

                    }
                );

            });

    }


    /* =================================================
       14. COMMANDE WHATSAPP
    ================================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    return;

                }


                let message =
                    "🥜 *COMMANDE — AÏCHATA DEMBÉLÉ*%0A%0A";


                message +=
                    "Bonjour Aïchata Dembélé,%0A";

                message +=
                    "je souhaite passer la commande suivante :%0A%0A";


                cart.forEach(product => {

                    const subtotal =
                        product.price *
                        product.quantity;


                    message +=
                        `🥜 ${product.name}%0A`;

                    message +=
                        `   Quantité : ${product.quantity}%0A`;

                    message +=
                        `   Prix : ${formatPrice(product.price)} FCFA%0A`;

                    message +=
                        `   Sous-total : ${formatPrice(subtotal)} FCFA%0A%0A`;

                });


                const total =
                    cart.reduce(

                        (sum, product) => {

                            return sum +
                                product.price *
                                product.quantity;

                        },

                        0

                    );


                message +=
                    `💰 *TOTAL : ${formatPrice(total)} FCFA*%0A%0A`;

                message +=
                    "Merci ! Je souhaite avoir les informations pour la livraison.";


                const phone =
                    "22377646097";


                const whatsappURL =
                    `https://wa.me/${phone}?text=${message}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =================================================
       15. BOUTON CTA → PANIER
    ================================================= */

    if (ctaCartButton) {

        ctaCartButton.addEventListener(
            "click",
            openCart
        );

    }


    /* =================================================
       16. ANIMATIONS AU SCROLL
    ================================================= */

    const revealElements =
        document.querySelectorAll(

            ".section-heading, " +
            ".product-card, " +
            ".quality-image, " +
            ".quality-content, " +
            ".quality-item, " +
            ".about-content, " +
            ".about-decoration, " +
            ".cta-box, " +
            ".contact-card"

        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =================================================
       17. NAVIGATION ACTIVE
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.id;

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =================================================
       18. SMOOTH SCROLL
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) return;


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const position =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top: position,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =================================================
       19. EFFET 3D PRODUITS
    ================================================= */

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 2;


                card.style.transform =
                    `translateY(-12px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (
                    card.classList.contains(
                        "featured"
                    )
                ) {

                    card.style.transform =
                        "translateY(-12px)";

                } else {

                    card.style.transform =
                        "";

                }

            }
        );

    });


    /* =================================================
       20. LOGO
    ================================================= */

    document
        .querySelectorAll(".logo")
        .forEach(logo => {

            logo.addEventListener(
                "mouseenter",
                () => {

                    const icon =
                        logo.querySelector(
                            ".logo-icon"
                        );


                    if (icon) {

                        icon.style.transform =
                            "rotate(5deg) scale(1.08)";

                    }

                }
            );


            logo.addEventListener(
                "mouseleave",
                () => {

                    const icon =
                        logo.querySelector(
                            ".logo-icon"
                        );


                    if (icon) {

                        icon.style.transform =
                            "rotate(-5deg) scale(1)";

                    }

                }
            );

        });


    /* =================================================
       21. QUALITÉ — HOVER
    ================================================= */

    document
        .querySelectorAll(".quality-item")
        .forEach(item => {

            item.addEventListener(
                "mouseenter",
                () => {

                    const icon =
                        item.querySelector(
                            ".quality-icon"
                        );


                    if (icon) {

                        icon.style.transform =
                            "scale(1.08) rotate(-5deg)";

                    }

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    const icon =
                        item.querySelector(
                            ".quality-icon"
                        );


                    if (icon) {

                        icon.style.transform =
                            "scale(1) rotate(0deg)";

                    }

                }
            );

        });


    /* =================================================
       22. FERMER LE MENU EN CLIQUANT AILLEURS
    ================================================= */

    document.addEventListener(
        "click",
        event => {

            if (!menuToggle || !nav) {
                return;
            }


            const clickedMenu =
                nav.contains(event.target);


            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedMenu &&
                !clickedToggle &&
                nav.classList.contains("open")
            ) {

                nav.classList.remove("open");

                menuToggle.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =================================================
       23. INITIALISATION
    ================================================= */

    updateCart();


    console.log(
        "🥜 Aïchata Dembélé — Boutique prête !"
    );

});