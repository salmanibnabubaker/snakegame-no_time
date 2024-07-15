let score_card=document.querySelector("#Score_Card"),grid=document.getElementById('Grid'),timer_indc=document.getElementById('Timer');
let width_grid=400,height_grid=width_grid,width_cell=20,height_cell=width_cell,width_cell_count=width_grid/width_cell,height_cell_count=width_cell_count;
let matrix=[],timer_limit=15;//0 indicates free cells 1 indicates occupied cells
for(let i=0;i<height_cell_count;i++){
    let row=[];
    for(let j=0;j<width_cell_count;j++){
        row.push(0);
    }
    matrix.push(row);
}
matrix[0][0]=1;
//matrix[1][0]=1;
//let game_over=false;

let ball=document.getElementById('Ball'),ball_x=-1,ball_y=-1;
ball.style.left=ball_x*width_cell+"px";
ball.style.top=ball_y*height_cell+"px";

class Ball{
    constructor(){
        //this.create_place_ball();
        //this.timer(timer_limit);
    }
    create_place_ball(){
        let free_cells=[];
        for(let i=0;i<height_cell_count;i++){
            for(let j=0;j<width_cell_count;j++){
                if(matrix[i][j]==0){
                    let indexes=[];
                    indexes.push(i);
                    indexes.push(j);   
                    free_cells.push(indexes);
                }
            }
        }   
        let rand_ind=Math.floor(Math.random()*free_cells.length);
        ball_x=free_cells[rand_ind][1];
        ball_y=free_cells[rand_ind][0];
        ball.style.left=ball_x*width_cell+"px";
        ball.style.top=ball_y*height_cell+"px";
        //this.timer(timer_limit);
        //matrix[ball_y][ball_x]=1;
        //free_cell_count--;
    }
    
    timer(time){
        if(time!=0){
            timer_indc.innerText="Time Remaining : "+time;
            setTimeout(()=>{
                time--;
                this.timer(time);
            },1000);
        }
        else{
            timer_indc.innerText="Time Up";
            location.reload();
        }
    }
}
let NewBall=new Ball();
//directions 1.right 2.down 3.left 4.up
//snakes-y_index,x_index,direction
let snakes=[[0,0,2]];
let dir=1,snake_length=1;
document.addEventListener('keydown',function(event){
    if(event.key=="ArrowRight"){
        if(dir!=3){
            dir=1;
        }
    }
    else if(event.key=="ArrowDown"){
        if(dir!=4){
            dir=2;
        }
    }
    if(event.key=="ArrowLeft"){
        if(dir!=1){
            dir=3;
        }
    }
    if(event.key=="ArrowUp"){
        if(dir!=2){
            dir=4;
        }
    }
});


function check_game_over(){
    if(snakes[0][0]<0||snakes[0][0]>=height_cell_count||snakes[0][1]<0||snakes[0][1]>=width_cell_count){
        return true;
    }
    let snake_parts=document.getElementsByClassName('Snake_Parts');
    for(let i=1;i<snake_parts.length;i++){
        if(snakes[0][0]==snakes[i][0]&&snakes[0][1]==snakes[i][1]){
            return true;
        }
    }
    return false;
}


function move_snake(){
    
    let prev_part_dir,req_dir,leave_x,leave_y,leave_dir;
    let snake_parts=document.getElementsByClassName('Snake_Parts');
    for(let i=0;i<snake_parts.length;i++){
        if(i==snake_parts.length-1){
            leave_x=snakes[i][1];
            leave_y=snakes[i][0];
            leave_dir=snakes[i][2];
        }
        if(i==0){
            
            prev_part_dir=snakes[i][2];
            snakes[i][2]=dir;
            switch(dir){
                case 1:
                    snakes[i][1]++;
                    break;
                case 2:
                    snakes[i][0]++;
                    break;
                case 3:
                    snakes[i][1]--;
                    break;
                case 4:
                    snakes[i][0]--;
                    break;
            }
        }
        else{
            
            req_dir=prev_part_dir;
            prev_part_dir=snakes[i][2];
            switch(req_dir){
                case 1:
                    snakes[i][1]++;
                    break;
                case 2:
                    snakes[i][0]++;
                    break;
                case 3:
                    snakes[i][1]--;
                    break;
                case 4:
                    snakes[i][0]--;
                    break;
            }
            snakes[i][2]=req_dir;
        }
        snake_parts[i].style.top=height_cell*snakes[i][0]+"px";
        snake_parts[i].style.left=width_cell*snakes[i][1]+"px";
    }
    
    if(check_game_over()){
        score_card.innerText="Game Over";
        location.reload();
    }
    for(let i=0;i<snake_parts.length;i++){
        matrix[snakes[i][0]][snakes[i][1]]=1;
    }
    matrix[leave_y][leave_x]=0;
    if(snakes[0][0]==ball_y&&snakes[0][1]==ball_x){
        score++;
        score_card.innerText="Game Score : "+score;
        if(score==399){
            score_card.innerText="You Won";
            location.reload();
        }
        //free_cell_count--;
        snakes.push([leave_y,leave_x,leave_dir]);
        matrix[leave_y][leave_x]=1;
        let new_snake_part=document.createElement('div');
        new_snake_part.setAttribute("class","Snake_Parts");
        grid.appendChild(new_snake_part);
        new_snake_part.style.top=height_cell*leave_y+"px";
        new_snake_part.style.left=width_cell*leave_x+"px";
        /*ball_x=-1;
        ball_y=-1;
        ball.style.left=ball_x*width_cell+"px";
        ball.style.top=ball_y*height_cell+"px";
        matrix[ball_y][ball_x]=0;
        free_cell_count++;
        */
        NewBall.create_place_ball();
    }
    
}
let score=0;
NewBall.create_place_ball();
let motion_snake=setInterval(move_snake,140);