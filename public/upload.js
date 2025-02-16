export const uploadFile = (parentElement, pubsub) => {
    let images = [];

    return {
        build: async function () {
            await this.loadFiles();
            pubsub.subscribe("imagesAdd", (data) => {
                images = data;
                this.render();
            });
        },

        loadFiles: async function () {
            try {
                const response = await fetch("/get");
                const data = await response.json();
                images = data;
                this.render();
               pubsub.publish("reload",images);
               pubsub.subscribe("reload", (data)=>{
                images=data;
                this.render();
            })
            } catch (error) {
                console.error("Errore durante il caricamento dei file:", error);
            }
        },

        render: function () {
            console.log(images);
            let html = `<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">`;
            
            images.forEach((element, i) => {
                html += `
                    <div class="carousel-item ${i === 0 ? "active" : ""}">
                        <img src="${element.url}" class="d-block w-100" alt="Immagine ${i + 1}">
                    </div>`;
            });
            
            html += `  </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>`;
            
            parentElement.innerHTML = html;
        },

        handleSubmit: async function (inputElement) {
            console.log("buoni");
            const file = inputElement.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                await fetch("/add", {
                    method: "POST",
                    body: formData,
                });
                await this.loadFiles();
            } catch (error) {
                console.error("Errore durante il caricamento del file:", error);
            }
        }
    };
};

