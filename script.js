const petsModule = (function() {
    const _data = [{
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            key: "b",
            soundText: "Bark - type b || B"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            key: "m",
            soundText: "Meow - type m || M"
        }
    ];
    const $tbodyEl = document.querySelector("tbody");

    const getButtons = function() {
        return document.querySelectorAll("button");
    }

    const createPetElement = function(pet) {
        return `<tr><td><img class="pet-image" src="${pet.image}"/></td><td>${pet.name}</td><td>${pet.type}</td><td><button data-sound="${pet.sound}">${pet.soundText}</button></td></tr>`;
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

    function bindKeyDownEvents() {
        _data.forEach((petElement) => {
            document.addEventListener('keydown', function(event) {
                if (event.key === petElement.key.toLowerCase() || event.key === petElement.key.toUpperCase()) {
                    playSoundById(petElement.sound);
                }
            });
        });
    }

    const bindButtonEvents = function() {
        const buttons = getButtons();
        buttons.forEach((button) => {
            button.addEventListener("click", function(event) {
                playSoundById(this.dataset.sound);
            });
        })
    }

    const init = function() {
        putPetsInHtml();
        putPetSoundsInHtml();
        bindKeyDownEvents()
        bindButtonEvents();
    }

    return {
        init: init
    }
})();
petsModule.init();