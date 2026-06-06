import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQ7ujTlsTGb-xF5iB0JldnEcLtbFu-oeU",
  authDomain: "nicesrowkeijiban.firebaseapp.com",
  databaseURL: "https://nicesrowkeijiban-default-rtdb.firebaseio.com",
  projectId: "nicesrowkeijiban",
  storageBucket: "nicesrowkeijiban.firebasestorage.app",
  messagingSenderId: "440759667763",
  appId: "1:440759667763:web:b2ae4b6ca67af4c4e82746"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase接続成功！");

const postButton = document.getElementById("postButton");

postButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (!name || !message) {
    alert("名前とメッセージを入力してください");
    return;
  }

  push(ref(db, "posts"), {
    name: name,
    message: message,
    time: new Date().toLocaleString()
  });

  document.getElementById("message").value = "";
});

onValue(ref(db, "posts"), (snapshot) => {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  const data = snapshot.val();

  if (!data) return;

  Object.values(data).reverse().forEach(post => {
    postsDiv.innerHTML += `
      <div class="post">
        <strong>${post.name}</strong>
        <small>${post.time}</small>
        <p>${post.message}</p>
        <hr>
      </div>
    `;
  });
});