//Populating comments based on JSON
function loadComments() {
 // Fetch the JSON file
 fetch('comments.json')
 .then(function(response) {
   return response.json();
 })
 .then(function(jsonData) {
    // Get the comments container element
    var commentsContainer = document.getElementById("comment-container");
    commentsContainer.innerHTML = "";
    // Iterate through the JSON data and create HTML elements for each comment
    jsonData.forEach(function (commentData) {
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
      commentText.className = "comment-text";
      commentText.textContent = commentData.comment;

      var editComment = document.createElement("textarea");
      editComment.className = "edit-comment";
      editComment.style.display = "none";

      editButton.addEventListener("click", function() {
        console.log("Edit button clicked")
        toggleEditComment(commentText, editComment, editButton, commentName);
      });

      // Append elements to the comment container
      commentDiv.appendChild(editButton);
      commentDiv.appendChild(deleteButton);
      commentDiv.appendChild(commentName);
      commentDiv.appendChild(commentText);
      commentDiv.appendChild(editComment);

      // Append the comment container to the comments container
      commentsContainer.appendChild(commentDiv);
    });
  })
  .catch(function(error) {
    console.error("Error fetching JSON data:", error);
  });
}

//Deleting and Editing Comments

// Function to toggle between editing and saving a comment. Sends PUT request to update comment on server.
function toggleEditComment(commentText, editComment, editButton, commentName) {
  if (editComment.style.display === "none") {
    // Enable editing mode
    editComment.value = commentText.textContent;
    commentText.style.display = "none";
    editComment.style.display = "block";
    editButton.textContent = "Save";
  } else {
    // Save the edited comment and exit editing mode
    const newName = commentName.textContent;
    const newComment = editComment.value;

    commentText.style.display = "block";
    editComment.style.display = "none";
    editButton.textContent = "Edit";

    // Send a PUT request to update the comment on the server
    const commentIndex = Array.from(document.querySelectorAll(".edit-btn")).indexOf(editButton);
    updateComment(commentIndex, newName, newComment);
  }
}


// Function to update comment on server. Called when a comment is edited.
function updateComment(index, newName, newComment) {
  fetch(`/comment/${index}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newName, comment: newComment }),
  })
    .then(function (response) {
      if (response.ok) {
        console.log(`Comment ${index} has been updated.`);
        loadComments();
      } else {
        console.error(`Failed to update comment ${index}.`);
      }
    })
    .catch(function (error) {
      console.error("Error updating comment:", error);
    });
}

loadComments();