function openNewForm() {
  $("#commentForm").css("display", "block");
}

function closeNewForm() {
  $("#commentForm").css("display", "none");
}

function openEditForm() {
  $("#editForm").css("display", "block");
}

function closeEditForm() {
  $("#editForm").css("display", "none");
}

$('#inputboxNew').on('input', function () {
  $(this).height(0).height(this.scrollHeight);
  $('#commentForm').height(this.scrollHeight + 115);
});

$('#inputboxEdit').on('input', function () {
  $(this).height(0).height(this.scrollHeight);
  $('#editForm').height(this.scrollHeight + 115);
});