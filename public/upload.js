const inputFile = document.querySelector('#file');
const button = document.querySelector("#button");
const link = document.querySelector("#link");

const render = async () => {
    const list = await fetch("/filelist");
    const data = await list.json();
    let html = "<ul>";
    data.forEach(e => {
        html += `<li>`;
        html += `<a href = "`+ e +`">`+ e +`</a>`;
        html += `</li>`;
    });
    html += `</ul>`;
    link.innerHTML = html;
}
await render();
const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("file", inputFile.files[0]);
    const body = formData;
    const fetchOptions = {
        method: 'post',
        body: body
    };
    try {
        const res = await fetch("/upload", fetchOptions);
        const data = await res.json();
        await render();
    } catch (e) {
        console.log(e);
    }
}
