document.addEventListener('DOMContentLoaded', () => {
    const courseGrid = document.getElementById('courses-grid');
    const emptyState = document.getElementById('courses-empty');
    const searchInput = document.getElementById('course-search');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const modal = document.getElementById('course-modal');
    const modalBody = document.getElementById('course-modal-body');
    const modalClose = document.getElementById('course-modal-close');
    const featuredCard = document.querySelector('.featured-card');
    const featuredBadge = document.querySelector('.featured-badge');
    const featuredLevel = document.querySelector('.course-level');
    const featuredTitle = document.querySelector('.featured-info h2');
    const featuredText = document.querySelector('.featured-info > p');
    const featuredMeta = document.querySelector('.featured-meta');
    const featuredLevels = document.getElementById('featured-levels');
    const priceOld = document.querySelector('.price-old');
    const priceCurrent = document.querySelector('.price-current');
    const featuredBuyButton = document.querySelector('.featured-actions .btn-buy');
    const featuredTrailerButton = document.querySelector('.featured-actions .btn-trailer');
    const featuredImage = document.querySelector('.featured-image img');

    const purchaseStoreKey = 'pedro-moreira-orders';
    const courses = [
        {
            title: 'Fundamentos do Taekwondo',
            level: 'Iniciante',
            category: 'iniciante',
            description: 'Posições, golpes básicos, alongamento e filosofia marcial com uma abordagem prática e leve.',
            duration: '8 horas',
            lessons: '32 aulas',
            image: 'images/treino.png',
            oldPrice: 'R$ 297',
            price: 'R$ 197',
            priceValue: 197,
            badge: 'Mais Vendido'
        },
        {
            title: 'Técnicas de Combate',
            level: 'Intermediário',
            category: 'intermediario',
            description: 'Treinamento de movimentos técnicos, proteção e transições para quem já domina o básico.',
            duration: '10 horas',
            lessons: '40 aulas',
            image: 'images/comemoracao.png',
            oldPrice: 'R$ 347',
            price: 'R$ 247',
            priceValue: 247,
            badge: 'Popular'
        },
        {
            title: 'Preparação para Competição',
            level: 'Avançado',
            category: 'avancado',
            description: 'Estratégia, resistência e treino mental para atletas que querem evoluir em campeonatos.',
            duration: '12 horas',
            lessons: '48 aulas',
            image: 'images/fim-do-treino.png',
            oldPrice: 'R$ 397',
            price: 'R$ 297',
            priceValue: 297,
            badge: 'Elite'
        },
        {
            title: 'Defesa Pessoal',
            level: 'Iniciante',
            category: 'iniciante',
            description: 'Método prático para desenvolver confiança, controle corporal e respostas seguras.',
            duration: '6 horas',
            lessons: '24 aulas',
            image: 'images/pedro-medalhas.png',
            oldPrice: 'R$ 227',
            price: 'R$ 167',
            priceValue: 167,
            badge: 'Novo'
        },
        {
            title: 'Treino de Flexibilidade',
            level: 'Intermediário',
            category: 'intermediario',
            description: 'Rotina orientada para mobilidade, equilíbrio e prevenção de lesões no treino diário.',
            duration: '5 horas',
            lessons: '18 aulas',
            image: 'images/treino.png',
            oldPrice: 'R$ 197',
            price: 'R$ 147',
            priceValue: 147,
            badge: 'Recomendado'
        },
        {
            title: 'Mestre e Mentor',
            level: 'Avançado',
            category: 'avancado',
            description: 'Aprofunde sua visão de treino, liderança e evolução técnica com foco na formação integral.',
            duration: '14 horas',
            lessons: '56 aulas',
            image: 'images/pedro-portrait.png',
            oldPrice: 'R$ 447',
            price: 'R$ 347',
            priceValue: 347,
            badge: 'Premium'
        }
    ];

    let activeFilter = 'all';
    let searchTerm = '';
    let selectedCourse = courses[0];
    let purchaseDatabase = loadPurchaseDatabase();

    function loadPurchaseDatabase() {
        try {
            const stored = localStorage.getItem(purchaseStoreKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Não foi possível carregar o banco local de compras.', error);
            return [];
        }
    }

    function savePurchaseDatabase() {
        try {
            localStorage.setItem(purchaseStoreKey, JSON.stringify(purchaseDatabase));
        } catch (error) {
            console.warn('Não foi possível salvar a compra.', error);
        }
    }

    function createPurchaseOrder(course, buyerInfo) {
        const order = {
            id: `PEDRO-${Date.now()}`,
            course: course.title,
            level: course.level,
            price: course.priceValue,
            buyer: buyerInfo,
            status: 'confirmado',
            createdAt: new Date().toISOString()
        };

        purchaseDatabase.push(order);
        savePurchaseDatabase();
        return order;
    }

    function renderCourses() {
        const filtered = courses.filter(course => {
            const matchesFilter = activeFilter === 'all' || course.category === activeFilter;
            const query = searchTerm.toLowerCase();
            const matchesSearch = !query || course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        if (!courseGrid) return;

        courseGrid.innerHTML = '';

        if (!filtered.length) {
            emptyState.hidden = false;
            return;
        }

        emptyState.hidden = true;

        filtered.forEach(course => {
            const card = document.createElement('article');
            card.className = 'course-card reveal';
            card.innerHTML = `
                <img src="${course.image}" alt="${course.title}" loading="lazy">
                <div class="course-card-body">
                    <span class="course-badge">${course.badge}</span>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-card-meta">
                        <span>${course.level}</span>
                        <span>${course.duration}</span>
                    </div>
                    <div class="course-card-footer">
                        <span class="course-price-small">${course.price}</span>
                        <button class="btn btn-sm btn-buy" data-course="${course.title}" data-price="${course.priceValue}">Saiba Mais</button>
                    </div>
                </div>
            `;
            courseGrid.appendChild(card);
        });
    }

    function renderFeaturedCard(levelKey) {
        if (!featuredCard) return;

        const normalizedKey = levelKey === 'all' ? 'iniciante' : levelKey;
        const course = courses.find(item => item.category === normalizedKey) || courses[0];
        selectedCourse = course;

        featuredCard.classList.add('is-changing');

        setTimeout(() => {
            if (featuredBadge) featuredBadge.textContent = course.badge;
            if (featuredLevel) featuredLevel.textContent = course.level;
            if (featuredTitle) featuredTitle.textContent = course.title;
            if (featuredText) featuredText.textContent = course.description;
            if (featuredImage) {
                featuredImage.src = course.image;
                featuredImage.alt = course.title;
            }

            if (featuredMeta) {
                featuredMeta.innerHTML = `
                    <li><i class="fa-solid fa-clock"></i> ${course.duration}</li>
                    <li><i class="fa-solid fa-film"></i> ${course.lessons}</li>
                    <li><i class="fa-solid fa-certificate"></i> Certificado</li>
                    <li><i class="fa-solid fa-infinity"></i> Acesso vitalício</li>
                `;
            }

            if (featuredLevels) {
                if (levelKey === 'all') {
                    featuredLevels.innerHTML = courses
                        .filter(item => ['iniciante', 'intermediario', 'avancado'].includes(item.category))
                        .map(item => `
                            <div class="featured-level-item ${item.category === selectedCourse.category ? 'active' : ''}">
                                <strong>${item.level}</strong>
                                <span>${item.price}</span>
                            </div>
                        `)
                        .join('');
                } else {
                    featuredLevels.innerHTML = '';
                }
            }

            if (priceOld) priceOld.textContent = course.oldPrice;
            if (priceCurrent) priceCurrent.textContent = course.price;

            if (featuredBuyButton) {
                featuredBuyButton.dataset.course = course.title;
                featuredBuyButton.dataset.price = course.priceValue;
            }

            if (featuredTrailerButton) {
                featuredTrailerButton.dataset.trailer = course.title;
            }

            featuredCard.classList.remove('is-changing');
        }, 300);
    }

    function openModal(course) {
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="course-modal-body-inner">
                <h2>${course.title}</h2>
                <p><strong>Nível:</strong> ${course.level}</p>
                <p>${course.description}</p>
                <ul class="featured-meta">
                    <li><i class="fa-solid fa-clock"></i> ${course.duration}</li>
                    <li><i class="fa-solid fa-film"></i> ${course.lessons}</li>
                    <li><i class="fa-solid fa-certificate"></i> Certificado</li>
                    <li><i class="fa-solid fa-infinity"></i> Acesso vitalício</li>
                </ul>
                <div class="featured-footer">
                    <div class="course-price">
                        <span class="price-current">${course.price}</span>
                    </div>
                    <div class="featured-actions">
                        <button class="btn btn-primary btn-buy" data-course="${course.title}" data-price="${course.priceValue}">Comprar Agora</button>
                        <button class="btn btn-secondary btn-trailer">Assistir Trailer</button>
                    </div>
                </div>
                <form class="purchase-form" id="purchase-form">
                    <div class="purchase-field">
                        <label for="buyer-name">Nome</label>
                        <input id="buyer-name" name="buyer-name" type="text" placeholder="Seu nome" required>
                    </div>
                    <div class="purchase-field">
                        <label for="buyer-email">E-mail</label>
                        <input id="buyer-email" name="buyer-email" type="email" placeholder="seu@email.com" required>
                    </div>
                    <div class="purchase-field">
                        <label for="buyer-phone">WhatsApp</label>
                        <input id="buyer-phone" name="buyer-phone" type="tel" placeholder="(31) 99999-9999" required>
                    </div>
                    <button class="btn btn-primary" type="submit">Finalizar Compra</button>
                </form>
            </div>
        `;

        const purchaseForm = document.getElementById('purchase-form');
        purchaseForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(purchaseForm);
            const buyerInfo = {
                name: formData.get('buyer-name')?.toString().trim() || 'Visitante',
                email: formData.get('buyer-email')?.toString().trim() || '',
                phone: formData.get('buyer-phone')?.toString().trim() || ''
            };

            const order = createPurchaseOrder(course, buyerInfo);
            modalBody.innerHTML = `
                <div class="purchase-confirmation">
                    <h2>Compra confirmada!</h2>
                    <p>Pedido ${order.id} registrado com sucesso.</p>
                    <p><strong>Curso:</strong> ${order.course}</p>
                    <p><strong>Valor:</strong> R$ ${order.price}</p>
                    <p><strong>Registro local:</strong> ${purchaseDatabase.length} pedido(s) salvo(s).</p>
                </div>
            `;
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            searchTerm = event.target.value;
            renderCourses();
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');
            activeFilter = tab.dataset.filter;
            renderFeaturedCard(activeFilter);
            renderCourses();
        });
    });

    courseGrid?.addEventListener('click', (event) => {
        const trigger = event.target.closest('.btn-buy');
        if (trigger) {
            const title = trigger.dataset.course;
            const course = courses.find(item => item.title === title);
            if (course) {
                openModal(course);
            }
            return;
        }
    });

    featuredBuyButton?.addEventListener('click', () => {
        openModal(selectedCourse);
    });

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });

    renderFeaturedCard('all');
    renderCourses();
});
