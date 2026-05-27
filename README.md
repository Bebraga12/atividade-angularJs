# Brew & Co. Coffee House — Atividade AngularJS

## Como executar
Abra a pasta do projeto no VS Code e inicie o **Live Server** no arquivo `index.html`. Nenhuma etapa de build é necessária.

## Estrutura do projeto
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

## ✅ Checklist de requisitos

### 1. Módulo principal
| Item | Arquivo | Linha / Código |
|------|---------|----------------|
| Declaração do módulo | `app/app.js` | `angular.module('atividadeApp', [])` |

### 2. Controllers
| Item | Arquivo | Código |
|------|---------|--------|
| mainController com $scope | `app/controllers/mainController.js` | `.controller('mainController', function ($scope, dataService, toastService) {` |

### 3. Services / Factories
| Item | Arquivo | Código |
|------|---------|--------|
| dataService | `app/services/dataService.js` | `.factory('dataService', function () {` |
| toastService | `app/services/toastService.js` | `.factory('toastService', function ($timeout) {` |

### 4. Filtros customizados
| Filtro | Arquivo | Exemplo de uso |
|--------|---------|----------------|
| formatPrice | `app/filters/formatFilter.js` | `{{ item.price \| formatPrice }}` — visível nos cards de paginação |
| capitalize | `app/filters/formatFilter.js` | `{{ tab.label \| capitalize }}` — visível nas abas e no dropdown |

### 5. Eventos
| Evento | Arquivo | Exemplo de código |
|--------|---------|-------------------|
| ng-click | múltiplas diretivas | `ng-click="toggleItem($index)"` |
| ng-change | `app/components/progress-bar/progressBarTemplate.html` | `ng-change="onValueChange()"` |
| ng-model | `app/components/progress-bar/progressBarTemplate.html` | `ng-model="value"` |

### 6. Diretivas (componentes visuais)
| Componente | Arquivo da diretiva | Arquivo de template | Uso no index.html |
|------------|---------------------|---------------------|-------------------|
| Accordion | `app/components/accordion/accordionDirective.js` | `app/components/accordion/accordionTemplate.html` | `<accordion items="faqItems">` |
| Paginação | `app/components/pagination/paginationDirective.js` | `app/components/pagination/paginationTemplate.html` | `<pagination current-page="currentPage" total-pages="totalPages" on-change="goToPage(page)">` |
| Barra de progresso | `app/components/progress-bar/progressBarDirective.js` | `app/components/progress-bar/progressBarTemplate.html` | `<progress-bar value="progress">` |
| Abas | `app/components/tabs/tabsDirective.js` | `app/components/tabs/tabsTemplate.html` | `<tabs tabs="profileTabs">` |
| Dropdown | `app/components/dropdown/dropdownDirective.js` | `app/components/dropdown/dropdownTemplate.html` | `<dropdown options="dropdownOptions" on-select="filterMenu(option)" placeholder="Filtrar por categoria">` |
| Toast | `app/components/toast/toastDirective.js` | `app/components/toast/toastTemplate.html` | `<toast>` |

### 7. Responsividade
| Breakpoint | Arquivo | Regra |
|------------|---------|-------|
| Mobile (≤480px) | `assets/css/responsive.css` | coluna única, áreas de toque maiores |
| Tablet (≤768px) | `assets/css/responsive.css` | coluna única |
| Desktop (≥769px) | `assets/css/responsive.css` | grid de 2 colunas |
