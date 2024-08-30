window.onload = function() {
    let songName = document.querySelector("#song-name");
    let songSize = document.querySelector("#song-size");
    
    let playPauseBtn = document.querySelector("#play-pause-btn");
    let playPauseIcon = document.querySelector("#play-pause-icon");

    let volumeBtn = document.querySelector("#volume-btn");
    let volumeBtnIcon = document.querySelector("#volume-btn-icon");

    let repeatBtn = document.querySelector("#repeat-btn");
    let repeatBtnIcon = document.querySelector("#repeat-btn-icon");

    let forwardBtn = document.querySelector("#forward-btn");
    let backwardBtn = document.querySelector("#backward-btn");

    let fullDuration = document.querySelector("#full-duration");
    let currentDuration = document.querySelector("#current-duration");

    let progressBar = document.querySelector("#progress-bar");

    let uploadInput = document.querySelector("#upload-input");
    let file;
    uploadInput.addEventListener("change", () => {
        if(file == undefined) 
            file = uploadInput.files[0];
        let url = URL.createObjectURL(file);
        
        let dotIndex = file.name.lastIndexOf('.');
        let fileName = file.name.substring(0, dotIndex);
        let fileSize = (file.size/1000000).toFixed(1);

        songName.textContent = fileName;
        songSize.textContent = `Size : ${fileSize}MB`;

        // creating audio tag
        let audio = document.createElement("audio");
        audio.src = url;
        audio.play();
        playPauseIcon.className = "ri-pause-large-fill";
        
        // play pause working
        playPauseBtn.addEventListener("click", () => {
            if(audio.paused) {
                playPauseIcon.className = "ri-pause-large-fill";
                audio.play();
            }
            else {
                playPauseIcon.className = "ri-play-large-fill";
                audio.pause();
            }
        });

        volumeBtn.addEventListener("click", () => {
            if(audio.muted) {
                volumeBtnIcon.className = "ri-volume-up-fill";
                audio.muted = false;
            }
            else {
                volumeBtnIcon.className = "ri-volume-mute-fill";
                audio.muted = true;
            }
        });

        // audio loop (repeat) working...
        repeatBtn.addEventListener("click", () => {
            if(audio.loop) {
                // removing from loop
                repeatBtnIcon.className = "ri-repeat-2-fill";
                audio.loop = false;
            }
            else {
                // adding to loop
                repeatBtnIcon.className = "ri-repeat-one-fill";
                audio.loop = true;
            }
        });

        // forward-btn working...
        forwardBtn.addEventListener("click", () => {
            audio.currentTime += 10;
        })

        // backward-btn working...
        backwardBtn.addEventListener("click", () => {
            audio.currentTime -= 10;
        });

        // show full-duration time working...
        let duration;
        audio.addEventListener("loadedmetadata", () => {
            duration = Math.floor(audio.duration);
            let min = Math.floor(duration/60);
            let sec = duration%60;
            fullDuration.textContent = `${min}:${sec}`;
        });

        // updating audio current-duration...
        audio.addEventListener("timeupdate", () => {
            let currentTime = Math.floor(audio.currentTime);
            let min = Math.floor(currentTime/60);
            let sec = currentTime%60;
            currentDuration.textContent = `${min}:${sec}`;

            // progress-bar real time updating...
            let percentage = Math.floor(currentTime/duration*100);
            progressBar.style.width = `${percentage}%`;
            
            if(percentage == 100) {
                progressBar.style.width = "0%";
                currentDuration.textContent = "00:00";
                playPauseIcon.className = "ri-play-large-fill";
            }

            if(audio.paused == false) {
                playPauseIcon.className = "ri-pause-large-fill";
            }
        });
    });
}