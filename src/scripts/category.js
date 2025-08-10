// Category Page JavaScript for EvAnia

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters for category and subcategory
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const subcategoryParam = urlParams.get('subcategory');
    
    // Update breadcrumbs and page title based on URL parameters
    updateBreadcrumbsAndTitle(categoryParam, subcategoryParam);
    
    // Initialize price range sliders
    initPriceRangeSliders();
    
    // Initialize mobile filter panel
    initMobileFilterPanel();
    
    // Initialize product grid
    initProductGrid();
    
    // Initialize filter functionality
    initFilters();
    
    // Initialize sorting functionality
    initSorting();
    
    // Initialize load more functionality
    initLoadMore();
});

// Update breadcrumbs and page title based on URL parameters
function updateBreadcrumbsAndTitle(category, subcategory) {
    if (!category) return;
    
    // Format category name for display
    const formattedCategory = formatCategoryName(category);
    
    // Update category breadcrumb and link
    const categoryBreadcrumb = document.querySelector('.category-breadcrumb');
    if (categoryBreadcrumb) {
        categoryBreadcrumb.textContent = formattedCategory;
        categoryBreadcrumb.href = `category.html?category=${category}`;
    }
    
    // Update page title
    const categoryTitle = document.querySelector('.category-title');
    if (categoryTitle) {
        categoryTitle.textContent = formattedCategory;
    }
    
    // Update subcategory breadcrumb if available
    if (subcategory) {
        const formattedSubcategory = formatCategoryName(subcategory);
        const subcategoryBreadcrumb = document.querySelector('.subcategory-breadcrumb');
        const subcategorySeparator = document.querySelector('.subcategory-separator');
        
        if (subcategoryBreadcrumb && subcategorySeparator) {
            subcategoryBreadcrumb.textContent = formattedSubcategory;
            subcategoryBreadcrumb.style.display = 'inline';
            subcategorySeparator.style.display = 'inline';
            
            // Update page title to show subcategory
            if (categoryTitle) {
                categoryTitle.textContent = formattedSubcategory;
            }
        }
    } else {
        // Hide subcategory elements if no subcategory
        const subcategoryBreadcrumb = document.querySelector('.subcategory-breadcrumb');
        const subcategorySeparator = document.querySelector('.subcategory-separator');
        
        if (subcategoryBreadcrumb && subcategorySeparator) {
            subcategoryBreadcrumb.style.display = 'none';
            subcategorySeparator.style.display = 'none';
        }
    }
    
    // Update document title
    if (subcategory) {
        document.title = `${formatCategoryName(subcategory)} - EvAnia`;
    } else {
        document.title = `${formattedCategory} - EvAnia`;
    }
}

// Format category name from URL parameter
function formatCategoryName(categoryParam) {
    return categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Initialize price range sliders
function initPriceRangeSliders() {
    // Desktop price range slider
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    if (priceRangeSlider) {
        noUiSlider.create(priceRangeSlider, {
            start: [500, 10000],
            connect: true,
            range: {
                'min': 0,
                'max': 20000
            },
            format: {
                to: function(value) {
                    return Math.round(value);
                },
                from: function(value) {
                    return Number(value);
                }
            }
        });
        
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        
        priceRangeSlider.noUiSlider.on('update', function(values, handle) {
            if (handle === 0) {
                minPriceInput.value = values[0];
            } else {
                maxPriceInput.value = values[1];
            }
        });
        
        minPriceInput.addEventListener('change', function() {
            priceRangeSlider.noUiSlider.set([this.value, null]);
        });
        
        maxPriceInput.addEventListener('change', function() {
            priceRangeSlider.noUiSlider.set([null, this.value]);
        });
    }
    
    // Mobile price range slider
    const mobileRangeSlider = document.getElementById('mobileRangeSlider');
    if (mobileRangeSlider) {
        noUiSlider.create(mobileRangeSlider, {
            start: [500, 10000],
            connect: true,
            range: {
                'min': 0,
                'max': 20000
            },
            format: {
                to: function(value) {
                    return Math.round(value);
                },
                from: function(value) {
                    return Number(value);
                }
            }
        });
        
        const mobileMinPriceInput = document.getElementById('mobileMinPrice');
        const mobileMaxPriceInput = document.getElementById('mobileMaxPrice');
        
        mobileRangeSlider.noUiSlider.on('update', function(values, handle) {
            if (handle === 0) {
                mobileMinPriceInput.value = values[0];
            } else {
                mobileMaxPriceInput.value = values[1];
            }
        });
        
        mobileMinPriceInput.addEventListener('change', function() {
            mobileRangeSlider.noUiSlider.set([this.value, null]);
        });
        
        mobileMaxPriceInput.addEventListener('change', function() {
            mobileRangeSlider.noUiSlider.set([null, this.value]);
        });
    }
}

// Initialize mobile filter panel
function initMobileFilterPanel() {
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const mobileFilterPanel = document.getElementById('mobileFilterPanel');
    const closeFilterBtn = document.querySelector('.close-filter');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    document.body.appendChild(overlay);
    
    // Open mobile filter panel
    if (mobileFilterBtn && mobileFilterPanel) {
        mobileFilterBtn.addEventListener('click', function() {
            mobileFilterPanel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close mobile filter panel
    if (closeFilterBtn) {
        closeFilterBtn.addEventListener('click', function() {
            mobileFilterPanel.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Allow scrolling
        });
    }
    
    // Apply filters and close panel
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Apply filters (sync with desktop filters)
            syncMobileFiltersToDesktop();
            
            // Update product grid based on filters
            updateProductGrid();
            
            // Close panel
            mobileFilterPanel.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Allow scrolling
        });
    }
    
    // Close panel when clicking on overlay
    overlay.addEventListener('click', function() {
        mobileFilterPanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Allow scrolling
    });
}

// Sync mobile filters to desktop filters
function syncMobileFiltersToDesktop() {
    // Sync price range
    const mobileRangeSlider = document.getElementById('mobileRangeSlider');
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    
    if (mobileRangeSlider && priceRangeSlider) {
        const mobileValues = mobileRangeSlider.noUiSlider.get();
        priceRangeSlider.noUiSlider.set(mobileValues);
    }
    
    // Sync color theme checkboxes
    const mobileColorCheckboxes = document.querySelectorAll('input[name="mobile-color"]');
    const desktopColorCheckboxes = document.querySelectorAll('input[name="color"]');
    
    mobileColorCheckboxes.forEach((checkbox, index) => {
        desktopColorCheckboxes[index].checked = checkbox.checked;
    });
    
    // Sync occasion checkboxes
    const mobileOccasionCheckboxes = document.querySelectorAll('input[name="mobile-occasion"]');
    const desktopOccasionCheckboxes = document.querySelectorAll('input[name="occasion"]');
    
    mobileOccasionCheckboxes.forEach((checkbox, index) => {
        desktopOccasionCheckboxes[index].checked = checkbox.checked;
    });
    
    // Sync toggle switches
    document.getElementById('popularityToggle').checked = document.getElementById('mobilePopularityToggle').checked;
    document.getElementById('newArrivalsToggle').checked = document.getElementById('mobileNewArrivalsToggle').checked;
}

// Initialize product grid
function initProductGrid() {
    // In a real application, this would fetch products from an API
    // For this demo, we'll generate sample products
    generateSampleProducts();
}

// Generate sample products for the grid
function generateSampleProducts() {
    const productGrid = document.querySelector('.product-grid');
    const productTemplate = productGrid.querySelector('.product-card');
    
    // Remove template product
    productGrid.innerHTML = '';
    
    // Sample product data
    const products = [
        {
            image: '../assets/images/decor-1.jpg',
            title: 'Romantic Candlelight Dinner',
            discountedPrice: '₹3,999',
            originalPrice: '₹5,499',
            rating: 4.5,
            reviewCount: 124
        },
        {
            image: '../assets/images/decor-2.jpg',
            title: 'Premium Birthday Balloon Décor',
            discountedPrice: '₹2,499',
            originalPrice: '₹3,299',
            rating: 5,
            reviewCount: 89
        },
        {
            image: '../assets/images/decor-3.jpg',
            title: 'Elegant Baby Shower Package',
            discountedPrice: '₹4,299',
            originalPrice: '₹5,999',
            rating: 4,
            reviewCount: 56
        },
        {
            image: '../assets/images/decor-4.jpg',
            title: 'Anniversary Special Décor',
            discountedPrice: '₹3,799',
            originalPrice: '₹4,999',
            rating: 4.5,
            reviewCount: 102
        },
        {
            image: '../assets/images/decor-1.jpg',
            title: 'Luxury Dinner Date Setup',
            discountedPrice: '₹4,499',
            originalPrice: '₹5,999',
            rating: 4.8,
            reviewCount: 78
        },
        {
            image: '../assets/images/decor-2.jpg',
            title: 'Milestone Birthday Celebration',
            discountedPrice: '₹3,299',
            originalPrice: '₹4,499',
            rating: 4.2,
            reviewCount: 65
        }
    ];
    
    // Generate 12 products (duplicating the sample data)
    for (let i = 0; i < 12; i++) {
        const product = products[i % products.length];
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Create product HTML
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details">
                <h3>${product.title}</h3>
                <div class="price">
                    <span class="discounted">${product.discountedPrice}</span>
                    <span class="original">${product.originalPrice}</span>
                </div>
                <div class="rating">
                    ${generateRatingStars(product.rating)}
                    <span class="review-count">(${product.reviewCount})</span>
                </div>
                <button class="book-now">Book Now</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    }
    
    // Update results count
    updateResultsCount(12);
}

// Generate rating stars based on rating value
function generateRatingStars(rating) {
    let starsHtml = '';
    
    // Full stars
    for (let i = 1; i <= Math.floor(rating); i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Half star if needed
    if (rating % 1 !== 0) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = Math.ceil(rating); i < 5; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

// Update results count
function updateResultsCount(count) {
    const resultsCount = document.querySelector('.results-count span');
    if (resultsCount) {
        resultsCount.textContent = `${count} results`;
    }
}

// Initialize filter functionality
function initFilters() {
    // Desktop clear filters button
    const clearFiltersBtn = document.querySelector('.filter-sidebar .clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
    
    // Mobile clear filters button
    const mobileClearFiltersBtn = document.querySelector('.mobile-filter-footer .clear-filters');
    if (mobileClearFiltersBtn) {
        mobileClearFiltersBtn.addEventListener('click', function() {
            resetMobileFilters();
        });
    }
    
    // Filter change events
    const filterInputs = document.querySelectorAll('.filter-sidebar input');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateProductGrid();
        });
    });
}

// Reset all filters
function resetFilters() {
    // Reset price range slider
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    if (priceRangeSlider && priceRangeSlider.noUiSlider) {
        priceRangeSlider.noUiSlider.set([0, 20000]);
    }
    
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('.filter-sidebar input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Update product grid
    updateProductGrid();
}

// Reset mobile filters
function resetMobileFilters() {
    // Reset mobile price range slider
    const mobileRangeSlider = document.getElementById('mobileRangeSlider');
    if (mobileRangeSlider && mobileRangeSlider.noUiSlider) {
        mobileRangeSlider.noUiSlider.set([0, 20000]);
    }
    
    // Reset mobile checkboxes
    const mobileCheckboxes = document.querySelectorAll('.mobile-filter-content input[type="checkbox"]');
    mobileCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Initialize sorting functionality
function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            updateProductGrid();
        });
    }
}

// Update product grid based on filters and sorting
function updateProductGrid() {
    // In a real application, this would fetch filtered products from an API
    // For this demo, we'll just simulate a loading state
    
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        // Show loading state
        productGrid.style.opacity = '0.5';
        
        // Simulate API request delay
        setTimeout(() => {
            // Reset opacity
            productGrid.style.opacity = '1';
            
            // In a real app, this would update the products based on filters and sorting
            // For this demo, we'll just leave the existing products
        }, 500);
    }
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreProducts();
        });
    }
}

// Load more products
function loadMoreProducts() {
    // In a real application, this would fetch more products from an API
    // For this demo, we'll just simulate loading more products
    
    const productGrid = document.querySelector('.product-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (productGrid && loadMoreBtn) {
        // Show loading state
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate API request delay
        setTimeout(() => {
            // Sample product data
            const products = [
                {
                    image: '../assets/images/decor-3.jpg',
                    title: 'Premium Corporate Event Setup',
                    discountedPrice: '₹15,999',
                    originalPrice: '₹19,999',
                    rating: 4.7,
                    reviewCount: 42
                },
                {
                    image: '../assets/images/decor-4.jpg',
                    title: 'Festival Celebration Package',
                    discountedPrice: '₹8,499',
                    originalPrice: '₹10,999',
                    rating: 4.3,
                    reviewCount: 37
                },
                {
                    image: '../assets/images/decor-1.jpg',
                    title: 'Deluxe Wedding Decoration',
                    discountedPrice: '₹25,999',
                    originalPrice: '₹32,999',
                    rating: 4.9,
                    reviewCount: 85
                },
                {
                    image: '../assets/images/decor-2.jpg',
                    title: 'Kids Birthday Party Theme',
                    discountedPrice: '₹4,999',
                    originalPrice: '₹6,499',
                    rating: 4.6,
                    reviewCount: 53
                }
            ];
            
            // Add more products to the grid
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                // Create product HTML
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-details">
                        <h3>${product.title}</h3>
                        <div class="price">
                            <span class="discounted">${product.discountedPrice}</span>
                            <span class="original">${product.originalPrice}</span>
                        </div>
                        <div class="rating">
                            ${generateRatingStars(product.rating)}
                            <span class="review-count">(${product.reviewCount})</span>
                        </div>
                        <button class="book-now">Book Now</button>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            }
            
            // Update results count
            const currentCount = document.querySelectorAll('.product-card').length;
            updateResultsCount(currentCount);
            
            // Reset button state
            loadMoreBtn.textContent = 'Load More';
            loadMoreBtn.disabled = false;
            
            // Hide load more button if all products are loaded
            if (currentCount >= 20) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1000);
    }
}
