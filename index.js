window.onload = () => {
    const screen = document.querySelector('.screen');
    const ctx = screen.getContext('2d');
    document.addEventListener('keydown', keyPush);

    setInterval(game, 60);

    let speed = 1;
    let posX = posY = 0;
    let pieceSize = 20;
    let speedX = speedY = 0;
    let pieceAmount = 30;
    let appleX = appleY = 15;
    let trail = [];
    let tail = 2;

    function game(){
        ctx.clearRect(0, 0, screen.width, screen.height);
        ctx.fillStyle = 'rgba(0, 0, 0)';
        ctx.fillRect(0, 0, 600, 600);
        posX += speedX;
        posY += speedY;
        if(posX < 0){
            posX = pieceAmount - 1;
        }
        if(posX > pieceAmount - 1){
            posX = 0;
        }
        if(posY < 0){
            posY = pieceAmount - 1;
        }
        if(posY > pieceAmount - 1){
            posY = 0;
        }

        ctx.fillStyle = 'rgba(210, 0, 0)';
        ctx.fillRect(appleX * pieceSize, appleY * pieceSize, pieceSize, pieceSize);

        ctx.fillStyle = 'rgba(210, 210, 210)';
        for(let i=0; i<trail.length; i++){
            ctx.fillRect(trail[i].x*pieceSize, trail[i].y*pieceSize, pieceSize, pieceSize);
            if(trail[i].x == posX && trail[i].y == posY){
                speedX = speedY = 0;
                tail = 2;
            }
        }
        trail.push({x:posX, y:posY})

        while(trail.length > tail){
            trail.shift();
        }

        if(appleX == posX && appleY == posY){
            tail ++;
            appleX = Math.floor(Math.random() * pieceAmount);
            appleY = Math.floor(Math.random() * pieceAmount);
        }
    }

    function keyPush(event){
        const key = event.keyCode;
        if(key === 37){
            speedX = -speed;
            speedY = 0;
        }
        if(key === 38){
            speedY = -speed;
            speedX = 0;
        }
        if(key === 39){
            speedX = speed;
            speedY = 0
        }
        if(key === 40){
            speedY = speed;
            speedX = 0;
        }
    }
}
