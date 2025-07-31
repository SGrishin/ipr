const fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // Одно изменение DOM вместо 10