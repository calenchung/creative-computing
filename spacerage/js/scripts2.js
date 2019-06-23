  
  
  
  //===============SECTION DIVIDERS===============//

    inView('#section-1')
    .on('enter', el => {
      el.className = 'active';
    })
    .on('exit', el => {
      el.className = '';
    })

  
    inView('#section-2 p')
      .on('enter', el => {
        el.className = 'active';
      })
      .on('exit', el => {
        el.className = '';
      })


      inView('#section-3 p')
      .on('enter', el => {
        el.className = 'active';
      })
      .on('exit', el => {
        el.className = '';
      })

//===============POP UP BOX FOR DEBATE PAGE===============//

      var modal = document.getElementById('myModal');
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];
          
      btn.onclick = function() {
        modal.style.display = "block";
      }
      
      span.onclick = function() {
          modal.style.display = "none";
      }
      
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }


      var modal = document.getElementById('myModal');
      var btn = document.getElementById("noBtn");
      var span = document.getElementsByClassName("close")[0];
          
      btn.onclick = function() {
        modal.style.display = "block";
      }
      
      span.onclick = function() {
          modal.style.display = "none";
      }
      
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }

//===============ON CLICK WINDOWS DISAPPEAR DEBATE===============//


      document.getElementById("box2").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box3").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box4").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box5").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box6").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box7").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box8").onclick = function(){
        (this).style.visibility = "hidden";
        
      }
      document.getElementById("box9").onclick = function(){
        (this).style.visibility = "hidden";
        
      }

//===============INSERT ANSWER BOX DEBATE PAGE===============//

      function myFunction() {
        var demo = prompt("What do you think now?");
        } 
        ;



