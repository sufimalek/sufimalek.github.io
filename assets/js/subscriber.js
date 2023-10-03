
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js'

// Add Firebase products that you want to use
import { getFirestore, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyBl6itIeOKOeRoYEY5yGSNKaXuCLom_8kw",
    authDomain: "sufiyanmalekblog.firebaseapp.com",
    projectId: "sufiyanmalekblog",
    storageBucket: "sufiyanmalekblog.appspot.com",
    messagingSenderId: "333003499979",
    appId: "1:333003499979:web:26a5013161fea6c4592e4e",
    measurementId: "G-BEG1NSZ4GR"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
// Get a reference to Firestore
const db = getFirestore(firebaseApp);

// Get a reference to the HTML form
const myForm = document.getElementById('myform');

/// Handle form submission
myForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
    var status = document.getElementById("my-form-status");
    status.style.display = 'block';
    // Get form data
    // const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Create a new document data object
    const data = {
        email: email
    };

    try {
        // Reference to the Firestore collection where you want to add the document
        const myCollection = collection(db, 'subscribers'); // Replace 'myCollection' with your actual collection name

        // Add a new document to the collection
        const docRef = await addDoc(myCollection, data);
        console.log('Document written with ID: ', docRef.id);
        status.innerHTML = "Thanks for your submission!";
        setTimeout(() => {
            status.style.display = 'none';
        }, 1000);

        // Clear the form
        myForm.reset();
    } catch (error) {
        console.error('Error adding document: ', error);
        status.innerHTML = "Oops! There was a problem submitting your form: "+ error;
    }
});

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'subscribers');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
    return cityList;
}