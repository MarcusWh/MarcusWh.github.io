class Tile{
    constructor(x,y,label,group){
        this.x=x;
        this.y=y;
        this.tx=x;
        this.ty=y;
        this.w = width/4*0.95;
        this.h = height/4*0.95;
        this.tw=this.w;
        this.th=this.h;
        this.label = label;
        this.group = group;
        this.selected = false;
        this.locked = false;
        this.foundGroup;
        this.touchStart = false;
    }
    draw(){
        let alph = 200;
        push();
        fill(10,20,100,alph);
        if (this.locked){
            if (this.foundGroup==1){
                fill(155,5,60,alph);
            }else if (this.foundGroup==2){
                fill(5,155,60,alph);
            }else if (this.foundGroup==3){
                fill(60,10,155,alph);
            }else if (this.foundGroup==4){
                fill(205,155,10,alph);
            }
        }else if(this.selected){
            fill(150,150,150,alph);
        }
        rect(this.x,this.y,this.w,this.h,this.w*0.1);
        noStroke();
        fill(255);
        text(this.label,this.x,this.y)
        pop();
        this.x = this.x+(this.tx-this.x)*0.1;
        this.y = this.y+(this.ty-this.y)*0.1;
        this.w = this.w+(this.tw-this.w)*0.1;
        this.h = this.h+(this.th-this.h)*0.1;
    }
    touchStarted(){
        if (overTile(this.x,this.y)){
            this.touchStart = true;
        }
    }
    touchEnded(){
        if (overTile(this.x,this.y)){
            if (!this.locked){
                if (this.touchStart){
                    this.selected = !this.selected;
                }
            }
        }
        this.touchStart=false;
    }
}
