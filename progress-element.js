class progress extends HTMLElement{

    constructor(){
        super();
        // this.shadow = this.attachShadow({mode: 'open'});
        this.shadow = this.attachShadow({mode:'closed'});
        this._complete = 0;
    }

    get complete(){
        return this._complete;
    }

    set complete(val) {
        this.setAttribute('complete', val);
    }

    static get observedAttributes() {
        return ['complete'];
    }
    
    attributeChangedCallback(name, old, newv){
        let innerBar =this.shadow.querySelector('#inner-Progress');
        switch(name){
            case 'complete':
                this._complete = parseInt(newv,10) || 0;
                innerBar.style.width = this.complete + '%';
                innerBar.innerHTML = this.complete + '%';
        }
    }

    connectedCallback(){
        
        let template = `
            <style>
                .progress-Bar{
                    width: 100%;
                    background:#e4e4e4;
                    color: #fff;
                    height:30px;
                    border-radius: 4px;
                }
                #inner-Progress{
                    height: 100%;
                    line-height: 30px;
                    background: #000;
                    text-align: center;
                    border-radius: 4px;
                    transistion: width 0.25s;
                }
            </style>
            
            <div class="progress-Bar">
                <div id="inner-Progress">${this.complete}%</div>
            </div>
        `;
        this.shadow.innerHTML = template;
    }


}

window.customElements.define('progress-ele', progress);