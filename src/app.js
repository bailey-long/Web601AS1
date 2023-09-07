//Populating comments based on JSON
 // Fetch the JSON file
 fetch('comments.json')
 .then(function(response) {
   return response.json();
 })
 .then(function(jsonData) {
    // Get the comments container element
    var commentsContainer = document.getElementById("comment-container");

    // Iterate through the JSON data and create HTML elements for each comment
    jsonData.forEach(function(commentData) {
        console.log("added comment")
    // Create elements for the comment
    var commentDiv = document.createElement("div");
    commentDiv.className = "col-sm-10";

    var editButton = document.createElement("button")
    editButton.className = "edit-btn"
    editButton.textContent = "Edit"

    var deleteButton = document.createElement("button")
    deleteButton.className = "delete-btn"
    deleteButton.textContent = "Delete"

    var commentName = document.createElement("h4");
    commentName.textContent = commentData.name;

    var commentText = document.createElement("p");
    commentText.textContent = commentData.comment;

    // Append elements to the comment container
    commentDiv.appendChild(editButton);
    commentDiv.appendChild(deleteButton);
    commentDiv.appendChild(commentName);
    commentDiv.appendChild(commentText);

    // Append the comment container to the comments container
    commentsContainer.appendChild(commentDiv);
    });
})
.catch(function(error) {
  console.error("Error fetching JSON data:", error);
});

//Deleting and Editing Comments

document.querySelectorAll(".edit-btn").forEach((editButton, index) => {
  const commentText = document.querySelectorAll(".comment-text")[index];
  const editInput = document.querySelectorAll(".edit-comment")[index];  

  editButton.addEventListener("click", () => {
    if (editInput.style.display === "none") {
      editInput.value = commentText.textContent;
      commentText.style.display = "none";
      editInput.style.display = "block";
      editButton.textContent = "Save";
    } else {
      commentText.textContent = editInput.value;
      commentText.style.display = "block";
      editInput.style.display = "none";
      editButton.textContent = "Edit";
    }
  });
});
