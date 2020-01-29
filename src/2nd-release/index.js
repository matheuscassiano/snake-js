window.onload = function(){
    setInterval(game, 80)

    const screen = document.getElementById('screen')
    const context = screen.getContext('2d')
    
    const width = screen.width
    const height = screen.height

    let velocityX = velocityY = 0
    let positionX = positionY = 10
    let appleX = appleY = 15

    let trail = []
    let tail = 1
    let size = 1
    let points = 0

    let name = sessionStorage.getItem("name")
    console.log(name)
    if(name == null){
        newName = prompt('Your Name')
        sessionStorage.setItem("name", newName)
        name = sessionStorage.getItem("name")
        console.log(name)
    }

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

        document.addEventListener('keydown', moveSnake)

        function colision(){
            if(appleX == positionX && appleY == positionY){
                tail++
                points++
                appleX = Math.floor(Math.random() * width)
                appleY = Math.floor(Math.random() * width)
            }
        }

        renderGame()
        colision()
        
    }   
    

    function renderGame(){
        const user = document.querySelector('.name')
        const scorer = document.querySelector('.score-value')        

        // Styles
        let primaryColor = '#F0D84F'
        let appleColor = '#d01050'
        let bgColor = '#111011'

        user.style.color = primaryColor
        scorer.style.color = primaryColor

        context.fillStyle = bgColor
        context.fillRect(0, 0, width, height)

        context.fillStyle = appleColor
        context.fillRect(appleX * size, appleY * size, size, size)

        context.fillStyle = primaryColor
        context.fillRect(positionX, positionY, size, size)

        // Snake
        for(let i = 0; i < trail.length; i++){
            context.fillStyle = primaryColor+'70'
            context.fillRect(trail[i].x * size, trail[i].y * size, size, size)
            if(trail[i].x == positionX && trail[i].y == positionY){
                velocityX = velocityY = 0
                tail = 1
                points = 0
            }
        }

        // Tail
        trail.push({ x: positionX, y: positionY })
        while(trail.length > tail){
            trail.shift()
        }

        // Score
        user.innerHTML = name
        scorer.innerHTML = points

    }

    function moveSnake(event){
        const velocity = 1

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
