const firebaseConfig = {
     apiKey: "AIzaSyBy1I_mZQBdin1pKBsTBcX3lZj5uUa-SfU",
     authDomain: "firsttestproject-153f4.firebaseapp.com",
      databaseURL: "https://firsttestproject-153f4-default-rtdb.firebaseio.com",
     projectId: "firsttestproject-153f4",
     storageBucket: "firsttestproject-153f4.firebasestorage.app",
     messagingSenderId: "871925718464",
      appId: "1:871925718464:web:0530985e4fe9f0fa423c25"
    };
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();