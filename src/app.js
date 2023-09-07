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

      // Append elements to the comment container
      commentDiv.appendChild(editButton);
      commentDiv.appendChild(deleteButton);
      commentDiv.appendChild(commentName);
      commentDiv.appendChild(commentText);
      commentDiv.appendChild(editComment);

      editButton.addEventListener("click", function() {
        if (editButton.textContent === "Edit") {
          toggleEditComment(commentText, editComment, editButton, commentName);
        } else if (editButton.textContent === "Save") {
          saveEditedComment(commentText, editComment, editButton, commentName, commentData);
        }
      });

      // Append the comment container to the comments container
      commentsContainer.appendChild(commentDiv);
    });
  })
  .catch(function(error) {
    console.error("Error fetching JSON data:", error);
  });


//Deleting and Editing Comments

// Function to toggle between editing and saving a comment.
function toggleEditComment(commentText, editComment, editButton, commentName) {
  if (editComment.style.display === "none") {
    // Enable editing mode
    editComment.value = commentText.textContent;
    commentText.style.display = "none";
    editComment.style.display = "block";
    editButton.textContent = "Save";
  } else {
    commentText.textContent = newComment;
    commentText.style.display = "block";
    editComment.style.display = "none";
    editButton.textContent = "Edit";

  }
}

function saveEditedComment(commentText, editComment, editButton, commentName, commentData) {
  const newComment = commentData.comment;

  // Create an object with the updated comment data
  const updatedComment = {
    name: commentData.name,
    comment: newComment,
  };

  // Send a PUT request to update the comment on the server
  fetch(`/comment/${commentData.name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedComment),
  })
    .then(function(response) {
      if (response.ok) {
        // Update the comment display
        commentText.textContent = newComment;
        commentText.style.display = "block";
        editComment.style.display = "none";
        editButton.textContent = "Edit";
      } else {
        console.error('Error updating comment:', response.statusText);
      }
    })
    .catch(function(error) {
      console.error('Error updating comment:', error);
    });
}
