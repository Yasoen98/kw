var blogo_helper_wait = 10000;
var blogo_helper_STOP = true;
var wiedza_helper_STOP = true;
var pet_helper_STOP = false;

const $css = `
#blogo_helper {
  min-width: 100px;
  padding: 5px;
  border: solid gray 1px;
  background: rgba(22, 22, 93, 0.81);
  color: gold;
  position: fixed;
  top: 40px;
  right: 5px;
  z-index: 5;
}
#blogo_helper .blogo_button {
  cursor: pointer;
  text-align: center;
  border-bottom: solid gray 1px;
}
#bonusMenu {
  display: none;
  position: absolute;
  top: 80px;
  right: 5px;
  padding: 10px;
  background: rgba(48, 49, 49, 0.8);
  border: solid #ffffff7a 1px;
  border-radius: 5px;
  z-index: 10;
}
#bonusMenu select {
  margin: 5px 0;
  background: #ffffff99;
  border: solid #6f6f6f 1px;
  border-radius: 5px;
  color: black;
}
`;

const $html = `
  <div class='blogo_button yasoen_blogo'>AUTO_BŁOGO <b class='blogo_status red'>Off</b></div>
  <div class='blogo_button wiedza_m'>Wiedza M <b class='wiedza_status red'>Off</b></div>
  <div class='blogo_button stwor'>Stwór</div>
  <div id="bonusMenu">
    <div><b>Wybierz bonusy:</b></div>
    ${generateBonusSelects(4)}
    <div><b>Wybierz ID Peta:</b></div>
    <select id="petIdSelect">
      ${generatePetOptions()} <!-- Generuje 100 opcji -->
    </select>
    <button id="closeBonusMenu">Zamknij</button>
    <button id="startButton">Start</button>
  </div>
`;

// Funkcja generująca selektory bonusów
function generateBonusSelects(count) {
  let options = `<option value="0">Brak</option>
                 <option value="1">% do siły</option>
                 <option value="2">% do szybkości</option>
                 <option value="3">% do wytrzymałości</option>
                 <option value="4">% do siły woli</option>
                 <option value="5">% do energii ki</option>
                 <option value="6">% do wszystkich statystyk</option>
                 <option value="7">% do efektywności treningu</option>
                 <option value="8">% do rezultatu treningu</option>
                 <option value="9">% do szansy na podwójnie efektywny bonus za ulepszenie treningu</option>
                 <option value="10">% do max Punktów Akcji</option>
                 <option value="11"> do przyrostu Punktów Akcji</option>
                 <option value="12">% do przyrostu Punktów Akcji</option>
                 <option value="13">% do doświadczenia</option>
                 <option value="14">% do szansy na zdobycie przedmiotu z walk PvM</option>
                 <option value="15">% do ilości mocy z walk PvM</option>
                 <option value="16">% do szansy na moc z walk PvM</option>
                 <option value="17">% do mocy za skompletowanie SK</option>
                 <option value="18">% do mocy za skompletowanie PSK</option>
                 <option value="19">% do mocy za wygrane walki wojenne</option>
                 <option value="20">% do obrażeń</option>
                 <option value="21">% do obrażeń od technik</option>
                 <option value="22">% do obrażeń od trafień krytycznych</option>
                 <option value="23">% do redukcji obrażeń</option>
                 <option value="24">% redukcji obrażeń od technik</option>
                 <option value="25">% do redukcji szansy na otrzymanie trafienia krytycznego</option>
                 <option value="26">% redukcji obrażeń od trafień krytycznych</option>
                 <option value="27">% do szansy na trafienie krytyczne</option>
                 <option value="28">% do odporności na krwawienia</option>
                 <option value="29">% do skuteczności krwawień</option>
                 <option value="30">% do odporności na podpalenia</option>
                 <option value="31">% do skuteczności podpaleń</option>
                 `;
  let selects = '';
  for (let i = 0; i < count; i++) {
    selects += `<select>${options}</select>`;
  }
  return selects;
}

// Funkcja generująca 100 opcji dla selektora ID peta
function generatePetOptions() {
  let options = '';
  for (let i = 1; i <= 100; i++) {
    options += `<option value="${i}">Pet ${i}</option>`;
  }
  return options;
}


$('body').append("<div id='blogo_helper'>" + $html + "</div>").append("<style>" + $css + "</style>");

// Obsługa przycisku "Stwór" - otwieranie/zamykanie menu bonusów
$('#blogo_helper .stwor').click(() => {

//numer petow

// Pobierz wszystkie elementy z klasą .petItem
const petItems = document.querySelectorAll('.petItem');

// Przeiteruj przez elementy i dodaj numerację
petItems.forEach((petItem, index) => {
  // Stwórz nowy element HTML do wyświetlenia numeru
  const numberLabel = document.createElement('div');
  
  // Ustaw klasę i treść z numeracją (dodaj 1, aby numeracja zaczynała się od 1)
  numberLabel.classList.add('pet-number');
  numberLabel.textContent = `Pet #${index + 1}`;
  
  // Stylizacja numeru (opcjonalnie, aby był widoczny)
  numberLabel.style.fontWeight = 'bold';
  numberLabel.style.marginBottom = '5px';
  
  // Dodaj numerację przed resztą zawartości petItem
  petItem.prepend(numberLabel);
});

  if(pet_helper_STOP){
    pet_helper_STOP = false;
  } else {
    pet_helper_STOP = true;
  }
  $('#bonusMenu').toggle();
});


const container = document.querySelector("#kom_con > div > div.content > div");

$('#startButton').click(() => {
  const selectedOptions = Array.from($('#bonusMenu select').not('#petIdSelect'))
    .map(select => {
      const value = select.value;
      const optionText = select.options[select.selectedIndex].text;
      return value !== "0" ? optionText : null;
    })
    .filter(option => option !== null);

  let intervalId; // Zmienna dla ID interwału

  // Funkcja do sprawdzania dopasowania
  function checkAndSendData() {
    var container = document.querySelector("#kom_con > div > div.content > div");
    var greenTextValues = Array.from(container.querySelectorAll("b.green")).map(el => {
      return el.nextSibling ? el.nextSibling.textContent.trim() : "";
    });

    const allMatch = selectedOptions.every(option => greenTextValues.includes(option));

    if (pet_helper_STOP) {
      if (allMatch) {
        console.log("Wszystkie wybrane wartości pasują:", selectedOptions);
        clearInterval(intervalId);
      } else {
        console.log("Brak pełnego dopasowania, ponawiam próbę...");
       // console.log(selectedOptions);
      // console.log(greenTextValues);

        const petId = $('#petIdSelect').val();
        const button = document.querySelector(`#pet_list > div:nth-child(${petId}) > div.rightSide > div > button:nth-child(2)`);
        const petId2 = button.getAttribute("data-pet");
        console.log(petId2);
        GAME.socket.emit('ga', { a: 43, type: 7, pet: petId2 });
        kom_clear();
      }
    } else {
      clearInterval(intervalId); // Jeśli `pet_helper_STOP` jest false, przerywamy interwał
     // console.log("Interwał został zatrzymany, ponieważ pet_helper_STOP jest false.");
    }
  }

  // Rozpocznij sprawdzanie i wysyłanie danych
  intervalId = setInterval(checkAndSendData, 2000);
});

// Obsługa zamykania menu bonusów
$('#closeBonusMenu').click(() => {
  pet_helper_STOP = false;
  $('#bonusMenu').hide();
});

$('#blogo_helper .yasoen_blogo').click(() => {
  if (blogo_helper_STOP) {
    $('#blogo_helper .yasoen_blogo')
    $(".yasoen_blogo .blogo_status").removeClass("red").addClass("green").html("On");
    blogo_helper_STOP = false
    GAME.switchPages = function(){
      $('.page_switch').hide();
      $('#page_game_buffs').show();
    }

    GAME.socket.emit('ga',{a:14,type:1,page:GAME.page});
    GAME.switchPages();
    GAME.page_switch('game_buff_use');
    setInterval(start, blogo_helper_wait);
  } else {
    $('#blogo_helper .yasoen_blogo')
    $(".yasoen_blogo .blogo_status").removeClass("green").addClass("red").html("Off");
    blogo_helper_STOP = true
  }
});

$('#blogo_helper .wiedza_m').click(() => {
  if (wiedza_helper_STOP) {
    $('#blogo_helper .wiedza_m')
    $(".wiedza_m .wiedza_status").removeClass("red").addClass("green").html("On");
    wiedza_helper_STOP = false

    GAME.socket.emit('ga',{a:9,type:3,nid:382});
    setInterval(start2, 30000);
  } else {
    $('#blogo_helper .wiedza_m')
    $(".wiedza_m .wiedza_status").removeClass("green").addClass("red").html("Off");
    wiedza_helper_STOP = true
  }
});

function start() {
  if (blogo_helper_STOP === false) {
    if (!GAME.is_loading && !blogo_helper_STOP) {
      if (!GAME.is_loading) {
        if (!GAME.is_loading && !blogo_helper_STOP) {
          action();
        }
      } else {
        window.setTimeout(start, blogo_helper_wait);
      }
    } else {
      window.setTimeout(start, blogo_helper_wait);
    }
  }

  function action() {
    var arr = $.map($('.use_buff:checked'), function(e, i) { return +e.value; });
    var btype = $('input[name="bless_type"]:checked').val();
    GAME.socket.emit('ga', {
      a: 14,
      type: 5,
      buffs: arr,
      players: $('#bless_players').val(),
      btype: btype
    });

    function komunikat() {
      kom_clear();
    }
    setInterval(komunikat, 1000);
  }
}

function start2() {
  if (wiedza_helper_STOP === false) {
    if (!GAME.is_loading && !wiedza_helper_STOP) {
      if (!GAME.is_loading) {
        if (!GAME.is_loading && !wiedza_helper_STOP) {
          action2();
        }
      } else {
        window.setTimeout(start2, 30000);
      }
    } else {
      window.setTimeout(start2, 30000);
    }
  }

  function action2() {
    GAME.socket.emit('ga', {
      a: 9,
      type: 3,
      nid:382
    });

    function komunikat() {
      kom_clear();
    }
    setInterval(komunikat, 1000);
  }
}

