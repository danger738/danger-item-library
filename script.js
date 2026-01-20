// ============================================================================
// DANGER ITEM LIBRARY - Main JavaScript
// Developer: t.me/danger_ff_like
// Main Channel: t.me/FREEFIRELIKESDANGER
// Free APIs: t.me/DANGERFREEAPIS
// ============================================================================

class ItemLibrary {
    constructor() {
        // GitHub Configuration
        this.githubConfig = {
            username: 'DANGER-FF',
            repo: 'danger-item-library',
            branch: 'main',
            pngFolder: 'png'
        };
        
        // Application State
        this.state = {
            allItems: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 12,
            filters: {
                search: '',
                itemType: 'all',
                collectionType: 'all',
                type: 'all',
                rarity: 'all',
                obVersion: 'all',
                tag: 'all'
            },
            stats: {
                totalItems: 0,
                uniqueItems: 0,
                itemTypes: 0,
                collections: 0,
                obVersions: 0
            }
        };
        
        // DOM Elements
        this.elements = {
            itemsContainer: document.getElementById('itemsContainer'),
            searchInput: document.getElementById('searchInput'),
            searchBtn: document.getElementById('searchBtn'),
            resetBtn: document.getElementById('resetBtn'),
            itemTypeFilter: document.getElementById('itemTypeFilter'),
            collectionTypeFilter: document.getElementById('collectionTypeFilter'),
            typeFilter: document.getElementById('typeFilter'),
            rarityFilter: document.getElementById('rarityFilter'),
            obFilter: document.getElementById('obFilter'),
            tagFilter: document.getElementById('tagFilter'),
            loading: document.getElementById('loading'),
            pagination: document.getElementById('pagination'),
            filterChips: document.getElementById('filterChips'),
            
            // Stats Elements
            totalItemsStat: document.getElementById('totalItemsStat'),
            uniqueItemsStat: document.getElementById('uniqueItemsStat'),
            itemTypesStat: document.getElementById('itemTypesStat'),
            collectionsStat: document.getElementById('collectionsStat'),
            
            // Footer Stats
            footerItemsCount: document.getElementById('footerItemsCount'),
            footerTypesCount: document.getElementById('footerTypesCount'),
            footerUniqueCount: document.getElementById('footerUniqueCount')
        };
        
        // Initialize
        this.init();
    }
    
    // Initialize the application
    async init() {
        this.setupEventListeners();
        this.showLoading();
        await this.loadItemData();
        this.analyzeData();
        this.populateFilters();
        this.applyFilters();
        this.hideLoading();
    }
    
    // Show loading indicator
    showLoading() {
        this.elements.loading.style.display = 'block';
        this.elements.itemsContainer.innerHTML = '';
    }
    
    // Hide loading indicator
    hideLoading() {
        this.elements.loading.style.display = 'none';
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Search
        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
        this.elements.searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Reset
        this.elements.resetBtn.addEventListener('click', () => this.resetFilters());
        
        // Filter changes
        this.elements.itemTypeFilter.addEventListener('change', () => {
            this.state.filters.itemType = this.elements.itemTypeFilter.value;
            this.applyFilters();
        });
        
        this.elements.collectionTypeFilter.addEventListener('change', () => {
            this.state.filters.collectionType = this.elements.collectionTypeFilter.value;
            this.applyFilters();
        });
        
        this.elements.typeFilter.addEventListener('change', () => {
            this.state.filters.type = this.elements.typeFilter.value;
            this.applyFilters();
        });
        
        this.elements.rarityFilter.addEventListener('change', () => {
            this.state.filters.rarity = this.elements.rarityFilter.value;
            this.applyFilters();
        });
        
        this.elements.obFilter.addEventListener('change', () => {
            this.state.filters.obVersion = this.elements.obFilter.value;
            this.applyFilters();
        });
        
        this.elements.tagFilter.addEventListener('change', () => {
            this.state.filters.tag = this.elements.tagFilter.value;
            this.applyFilters();
        });
    }
    
    // Handle search
    handleSearch() {
        this.state.filters.search = this.elements.searchInput.value.toLowerCase().trim();
        this.state.currentPage = 1;
        this.applyFilters();
    }
    
    // Reset all filters
    resetFilters() {
        // Reset filter values
        this.elements.searchInput.value = '';
        this.elements.itemTypeFilter.value = 'all';
        this.elements.collectionTypeFilter.value = 'all';
        this.elements.typeFilter.value = 'all';
        this.elements.rarityFilter.value = 'all';
        this.elements.obFilter.value = 'all';
        this.elements.tagFilter.value = 'all';
        
        // Reset state
        this.state.filters = {
            search: '',
            itemType: 'all',
            collectionType: 'all',
            type: 'all',
            rarity: 'all',
            obVersion: 'all',
            tag: 'all'
        };
        
        this.state.currentPage = 1;
        this.applyFilters();
    }
    
    // Load item data from JSON
    async loadItemData() {
        try {
            // In production, fetch from your actual itemData.json
            // const response = await fetch('itemData.json');
            // this.state.allItems = await response.json();
            
            // For demo, generate comprehensive data
            this.state.allItems = this.generateDemoData();
            
        } catch (error) {
            console.error('Error loading item data:', error);
            this.showError('Failed to load item data. Please check your itemData.json file.');
        }
    }
    
    // Generate comprehensive demo data
    generateDemoData() {
        const items = [];
        
        // Item properties for demo
        const itemTypes = ["AVATAR", "WEAPON", "ARMOR", "CONSUMABLE", "RESOURCE", "MOUNT", "PET", "EMOTE", "BACKPACK", "PARACHUTE"];
        const collectionTypes = ["CYBERNETIC", "FANTASY", "MILITARY", "MYSTICAL", "FUTURISTIC", "MEDICAL", "SCIENTIFIC", "NONE", "SEASONAL"];
        const types = ["Characters", "Weapons", "Armor", "Consumables", "Resources", "Mounts", "Pets", "Emotes", "Gear"];
        const rarities = ["WHITE", "GREEN", "BLUE", "PURPLE", "ORANGE", "RED"];
        const obVersions = ["OB33", "OB34", "OB35", "OB36", "OB37", "OB38", "OB39", "OB40", 
                          "OB41", "OB42", "OB43", "OB44", "OB45", "OB46", "OB47", "OB48", 
                          "OB49", "OB50", "OB51", "OB52"];
        
        const names = {
            AVATAR: ["Cyber Queen", "Tactical Commando", "Mystic Mage", "Stealth Assassin"],
            WEAPON: ["Plasma Rifle", "Dragon's Breath", "Quantum Blaster", "Void Sword"],
            ARMOR: ["Dragon Scale", "Nanoweave", "Quantum Plate", "Void Cloak"],
            CONSUMABLE: ["Health Pack", "Stamina Potion", "Mana Elixir", "Speed Boost"],
            RESOURCE: ["Void Crystal", "Quantum Dust", "Dragon Scale", "Mystic Essence"]
        };
        
        // Generate 100+ items for demo
        for (let i = 1; i <= 100; i++) {
            const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            const collectionType = collectionTypes[Math.floor(Math.random() * collectionTypes.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            const rarity = rarities[Math.floor(Math.random() * rarities.length)];
            const obVersion = obVersions[Math.floor(Math.random() * obVersions.length)];
            const isUnique = Math.random() > 0.7;
            
            // Generate appropriate name
            let name = "";
            if (names[itemType]) {
                name = `${names[itemType][Math.floor(Math.random() * names[itemType].length)]} ${i}`;
            } else {
                const prefixes = ["Cyber", "Tactical", "Ancient", "Mystic", "Plasma", "Nano"];
                const suffixes = ["Item", "Gear", "Device", "Tool", "Apparatus"];
                name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]} ${i}`;
            }
            
            // Determine tag based on OB version
            let tag = "";
            const obNum = parseInt(obVersion.replace('OB', ''));
            if (obNum >= 33 && obNum <= 52) {
                tag = obVersion;
            } else if (obVersion) {
                tag = "";
            }
            
            items.push({
                "icon": `Icon_${itemType.toLowerCase()}_${i}`,
                "itemID": 100000000 + i,
                "name": name,
                "description": `This is a ${rarity.toLowerCase()} ${itemType.toLowerCase()} from the ${collectionType} collection. Introduced in ${obVersion}. ${isUnique ? "This is a unique item with special properties." : ""}`,
                "itemType": itemType,
                "collectionType": collectionType,
                "tag": tag,
                "Rare": rarity,
                "isUnique": isUnique,
                "IconInAB": "IconInCDN",
                "type": type,
                "obVersion": obVersion
            });
        }
        
        return items;
    }
    
    // Analyze data and calculate statistics
    analyzeData() {
        const items = this.state.allItems;
        
        // Calculate statistics
        this.state.stats.totalItems = items.length;
        this.state.stats.uniqueItems = items.filter(item => item.isUnique).length;
        
        // Count unique item types
        const itemTypesSet = new Set(items.map(item => item.itemType));
        this.state.stats.itemTypes = itemTypesSet.size;
        
        // Count unique collection types
        const collectionsSet = new Set(items.map(item => item.collectionType));
        this.state.stats.collections = collectionsSet.size;
        
        // Count unique OB versions
        const obVersionsSet = new Set(items.map(item => item.obVersion));
        this.state.stats.obVersions = obVersionsSet.size;
        
        // Update UI
        this.updateStatsUI();
    }
    
    // Update statistics UI
    updateStatsUI() {
        const stats = this.state.stats;
        
        // Main stats
        this.elements.totalItemsStat.textContent = stats.totalItems;
        this.elements.uniqueItemsStat.textContent = stats.uniqueItems;
        this.elements.itemTypesStat.textContent = stats.itemTypes;
        this.elements.collectionsStat.textContent = stats.collections;
        
        // Footer stats
        this.elements.footerItemsCount.textContent = `${stats.totalItems} items`;
        this.elements.footerTypesCount.textContent = `${stats.itemTypes} types`;
        this.elements.footerUniqueCount.textContent = `${stats.uniqueItems} unique`;
    }
    
    // Populate filter dropdowns with unique values
    populateFilters() {
        const items = this.state.allItems;
        
        // Get unique values
        const itemTypes = [...new Set(items.map(item => item.itemType))].sort();
        const collectionTypes = [...new Set(items.map(item => item.collectionType))].sort();
        const types = [...new Set(items.map(item => item.type))].sort();
        const rarities = [...new Set(items.map(item => item.Rare))].sort();
        const obVersions = [...new Set(items.map(item => item.obVersion))].sort((a, b) => {
            const aNum = parseInt(a.replace('OB', '')) || 0;
            const bNum = parseInt(b.replace('OB', '')) || 0;
            return bNum - aNum; // Descending order
        });
        
        // Populate Item Type filter
        this.populateSelect(this.elements.itemTypeFilter, itemTypes, 'All Item Types');
        
        // Populate Collection Type filter
        this.populateSelect(this.elements.collectionTypeFilter, collectionTypes, 'All Collections');
        
        // Populate Type filter
        this.populateSelect(this.elements.typeFilter, types, 'All Types');
        
        // Populate Rarity filter
        this.populateSelect(this.elements.rarityFilter, rarities, 'All Rarities', 
            (rarity) => rarity.charAt(0) + rarity.slice(1).toLowerCase());
        
        // Populate OB Version filter
        this.populateSelect(this.elements.obFilter, obVersions, 'All OB Versions');
    }
    
    // Populate a select element with options
    populateSelect(selectElement, values, allText, formatter = null) {
        // Clear existing options (keeping the first "all" option)
        while (selectElement.options.length > 1) {
            selectElement.remove(1);
        }
        
        // Add new options
        values.forEach(value => {
            if (value) { // Skip null/undefined values
                const option = document.createElement('option');
                option.value = value;
                option.textContent = formatter ? formatter(value) : value;
                selectElement.appendChild(option);
            }
        });
    }
    
    // Apply filters and update display
    applyFilters() {
        this.updateFilterChips();
        
        // Filter items
        this.state.filteredItems = this.state.allItems.filter(item => {
            // Search filter
            if (this.state.filters.search) {
                const searchText = `${item.name} ${item.description} ${item.itemID} ${item.tag} ${item.itemType} ${item.collectionType}`.toLowerCase();
                if (!searchText.includes(this.state.filters.search)) {
                    return false;
                }
            }
            
            // Item Type filter
            if (this.state.filters.itemType !== 'all' && item.itemType !== this.state.filters.itemType) {
                return false;
            }
            
            // Collection Type filter
            if (this.state.filters.collectionType !== 'all' && item.collectionType !== this.state.filters.collectionType) {
                return false;
            }
            
            // Type filter
            if (this.state.filters.type !== 'all' && item.type !== this.state.filters.type) {
                return false;
            }
            
            // Rarity filter
            if (this.state.filters.rarity !== 'all' && item.Rare !== this.state.filters.rarity) {
                return false;
            }
            
            // OB Version filter
            if (this.state.filters.obVersion !== 'all' && item.obVersion !== this.state.filters.obVersion) {
                return false;
            }
            
            // Tag filter
            if (this.state.filters.tag !== 'all') {
                if (this.state.filters.tag === 'ob33_52') {
                    // Check if tag is between OB33 and OB52
                    if (!item.tag || item.tag === '') return false;
                    const obNum = parseInt(item.tag.replace('OB', ''));
                    if (obNum < 33 || obNum > 52) return false;
                } else if (this.state.filters.tag === 'older') {
                    // Check if tag is empty (older than OB33)
                    if (item.tag && item.tag !== '') return false;
                }
            }
            
            return true;
        });
        
        // Render items
        this.renderItems();
        this.renderPagination();
    }
    
    // Update filter chips display
    updateFilterChips() {
        const chipsContainer = this.elements.filterChips;
        chipsContainer.innerHTML = '';
        
        const filters = this.state.filters;
        
        // Add chips for active filters (excluding 'all' and empty search)
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                const chip = document.createElement('div');
                chip.className = 'filter-chip';
                
                let displayText = '';
                switch(key) {
                    case 'search':
                        displayText = `Search: "${value}"`;
                        break;
                    case 'itemType':
                        displayText = `Type: ${value}`;
                        break;
                    case 'collectionType':
                        displayText = `Collection: ${value}`;
                        break;
                    case 'type':
                        displayText = `Category: ${value}`;
                        break;
                    case 'rarity':
                        displayText = `Rarity: ${value.charAt(0) + value.slice(1).toLowerCase()}`;
                        break;
                    case 'obVersion':
                        displayText = `OB: ${value}`;
                        break;
                    case 'tag':
                        displayText = `Tag: ${value === 'ob33_52' ? 'OB33-OB52' : 'Older than OB33'}`;
                        break;
                }
                
                chip.innerHTML = `
                    ${displayText}
                    <span class="remove" data-filter="${key}">×</span>
                `;
                
                chipsContainer.appendChild(chip);
            }
        });
        
        // Add event listeners to remove buttons
        chipsContainer.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.removeFilter(filter);
            });
        });
    }
    
    // Remove specific filter
    removeFilter(filterName) {
        switch(filterName) {
            case 'search':
                this.elements.searchInput.value = '';
                this.state.filters.search = '';
                break;
            case 'itemType':
                this.elements.itemTypeFilter.value = 'all';
                this.state.filters.itemType = 'all';
                break;
            case 'collectionType':
                this.elements.collectionTypeFilter.value = 'all';
                this.state.filters.collectionType = 'all';
                break;
            case 'type':
                this.elements.typeFilter.value = 'all';
                this.state.filters.type = 'all';
                break;
            case 'rarity':
                this.elements.rarityFilter.value = 'all';
                this.state.filters.rarity = 'all';
                break;
            case 'obVersion':
                this.elements.obFilter.value = 'all';
                this.state.filters.obVersion = 'all';
                break;
            case 'tag':
                this.elements.tagFilter.value = 'all';
                this.state.filters.tag = 'all';
                break;
        }
        
        this.applyFilters();
    }
    
    // Render items to the grid
    renderItems() {
        const container = this.elements.itemsContainer;
        
        if (this.state.filteredItems.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }
        
        // Calculate pagination
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;
        const itemsToShow = this.state.filteredItems.slice(startIndex, endIndex);
        
        // Generate HTML for items
        container.innerHTML = itemsToShow.map(item => this.getItemCardHTML(item)).join('');
    }
    
    // Get HTML for item card
    getItemCardHTML(item) {
        const imageUrl = this.getImageUrl(item.itemID);
        const tagDisplay = this.getTagDisplay(item.tag);
        const rarityClass = `rarity-${item.Rare.toLowerCase()}`;
        const rarityName = item.Rare.charAt(0) + item.Rare.slice(1).toLowerCase();
        
        return `
            <div class="item-card" data-item-id="${item.itemID}">
                <div class="item-header">
                    <div class="item-id">ID: ${item.itemID}</div>
                    <div class="item-name">${item.name}</div>
                </div>
                
                <div class="item-image">
                    <img src="${imageUrl}" 
                         alt="${item.name}"
                         onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxMTEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+JE5vIEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjUlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNjY2MiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JRCA6ICR7aXRlbS5pdGVtSUR9PC90ZXh0Pjwvc3ZnPg=='">
                </div>
                
                <div class="item-details">
                    <p class="item-description">${item.description}</p>
                    
                    <div class="item-tags">
                        <span class="item-tag tag-type">${item.itemType}</span>
                        <span class="item-tag tag-collection">${item.collectionType}</span>
                        <span class="item-tag tag-category">${item.type}</span>
                        <span class="item-tag ${tagDisplay === 'older than OB33' ? 'tag-ob-old' : 'tag-ob'}">${tagDisplay}</span>
                    </div>
                </div>
                
                <div class="item-footer">
                    <div class="item-rarity">
                        <div class="rarity-dot ${rarityClass}"></div>
                        <span>${rarityName}</span>
                    </div>
                    ${item.isUnique ? '<span class="unique-badge">UNIQUE</span>' : ''}
                </div>
            </div>
        `;
    }
    
    // Get tag display text
    getTagDisplay(tag) {
        if (!tag || tag === '') {
            return 'older than OB33';
        }
        return tag;
    }
    
    // Get image URL from GitHub
    getImageUrl(itemId) {
        return `https://raw.githubusercontent.com/${this.githubConfig.username}/${this.githubConfig.repo}/${this.githubConfig.branch}/${this.githubConfig.pngFolder}/${itemId}.png`;
    }
    
    // Get no results HTML
    getNoResultsHTML() {
        return `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
                <div style="font-size: 4rem; color: #ff0000; margin-bottom: 20px;">
                    <i class="fas fa-search"></i>
                </div>
                <h3 style="font-size: 2rem; margin-bottom: 15px; color: white;">No Items Found</h3>
                <p style="color: #ccc; margin-bottom: 30px;">Try adjusting your search criteria or filters</p>
                <button onclick="itemLibrary.resetFilters()" style="padding: 12px 30px; background: linear-gradient(45deg, #ff0000, #ff6b6b); color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1rem;">
                    <i class="fas fa-redo"></i> Reset All Filters
                </button>
            </div>
        `;
    }
    
    // Render pagination controls
    renderPagination() {
        const totalPages = Math.ceil(this.state.filteredItems.length / this.state.itemsPerPage);
        
        if (totalPages <= 1) {
            this.elements.pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = `
            <button class="page-btn" onclick="itemLibrary.changePage(${this.state.currentPage - 1})" 
                    ${this.state.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Prev
            </button>
        `;
        
        // Show page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.state.currentPage - 2 && i <= this.state.currentPage + 2)) {
                paginationHTML += `
                    <button class="page-number ${i === this.state.currentPage ? 'active' : ''}" 
                            onclick="itemLibrary.changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.state.currentPage - 3 || i === this.state.currentPage + 3) {
                paginationHTML += `<span style="color: #ccc;">...</span>`;
            }
        }
        
        paginationHTML += `
            <button class="page-btn" onclick="itemLibrary.changePage(${this.state.currentPage + 1})" 
                    ${this.state.currentPage === totalPages ? 'disabled' : ''}>
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        this.elements.pagination.innerHTML = paginationHTML;
    }
    
    // Change page
    changePage(page) {
        const totalPages = Math.ceil(this.state.filteredItems.length / this.state.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.state.currentPage = page;
            this.renderItems();
            this.renderPagination();
            
            // Scroll to top of items
            this.elements.itemsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Show error message
    showError(message) {
        this.elements.itemsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: rgba(255, 0, 0, 0.1); border-radius: 15px; border: 2px dashed #ff0000;">
                <div style="font-size: 4rem; color: #ff0000; margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 style="font-size: 2rem; margin-bottom: 15px; color: white;">Error Loading Data</h3>
                <p style="color: #ccc; margin-bottom: 30px;">${message}</p>
                <button onclick="location.reload()" style="padding: 12px 30px; background: #ff0000; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1rem;">
                    <i class="fas fa-sync-alt"></i> Retry Loading
                </button>
                <p style="margin-top: 20px; color: #999; font-size: 0.9rem;">
                    Developer: <a href="https://t.me/danger_ff_like" target="_blank" style="color: #ff6b6b;">t.me/danger_ff_like</a>
                </p>
            </div>
        `;
    }
}

// Initialize the application when DOM is loaded
let itemLibrary;
document.addEventListener('DOMContentLoaded', () => {
    itemLibrary = new ItemLibrary();
});

// Make itemLibrary available globally
window.itemLibrary = itemLibrary;