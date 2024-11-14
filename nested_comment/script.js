let commentIdCounter = 0;

// Dynamically updated character counter 
function updateCharCounter(textarea, counter) {
  const maxLength = 250;
  const length = textarea.value.length;
  counter.innerText = `${maxLength - length} characters left`;
}

// Function to create a new comment element
function createCommentElement(text, parentId = null, canDelete = true) {
  commentIdCounter++;
  const commentId = `comment-${commentIdCounter}`;
  
  const commentEl = document.createElement('div');
  commentEl.classList.add('p-4', 'border', 'rounded-lg', 'bg-gray-50', 'space-y-2');
  commentEl.id = commentId; // Assign the ID to the comment element itself

  if (parentId) commentEl.classList.add('ml-8', 'bg-gray-100', 'border-l-4', 'border-blue-500');

  // Construct comment HTML with delete button
  commentEl.innerHTML = `
    <p class="text-gray-800">${text}</p>
    <div class="flex items-center space-x-2">
      <button onclick="toggleReplyForm('${commentId}')" class="text-blue-500 text-sm hover:underline">Reply</button>
      <button onclick="toggleReplies('${commentId}')" class="text-gray-500 text-sm hover:underline">Toggle Replies</button>
      ${canDelete ? `<button onclick="deleteComment('${commentId}')" class="text-red-500 text-sm hover:underline">Delete</button>` : ''}
    </div>
    <div id="${commentId}-replies" class="ml-6 space-y-3 hidden"></div>
    <div id="${commentId}-reply-form" class="hidden mt-2">
      <textarea placeholder="Write a reply..." maxlength="250" rows="2" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      <div class="flex justify-between items-center mt-1 text-sm text-gray-500">
        <span class="char-counter">250 characters left</span>
        <button onclick="addReply('${commentId}')" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Reply</button>
      </div>
    </div>
  `;
  
  // Event listener to update character counter for the reply textarea
  const replyTextarea = commentEl.querySelector(`#${commentId}-reply-form textarea`);
  const replyCharCounter = commentEl.querySelector(`#${commentId}-reply-form .char-counter`);
  replyTextarea.addEventListener('input', () => updateCharCounter(replyTextarea, replyCharCounter));
  
  return commentEl;
}

// Initialize the comment section with an initial comment
function initializeComments() {
  const commentSection = document.getElementById('comment-section');
  const initialComment = createCommentElement(
    "Welcome! You can reply to the comments. But you can't delete the initial comment.",
    null,
    false
  );
  commentSection.appendChild(initialComment);
}

// Add a new comment to the comment section
function addComment() {
  const commentSection = document.getElementById('comment-section');
  const newCommentText = document.getElementById('new-comment');
  const charCounter = document.getElementById('char-counter');

  if (newCommentText.value.trim() === '') return;

  const commentEl = createCommentElement(newCommentText.value.trim());
  commentSection.appendChild(commentEl);

  // Reset textarea
  newCommentText.value = '';
  updateCharCounter(newCommentText, charCounter);
}

// Add a nested reply to a specific comment
function addReply(parentId) {
  const replyForm = document.getElementById(`${parentId}-reply-form`);
  const replyTextarea = replyForm.querySelector('textarea');
  const charCounter = replyForm.querySelector('.char-counter');

  if (replyTextarea.value.trim() === '') return;

  const replyEl = createCommentElement(replyTextarea.value.trim(), parentId);
  const repliesContainer = document.getElementById(`${parentId}-replies`);

  repliesContainer.appendChild(replyEl);
  repliesContainer.classList.remove('hidden');

  // Reset reply textarea
  replyTextarea.value = '';
  updateCharCounter(replyTextarea, charCounter);
  replyForm.classList.add('hidden');
}

// Delete a comment or reply
function deleteComment(commentId) {
  const commentEl = document.getElementById(commentId);
  if (commentEl) {
    commentEl.remove();
  }
}

// Toggle the reply form for a comment
function toggleReplyForm(commentId) {
  const replyForm = document.getElementById(`${commentId}-reply-form`);
  replyForm.classList.toggle('hidden');
}

// Toggle visibility of replies for a comment
function toggleReplies(commentId) {
  const repliesContainer = document.getElementById(`${commentId}-replies`);
  repliesContainer.classList.toggle('hidden');
}

// Event listener to update character counter for the main comment textarea
document.addEventListener('DOMContentLoaded', () => {
  const newCommentText = document.getElementById('new-comment');
  const charCounter = document.getElementById('char-counter');
  newCommentText.addEventListener('input', () => updateCharCounter(newCommentText, charCounter));

  // Initialize comments with the default welcome message
  initializeComments();
});
