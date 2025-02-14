// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW4cTAsG2QiXXGvS2FyOwZYbR_BqCQDXM",
    authDomain: "contactform-37fe3.firebaseapp.com",
    databaseURL: "https://contactform-37fe3-default-rtdb.firebaseio.com",
    projectId: "contactform-37fe3",
    storageBucket: "contactform-37fe3.appspot.com",
    messagingSenderId: "831163231244",
    appId: "1:831163231244:web:63e09ac7aadb77b78a9229",
    measurementId: "G-4R4K8TGVQ1"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // DOM Elements
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  
  // Send Message
  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
      console.log("Sending message:", message); // Debugging
      database.ref("messages").push({
        text: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        console.log("Message sent successfully!"); // Debugging
      })
      .catch((error) => {
        console.error("Error sending message:", error); // Debugging
      });
      messageInput.value = "";
    }
  });
  
  // Listen for New Messages
  database.ref("messages").on("child_added", (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
  });
  
  // Test Firebase connection
  database.ref("test").set({
    message: "Firebase is working!"
  })
  .then(() => {
    console.log("Test message sent to Firebase!");
  })
  .catch((error) => {
    console.error("Error sending test message:", error);
  });