function fun(){
    console.log("working");
    $("#submit").removeAttr("disabled");
};

$("#submit").addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
	  event.preventDefault();
      document.querySelector('form').submit();
    }
  });