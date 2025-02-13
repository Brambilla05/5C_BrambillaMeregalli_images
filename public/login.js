
export const createLogin = () => {
    const inputName = document.getElementById("username"); 
    const inputPassword = document.getElementById("password"); 
    const loginButton = document.getElementById("credentialLogin");
    const errorMessage = document.getElementById("errorMessage");
    let isLogged = false;
    let conf;

    fetch("config.json")
    .then((r) => r.json())
    .then((data) => {
      conf = data;
    })

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch("http://ws.cipiaceinfo.it/credential/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": conf["myToken"] 
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
  //da sistemare
    if (sessionStorage.getItem("isLogged") === "true") {
        console.log()
        isLogged = true;
        location.href = "#table";
        return;
      }
        
    loginButton.onclick = () => {
        const username = inputName.value;
        const password = inputPassword.value;
        console.log(username + " " + password)
        login(username, password).then((result) => {
            inputName.value = "";
            inputPassword.value = "";
            console.log("result")
            if (result) {
                console.log("Login tramite API riuscito:", result);
                isLogged = true;
                sessionStorage.setItem("isLogged", "true");
                document.getElementById("login").classList.add("d-none");  
                document.getElementById("table").classList.remove("d-none");  
            } else {
                errorMessage.classList.remove("d-none");
                console.log("login non riuscito")
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