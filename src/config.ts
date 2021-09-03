// import admin from "firebase-admin";
import firebase, { initializeApp } from 'firebase/app';
// import serviceAccount from "./firebase.json";

// export function initServer() {
//     if (!admin.apps.length) {
//         admin.initializeApp({
//             credential: admin.credential.cert({
//                 clientEmail: serviceAccount.client_email,
//                 privateKey: serviceAccount.private_key,
//                 projectId: serviceAccount.project_id
//             })
//         });
//     }
// }

export default function initClient() {
    if (firebase && !firebase.getApps().length) {
        const firebaseConfig = {
            apiKey: 'AIzaSyBKSCIPkbpactA4UuwMEGMBNSCCh0sba3U',
            authDomain: 'poker-ecd2f.firebaseapp.com',
            projectId: 'poker-ecd2f',
            storageBucket: 'poker-ecd2f.appspot.com',
            messagingSenderId: '926897864089',
            appId: '1:926897864089:web:5692ca16b74e2e2f56e708',
        };

        initializeApp(firebaseConfig);
    }
}
