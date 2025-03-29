
export type Language = 'en' | 'hi' | 'pa';

export interface Translation {
  welcomeMessage: string;
  dashboard: string;
  profile: string;
  personalInfo: string;
  crops: string;
  previousOrders: string;
  incomingOrders: string;
  weather: string;
  rental: string;
  settings: string;
  logout: string;
  contactInfo: string;
  myFarm: string;
  todayTip: string;
  waterCrops: string;
  marketInsight: string;
  cropDemand: string;
  completedTasks: string;
  weatherUpdates: string;
  currentWeather: string;
  forecast: string;
  humidity: string;
  wind: string;
  availableFrom: string;
  availableCrops: string;
  availableEquipment: string;
  plow: string;
  tractor: string;
  harvester: string;
  startDate: string;
  endDate: string;
  purpose: string;
  orderID: string;
  orderDate: string;
  buyer: string;
  amount: string;
  ordersAwaitingAction: string;
  successfullyDelivered: string;
  completedOrders: string;
  loadingWeatherData: string;
  viewOrders: string;
  viewHistory: string;
  viewWeather: string;
  profileOverview: string;
  editProfile: string;
  specializations: string;
  currentAvailableCrops: string;
  addCrop: string;
  available: string;
  lowStock: string;
  edit: string;
  // Added missing translations
  cropName: string;
  quantity: string;
  price: string;
  status: string;
  rentEquipment: string;
  equipmentType: string;
  selectEquipment: string;
  sprayer: string;
  other: string;
  submit: string;
}

export const getTranslations = (language: Language): Translation => {
  const translations: Record<Language, Translation> = {
    en: {
      welcomeMessage: 'Welcome to your Farm Dashboard!',
      dashboard: 'Farmer Dashboard',
      profile: 'Profile',
      personalInfo: 'Manage your personal information and account settings',
      crops: 'My Crops',
      previousOrders: 'Previous Orders',
      incomingOrders: 'Incoming Orders',
      weather: 'Weather',
      rental: 'Equipment Rental',
      settings: 'Settings',
      logout: 'Logout',
      contactInfo: 'Contact',
      myFarm: 'My Farm',
      todayTip: 'Today\'s Tip',
      waterCrops: 'Water your crops early morning to reduce evaporation loss',
      marketInsight: 'Market Insight',
      cropDemand: 'Tomatoes and Onions are in high demand this week',
      completedTasks: 'Tasks Completed',
      weatherUpdates: 'Weather Updates',
      currentWeather: 'Current Weather',
      forecast: 'Weather Forecast',
      humidity: 'Humidity',
      wind: 'Wind',
      availableFrom: 'Available From',
      availableCrops: 'Available Crops',
      availableEquipment: 'Available Equipment',
      plow: 'Plow',
      tractor: 'Tractor',
      harvester: 'Harvester',
      startDate: 'Start Date',
      endDate: 'End Date',
      purpose: 'Purpose',
      orderID: 'Order ID',
      orderDate: 'Order Date',
      buyer: 'Buyer',
      amount: 'Amount',
      ordersAwaitingAction: 'Orders awaiting your action',
      successfullyDelivered: 'Successfully delivered',
      completedOrders: 'Completed Orders',
      loadingWeatherData: 'Loading weather data...',
      viewOrders: 'View Orders',
      viewHistory: 'View History',
      viewWeather: 'View Weather',
      profileOverview: 'Profile Overview',
      editProfile: 'Edit Profile',
      specializations: 'Specializations',
      currentAvailableCrops: 'Current Available Crops',
      addCrop: 'Add Crop',
      available: 'Available',
      lowStock: 'Low Stock',
      edit: 'Edit',
      // Added missing translations
      cropName: 'Crop Name',
      quantity: 'Quantity',
      price: 'Price',
      status: 'Status',
      rentEquipment: 'Rent Equipment',
      equipmentType: 'Equipment Type',
      selectEquipment: 'Select Equipment',
      sprayer: 'Sprayer',
      other: 'Other',
      submit: 'Submit'
    },
    hi: {
      welcomeMessage: 'अपने फार्म डैशबोर्ड पर आपका स्वागत है!',
      dashboard: 'किसान डैशबोर्ड',
      profile: 'प्रोफाइल',
      personalInfo: 'अपनी व्यक्तिगत जानकारी और खाता सेटिंग्स प्रबंधित करें',
      crops: 'मेरी फसलें',
      previousOrders: 'पिछले ऑर्डर',
      incomingOrders: 'आने वाले ऑर्डर',
      weather: 'मौसम',
      rental: 'उपकरण किराया',
      settings: 'सेटिंग्स',
      logout: 'लॉग आउट',
      contactInfo: 'संपर्क',
      myFarm: 'मेरा खेत',
      todayTip: 'आज का टिप',
      waterCrops: 'वाष्पीकरण हानि को कम करने के लिए अपनी फसलों को सुबह जल्दी पानी दें',
      marketInsight: 'बाजार अंतर्दृष्टि',
      cropDemand: 'इस सप्ताह टमाटर और प्याज की मांग अधिक है',
      completedTasks: 'पूर्ण कार्य',
      weatherUpdates: 'मौसम अपडेट',
      currentWeather: 'वर्तमान मौसम',
      forecast: 'मौसम पूर्वानुमान',
      humidity: 'आर्द्रता',
      wind: 'हवा',
      availableFrom: 'से उपलब्ध',
      availableCrops: 'उपलब्ध फसलें',
      availableEquipment: 'उपलब्ध उपकरण',
      plow: 'हल',
      tractor: 'ट्रैक्टर',
      harvester: 'हार्वेस्टर',
      startDate: 'प्रारंभ तिथि',
      endDate: 'अंतिम तिथि',
      purpose: 'उद्देश्य',
      orderID: 'ऑर्डर आईडी',
      orderDate: 'ऑर्डर की तारीख',
      buyer: 'खरीदार',
      amount: 'राशि',
      ordersAwaitingAction: 'आपकी कार्रवाई की प्रतीक्षा में ऑर्डर',
      successfullyDelivered: 'सफलतापूर्वक वितरित',
      completedOrders: 'पूर्ण ऑर्डर',
      loadingWeatherData: 'मौसम डेटा लोड हो रहा है...',
      viewOrders: 'ऑर्डर देखें',
      viewHistory: 'इतिहास देखें',
      viewWeather: 'मौसम देखें',
      profileOverview: 'प्रोफाइल अवलोकन',
      editProfile: 'प्रोफाइल संपादित करें',
      specializations: 'विशेषज्ञता',
      currentAvailableCrops: 'वर्तमान उपलब्ध फसलें',
      addCrop: 'फसल जोड़ें',
      available: 'उपलब्ध',
      lowStock: 'कम स्टॉक',
      edit: 'संपादित करें',
      // Added missing translations
      cropName: 'फसल का नाम',
      quantity: 'मात्रा',
      price: 'कीमत',
      status: 'स्थिति',
      rentEquipment: 'उपकरण किराए पर लें',
      equipmentType: 'उपकरण का प्रकार',
      selectEquipment: 'उपकरण चुनें',
      sprayer: 'स्प्रेयर',
      other: 'अन्य',
      submit: 'जमा करें'
    },
    pa: {
      welcomeMessage: 'ਤੁਹਾਡੇ ਫਾਰਮ ਡੈਸ਼ਬੋਰਡ ਤੇ ਜੀ ਆਇਆਂ ਨੂੰ!',
      dashboard: 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ',
      profile: 'ਪ੍ਰੋਫਾਈਲ',
      personalInfo: 'ਆਪਣੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਅਤੇ ਖਾਤਾ ਸੈਟਿੰਗਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
      crops: 'ਮੇਰੀਆਂ ਫਸਲਾਂ',
      previousOrders: 'ਪਿਛਲੇ ਆਰਡਰ',
      incomingOrders: 'ਆਉਣ ਵਾਲੇ ਆਰਡਰ',
      weather: 'ਮੌਸਮ',
      rental: 'ਉਪਕਰਣ ਕਿਰਾਇਆ',
      settings: 'ਸੈਟਿੰਗਾਂ',
      logout: 'ਲੌਗ ਆਉਟ',
      contactInfo: 'ਸੰਪਰਕ',
      myFarm: 'ਮੇਰਾ ਖੇਤ',
      todayTip: 'ਅੱਜ ਦਾ ਸੁਝਾਅ',
      waterCrops: 'ਵਾਸ਼ਪੀਕਰਨ ਨੂੰ ਘਟਾਉਣ ਲਈ ਸਵੇਰੇ ਜਲਦੀ ਆਪਣੀਆਂ ਫਸਲਾਂ ਨੂੰ ਪਾਣੀ ਦਿਓ',
      marketInsight: 'ਮਾਰਕੀਟ ਇਨਸਾਈਟ',
      cropDemand: 'ਇਸ ਹਫ਼ਤੇ ਟਮਾਟਰ ਅਤੇ ਪਿਆਜ਼ ਦੀ ਮੰਗ ਜ਼ਿਆਦਾ ਹੈ',
      completedTasks: 'ਪੂਰੇ ਕੀਤੇ ਕੰਮ',
      weatherUpdates: 'ਮੌਸਮ ਅਪਡੇਟ',
      currentWeather: 'ਮੌਜੂਦਾ ਮੌਸਮ',
      forecast: 'ਮੌਸਮ ਦਾ ਪੂਰਵ ਅਨੁਮਾਨ',
      humidity: 'ਨਮੀ',
      wind: 'ਹਵਾ',
      availableFrom: 'ਤੋਂ ਉਪਲਬਧ',
      availableCrops: 'ਉਪਲਬਧ ਫਸਲਾਂ',
      availableEquipment: 'ਉਪਲਬਧ ਉਪਕਰਣ',
      plow: 'ਹਲ',
      tractor: 'ਟਰੈਕਟਰ',
      harvester: 'ਹਾਰਵੈਸਟਰ',
      startDate: 'ਸ਼ੁਰੂ ਤਾਰੀਖ',
      endDate: 'ਅੰਤ ਤਾਰੀਖ',
      purpose: 'ਉਦੇਸ਼',
      orderID: 'ਆਰਡਰ ਆਈਡੀ',
      orderDate: 'ਆਰਡਰ ਤਾਰੀਖ',
      buyer: 'ਖਰੀਦਦਾਰ',
      amount: 'ਰਕਮ',
      ordersAwaitingAction: 'ਤੁਹਾਡੀ ਕਾਰਵਾਈ ਦੀ ਉਡੀਕ ਵਿੱਚ ਆਰਡਰ',
      successfullyDelivered: 'ਸਫਲਤਾਪੂਰਵਕ ਪਹੁੰਚਾਏ ਗਏ',
      completedOrders: 'ਪੂਰੇ ਕੀਤੇ ਆਰਡਰ',
      loadingWeatherData: 'ਮੌਸਮ ਡਾਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      viewOrders: 'ਆਰਡਰ ਵੇਖੋ',
      viewHistory: 'ਇਤਿਹਾਸ ਵੇਖੋ',
      viewWeather: 'ਮੌਸਮ ਵੇਖੋ',
      profileOverview: 'ਪ੍ਰੋਫਾਈਲ ਸੰਖੇਪ',
      editProfile: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
      specializations: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
      currentAvailableCrops: 'ਮੌਜੂਦਾ ਉਪਲਬਧ ਫਸਲਾਂ',
      addCrop: 'ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ',
      available: 'ਉਪਲਬਧ',
      lowStock: 'ਘੱਟ ਸਟਾਕ',
      edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
      // Added missing translations
      cropName: 'ਫਸਲ ਦਾ ਨਾਮ',
      quantity: 'ਮਾਤਰਾ',
      price: 'ਕੀਮਤ',
      status: 'ਸਥਿਤੀ',
      rentEquipment: 'ਉਪਕਰਣ ਕਿਰਾਏ ਤੇ ਲਓ',
      equipmentType: 'ਉਪਕਰਣ ਦੀ ਕਿਸਮ',
      selectEquipment: 'ਉਪਕਰਣ ਚੁਣੋ',
      sprayer: 'ਸਪਰੇਅਰ',
      other: 'ਹੋਰ',
      submit: 'ਜਮ੍ਹਾਂ ਕਰੋ'
    }
  };

  return translations[language];
};
