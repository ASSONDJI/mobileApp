import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-detail',
  templateUrl: './support-detail.page.html',
  styleUrls: ['./support-detail.page.scss'],
  standalone:false,
})
export class SupportDetailPage {
  support: any;
  quantite = 1;
constructor(private router: Router) {
  const nav = this.router.getCurrentNavigation();
  if (nav?.extras?.state?.['support']) {
    this.support = nav.extras.state['support'];
  } else {
    // Redirection ou valeur par défaut si aucun support n'a été transmis
    this.support = {
      nom: 'Aucun support sélectionné',
      image: 'assets/imgs/not-found.png',
      description: 'Détail indisponible.',
      prix: 0,
      qualite: '',
      pages: 0,
      type: '',
      note: 0,
      avis: 0,
      id: -1
    };
  }
}
   ajouterAuPanier() {
    // Tu peux ici ajouter l’objet support avec la quantité sélectionnée
    console.log('Ajout au panier:', this.support.nom, 'Quantité:', this.quantite);
  }
}
