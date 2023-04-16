// ADD EVENT CARD
const addBtn = document.querySelector(".add-more");
const hideBtn = document.querySelector(".hide-cards");
const moreCards = document.querySelector("#more");

addBtn.addEventListener("click", function () {
   addBtn.classList.add("none");
   moreCards.classList.remove("none");
   hideBtn.classList.remove("none");
});

hideBtn.addEventListener("click", function () {
   addBtn.classList.remove("none");
   moreCards.classList.add("none");
   hideBtn.classList.add("none");
});

// FORM POPUP

const openFormBtn = document.querySelector(".write-btn");
const closeFormBtn = document.querySelector(".form-popup__close");
const formFade = document.querySelector(".form-fade");
const formPopup = document.querySelector(".form-popup");

openFormBtn.addEventListener("click", function () {
   formFade.classList.remove("none");
   document.body.classList.add("noscroll-menu");

   formPopup.addEventListener("click", function (e) {
      e.stopPropagation();
   });
});

closeFormBtn.addEventListener("click", function () {
   formFade.classList.add("none");
   document.body.classList.remove("noscroll-menu");
});

formFade.addEventListener("click", function () {
   formFade.classList.add("none");
   document.body.classList.remove("noscroll-menu");
});

$(document).ready(function () {
   //FORM VALIDATE
   $(".form").validate({
      rules: {
         name: {
            required: true,
         },
         email: {
            required: true,
            email: true,
         },
         message: {
            required: true,
         },
      },
      messages: {
         name: {
            required: "Введите Имя",
         },
         email: {
            required: "Введите E-mail",
            email: "",
         },
         message: {
            required: "Введите Сообщение",
         },
      },
      submitHandler: function (form) {
         ajaxFormSubmit();
      },
   });

   // Функция AJAX запрса на сервер

   function ajaxFormSubmit() {
      let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.

      //Формируем ajax запрос
      $.ajax({
         type: "POST", // Тип запроса - POST
         url: "php/mail.php", // Куда отправляем запрос
         data: string, // Какие даные отправляем, в данном случае отправляем переменную string

         // Функция если все прошло успешно
         success: function (html) {
            $(".form").slideUp(800);
            $("#answer").html(html);
         },
      });
      // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
      return false;
   }
});
