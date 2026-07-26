
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusDiv = document.getElementById("status");

function showStatus(message, isError = false) {
  statusDiv.textContent = message;
  statusDiv.className = isError ? "error" : "ok";
}

document.getElementById("btnSignUp").addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showStatus(`Account created! uid: ${user.uid}`);
    })
    .catch((error) => {
      showStatus(translateError(error.code), true);
    });
});

document.getElementById("btnLogIn").addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showStatus(`Logged in as: ${user.email}`);
    })
    .catch((error) => {
      showStatus(translateError(error.code), true);
    });
});

document.getElementById("btnLogOut").addEventListener("click", () => {
  auth.signOut().then(() => {
    showStatus("Logged out.");
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Auth state changed: logged in as", user.email);
  } else {
    console.log("Auth state changed: no user logged in");
  }
});

function translateError(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "That email is already registered.";
    case "auth/weak-password":
      return "Password is too weak (minimum 6 characters).";
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/user-not-found":
      return "No account exists with that email.";
    default:
      return `Error: ${errorCode}`;
  }
}