let references = [];

// Load references from JSON file
fetch("references.json")
  .then(response => response.json())
  .then(data => {
    references = data;
    renderReferences();
  });

// Render the list
function renderReferences() {
  const ecosystemFilter = document.getElementById("ecosystemFilter").value;
  const perspectiveFilter = document.getElementById("perspectiveFilter").value;
  const variableFilter = document.getElementById("variableFilter").value;
  const searchQuery = document.getElementById("searchBox").value.toLowerCase();

  const list = document.getElementById("referenceList");
  list.innerHTML = "";

  const filtered = references.filter(ref => {
    const matchesEcosystem = !ecosystemFilter || ref.ecosystem === ecosystemFilter;
    const matchesPerspective = !perspectiveFilter || ref.perspective === perspectiveFilter;
    const matchesVariable = !variableFilter || ref.variables.includes(variableFilter);
    const matchesSearch =
      ref.title.toLowerCase().includes(searchQuery) ||
      ref.authors.toLowerCase().includes(searchQuery);

    return matchesEcosystem && matchesPerspective && matchesVariable && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<li>No references found.</li>";
    return;
  }

  filtered.forEach(ref => {
    const li = document.createElement("li");
    li.classList.add("reference-item");

    li.innerHTML = `
      <div class="reference-title">${ref.title}</div>
      <div class="reference-meta">
        ${ref.authors} (${ref.year}) – <em>${ref.journal}</em><br>
        Ecosystem: ${ref.ecosystem} | Perspective: ${ref.perspective}<br>
        Variables: ${ref.variables.join(", ")}<br>
        Dataset available: ${ref.dataset_available ? "Yes" : "No"}<br>
        ${ref.repository_url ? `<a href="${ref.repository_url}" target="_blank">Repository</a>` : ""}
      </div>
    `;
    list.appendChild(li);
  });
}

// Re-render when filters/search change
document.getElementById("ecosystemFilter").addEventListener("change", renderReferences);
document.getElementById("perspectiveFilter").addEventListener("change", renderReferences);
document.getElementById("variableFilter").addEventListener("change", renderReferences);
document.getElementById("searchBox").addEventListener("input", renderReferences);

