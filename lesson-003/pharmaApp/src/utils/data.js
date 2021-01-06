const medicines = [
  {
    name: 'Prevenar Injection',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/03389_1800x1800.jpg?v=1596439066',
    type: 'injection',
    price: '5476.30',
    strength: '3mg/0.3mg',
    rx_req: true,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Caldin-C Tablets',
    url:
      'http://esraapharma.com/wp-content/uploads/2018/10/02-Caldin-C-Tablets-1.png',
    price: '21',
    type: 'tablet',
    strength: '3mg/0.3mg',
    rx_req: false,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Calcium plus Vitamin D3 - 500 mg (300 Tablets)',
    url:
      'https://encrypted-tbn0.gstatic.com/urls?q=tbn%3AANd9GcRTwXrRSSf5EREiKDTdYYF3ohc3Bp-DRzgbdi61cQOmhg32QMzG',
    price: '47',
    type: 'tablet',
    strength: '3mg/0.3mg',
    rx_req: false,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Panadol 500mg Tablets 200',
    url:
      'https://i-cf3.gskstatic.com/content/dam/cf-consumer-healthcare/panadol/en_ie/ireland-products/panadol-tablets/MGK5158-GSK-Panadol-Tablets-455x455.png',
    price: '47',
    type: 'tablet',
    strength: '3mg/0.3mg',
    rx_req: true,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Pulmonol Cough Syrup 120ml',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/06468_1800x1800.jpg?v=1596439345',
    type: 'syrup',
    price: '79.60',
    strength: '3mg/0.3mg',
    rx_req: false,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Disprin (Soluble Aspirin) 300MG 100 Tablets',
    url:
      'https://products.dawaai.pk/2017/11/18221/item/recdis18221_101597130827.jpg',
    price: '15.08',
    type: 'tablet',
    strength: '3mg/0.3mg',
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
    rx_req: true,
  },
  {
    name: 'Pulmonol Cough Syrup 120ml',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/06468_1800x1800.jpg?v=1596439345',
    type: 'syrup',
    price: '79.60',
    strength: '3mg/0.3mg',
    rx_req: true,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Prevenar Injection',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/03389_1800x1800.jpg?v=1596439066',
    type: 'injection',
    price: '5476.30',
    strength: '3mg/0.3mg',
    rx_req: false,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Aprovel Tablets 150mg 2X14',
    url:
      'https://cdn.shopify.com/s/files/1/0088/4758/9476/products/06639_2_1800x1800.jpg?v=1596438752',
    price: '611',
    type: 'tablet',
    strength: '3mg/0.3mg',
    rx_req: true,
    unit: '1 tablet / stripe',
    composition: 'Paracetamol / Acetaminophen',
  },
  {
    name: 'Disprin (Soluble Aspirin) 300MG 100 Tablets',
    url:
      'https://products.dawaai.pk/2017/11/18221/item/recdis18221_101597130827.jpg',
    price: '15.08',
    type: 'tablet',
    strength: '3mg/0.3mg',
    rx_req: false,
    unit: '1 tablet / stripe',
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

const medicineOverview = {
  intro:
    'Ecosprin 75 Tablet is an antiplatelet medicine containing acetylsalicylic acid (also called Aspirin). It prevents blood clot formation within the body. It is used to prevent the risk of heart attacks, stroke and chest pain (heart-related). It is also used to reduce the chances of formation of clot after heart surgery, in patients with a risk of vascular thrombosis (blood clot obstructing blood flow in a vein).',
  usage: [
    'For the prevention of heart attack, stroke, heart conditions such as stable or unstable angina (chest pain) due to a blood clot.',
    'Treatment of acute heart attack and blood clot formation after heart surgery.',
    'As a preventive measure in patients with a history of stroke due to blood clots or risk of vascular thrombosis (blood clot obstructing blood flow in a vein).',
  ],
  composition: 'Paracetamol / Acetaminophen',
  indication: 'May be taken with or without food',
  dosage: {
    Overdose:
      'Symptoms of an overdose of Ecosprin 75 Tablets include ringing in the ears, dizziness, headache, nausea, vomiting and stomach ache, sweating, fever, increased pulse or breathing rate, fits, low blood sugar. If you think you have taken too much of Ecosprin 75 mg Tablet, then contact your doctor immediately or visit the nearest hospital.',
    'Missed a Dose':
      'If you missed any dose of Ecosprin 75 mg Tablet, then take it as soon as you remember. If it`s time for your next dose, then skip the missed dose and continue with your regular dosing schedule. Try not to skip/miss any dose of this medicine as it can lead to serious complications.',
  },
  precaution: {
    Pregnancy:
      'Pregnant women should not take Ecosprin 75 mg Tablet unless advised by the doctor as it is unsafe during pregnancy. This medicine can cause heart or kidney-related problems in the baby. It can also prolong labour and cause uterine bleeding.',
    'Breast Feeding':
      'Aspirin from Ecosprin 75 mg Tablet passes into breastmilk. Thus, do not take this medicine if you are breastfeeding unless advised by your doctor.',
    Driving:
      'Ecosprin 75 mg Tablet does not affect the ability to drive or operate heavy machines.',
    Alcohol:
      'You should avoid consuming alcohol while on treatment with Ecosprin 75 mg Tablet as it may worsen the side effects of this medicine',
  },
  storageConditions: [
    'Do not store Ecosprin 75 mg Tablets above 25°C. Keep it out of the reach of children and pets.',
  ],
  sideEffects: [
    'Bleeding',
    'Indigestion',
    'Hives',
    'Breathing difficulty',
    'Runny nose',
    'Itching',
  ],
  contraindications: [
    'If you are allergic to aspirin or any of the ingredients of Ecosprin 75 Tablet.',
    'If you have an active bleeding or clotting disorder such as haemophilia and thrombocytopenia.',
    'If you have a history of ulcer or bleeding in the stomach or small intestine.',
    'If you have gout, liver or kidney disorder or bleeding in the brain.',
    'If you are pregnant (last three months) or breastfeeding.',
    'If you are taking medicines for cancer or rheumatoid arthritis such as methotrexate.',
  ],
  safetyAdvices: [
    'You have a planned surgery or had surgery recently, as there is a risk of bleeding.',
    'You are suffering from asthma. This medicine can worsen your asthma symptoms.',
    'You have ulcers in your stomach or intestine or taking medicines, which can cause stomach ulcers',
    'You have any unusual bleeding from any part of your body, recently had trauma or stroke.',
  ],
  quickTips: [
    'You have a planned surgery or had surgery recently, as there is a risk of bleeding.',
    'You are suffering from asthma. This medicine can worsen your asthma symptoms.',
    'You have ulcers in your stomach or intestine or taking medicines, which can cause stomach ulcers',
    'You have any unusual bleeding from any part of your body, recently had trauma or stroke.',
  ],
};

const disclaimer =
  'The information provided herein is accurate, updated and complete as per the best practices of the Company. Please note that this information should not be treated as a replacement for physical medical consultation or advice. We do not guarantee the accuracy and the completeness of the information so provided. The absence of any information and/or warning to any drug shall not be considered and assumed as an implied assurance of the Company. We do not take any responsibility for the consequences arising out of the aforementioned information and strongly recommend you for a physical consultation in case of any queries or doubts. Please click here for detailed T&C.';

const carousel = [
  {src: require('../img/carousel-1.jpg')},
  {src: require('../img/carousel-2.jpg')},
  {src: require('../img/carousel-3.jpg')},
  {src: require('../img/carousel-4.jpg')},
];

const TEL_NUMBER = '1234567890';

export {
  medicines,
  products,
  carousel,
  TEL_NUMBER,
  disclaimer,
  medicineOverview,
};
