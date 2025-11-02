// Copyright year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();


// Étapes de production: clic liste -> change image
const stepList = document.querySelector('.steps-list');
if (stepList){
stepList.addEventListener('click', (e)=>{
const li = e.target.closest('li');
if (!li) return;
const step = li.dataset.step;
stepList.querySelectorAll('li').forEach(el=>el.classList.toggle('active', el===li));
document.querySelectorAll('[data-step-image]').forEach(img=>{
img.hidden = img.getAttribute('data-step-image') !== step;
});
});
}


// Galerie par onglets
const tabs = document.querySelectorAll('.tab');
const gallery = document.getElementById('gallery');
if (tabs.length && gallery){
tabs.forEach(tab=>{
tab.addEventListener('click', ()=>{
tabs.forEach(t=>t.classList.toggle('active', t===tab));
const id = tab.dataset.filter;
gallery.querySelectorAll('img').forEach(img=>{
img.hidden = img.getAttribute('data-cat') !== id;
});
});
});
}