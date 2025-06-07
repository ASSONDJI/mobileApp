import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PanierService } from '../services/panier.service';  // <-- import du service

@Component({
  selector: 'app-support-detail',
  templateUrl: './support-detail.page.html',
  styleUrls: ['./support-detail.page.scss'],
  standalone: false,
})
export class SupportDetailPage {
  support: any;
  quantite = 1;
  userRating = 0;

  constructor(
    private router: Router, 
    private alertCtrl: AlertController,
    private panierService: PanierService  // <-- injection du service
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['support']) {
      this.support = nav.extras.state['support'];
    } else {
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

  get total(): number {
    return this.quantite * this.support.prix;
  }

  onQuantiteChange() {
    if (this.quantite < 1) {
      this.quantite = 1;
    }
  }

  setUserRating(rating: number) {
    this.userRating = rating;
    console.log(`Note donnée : ${rating}/5`);
    localStorage.setItem(`note-${this.support.id}`, rating.toString());
  }

  async ajouterAuPanier() {
    if (this.quantite < 1) this.quantite = 1;

    const produit = {
      id: this.support.id,
      nom: this.support.nom,
      image: this.support.image,
      quantite: this.quantite,
      prix: this.support.prix,
      total: this.quantite * this.support.prix
    };

    this.panierService.ajouterProduit(produit);

    console.log('Ajouté au panier :', produit);

    // Alerte après ajout
    const alert = await this.alertCtrl.create({
      header: 'Produit ajouté',
      message: `${produit.nom} (x${produit.quantite}) a été ajouté au panier.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
