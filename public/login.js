export const createLogin = () => {
    const myToken = "bec3e272-4900-416a-aa76-8a5a033160e9"; 
    const inputName = document.getElementById("username"); 
    const inputPassword = document.getElementById("password"); 
    const loginButton = document.getElementById("credentialLogin");
    const errorMessage = document.getElementById("errorMessage");
    let isLogged = false;
  
    if (sessionStorage.getItem("isLogged") === "true") {
      isLogged = true;
      location.href = "#adminTable";
      return { isLogged: () => isLogged };
  }
  
    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch("http://ws.cipiaceinfo.it/credential/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": myToken
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(r => {
                resolve(r.result);
            })
            .catch(reject);
        });
    };
  
    loginButton.onclick = () => {
        const username = inputName.value;
        const password = inputPassword.value;
        
        login(username, password).then((result) => {
            if (result) {
                console.log("Login tramite API riuscito:", result);
                isLogged = true;
                sessionStorage.setItem("isLogged", "true");
                location.href = "#adminTable";
  
            } else {
                errorMessage.classList.remove("d-none");
            }
        }).catch((err) => {
            console.error("Errore durante il login:", err);
            errorMessage.classList.remove("d-none");
        });
        
        inputName.value = "";
        inputPassword.value = "";
    };
  
    return {
        isLogged: () => isLogged
    };
  };