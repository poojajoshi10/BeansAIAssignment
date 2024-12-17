// DOM References
const filterInput = document.getElementById("filterInput");
const leftList = document.getElementById("leftList");
const rightList = document.getElementById("rightList");

// Generate random unique list of items
const items = generateUniqueRandomValues(20);

//Generates an array of unique random strings
function generateUniqueRandomValues(count) {
  const baseWords = [
    "Beans.ai",
    "React",
    "Redux",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "GraphQL",
    "JavaScript",
    "Montoya",
    "Node.js",
    "Framer Motion",
  ];

  const uniqueValues = new Set();

  while (uniqueValues.size < count && uniqueValues.size < baseWords.length) {
    const randomWord = baseWords[Math.floor(Math.random() * baseWords.length)];
    uniqueValues.add(randomWord);
  }

  return Array.from(uniqueValues);
}

//Populates the unordered list with items
function populateList(listElement, items) {
  listElement.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.id = `item-${item.toLowerCase().replace(/\s+/g, "-")}`;
    listElement.appendChild(li);
  });
}

//Filters the left list based on input value and scrolls right list
function filterAndScroll(inputValue) {
  const searchText = inputValue.toLowerCase();

  // Filter left list
  leftList.querySelectorAll("li").forEach((li) => {
    li.style.display = li.textContent.toLowerCase().includes(searchText)
      ? "list-item"
      : "none";
  });

  // Highlight and scroll to matching item in the right list
  highlightAndScroll(searchText);
}

//Highlights and scrolls to the matching value in the right list
function highlightAndScroll(searchText) {
  rightList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("highlight")); // Remove highlights

  if (searchText) {
    const match = Array.from(rightList.querySelectorAll("li")).find((li) =>
      li.textContent.toLowerCase().includes(searchText)
    );

    if (match) {
      match.classList.add("highlight");
      match.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

// Populate the lists with the generated unique items
populateList(leftList, items);
populateList(rightList, items);

// Add event listener for input filtering
filterInput.addEventListener("input", (e) => filterAndScroll(e.target.value));
