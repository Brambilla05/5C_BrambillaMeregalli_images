export const carousel = (parentElement,pubsub) => {
    let images;

    return {
        build:function(img){
           images=img;
           pubsub.subscribe("imagesAdd", (data)=>{
            images=data;
            this.render();
        })
        },
        render:function(){
            let html = "";
            images.forEach((element, i) => {
                if(i==0){
                    html += `
                    <div class="carousel-item active">
                    <img src="${element.url}" class="d-block w-100" alt="...">
                    </div>
                    `
                }else{
                    html += `
                    <div class="carousel-item">
                    <img src="${element.url}" class="d-block w-100" alt="...">
                    </div>
                    `
                }
            });
            parentElement.innerHTML = html;
        }
    }
}