window.onload = function(){
    let screen = document.getElementById('screen')
    let context = screen.getContext('2d')
    document.addEventListener('keydown', keyPush)

    setInterval(game, 80)

    const velocity = 1
    const width = screen.width
    const height = screen.height

    let velocityX = velocityY = 0
    let positionX = positionY = 10
    let snakeSize = 1
    let appleX = appleY = 15

    let trail = []
    let tail = 1;

    function game(){
        positionX += velocityX
        positionY += velocityY

        if(positionX < 0) {
            positionX = width - 1
            
        }

        if(positionX > width -1) {
            positionX = 0
            
        }

        if(positionY < 0) {
            positionY = width - 1
            
        }

        if(positionY > width - 1) {
            positionY = 0
            
        }

        renderGame()
    }
    

    function renderGame(){
        context.fillStyle = '#1f1f1f'
        context.fillRect(0, 0, width, height)

        context.fillStyle = 'red'
        context.fillRect(appleX * snakeSize, appleY * snakeSize, snakeSize, snakeSize)

        context.fillStyle = '#F0D84F'
        for(let i = 0; i < trail.length; i++){
            context.fillRect(trail[i].x * snakeSize, trail[i].y * snakeSize, snakeSize, snakeSize)
            if(trail[i].x == positionX && trail[i].y == positionY){
                velocityX = velocityY = 0
                tail = 1
            }
        }

        trail.push({ x: positionX, y: positionY })
        while(trail.length > tail){
            trail.shift()
        }

        if(appleX == positionX && appleY == positionY){
            tail++
            appleX = Math.floor(Math.random() * width)
            appleY = Math.floor(Math.random() * width)
        }
    }

    function keyPush(event){
        switch(event.keyCode){
            case 37: // left
                velocityX = -velocity
                velocityY = 0
                break
            case 38: // up
                velocityX = 0
                velocityY = -velocity
                break
            case 39: // right
                velocityX = velocity
                velocityY = 0
                break
            case 40: // down
                velocityX = 0
                velocityY = velocity
                break
        }
    }
}
