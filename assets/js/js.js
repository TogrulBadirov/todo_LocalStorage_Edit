let data = [];
const addInput = document.getElementById("addInput");
const addButton = document.getElementById("addButton");
const ul = document.getElementById("ul");
const deleteLocal = document.getElementById("deleteLocal");
let index = 0;
const todo = JSON.parse(localStorage.getItem("data"));
if (JSON.parse(localStorage.getItem("index"))) {
  index = localStorage.getItem("index");
}
if (todo) {
  const getData = todo;
  data = todo;
  for (let i = 0; i < getData.length; i++) {
    renderOrCreate(getData[i], false);
  }
}

deleteLocal.addEventListener("click", () => {
  localStorage.clear();
});

addButton.addEventListener("click", () => {
  if (addInput.value.trim() === "") {
    return -1;
  }

  const arr = [index, addInput.value];
  data.push(arr);
  renderOrCreate(arr, true);

  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("index", JSON.stringify(index));

  index++;
  addInput.value = "";
});

function renderOrCreate(arr, bool) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const editButton = document.createElement("button");
  const p = document.createElement("input");

  p.setAttribute("readonly", "");
  checkbox.setAttribute("type", "checkbox");
  p.value = arr[1]; //getData[i]

  if (bool) {
    p.setAttribute("id", index);
  } else {
    p.setAttribute("id", arr[0]);
  }

  editButton.textContent = "Edit";
  li.append(p, checkbox, editButton);
  ul.append(li);
  let contentBefore;
  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (editButton.textContent === "Edit") {
      contentBefore = p.value;
      p.removeAttribute("readonly");
      editButton.textContent = "Save";
      p.focus();
    } else {
      editButton.textContent = "Edit";
      data[p.getAttribute("id")][1] = p.value;
      localStorage.setItem("data", JSON.stringify(data));
    }
  });

  checkbox.addEventListener("click", () => {
    p.classList.toggle("line");
  });
}
