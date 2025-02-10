const hide = (element) => {
    element.classList.add("hide");
 }
 
 const show = (element) => {
    element.classList.remove("hide");
 }
 
 export const createNavigator = (parentElement) => {
    const pages = Array.from(document.querySelectorAll(".pages"));
    
    const render = () => {
       const url = new URL(document.location.href);
       const pageName = url.hash.replace("#", "");
       const selectedPage = pages.filter((page) => page.id === pageName)[0] || pages[0];
 
       pages.forEach(p => hide(p));
       show(selectedPage);
    }
    
    window.addEventListener('popstate', render); 
    render();   
  }