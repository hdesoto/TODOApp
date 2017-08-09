//console.log('main.js loaded')

//DELETING a Task permanently
$('.remove').on('click',function(e){
	const id = $(this).attr('id')
	console.log('ID: ' + id)
	const url = `/task/${id}`
	const method = 'DELETE'

	$.ajax({ url, method})
		.then(data => {
			$(this).closest("li").remove()
			console.log(data)
		})	
})


//UPDATING - Marking as  Done
$('.done').on('click',function(e){
	const id2 = $(this).attr('id')
	console.log('ID to mark as done: ' + id2)
	const url = `/task/${id2}`
	const method = 'PUT'
	//const data = { done: true }

	$.ajax({url, method})
		.then(msg => {
			console.log("Message is: " + msg + " Type of msg is :" + typeof msg)
			if(msg == true){
				$(this).parents("li").addClass("task-done-box")
				$(this).parents("li").find(".title").addClass("task-done-text")
			}
			else{
				$(this).parents("li").removeClass("task-done-box")
				$(this).parents("li").find(".title").removeClass("task-done-text")	
			}
			console.log(msg)
		})
})

//Allowing to modify SPAN with Title
$('li').on('click', function(e){
	$(this).find(".title").attr('contentEditable','true')
})


//UPDATING - Change Title of a Task
$('li').on('focusout',function(e){
	$(this).find(".title").attr('contentEditable','false')
	const id = $(this).attr('id')
	const newText = $(this).html()
	console.log("New text is: " + newText)
	console.log("LI element id is: " + id)
	const url = `/taskText/${id}`
	const method = 'PUT'

	$.ajax({url,method,newText})
		 .then(msg =>{

		 	console.log("Text modified I think..?")
		 })


})