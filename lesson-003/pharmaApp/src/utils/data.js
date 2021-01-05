const medicines = [
  {
    name: 'Prevenar Injection',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/03389_1800x1800.jpg?v=1596439066',
    type: 'injection',
    price: '5,476.30',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Caldin-C Tablets',
    url:
      'http://esraapharma.com/wp-content/uploads/2018/10/02-Caldin-C-Tablets-1.png',
    price: '21',
    type: 'tablet',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Calcium plus Vitamin D3 - 500 mg (300 Tablets)',
    url:
      'https://encrypted-tbn0.gstatic.com/urls?q=tbn%3AANd9GcRTwXrRSSf5EREiKDTdYYF3ohc3Bp-DRzgbdi61cQOmhg32QMzG',
    price: '47',
    type: 'tablet',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Panadol 500mg Tablets 200',
    url:
      'https://i-cf3.gskstatic.com/content/dam/cf-consumer-healthcare/panadol/en_ie/ireland-products/panadol-tablets/MGK5158-GSK-Panadol-Tablets-455x455.png',
    price: '47',
    type: 'tablet',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Pulmonol Cough Syrup 120ml',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/06468_1800x1800.jpg?v=1596439345',
    type: 'syrup',
    price: '79.60',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Disprin (Soluble Aspirin) 300MG 100 Tablets',
    url:
      'https://products.dawaai.pk/2017/11/18221/item/recdis18221_101597130827.jpg',
    price: '15.08',
    type: 'tablet',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Pulmonol Cough Syrup 120ml',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/06468_1800x1800.jpg?v=1596439345',
    type: 'syrup',
    price: '79.60',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Prevenar Injection',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/03389_1800x1800.jpg?v=1596439066',
    type: 'injection',
    price: '5,476.30',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Aprovel Tablets 150mg 2X14',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/06639_2_1800x1800.jpg?v=1596438752',
    price: '611',
    type: 'tablet',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Disprin (Soluble Aspirin) 300MG 100 Tablets',
    url:
      'https://products.dawaai.pk/2017/11/18221/item/recdis18221_101597130827.jpg',
    price: '15.08',
    type: 'tablet',
    strength: '3mg/0.3mg',
    composition: 'Paracetamol / Acetaminophen',
  },
];

const products = [
  {
    id: 1,
    name: '2BACONIL - 14MG NICOTINE PATCH FOR QUIT ...',
    company: 'Rusan Healthcare',
    d_price: '565.25',
    price: '665.00',
    url: require('../img/product_1.jpg'),
  },
  {
    id: 2,
    name: 'AQUALENS COMFORT CONTACT LENS SOLUTION 360 ML',
    company: 'Aqualens',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_2.png'),
  },
  {
    id: 3,
    name: 'DETTOL ANTISEPTIC LIQUID 550 ML',
    company: 'DETTOL',
    d_price: '144.75',
    price: '160.83',
    url: require('../img/product_3.jpg'),
  },
  {
    id: 4,
    name: 'EAZOL HEALTH TONIC 300 ML',
    company: 'Eazol',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_4.png'),
  },
  {
    id: 5,
    name: 'EAZOL SAT - ISABGOL 200GM',
    company: 'Aqualens',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_5.png'),
  },
  {
    id: 6,
    name: 'NICOTEX MINT PLUS 2MG 9 GUMS',
    company: 'Nicotex',
    d_price: '69.30',
    price: '77.00',
    url: require('../img/product_6.png'),
  },
  {
    id: 7,
    name: '2BACONIL - 14MG NICOTINE PATCH FOR QUIT ...',
    company: 'Rusan Healthcare',
    d_price: '565.25',
    price: '665.00',
    url: require('../img/product_1.jpg'),
  },
  {
    id: 8,
    name: 'AQUALENS COMFORT CONTACT LENS SOLUTION 360 ML',
    company: 'Aqualens',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_2.png'),
  },
  {
    id: 9,
    name: 'DETTOL ANTISEPTIC LIQUID 550 ML',
    company: 'DETTOL',
    d_price: '144.75',
    price: '160.83',
    url: require('../img/product_3.jpg'),
  },
  {
    id: 10,
    name: 'EAZOL HEALTH TONIC 300 ML',
    company: 'Eazol',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_4.png'),
  },
  {
    id: 11,
    name: 'EAZOL SAT - ISABGOL 200GM',
    company: 'Aqualens',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_5.png'),
  },
  {
    id: 12,
    name: 'NICOTEX MINT PLUS 2MG 9 GUMS',
    company: 'Nicotex',
    d_price: '69.30',
    price: '77.00',
    url: require('../img/product_6.png'),
  },
  {
    id: 13,
    name: '2BACONIL - 14MG NICOTINE PATCH FOR QUIT ...',
    company: 'Rusan Healthcare',
    d_price: '565.25',
    price: '665.00',
    url: require('../img/product_1.jpg'),
  },
  {
    id: 14,
    name: 'AQUALENS COMFORT CONTACT LENS SOLUTION 360 ML',
    company: 'Aqualens',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_2.png'),
  },
  {
    id: 15,
    name: 'DETTOL ANTISEPTIC LIQUID 550 ML',
    company: 'DETTOL',
    d_price: '144.75',
    price: '160.83',
    url: require('../img/product_3.jpg'),
  },
  {
    id: 16,
    name: 'EAZOL HEALTH TONIC 300 ML',
    company: 'Eazol',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_4.png'),
  },
  {
    id: 17,
    name: 'EAZOL SAT - ISABGOL 200GM',
    company: 'Aqualens',
    d_price: '396.00',
    price: '440.00',
    url: require('../img/product_5.png'),
  },
  {
    id: 18,
    name: 'NICOTEX MINT PLUS 2MG 9 GUMS',
    company: 'Nicotex',
    d_price: '69.30',
    price: '77.00',
    url: require('../img/product_6.png'),
  },
];

const carousel = [
  {src: require('../img/carousel-1.jpg')},
  {src: require('../img/carousel-2.jpg')},
  {src: require('../img/carousel-3.jpg')},
  {src: require('../img/carousel-4.jpg')},
];

const TEL_NUMBER = '1234567890';

export {medicines, products, carousel, TEL_NUMBER};
