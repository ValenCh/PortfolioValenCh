// src/firebase.js
// Firebase Auth solo se descarga y ejecuta cuando la sección de Contacto
// está por entrar en viewport (ver Contact.jsx). No forma parte del
// bundle inicial ni bloquea el primer render.

let authPromise = null;

export function loadFirebaseAuth() {
  if (!authPromise) {
    authPromise = Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
    ]).then(([{ initializeApp }, authModule]) => {
      const { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } = authModule;

      const firebaseConfig = {
        apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId:             import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      return { auth, provider, onAuthStateChanged, signInWithPopup, signOut };
    });
  }
  return authPromise;
}