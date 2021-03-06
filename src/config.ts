import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBKSCIPkbpactA4UuwMEGMBNSCCh0sba3U',
    authDomain: 'poker-ecd2f.firebaseapp.com',
    projectId: 'poker-ecd2f',
    storageBucket: 'poker-ecd2f.appspot.com',
    messagingSenderId: '926897864089',
    appId: '1:926897864089:web:5692ca16b74e2e2f56e708',
};

export default function initFirebase() {
    if (!getApps().length) {
        // eslint-disable-next-line no-console
        console.log('Firebase initialized');
        initializeApp(firebaseConfig);
    }
}
