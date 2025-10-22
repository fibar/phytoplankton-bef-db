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
  const productivityFilter = document.getElementById("productivityFilter").value;
  const diversityFilter = document.getElementById("diversityFilter").value;
  const studyFilter = document.getElementById("studyFilter").value;
  const searchQuery = document.getElementById("searchBox").value.toLowerCase();

  const list = document.getElementById("referenceList");
  list.innerHTML = "";

  const filtered = references.filter(ref => {
    const matchesEcosystem = !ecosystemFilter || ref.ecosystem === ecosystemFilter;
    const matchesPerspective = !perspectiveFilter || ref.perspective === perspectiveFilter;
    const matchesProductivity = !productivityFilter || ref.productivity.includes(productivityFilter);
    const matchesDiversity = !diversityFilter || ref.diversity.includes(diversityFilter);
    const matchesStudy = !studyFilter || ref.study.includes(studyFilter);
    const matchesSearch =
      ref.title.toLowerCase().includes(searchQuery) ||
      ref.first_author.toLowerCase().includes(searchQuery);

    return matchesEcosystem && matchesPerspective && matchesProductivity && matchesDiversity && matchesStudy && matchesSearch;
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
        ${ref.first_author} (${ref.year}) – <em>${ref.journal}</em><br>
        Ecosystem: ${ref.ecosystem} | Perspective: ${ref.perspective}<br>
        Productivity: ${ref.productivity.join(", ")}<br>
        Diversity: ${ref.diversity.join(", ")}<br>
        Study: ${ref.study.join(", ")}<br>
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
document.getElementById("productivityFilter").addEventListener("change", renderReferences);
document.getElementById("diversityFilter").addEventListener("change", renderReferences);
document.getElementById("studyFilter").addEventListener("change", renderReferences);
document.getElementById("searchBox").addEventListener("input", renderReferences);

