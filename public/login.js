const createLogin = () => {
    const myToken = "bec3e272-4900-416a-aa76-8a5a033160e9"; // token ottenuto via mail 
    const inputName = document.querySelector("#name");
    const inputPassword = document.querySelector("#password");
    const loginButton = document.querySelector("#login");
    const divPrivate = document.querySelector("#private");
    const divLogin = document.querySelector("#login");
  
    divPrivate.classList.remove(".visible");
    divPrivate.classList.add(".hidden");
    isLogged = sessionStorage.getItem("Logged") || false;
  
    const login = (name, password) => {
        return new Promise((resolve, reject) => {
            fetch("http://ws.cipiaceinfo.it/credential/login", { 
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": myToken
                },
                body: JSON.stringify({
                    username: name,  
                    password: password
                })
            })
            .then(r => r.json())
            .then(r => {
                resolve(r.result); 
            })
            .catch(reject);
        });
    }
    
  
    loginButton.onclick = () => {
      login(input.name, input.password).then((result) => {
        if (login) {
          isLogged = true;
          sessionStorage.setItem("Logged", true);
        }
      });
    }
  
    return {
      isLogged: () => isLogged
    }
  
  }