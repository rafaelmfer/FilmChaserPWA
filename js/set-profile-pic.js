
const pic_Upload = document.querySelector('input[type="file"]');
let  user_upload_pic = document.getElementById("myfile")
const showPicture = document.querySelector(".show-Picture")
const showLogo = document.querySelector(".show-Logo")
const user_photo = document.querySelector("#user-photo")
const reader = new FileReader();

user_upload_pic.addEventListener('change',(event)=>{

    console.log(event)
    console.log(pic_Upload.files[0])

    let mypic = pic_Upload.files[0];

    reader.readAsDataURL(mypic);

    console.log(reader);

    addListeners(reader)
})


function addListeners(reader) {
      reader.addEventListener("load", handleEvent);
}

function handleEvent(event) {    
      console.log(reader)
      console.log(reader.result)
      let img = reader.result;


      //GET THE USER_PHOTO TO SAVE ON FIREBASE ***********
      user_photo.src = img;

      showLogo.style.display="none";
      showPicture.style.display="flex";



}