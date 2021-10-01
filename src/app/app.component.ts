import { Component, OnInit } from '@angular/core';
import { TelasService } from './telas.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  constructor(private telaService: TelasService) {}

  ngOnInit(){
    this.telaService.inicializar();
  }

  get showInicio(): boolean{
    return this.telaService.showInicio;
  }

  get showTabuleiro(): boolean {
    return this.telaService.showTabuleiro;
  }

  iniciarJogo(): void {
    this.telaService.iniciarJogo();
  }


  scores = [0 , 0];
  weapons = [
    'rock',
    'paper',
    'scissors'
  ]
  playerSelected = -1;
  loading= false;
  isResultShow = false;
  
  /**
   * O resultado - 0 ganha
   *               1 perde
   *               2 empata
   */

  theResult = 0 
  enemySelected  = -1;

 pick( weapon: number): void {
   
  /**
   * Impede que o o usuário aperte o botão durante o carregamento da pagina
   */

   if(this.loading) return;
   this.loading = true;
   this.playerSelected = weapon;

   /**
    * Cria um tempo para simular o turno do oponente
    */
  
   setTimeout( () => {
     this.loading = false;
     // gera um número entre 0 e 2 
     const randomNum =  Math.floor(Math.random() * 3 ) ;
     this.enemySelected = randomNum;
     this.checkResult();
     this.isResultShow = true;
   },  Math.floor(Math.random() * 500 ) +200);
 }

 reset(): void {
  this.scores = [0,0];
 }
 checkResult(): void {
   const playerPick = this.playerSelected;
   const enemyPick = this.enemySelected;
   /**
    * Se o computador escolher o mesmo personagem que o jogador, terá um empate
    */
   if( playerPick ==  enemyPick)
    {
    this.theResult = 2;
  }

  /**
   * Exemplo:
   * Jogador escolhe pedra (0) e o
   * computador escolhe papel (1)
   * O jogador perde porque ( 0 - 1 + 3 ) % 3 = 2
   */
  
    else if ( (playerPick - enemyPick + 3)% 3 == 1)    {
      // O jogador ganha
      this.theResult = 0;
      this.scores[0] = this.scores[0]+1;
    }
    else{
      // O joador perde
      this.theResult = 1;
        this.scores[1] = this.scores[1]+1;
    }
 }
}

