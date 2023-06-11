function filterProducts(searchTerm) {
  const productsSection = document.getElementById("products-section");
  const cards = Array.from(productsSection.getElementsByClassName("card"));

  cards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const description = card.querySelector(".card-description").textContent.toLowerCase();
    const cardCategory = card.dataset.category.toLowerCase();
    const shouldDisplay = title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      cardCategory.includes(searchTerm.toLowerCase());
    card.style.display = shouldDisplay ? "block" : "none";
  });
}

window.addEventListener("load", () => {
  const filtroItems = document.querySelectorAll(".filtro-item");

  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {
      const productsSection = document.getElementById("products-section");
      const allCards = Array.from(productsSection.getElementsByClassName("card"));

      filtroItems.forEach(item => {
        item.addEventListener("click", () => {
          const category = item.dataset.category;

          allCards.forEach(card => {
            const cardCategory = card.dataset.category.toLowerCase();
            card.style.display = category === "all" || cardCategory.includes(category) ? "block" : "none";
          });
        });
      });

      products.forEach((product, index) => {
        const card = allCards[index];
        const cardImage = card.querySelector(".card-image img");

        cardImage.src = product.image;
        cardImage.alt = "Imagem do Produto";
        card.querySelector(".card-title").textContent = product.title;
        card.querySelector(".card-description").textContent = product.description;
      });
    })
    .catch(error => {
      console.error("Erro ao obter os produtos:", error);
    });
});















