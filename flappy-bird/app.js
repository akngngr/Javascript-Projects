document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')
    const score = document.createElement('div')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430
    let flapCount = 0
    let obstacleCount = 0

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
        ground.appendChild(score)
        score.classList.add('score')
        score.textContent = 'Score: ' + flapCount + ' Obstacle: ' + obstacleCount
    }

    let gameTimerId = setInterval(startGame, 20)

    //link up the jump function to only work with spacebar
    function control(e) {
        if (e.keyCode === 32) {
            jump()
            //everytime bird flaps wings adds +1 point
            flapCount++;
            
        }
    }

    function jump() {
        if (birdBottom < 500) {
            birdBottom += 50
            bird.style.bottom = birdBottom + 'px'
            console.log(birdBottom)
        }
    }

    document.addEventListener('keyup', control)

    function generateObstacle() {
        let randomHeight = Math.random() * 60
        let obstacleLeft = 500
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        //add class obstacle if the game is not over so obstacles stop generating when game is over
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('top-obstacle')
            
        }

        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'


        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'


            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            //every time bird passes an obstacle it's +10 points
            if (obstacleLeft === birdLeft) {
                flapCount +=10
                obstacleCount++
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 ||
                 birdBottom > obstacleBottom + gap -200) ||
                 birdBottom === 0) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) {
            setTimeout(generateObstacle, 3000)
        }
        
    }
    
    generateObstacle()
    

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
        ground.classList.add('ground')
        ground.classList.remove('ground-moving')
        alert('Game is Over! Your flap count: ' + flapCount + ' You passed: ' + obstacleCount + ' obstacles')
    }  
    

    })