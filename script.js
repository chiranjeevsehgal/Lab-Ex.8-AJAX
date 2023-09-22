document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");

    function fetchProducts() {

        // const url = "products.json";
        const url = "https://raw.githubusercontent.com/chiranjeevsehgal/Lab-Ex.8-JSON-File/main/products.json";

        fetch(url)
            .then(response => response.json())
            .then(products => {
                // Clear the existing product list
                productList.innerHTML = "";

                // Filter products based on the search input
                const keyword = searchInput.value.toLowerCase().trim();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(keyword) ||
                    product.description.toLowerCase().includes(keyword)
                );

                // Sort products based on the selected option
                const sortBy = sortSelect.value;
                filteredProducts.sort((a, b) => {
                    if (sortBy === "name") {
                        return a.name.localeCompare(b.name);
                    } else if (sortBy === "price") {
                        return a.price - b.price;
                    }
                });

                // Generate HTML for each product
                filteredProducts.forEach(product => {
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product");

                    const productName = document.createElement("h2");
                    productName.textContent = product.name;

                    const productDescription = document.createElement("p");
                    productDescription.textContent = product.description;

                    const productPrice = document.createElement("p");
                    productPrice.textContent = `Price: ₹${product.price.toFixed(2)}`;

                    const productImage = document.createElement("img");
                    productImage.src = product.image_url;
                    productImage.alt = product.name;

                    productDiv.appendChild(productImage);
                    productDiv.appendChild(productName);
                    productDiv.appendChild(productDescription);
                    productDiv.appendChild(productPrice);

                    productList.appendChild(productDiv);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    // Initial fetch and display
    fetchProducts();

    // Add event listeners for search and sort
    searchInput.addEventListener("input", fetchProducts);
    sortSelect.addEventListener("change", fetchProducts);
});