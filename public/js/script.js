function counter() {
  let countdown = 15;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Volviendo al Home en... ${countdown}`;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./lista"
    }
  }, 1000);
}
function counterProducto() {
  let countdown = 0;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Volviendo al Home en... ${countdown}`;
    
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./lista-producto"
    }
  }, 1000);
}

function counterCategoria() {
  let countdown = 5;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Volviendo al Home en... ${countdown}`;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./lista-categoria"
    }
  }, 1000);
}