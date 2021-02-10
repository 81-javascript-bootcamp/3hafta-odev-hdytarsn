const petsModule = (function() {
    const _data = [{
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            key: "b",
            soundText: "Bark - Type 'b' or 'B'",
            bgcolor: "red"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            key: "m",
            soundText: "Meow - type 'm' or 'M'",
            bgcolor: "blue"
        }
    ];
    const $tbodyEl = document.querySelector("tbody");
    const $mainImage = document.querySelector(".main-image");

    const getPetButtons = function() {
        return document.querySelectorAll("button");
    }

    function getPetRows() {
        return document.querySelectorAll('.pet');
    }

    function getPetByIndex(index) {
        return _data[index];
    }

    const createPetElement = function(pet) {
        return `<tr class="pet"><td><img class="pet-image" src="${pet.image}"/></td><td>${pet.name}</td><td>${pet.type}</td><td><button data-sound="${pet.sound}">${pet.soundText}</button></td></tr>`;
    };

    const createPetSoundElement = function(pet) {
        return `<audio id="${pet.sound}" src="sounds/${pet.sound}.mp3"></audio>`;
    };

    const addToTable = function(content) {
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function() {
        _data.forEach((petElement) => {
            addToTable(createPetElement(petElement));
        });
    }
    const putPetSoundsInHtml = function() {
        _data.forEach((petElement) => {
            addToTable(createPetSoundElement(petElement));
        });
    }

    function playSoundById(id) {
        const $soundElement = document.getElementById(id);
        if ($soundElement) {
            $soundElement.play();
        }
    }

    function clearPetRowBackgroundColors() {
        getPetRows().forEach(($row) => {
            $row.setAttribute('style', 'background-color: none');
        });
    }

    function changeBackgroundColorByPet($pet, $row) {
        clearPetRowBackgroundColors();
        if ($pet.bgcolor) {
            $row.setAttribute('style', `background-color: ${$pet.bgcolor}`);
        }
    }

    function changeMainImagebyPet($pet) {
        if ($pet.image) {
            $mainImage.setAttribute('src', $pet.image);
        }
    }

    function bindKeyDownEvents() {
        _data.forEach((petElement) => {
            document.addEventListener('keydown', function(event) {
                if (event.key === petElement.key.toLowerCase() || event.key === petElement.key.toUpperCase()) {
                    playSoundById(petElement.sound);
                }
            });
        });
    }

    function bindRowClickEvents() {
        const $rows = getPetRows();
        $rows.forEach(($row, index) => {
            $row.addEventListener('click', function() {
                const $currentPet = getPetByIndex(index);
                changeBackgroundColorByPet($currentPet, $row);
                changeMainImagebyPet($currentPet);
            });
        });
    }
    const bindButtonEvents = function() {
        const $buttons = getPetButtons();
        $buttons.forEach((button) => {
            button.addEventListener("click", function(event) {
                event.stopPropagation();
                playSoundById(this.dataset.sound);
            });
        })
    }

    const init = function() {
        putPetsInHtml();
        putPetSoundsInHtml();
        bindKeyDownEvents();
        bindButtonEvents();
        bindRowClickEvents();
    }

    return {
        init: init
    }
})();
petsModule.init();