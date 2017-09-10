var myArray = [];
var archiveCount = 0 ;
var inprogressCount = 0 ;
var completeCount = 0 ;
var total = 0 ;
var myTableArray = [];
 var data; 
 var thisRow; 

var ascendingOrder = true;

function sortTable(){
  myArray.sort(function(a, b){
    if(ascendingOrder){
      return a.name < b.name? -1: 1;
    } else {
      return a.name > b.name? -1: 1;
    }
  });
  ascendingOrder = !ascendingOrder;
  renderAllTasks();
}


function sortTableDate(){
  
  myArray.sort(function(a, b){
    if(ascendingOrder){
      return a.date < b.date? -1: 1;
    } else {
      return a.date > b.date? -1: 1;
    }
  });
  ascendingOrder =!ascendingOrder;
  renderAllTasks();
  
}

$(function(){
  loadTasks();
  registerActions();
});

function registerActions() {
  
 $("#archivedCount").html(archiveCount);
 $("#completedCount").html(completeCount);
 $("#inProgressCount").html(inprogressCount);
 $("#totalCount").html(total);
  
$('.box').on("click", function(event){
$("#deletebut").hide();
$("#mytable").find("input[type=checkbox]:checked").each(function(){
$("#deletebut").show();
});
});

  $("#new").click(function(event){
    if(document.getElementById("name").value== "")
      alert("Please enter the name !");
    else {
    addTask();
    $("#dialog").dialog("close");
    }
  });


  
  
$("#deleting").on("click", function(event){
    var remove = 0 ;
$("#mytable").find("input[type=checkbox]:checked").each(function(){
  if($(this).closest("tr").hasClass("complete"))
    completeCount--;
 else if($(this).closest("tr").hasClass("archiv"))
   archiveCount--;
else if ($(this).closest("tr").hasClass("inprogress"))
 inprogressCount--;
  
  myArray.splice($(this).closest('tr').data().taskId-remove,1);
  remove++;
  total--;
 $(this).closest('tr').remove();
 $("#DeleteDialog").dialog("close");
 $("#deletebut").hide();
});
renderAllTasks();
 $("#totalCount").html(total);
 $("#archivedCount").html(archiveCount);
 $("#completedCount").html(completeCount);
 $("#inProgressCount").html(inprogressCount);
});




$("#DeleteDialog").dialog({
             autoOpen: false,  
          });
          $("#deletebut").click(function(){
             $("#DeleteDialog").dialog("open");
          });
    
    $("#closing").click(function(){
             $("#DeleteDialog").dialog("close");
             $("#deletebut").hide();
          });



  $(".navigation-tab").click(function(){
    $(".navigation-tab").removeClass("active");
    $(this).addClass("active");

    $(".panel-title .title").text($(this).text());
  });

  
 $("#prog").click(function(){
      $(".complete,.archiv").hide();
  });
  $("#prog").click(function(){
      $(".inprogress").show();
  });
  
  $("#arch").on("click", function(){
    $(".complete,.inprogress").hide();
  });
  $("#arch").click(function(){
      $(".archiv").show();
  });


 $("#comp").on("click", function(){
      $(".archiv,.inprogress").hide();
  });
  $("#comp").click(function(){
      $(".complete").show();
      $("tbody").find("tr").each(function(){
      if($(this).closest("tr").hasClass("complete"))
       $(this).closest("tr").find("label").removeClass("line-through");
     });
  });



 $("#all").on("click", function(){
      $(".archiv,.inprogress,.complete").show();
     $("tbody").find("tr").each(function(){
     if($(this).closest("tr").hasClass("complete"))
       $(this).closest("tr").find("label").addClass("line-through");
      
  });
  });
  



 $('tr').hover(function(){ /* hover first argument is mouseenter*/
      $(this).find('button').css({"visibility": "visible"});
  },function(){  /* hover second argument is mouseleave*/
     $(this).find('button').css({"visibility": "hidden"});
  });

 $('tr').hover(function() {
  $(this).find('td').addClass('hover');
  }, function() {
  $(this).find('td').removeClass('hover');
  });


$("#dialog").dialog({
             autoOpen: false,  
          });
          $("#opener").click(function(){
             $("#dialog").dialog("open");
          });
    
    $("#closer").click(function(){
             $("#dialog").dialog("close");
          });

        

          
          
          

  $('#datetimepicker1,#datetimepicker2').datetimepicker({
    lang:'ch',
    timepicker:false,
    format:'Y/m/d',
    formatDate:'Y/m/d',
  });


$("#sorting").click(function(event){
    $("#sortingDropdown").toggle();
  });
  
  $(".ByName").on("click", function(event){
    sortTable(); 
     $("#sortingDropdown").hide();
  });

  $(".ByDate").on("click", function(event){
    sortTableDate(); 
     $("#sortingDropdown").hide();
  });

}


function addTask(){
  var myObject = {
    date : document.getElementById("datetimepicker1").value,
    name : document.getElementById("name").value,
    state: "inprogress", 
    description: document.getElementById("describe").value
  };
  myArray.push(myObject);
  addToTable(myArray.length-1);
}

function addToTable(taskIndex){
  var element = $("#alltasksbody");
  var task = myArray[taskIndex];
  // create new element
  var newText =  "<tr class=\""+task.state+"\"><td class=\"try\"><label <p title=\""+task.description+"\"></p><input class=\"box\" type=\"checkbox\">"+task.name+"</label></td>";
  newText += "<td>"+ task.date + "</td>";
  newText += "<td><div class=\"dropdown\"><button onclick=\"List(this)\" class=\"btn btn-default-s\" style=\"visibility: hidden;\">...</button>";
  newText += "<div class=\"dropdown-menu myDropdown\">";
  newText += "<a href=\"#home\" class=\"E\">Edit Task</a><a href=\"#about\" class=\"D\">Delete Task</a>";
  newText += "<a href=\"#contact\" class=\"M\">Mark as Done</a><a href=\"#contact\" class=\"A\">Mark as Archive</a></div></div></td></tr>";
  var row = $(newText);
  row.data({taskId: taskIndex});
  element.append(row);
  total++;
  inprogressCount++;
   $("#inProgressCount").html(inprogressCount);
    $("#totalCount").html(total);
  // end of create new element
  
  // empty add-task box
  document.getElementById("name").value = "";
  document.getElementById("datetimepicker1").value = "";
  document.getElementById("describe").value = "";
  // end of add-task box

  row.hover(function(){ /* hover first argument is mouseenter*/
    $(this).find('button').css({"visibility": "visible"});
  }, function(){  /* hover second argument is mouseleave*/
     $(this).find('button').css({"visibility": "hidden"});
  }); // end of hover

  row.hover(function() {
    $(this).find('td').addClass('hover');
  }, function() {
    $(this).find('td').removeClass('hover');
  }); //end of hover

  row.find('.box').on("click", function(event){
    $("#deletebut").hide();
    $("#mytable").find("input[type=checkbox]:checked").each(function(){
      $("#deletebut").show();
    }); // end of each
    
  }); // end of click

  row.find('.M').on("click", function(event){
    var thisRow = $(this).closest('tr');
    if(myArray[thisRow.data().taskId].state == "inprogress") 
      inprogressCount--;                   
    else if(myArray[thisRow.data().taskId].state== "archiv")  
      archiveCount--;                       
    thisRow.removeClass(myArray[thisRow.data().taskId].state);
    thisRow.addClass('complete'); 

    if($(".navigation-tab.active").attr("id") !== "all") {
      thisRow.hide();
    }
    completeCount++;
    $("#archivedCount").html(archiveCount); 
    $("#completedCount").html(completeCount);  
    $("#inProgressCount").html(inprogressCount); 
    $(".dropdown-menu").hide();
    myArray[thisRow.data().taskId].state="complete";

    if($(this).closest("tr").hasClass("complete")&& $(".navigation-tab.active").attr("id") == "all")
       $(this).closest("tr").find("label").addClass("line-through");
    
    
  });

  row.find('.A').on("click", function(event){
    var thisRow = $(this).closest('tr');
    if(myArray[thisRow.data().taskId].state == "inprogress") 
      inprogressCount--;                   
    else if(myArray[thisRow.data().taskId].state == "complete")  
      completeCount--; 
    thisRow.removeClass(myArray[thisRow.data().taskId].state);
    thisRow.addClass('archiv'); 
    if($(".navigation-tab.active").attr("id") !== "all") {
      thisRow.hide();
    }
    archiveCount++;
     $("#archivedCount").html(archiveCount); 
    $("#completedCount").html(completeCount);  
    $("#inProgressCount").html(inprogressCount); 
    $(".dropdown-menu").hide();
    myArray[thisRow.data().taskId].state="archiv";
    $("tbody").find("tr").each(function(){
      if($(this).closest("tr").hasClass("archiv"))
       $(this).closest("tr").find("label").removeClass("line-through");
     });
    
  });

  row.find('.D').on("click", function(event){
    var thisRow = $(this).closest('tr');
    $("#DeleteDialog").dialog("open");
     $("#deleting").on("click", function(event){
        $("#DeleteDialog").dialog("close");
        });
        if(myArray[thisRow.data().taskId].state == "inprogress") 
           inprogressCount--;                   
        else if(myArray[thisRow.data().taskId].state == "complete")  
       completeCount--; 
        else if(myArray[thisRow.data().taskId].state == "archiv") 
          archiveCount--; 
      $(".dropdown-menu").hide();
       myArray.splice(thisRow.data().taskId,1);
        thisRow.remove();
         total--;
    $("#archivedCount").html(archiveCount);
 $("#completedCount").html(completeCount);
 $("#inProgressCount").html(inprogressCount);
 $("#totalCount").html(total);
    
  });
  $("document").ready(function(){
$("#CLOSe").on("click", function(){
     
             $("#dialogue").dialog("close");
          });
          
              
  
   $("#dialogue").dialog({
             autoOpen: false,  
          });
         row.find('.E').click(function(){
           $(".dropdown-menu").hide();
     thisRow = $(this).closest('tr');
     data = myArray[thisRow.data().taskId];
     $("#Name").val(data.name);
     $("#datetimepicker2").val(data.date);
     $("#Describe").val(data.description);
           
             $("#dialogue").dialog("open");          
          });
    
          $("#editing").on("click", function(event){
           
            data.date = document.getElementById("datetimepicker2").value;
             data.name = document.getElementById("Name").value;
            data.description = document.getElementById("Describe").value;
            myArray[thisRow.data().taskId] = data ;
            renderAllTasks();
            $("#dialogue").dialog("close");
            });
          
        
          
  });
          
         
  
  if($(".navigation-tab.active").attr("id") !== task.state && $(".navigation-tab.active").attr("id") !== "all") {
   row.hide();  
 } 
 
 if(row.hasClass("complete")&& $(".navigation-tab.active").attr("id") == "all")
    row.find("label").addClass("line-through");
}  

function List(sender){
  var x = sender.closest("tr").rowIndex - 1;
  if($(sender).closest("tr").hasClass("complete"))
  {
    $(".M").hide();
    $(".A").show();
  }
    
 else if($(sender).closest("tr").hasClass("archiv"))
  {
    $(".A").hide();
    $(".M").show();
  }
else if ($(sender).closest("tr").hasClass("inprogress"))
{
   $(".M").show();
   $(".A").show();
}
  
  $(".myDropdown:eq(" + x + ")").toggle();
  
}

function loadTasks(){
  // myArray.push({
  //   name: "Option 1",
  //   date: "24/09/2016",
  //   state: "inprogress"
  // });
  
  // myArray.push({
  //   name: "Option 2",
  //   date: "24/09/2016",
  //   state: "inprogress"
  // });

  renderAllTasks();
}

function renderAllTasks(){
  document.getElementById("alltasksbody").innerHTML = "";
  for(var i = 0; i < myArray.length; i++){
    total--;
  inprogressCount--;
    addToTable(i);
    
  }
}
