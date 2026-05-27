angular.module('atividadeApp').factory('dataService', function () {
  // Dados centralizados da cafeteria utilizados em toda a aplicação.

  var menuItems = [
    { id: 1,  name: 'Espresso',              category: 'coffee',      categoryPt: 'Café',           price: 3.00, description: 'Dose encorpada com crema rica e sabor profundo de torra escura. A base de tudo que servimos.' },
    { id: 2,  name: 'Cappuccino',            category: 'coffee',      categoryPt: 'Café',           price: 4.50, description: 'Blend perfeito de espresso, leite vaporizado e espuma aerada. Clássico e irresistível.' },
    { id: 3,  name: 'Latte',                category: 'coffee',      categoryPt: 'Café',           price: 4.75, description: 'Espresso suave com leite aveludado vaporizado e um toque leve de espuma.' },
    { id: 4,  name: 'Cold Brew',             category: 'cold drinks', categoryPt: 'Bebidas Geladas', price: 5.00, description: 'Café preparado a frio por 12 horas. Servido com gelo para um sabor incrivelmente suave.' },
    { id: 5,  name: 'Matcha Latte',          category: 'tea',         categoryPt: 'Chá',            price: 5.50, description: 'Matcha em pó japonês batido com leite vaporizado. Cremoso e cheio de antioxidantes.' },
    { id: 6,  name: 'Blueberry Muffin',      category: 'pastries',    categoryPt: 'Doces e Pães',   price: 3.50, description: 'Muffin fofo recheado de mirtilos suculentos e uma farofa crocante por cima.' },
    { id: 7,  name: 'Avocado Toast',         category: 'food',        categoryPt: 'Comidas',        price: 7.00, description: 'Pão de fermentação natural com abacate fresco, ervas, flocos de pimenta e limão.' },
    { id: 8,  name: 'Iced Americano',        category: 'cold drinks', categoryPt: 'Bebidas Geladas', price: 4.00, description: 'Espresso sobre água gelada e muito gelo. Refrescante e com o sabor puro do café.' },
    { id: 9,  name: 'Chai Latte',            category: 'tea',         categoryPt: 'Chá',            price: 5.25, description: 'Especiarias de chá preto misturadas com leite quente e um toque de mel.' },
    { id: 10, name: 'Cinnamon Roll',         category: 'pastries',    categoryPt: 'Doces e Pães',   price: 4.25, description: 'Pão enrolado com canela e cobertura de glacê de baunilha. Quentinho e perfumado.' },
    { id: 11, name: 'Mocha',                category: 'coffee',      categoryPt: 'Café',           price: 5.25, description: 'Espresso com leite vaporizado e chocolate amargo intenso. Para quem ama os dois.' },
    { id: 12, name: 'Vanilla Nitro',         category: 'cold drinks', categoryPt: 'Bebidas Geladas', price: 5.75, description: 'Cold brew com nitrogênio e aroma de baunilha. Textura aveludada e sabor único.' },
    { id: 13, name: 'Croissant',             category: 'pastries',    categoryPt: 'Doces e Pães',   price: 3.25, description: 'Camadas amanteigadas de massa folhada, assadas frescas todas as manhãs.' },
    { id: 14, name: 'Turkey Panini',         category: 'food',        categoryPt: 'Comidas',        price: 8.50, description: 'Sanduíche prensado com peru, queijo cheddar, tomate seco e maionese de ervas.' },
    { id: 15, name: 'Herbal Tea',            category: 'tea',         categoryPt: 'Chá',            price: 3.75, description: 'Blend calmante sem cafeína servido quente com uma rodela de limão fresco.' },
    { id: 16, name: 'Flat White',            category: 'coffee',      categoryPt: 'Café',           price: 4.80, description: 'Espresso concentrado com microespuma aveludada. Sensação suave e envolvente.' },
    { id: 17, name: 'Strawberry Iced Tea',   category: 'cold drinks', categoryPt: 'Bebidas Geladas', price: 4.95, description: 'Chá preto gelado infusionado com morango fresco. Perfeito para os dias quentes.' },
    { id: 18, name: 'Chocolate Chip Cookie', category: 'pastries',    categoryPt: 'Doces e Pães',   price: 2.95, description: 'Cookie dourado carregado de gotas de chocolate derretido. Clássico e irresistível.' },
    { id: 19, name: 'Breakfast Bowl',        category: 'food',        categoryPt: 'Comidas',        price: 8.95, description: 'Tigela nutritiva com aveia, frutas frescas, mix de castanhas e mel artesanal.' },
    { id: 20, name: 'Hazelnut Macchiato',    category: 'coffee',      categoryPt: 'Café',           price: 5.45, description: 'Espresso em camadas com leite aveludado e dulçor de avelã. Sofisticado e delicioso.' }
  ];

  var faqItems = [
    {
      title: 'Qual é o horário de funcionamento?',
      content: 'Atendemos de segunda a sexta das 7h às 20h, aos sábados das 8h às 21h e aos domingos das 8h às 20h. Em feriados, funcionamos das 9h às 18h. Acompanhe nossas redes sociais para atualizações.'
    },
    {
      title: 'Vocês têm opções veganas?',
      content: 'Sim! Servimos leite de aveia, amêndoa e coco sem custo adicional. Nosso cardápio conta com pães, doces e opções de comida 100% plant-based. Pergunte ao seu barista.'
    },
    {
      title: 'Posso reservar uma mesa?',
      content: 'Claro! Faça sua reserva por telefone, presencialmente ou pelo nosso atendimento online. Recomendamos a reserva para grupos de 4 ou mais pessoas e eventos especiais.'
    },
    {
      title: 'Tem Wi-Fi disponível?',
      content: 'Sim! Todos os clientes têm acesso a Wi-Fi de alta velocidade em toda a cafeteria. Solicite a senha no balcão ao fazer seu pedido.'
    },
    {
      title: 'O café é de origem sustentável?',
      content: 'Com orgulho! Todos os nossos grãos são rastreáveis, certificados pelo Comércio Justo e adquiridos de pequenos produtores. Torramos em pequenos lotes para garantir máxima frescura e sabor.'
    }
  ];

  var tabs = [
    {
      label: 'perfil',
      content: [
        '<div class="tab-panel">',
        '  <p><strong>Nome:</strong> Olivia Parker</p>',
        '  <p><strong>E-mail:</strong> olivia.parker@exemplo.com.br</p>',
        '  <p><strong>Membro desde:</strong> Março de 2023</p>',
        '  <p><strong>Pontos de fidelidade:</strong> 1.480 pts</p>',
        '</div>'
      ].join('')
    },
    {
      label: 'meus pedidos',
      content: [
        '<div class="tab-panel">',
        '  <ul class="compact-list">',
        '    <li><strong>18/05/2026</strong> — Cold Brew + Blueberry Muffin <span style="float:right;font-weight:700;color:#a06b1a">$8,50</span></li>',
        '    <li><strong>11/05/2026</strong> — Cappuccino + Croissant <span style="float:right;font-weight:700;color:#a06b1a">$7,75</span></li>',
        '    <li><strong>03/05/2026</strong> — Latte + Avocado Toast <span style="float:right;font-weight:700;color:#a06b1a">$11,75</span></li>',
        '  </ul>',
        '</div>'
      ].join('')
    },
    {
      label: 'preferências',
      content: [
        '<div class="tab-panel">',
        '  <p><strong>Bebida favorita:</strong> Cappuccino</p>',
        '  <p><strong>Leite preferido:</strong> Leite de aveia</p>',
        '  <label class="inline-toggle">',
        '    <input type="checkbox" data-notifications-toggle checked>',
        '    <span>Receber notificações de pedidos</span>',
        '  </label>',
        '  <p class="muted-line" data-notifications-status>Status: notificações ativadas</p>',
        '</div>'
      ].join('')
    },
    {
      label: 'recompensas',
      content: [
        '<div class="tab-panel">',
        '  <p><strong>Nível atual:</strong> Membro Gold</p>',
        '  <p>Membros Gold recebem upgrade de tamanho gratuito, retirada prioritária e brindes no aniversário.</p>',
        '  <p><strong>Próximo benefício</strong> liberado em 1.500 pontos — faltam apenas 20.</p>',
        '</div>'
      ].join('')
    }
  ];

  // Opções do dropdown: label em PT, value em inglês (deve bater com item.category)
  var dropdownOptions = [
    { label: 'todos',           value: 'all'         },
    { label: 'café',            value: 'coffee'      },
    { label: 'chá',             value: 'tea'         },
    { label: 'bebidas geladas', value: 'cold drinks' },
    { label: 'comidas',         value: 'food'        },
    { label: 'doces e pães',    value: 'pastries'    }
  ];

  return {
    getMenuItems:       function () { return menuItems.slice();       },
    getFaqItems:        function () { return faqItems.slice();        },
    getTabs:            function () { return tabs.slice();            },
    getDropdownOptions: function () { return dropdownOptions.slice(); }
  };
});
