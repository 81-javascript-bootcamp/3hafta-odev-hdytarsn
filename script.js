const petsModule = (function() {
    const _data = [{
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            key: "b",
            soundText: "Bark - Type 'b' or 'B'",
            bgcolor: "#9C4C52"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            key: "m",
            soundText: "Meow - type 'm' or 'M'",
            bgcolor: "#9B7056"
        },
        {
            image: "https://i.pinimg.com/originals/92/0f/a9/920fa9b50993ffb0f13dce1706781c6b.jpg",
            name: "Barney",
            type: "Hollywood Sheep",
            sound: "mee",
            key: "e",
            soundText: "Eee - type 'e' or 'E'",
            bgcolor: "#515E76"
        },
        {
            image: "https://i2.wp.com/theverybesttop10.com/wp-content/uploads/2020/06/Ten-of-the-Most-Interesting-Frog-Species-From-Around-The-World.jpg?fit=600%2C400&ssl=1",
            name: "George",
            type: "Slug Frog",
            sound: "grug",
            key: "g",
            soundText: "Grug - type 'g' or 'G'",
            bgcolor: "#637865"
        }

    ];
    const htmlBody = document.querySelector("body");
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
            const soundButton = document.querySelector('button[data-sound=' + id + ']');
            setClickedButtonClass(soundButton);
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

    function setClickedButtonClass($button) {
        $button.classList.add('clicked-btn');
        setTimeout(() => {
            $button.classList.remove('clicked-btn');
        }, 1500);
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

    const customCssChanger = function() {
        const checkbox = document.getElementById('css_changer');
        checkbox.addEventListener('change', function(event) {
            htmlBody.classList.toggle('custom-css');
        });
    }



    const init = function() {
        putPetsInHtml();
        putPetSoundsInHtml();
        bindKeyDownEvents();
        bindButtonEvents();
        bindRowClickEvents();
    }

    return {
        init: init,
        customCssChanger: customCssChanger
    }
})();
petsModule.init();
petsModule.customCssChanger();