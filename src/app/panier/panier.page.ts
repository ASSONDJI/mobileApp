import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PanierService, ProduitPanier } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
  standalone:false,
})
export class PanierPage {
  produits: ProduitPanier[] = [];

  constructor(
    private panierService: PanierService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    // Charger le panier à chaque affichage de la page
    this.produits = this.panierService.getPanier();
  }

  getTotalPanier(): number {
    return this.produits.reduce((acc, p) => acc + p.total, 0);
  }

  async viderPanier() {
    const alert = await this.alertCtrl.create({
      header: 'Vider le panier',
      message: 'Voulez-vous vraiment vider le panier ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Confirmer',
          handler: () => {
            this.panierService.viderPanier();
            this.produits = [];
          }
        }
      ]
    });
    await alert.present();
  }

  supprimerProduit(id: number) {
    this.panierService.supprimerProduit(id);
    this.produits = this.panierService.getPanier();
  }

  incrementerQuantite(produit: ProduitPanier) {
    this.panierService.ajouterProduit(
      {
        id: produit.id,
        nom: produit.nom,
        image: produit.image,
        prix: produit.prixUnitaire
      },
      1
    );
    this.produits = this.panierService.getPanier();
  }

  decrementerQuantite(produit: ProduitPanier) {
    this.panierService.retirerProduit(produit.id, 1);
    this.produits = this.panierService.getPanier();
  }
}
