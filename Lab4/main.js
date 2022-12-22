const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");

const closeX = document.querySelector(".close");
const addBtn = document.querySelector("button");
const title = document.querySelector("input");
const desc = document.querySelector("textarea");


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;
addBox.addEventListener("click", () => {
  title.focus();
  popupBox.classList.add("show");
});

closeX.addEventListener("click", () => {
  isUpdate = false;
  title.value = "";
  desc.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove()); //remove duplicate
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
                    <div class="details">
                    <button onclick="pinNote(${index})">Pin</button>
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        </div>
                        <div class="buttons">
                        <button onclick="deleteNote(${index})">Delete</button>
                        <button onclick="updateNote(${index},'${note.title}','${note.description}')">Edit</button>
                    </div>
                    </li>  `;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

function deleteNote(noteId) {
  notes.splice(noteId, 1);
  localStorage.getItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, titles, descr) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  title.value = titles;
  desc.value = descr;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = title.value;
  let noteDesc = desc.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.getItem("notes", JSON.stringify(notes));
    closeX.click();
    showNotes();
  }
});
function pinNote(index) {
  let note = notes[index];

  note.pinned = !note.pinned;

  let pinnedNotes = notes.filter(n => n.pinned);
  let otherNotes = notes.filter(n => !n.pinned);
  notes = [...pinnedNotes, ...otherNotes];
}
