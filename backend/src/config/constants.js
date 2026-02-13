// VOSH Church International Kitengela - Constants
// Extracted from church images and website

const CHURCH_INFO = {
  name: "VOSH CHURCH INT'L KITENGELA",
  fullName: "Voice of Salvation and Healing Church International, Kitengela",
  location: {
    city: "Kitengela",
    address: "Along Baraka Road / Treewa Road, Next to Balozi Junior Academy",
    coordinates: {
      lat: null,
      lng: null
    }
  },
  website: "www.voshchurchinternational.org",
  email: "info@voshkitengela.org",
  phoneNumbers: [
    "+254 722 566 399",
    "+254 720 276 162",
    "+254 720 977 189",
    "+254 775 036 515",
    "+254 703 182 203",
    "+254 733 566 398",
    "+254 722 620 160",
    "+254 111 687 277",
    "+254 722 625 084"
  ],
  socialMedia: {
    facebook: "Vosh Church Int'l - KITENGELA | Pst. Evans Kochoo",
    instagram: "Evans Kochoo",
    youtube: "Pst. Evans Kochoo"
  },
  hashtags: [
    "#House_of_Solutions",
    "#MANIFESTING_CHRIST",
    "#HouseofSolutions"
  ],
  slogan: {
    oneWay: "ONE WAY",
    oneJob: "ONE JOB"
  }
};

const BRAND_COLORS = {
  primary: {
    darkBlue: "#1a1a2e",
    navyBlue: "#16213e",
    purple: "#4C004C",
    darkPurple: "#2d1b3d"
  },
  accent: {
    yellow: "#FFD700",
    gold: "#FFA500",
    red: "#DC143C",
    magenta: "#993399"
  },
  secondary: {
    green: "#228B22",
    lightBlue: "#87CEEB",
    teal: "#008080"
  },
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    darkGrey: "#2C2C2C",
    lightGrey: "#E5E5E5"
  }
};

const CORE_VALUES = [
  "Prayer",
  "Stewardship",
  "Holiness",
  "Advocacy",
  "Unity"
];

const SERVICES = [
  {
    id: 1,
    name: "Watch Hour",
    time: "6:00 AM - 8:00 AM",
    day: "Daily",
    description: "Early morning prayer and watch service"
  },
  {
    id: 2,
    name: "Bible Study",
    time: "8:00 AM - 9:00 AM",
    day: "Sunday",
    description: "Welcome to the Bible Study"
  },
  {
    id: 3,
    name: "SB1 Service",
    time: "9:00 AM - 10:30 AM",
    day: "Sunday",
    description: "First Sunday service"
  },
  {
    id: 4,
    name: "Word Manifest",
    time: "10:30 AM - 1:00 PM",
    day: "Sunday",
    description: "Main Sunday worship service"
  },
  {
    id: 5,
    name: "Discipleship",
    time: "2:30 PM - 4:00 PM",
    day: "Sunday",
    description: "Discipleship training and teaching"
  },
  {
    id: 6,
    name: "Tefillah Night",
    time: "8:00 PM - Dawn",
    day: "Friday",
    description: "PURSUE - OVERTAKE - RECOVER (1SAM 30:2-8)",
    speaker: "Rev. Evans Kochoo"
  },
  {
    id: 7,
    name: "Online Connect Fellowship",
    time: "8:30 PM - 9:30 PM",
    day: "Thursday",
    description: "Online fellowship via Google Meet",
    host: "Rev. Evans Kochoo",
    platform: "Google Meet"
  }
];

const LEADERSHIP = {
  pastor: {
    name: "Rev. Evans Kochoo",
    title: "Pastor",
    email: "evans.kochoo@voshkitengela.org"
  }
};

const CAROUSEL_IMAGES = [
  {
    id: 1,
    title: "Core Values",
    image: "/churchcorevalues.jpeg",
    description: "Prayer, Stewardship, Holiness, Advocacy, Unity"
  },
  {
    id: 2,
    title: "Sunday Services",
    image: "/sundayservices.jpeg",
    description: "Join us for worship every Sunday"
  },
  {
    id: 3,
    title: "Bible Study",
    image: "/biblestudysundaymorning.jpeg",
    description: "Every Sunday 8:00 AM - 9:00 AM"
  },
  {
    id: 4,
    title: "Tefillah Night",
    image: "/midweekservicefriday.jpeg",
    description: "Every Friday 8:00 PM to Dawn"
  },
  {
    id: 5,
    title: "Online Connect Fellowship",
    image: "/onlineconnectthurday.jpeg",
    description: "Every Thursday 8:30 PM - 9:30 PM"
  }
];

module.exports = {
  CHURCH_INFO,
  BRAND_COLORS,
  CORE_VALUES,
  SERVICES,
  LEADERSHIP,
  CAROUSEL_IMAGES
};
