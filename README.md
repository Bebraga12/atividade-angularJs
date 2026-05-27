# Brew & Co. Coffee House — AngularJS Activity

## How to run
Open the project folder in VS Code and start **Live Server** on `index.html`. No build step is required.

## Project structure
```text
atividade-angular/
├── index.html
├── README.md
├── assets/
│   └── css/
│       ├── style.css
│       └── responsive.css
└── app/
    ├── app.js
    ├── controllers/
    │   └── mainController.js
    ├── services/
    │   ├── dataService.js
    │   └── toastService.js
    ├── filters/
    │   └── formatFilter.js
    └── components/
        ├── accordion/
        │   ├── accordionDirective.js
        │   └── accordionTemplate.html
        ├── pagination/
        │   ├── paginationDirective.js
        │   └── paginationTemplate.html
        ├── progress-bar/
        │   ├── progressBarDirective.js
        │   └── progressBarTemplate.html
        ├── tabs/
        │   ├── tabsDirective.js
        │   └── tabsTemplate.html
        ├── dropdown/
        │   ├── dropdownDirective.js
        │   └── dropdownTemplate.html
        └── toast/
            ├── toastDirective.js
            └── toastTemplate.html
```

---

## ✅ Requirements checklist

### 1. Main module
| Item | File | Line / Code |
|------|------|-------------|
| Module declaration | `app/app.js` | `angular.module('atividadeApp', [])` |

### 2. Controllers
| Item | File | Code |
|------|------|------|
| mainController with $scope | `app/controllers/mainController.js` | `.controller('mainController', function ($scope, dataService, toastService) {` |

### 3. Services / Factories
| Item | File | Code |
|------|------|------|
| dataService | `app/services/dataService.js` | `.factory('dataService', function () {` |
| toastService | `app/services/toastService.js` | `.factory('toastService', function ($timeout) {` |

### 4. Custom filters
| Filter | File | Usage example |
|--------|------|---------------|
| formatPrice | `app/filters/formatFilter.js` | `{{ item.price \| formatPrice }}` - visible in pagination cards |
| capitalize | `app/filters/formatFilter.js` | `{{ tab.label \| capitalize }}` - visible in tabs and dropdown |

### 5. Events
| Event | File | Code example |
|-------|------|--------------|
| ng-click | multiple directives | `ng-click="toggleItem($index)"` |
| ng-change | `app/components/progress-bar/progressBarTemplate.html` | `ng-change="onValueChange()"` |
| ng-model | `app/components/progress-bar/progressBarTemplate.html` | `ng-model="value"` |

### 6. Directives (visual components)
| Component | Directive file | Template file | Usage in index.html |
|-----------|---------------|---------------|---------------------|
| Accordion | `app/components/accordion/accordionDirective.js` | `app/components/accordion/accordionTemplate.html` | `<accordion items="faqItems">` |
| Pagination | `app/components/pagination/paginationDirective.js` | `app/components/pagination/paginationTemplate.html` | `<pagination current-page="currentPage" total-pages="totalPages" on-change="goToPage(page)">` |
| Progress Bar | `app/components/progress-bar/progressBarDirective.js` | `app/components/progress-bar/progressBarTemplate.html` | `<progress-bar value="progress">` |
| Tabs | `app/components/tabs/tabsDirective.js` | `app/components/tabs/tabsTemplate.html` | `<tabs tabs="profileTabs">` |
| Dropdown | `app/components/dropdown/dropdownDirective.js` | `app/components/dropdown/dropdownTemplate.html` | `<dropdown options="dropdownOptions" on-select="filterMenu(option)" placeholder="Filter by category">` |
| Toast | `app/components/toast/toastDirective.js` | `app/components/toast/toastTemplate.html` | `<toast>` |

### 7. Responsiveness
| Breakpoint | File | Rule |
|------------|------|------|
| Mobile (≤480px) | `assets/css/responsive.css` | single column, larger touch targets |
| Tablet (≤768px) | `assets/css/responsive.css` | single column |
| Desktop (≥769px) | `assets/css/responsive.css` | 2-column grid |
