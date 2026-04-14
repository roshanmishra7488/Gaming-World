let die_sound = new Audio("Music/die.mp3");
let point_sound = new Audio("Music/point.mp3");
let bg_music = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_5b6cc3e6b3.mp3?filename=arcade-music-loop-110624.mp3");

bg_music.loop = true;

die_sound.volume = 1;
point_sound.volume = 1;
bg_music.volume = 0.3;

let move_speed = 3, gravity = 0.5;

let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");

let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");
let background = document.querySelector(".background").getBoundingClientRect();

let game_state = "start";
let bird_dy = 0;
let animationId; // ----------For animation control------------

img.style.display = "none";
message.classList.add("messageStyle");

// ---------------- START GAME ----------------
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && game_state != "play") {

        game_state = "play";

        bg_music.currentTime = 0;
        bg_music.play();

        // --------FOR RESET EVERYTHING PROPERLY----------
        bird_dy = 0;
        bird.style.top = "40vh";
        bird_props = bird.getBoundingClientRect();

        document.querySelectorAll(".pipe_sprite").forEach((e) => e.remove());

        img.style.display = "block";

        score_val.innerHTML = "0";
        score_title.innerHTML = "Score: ";
        message.innerHTML = "";
        message.classList.remove("messageStyle");

        play();
    }
});

// ---------------- JUMP ----------------
document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp" && game_state == "play") {
        img.src = "images/Bird-2.png";
        bird_dy = -7.6;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp") {
        img.src = "images/Bird.png";
    }
});

// ---------------- GAME LOOP ----------------
function play() {

    let pipe_separation = 0;
    let pipe_gap = 35;

    function move() {
        if (game_state != "play") return;

        let pipe_sprite = document.querySelectorAll(".pipe_sprite");

        pipe_sprite.forEach((element) => {

            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            }

            // ------------collision------------
            else if (
                bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                bird_props.left + bird_props.width > pipe_sprite_props.left &&
                bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                bird_props.top + bird_props.height > pipe_sprite_props.top
            ) {
                game_state = "End";

                die_sound.play();
                bg_music.pause();

                message.innerHTML = "Game Over<br>Press Enter To Restart";
                message.classList.add("messageStyle");
                img.style.display = "none";

                cancelAnimationFrame(animationId); 
                return;
            }

            else {
                if (pipe_sprite_props.right < bird_props.left &&
                    element.increase_score == "1") {

                    score_val.innerHTML = parseInt(score_val.innerHTML) + 1;

                    point_sound.play();
                    element.increase_score = "0";
                }

                element.style.left = pipe_sprite_props.left - move_speed + "px";
            }
        });

        animationId = requestAnimationFrame(move); 
    }

    function apply_gravity() {
        if (game_state != "play") return;

        bird_dy += gravity;
        bird.style.top = bird.offsetTop + bird_dy + "px";

        bird_props = bird.getBoundingClientRect();

        // --------collision with ground/top---------
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {

            game_state = "End";

            die_sound.play();
            bg_music.pause();

            message.innerHTML = "Game Over<br>Press Enter To Restart";
            message.classList.add("messageStyle");
            img.style.display = "none";

            cancelAnimationFrame(animationId); // 
            return;
        }

        requestAnimationFrame(apply_gravity);
    }

    function create_pipe() {
        if (game_state != "play") return;

        if (pipe_separation > 115) {
            pipe_separation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;

            let pipe_up = document.createElement("div");
            pipe_up.className = "pipe_sprite";
            pipe_up.style.top = pipe_posi - 70 + "vh";
            pipe_up.style.left = "100vw";

            let pipe_down = document.createElement("div");
            pipe_down.className = "pipe_sprite";
            pipe_down.style.top = pipe_posi + pipe_gap + "vh";
            pipe_down.style.left = "100vw";
            pipe_down.increase_score = "1";

            document.body.appendChild(pipe_up);
            document.body.appendChild(pipe_down);
        }

        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }

    move();
    apply_gravity();
    create_pipe();
}