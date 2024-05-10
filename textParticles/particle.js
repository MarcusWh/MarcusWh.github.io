class Particle{
    constructor(x, y, i){
        this.x=width/-2+100;
        this.y=height/-2+100;
        this.tx=x;
        this.ty=y;
        this.i=i;
        this.counter=0;
        this.speed=this.chooseSpeed();
    }
    draw(){
        if(this.counter>this.i){
            circle(this.x,this.y,3);
            this.x=this.x+(this.tx-this.x)/this.speed;
            this.y=this.y+(this.ty-this.y)/this.speed;

        }
        this.counter++;
        if (this.counter>particles.length+360){
            this.counter=0;
            this.x=random(width)-width/2;
            this.y=random(height)-height/2;
            this.speed=this.chooseSpeed();
        }
    }
    chooseSpeed(){
        // return random(20)+1;
        return 20;
    }
}
